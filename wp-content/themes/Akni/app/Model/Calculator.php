<?php

namespace Akni\app\Model;

use Akni\app\Helper\Data;
use Akni\app\core\Config;

/**
 * Class Calculator
 * @package Akni\app\Model
 */
class Calculator
{

    private $_core;

    private $_config;

    /**
     * MainAjax constructor.
     * @param $core
     */ 
    public function __construct($core)
    {
        $this->_core = $core;
        $this->_config = new Config();

        add_action(
            'wp_ajax_calcAction',
            [&$this, 'calculate']
        );
        add_action(
            'wp_ajax_nopriv_calcAction',
            [&$this, 'calculate']
        );

        add_action(
            'wp_ajax_getTariff',
            [&$this, 'getTariffAjax']
        );
        add_action(
            'wp_ajax_nopriv_getTariff',
            [&$this, 'getTariffAjax']
        );
        add_action(
            'wp_ajax_calcAction1',
            [&$this, 'calculate1']
        );
        add_action(
            'wp_ajax_nopriv_calcAction1',
            [&$this, 'calculate1']
        );
 
        add_action(
            'wp_ajax_calcAction2',
            [&$this, 'calculate2']
        );
        add_action(
            'wp_ajax_nopriv_calcAction2',
            [&$this, 'calculate2']
        );
 

    }   
    public function getTariffAjax()
    {
        $data = $_POST['data'];
        $sample = $data['samples'];
        $return = [];
        $model = $this->_core->model;
        $showConfig = $this->_config->getConfig('show', 'show');

        $model->setArgs($showConfig['tariffs']);
        $model->setSpecialArgs('tax_query', array(
            array(
                "taxonomy" => "pledge",
                "field" => "id",
                "terms" => (int)$data['pledge']
            )
        ));

        $model->setPosts();
        $model->setPostUrls();
        $model->formattedACF();
        $credits = $model->getResult();

        if(!empty($credits)){

            $args = [
                "posts_per_page" => -1,
                "post_type" => "discount",
                "post_status" => "publish",
                "orderby" => "post_date",
                "order" => "DESC",
            ];

            $discounts[1]['post_title'] = customTranslate('<!--:ru-->Без статуса<!--:--><!--:ua-->Без статусу<!--:-->');
            $discounts[1]['post_id'] = 'none';
            $disc = get_posts($args);
            foreach($disc as $d)
            {
                $discounts[] = $d;
            }

            foreach($credits as $key => $credit){
                $discountsForTariff = $discounts;
                $fromDate = $credit->from_field;
                $toDate = $credit->to_field;

                if(count($credit->proba) > 0){
                    if(!isset(array_flip($credit->proba)[$sample])) {
                        unset($credits[$key]);
                    } else {
                        foreach ($credit->price as $samp) {
                            foreach ($samp as $discountNum => $price) {
                                if($price == 0) {
                                    if(isset($discountsForTariff[$discountNum])) {
                                        unset($discountsForTariff[$discountNum]);
                                    }
                                }
                            }
                        }
                        $returnDiscounts = [];
                        foreach ($discountsForTariff as $dNum=>$discount) {
                            $fromArray = [];
                            $toArray = [];
                            $min=$max=1;
                            foreach ($fromDate as $from) {
                                $fromArray[] = $from[$dNum-1];
                            }
                            foreach ($toDate as $to) {
                                $toArray[] = $to[$dNum-1];
                            }
                            $dateLine = array_unique(array_merge ($fromArray, $toArray));
                            if(count($dateLine) > 1){
                                $min = min($dateLine);
                                if(!$min || $min <1){
                                    $min = 1;
                                }
                                $max = max($dateLine);
                            }

                            if(is_array($discount)) {
                                $returnDiscounts[0]['post_title'] = $discount['post_title'];
                                $returnDiscounts[0]['post_id'] = $discount['post_id'];
                                $returnDiscounts[0]['min'] = (int)$min;
                                $returnDiscounts[0]['max'] = (int)$max;
                                $returnDiscounts[0]['val'] = round(($max+$min)/2);
                            } else {
                                $returnDiscounts[$discount->ID]['post_title'] = customTranslate($discount->post_title);
                                $returnDiscounts[$discount->ID]['post_content'] = customTranslate($discount->post_content);
                                $returnDiscounts[$discount->ID]['post_id'] = $discount->ID;
                                $returnDiscounts[$discount->ID]['min'] = (int)$min;
                                $returnDiscounts[$discount->ID]['max'] = (int)$max;
                                $returnDiscounts[$discount->ID]['val'] = round(($max+$min)/2);
                            }
                        }

                        $return[] = [
                            'post_title' => $credit->post_title,
                            'post_content' => $credit->post_content,
                            'ID' => $credit->ID,
                            'discounts' => $returnDiscounts
                        ];
                    }
                } else {
                    unset($credits[$key]);
                }
            }
        }

        echo json_encode($return);
        wp_die();
    }

    public function calculate(){
        $data = $this->_formateData($_POST['data']);
        $args = [
            "posts_per_page" => -1,
            "post_type" => "discount",
            "post_status" => "publish",
            "orderby" => "post_date",
            "order" => "DESC",
        ];

        $discounts = get_posts($args);
        $fields = $this->getTariff($data['tariff']);

        $proba = unserialize($fields['proba'][0]);
        $sum = array_unique(unserialize($fields['sum'][0]));
        $price = unserialize($fields['price'][0]);
        $to_date = unserialize($fields['to_field'][0]);
        $rate = unserialize($fields['rate'][0]);
        $d_key = '';
        $d_proba ='';
        $cur_price = '';
        $t_sum = [];
        $t_date_keys = [];
        $rate_val = '';
        $money = '';
        $cur_sum = '';
        $t_date = [];

        if(!empty($proba)){
            foreach($proba as $k=>$sample){
                if($sample == $data['sample']){
                    $d_proba = $k;
                    break;
                }
            }
        }

        if($data['discount'] == 'none'){
            $d_key = 1;
        }else{
            foreach ($discounts as $k => $v) {
                if ($data['discount'] == $v->ID && is_numeric($k)) {
                    $d_key = ($k + 2);
                    break;
                }
            }
        }

        if($d_proba !=='' && $d_key !==''){
            $cur_price = $price[$d_proba][$d_key];
        }
        if ($cur_price != '') {
            $data['weight'] = str_replace(',','.',$data['weight']);
            $cur_sum = $data['weight'] * $cur_price;
        }

        if (!empty($cur_sum) && !empty($sum)) {
            foreach ($sum as $v) {
                if ($cur_sum < $v) {
                    $t_sum[] = $v;
                }
            }
        }

        if(!empty($t_sum)){
            $t_val = min($t_sum);
        }else{
            $t_val = max($sum);
        }

        if($t_val !=''){
            $t_sum_keys = array_keys($sum, $t_val);
        }
        $d_key = $d_key -1;
        if($data['days'] !='' && !empty($to_date)){
            foreach ($to_date as $k => $vv) {
                foreach ($vv as $i => $v) {
                    if ($i == $d_key && $data['days'] <= $v) {
                        $t_date[$k] = $v;
                    }
                    elseif($data['days'] == 1){
                        $t_date[$k] = $v;
                    }
                }
            }
        }
        if(!empty($t_date)){
            $t_date_val = min($t_date);
        }else{
            $t_date_val = max($to_date);
        }

        if(!empty($t_date_val)){
            $t_date_keys = array_keys($t_date,$t_date_val);
        }

        if(!empty($t_date_keys) && !empty($t_sum_keys) && ($d_key >= 0)){
            $rate_val = $rate[$t_sum_keys[0]][$d_key][$t_date_keys[0]];
        }
        if($rate_val !='' && $cur_sum !='' && $data['days'] != '' ){
            $money = $this->calculatePercent($rate_val, $data['days'], $cur_sum);
        }

        if ($money && $cur_sum) {
            
            $calculationsData = json_encode([
                'sum' => $cur_sum,
                'percent' => $money,
                
            ]);
            echo $calculationsData;
            wp_die();
        }
    }
    public function calculate1(){
        
            
            $calculationsData = json_encode([
                'price' => 10000,
            ]);
            echo $calculationsData; 
            wp_die();
    }
    public function calculate2(){
        
            $calculationsData = json_encode([
                'sum' => 600,
                'percent' => 70,
                
            ]);
            echo $calculationsData; 
            wp_die();
    }

    private function getClientHistory(){
       
        $client = new http\Client;
        $request = new http\Client\Request;

        $body = new http\Message\Body;
        $body->append('{
            "Client_ID": "25450e87-f283-11e9-a2fa-0050569bbc88",
            "SortOrder": "from_new_to_old",
            "Page_Number": 0,
            "Number_Of_Result_Per_Page": 10
        }');

        $request->setRequestUrl('https://top.lombard1.com.ua/l1_TOP/hs/ocredit/clienthistory/getClientHistory');
        $request->setRequestMethod('POST');
        $request->setBody($body);

        $request->setHeaders(array(
        'Accept' => '*/*',
        'Authorization' => 'Basic aHR0cHNydnVzcjpMZGY7bHNMZGY0',
        'Content-Type' => 'application/json'
        ));

        $client->enqueue($request)->send();
        $response = $client->getResponse();

        return $response->getBody();
    }

    private function getTariff($tariff){
        $fields ='';
        if($tariff != '' && is_numeric($tariff)){
            $fields = get_post_custom($tariff);
        }
        return $fields;
    }

    private  function calculatePercent($rate, $days, $sum){
        $money_value = $sum * ($rate * $days / 100);
        return round($money_value,2);
    }

    private function _formateData($data)
    {
        $calcData = [];
        foreach ($data as $key=>$val) {
            if ($key) {
                $calcData[$key] = Data::cleanString($val);
            }
        }
        return $calcData;
    }
 
}