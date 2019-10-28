<?php

namespace Akni\app\Model;

use Akni\app\Helper\Data;
use Akni\app\Model\CalculatorForms\OrderForms;
use Akni\app\Model\CalculatorForms\TechForms;
use Akni\app\Model\Subscribe\Subscribe;

/**
 * Class MainAjax
 * @package Akni\app\Model
 */
class MainAjax
{

    private $_core;
    private $orderFormsModel;
    private $techFormsModel;
    private $mailer;
    private $_options;
    /**
     * MainAjax constructor.
     * @param $core
     */
    public function __construct($core)
    {
        $this->_core = $core;

        $this->orderFormsModel = OrderForms::getInstance();
        $this->techFormsModel = TechForms::getInstance();
        $this->mailer = Mailer::getInstance();
        $this->_options = (array) get_option('akni-callback-settings');

        add_action(
            'wp_ajax_moreArticles',
            [&$this, 'moreArticles']
        );
        add_action(
            'wp_ajax_nopriv_moreArticles',
            [&$this, 'moreArticles']
        );
        add_action(
            'wp_ajax_filterArticles',
            [&$this, 'filterArticles']
        );
        add_action(
            'wp_ajax_nopriv_filterArticles',
            [&$this, 'filterArticles']
        );
        add_action(
            'wp_ajax_sendOrderForm',
            [&$this, 'sendOrderForm']
        );
        add_action(
            'wp_ajax_nopriv_sendOrderForm',
            [&$this, 'sendOrderForm']
        );
        add_action(
            'wp_ajax_sendTechForm',
            [&$this, 'sendTechForm']
        );
        add_action(
            'wp_ajax_nopriv_sendTechForm',
            [&$this, 'sendTechForm']
        );
        add_action(
            'wp_ajax_show',
            [&$this, 'show']
        );
    }
    public function show(){
        $return = "fuck massage";
        $data = $this->_formateData($_POST['data']);
        echo "<script> alert(" . $return . ")</script>";
        echo json_encode($return);
        wp_die();    
    }
    public function sendTechForm()
    {
        $data = $_POST;
        $return = [];
        $file = $this->fileSaver($_FILES['photo']);
        if ($file && !isset($file['error'])) {
            $data['photo'] = $file['url'];
        }
        $tmp = '';
        if(count($data['complectation']) > 0) {
            foreach ($data['complectation'] as $key=>$value) {
                if($value == 'true') {
                    $tmp .= $key. ' ';
                }
            }
        }
        $data['complectation'] = $tmp;

        if($data['subscribe'] == true && $data['your-email'] != '') {
            $subscribeModel = Subscribe::getInstance();
            $subscribeModel->addNewSubscribe(['email'=>$data['your-email']]);
            $this->mailer->sendMail(['email'=>$data['your-email']], $this->_options['subscribe'], 'email/subscribe.twig');
        }

        if ($this->techFormsModel->addNewOrder($data)) {
            $this->mailer->sendMail($data, $this->_options['tech'], 'email/order_mail.twig');
            $return['success'] = true;
            echo json_encode($return);
            wp_die();
        } else {
            $return['success'] = false;
            $return['message'] = $file['error'];
            echo json_encode($return);
            wp_die();
        }
    }

    private function fileSaver($file){

        if (!function_exists('wp_handle_upload')) {
            require_once(ABSPATH . 'wp-admin/includes/file.php');
        }

        $uploadedFile = $file;
        $uploadOverrides = array('test_form' => false);
        $moveFile = wp_handle_upload($uploadedFile, $uploadOverrides);

        return $moveFile;
    }

    public function sendOrderForm()
    {
        $callbackData = [];
        $return = [];
        if($_POST['data']) {
            parse_str($_POST['data'], $callbackData);
        }

        if(isset($callbackData['subscribe']) && $callbackData['subscribe'] == 'on' && $callbackData['your-email'] != '') {
            $subscribeModel = Subscribe::getInstance();
            $subscribeModel->addNewSubscribe(['email'=>$callbackData['your-email']]);
            $this->mailer->sendMail(['email'=>$callbackData['your-email']], $this->_options['subscribe'], 'email/subscribe.twig');
        }

        if (!empty($callbackData)) {
            if($this->orderFormsModel->addNewOrder($callbackData)) {
                $this->mailer->sendMail($callbackData, $this->_options['recipient'], 'email/order_mail.twig');
                $return['success'] = true;
                echo json_encode($return);
                wp_die();
            }
        }
        $return['success'] = false;
        echo json_encode($return);
        wp_die();

    }

    public function moreArticles()
    {
        $data = $_POST['data'];
        $page = (isset($data['page'])) ? $data['page'] : 1;
        $category = '';
        if (isset($data['category']) && $data['category'] !='all') {
            $category = $data['category'];
        }
        $this->articleEventer($category, $page);
    }

    public function filterArticles()
    {
        $category = '';
        $data = $_POST['data'];
        if (isset($data['category']) && $data['category'] !='all') {
            $category = $data['category'];
        }
        $this->articleEventer($category);
    }

    private function articleEventer($category='', $page = 1)
    {
        global $core;
        $success = [];
        $blogModel  = new Blog();
        $config = $core->getConfig();
        $showConfig = $config->getConfig('show', 'show');
        $args = $showConfig['posts'];
        if ($category != '') {
            $args ['tax_query'] = [
                [
                    'taxonomy' => 'class',
                    'field' => 'slug',
                    'terms' => $category
                ]
            ];
        }
        $args['paged'] = $page;
        $next = Data::isNext($args, $page);
        $success['next'] = $next;
        $success['articles'] = '';
        $moreTextData = get_field(
            'genitive',
            'class_' . get_term_by('slug', $category, 'class')->term_id
        );
        if ($moreTextData) {
            $success['more_text_data'] = $moreTextData;
        } else {
            $success['more_text_data'] = '';
        }

        $blogModel->setArgs($args);
        $blogModel->setPosts();
        $blogModel->setMainThumbnailUrls();
        $blogModel->setPostUrls();
        $blogModel->formattedACF();
        $blogModel->setBlogFormateDate();
        $blogModel->setBlogActions();
        $newsPosts = $blogModel->getResult();

        if (!empty($newsPosts)) {
            $news = $this->renderArticles($newsPosts);
            $success['articles'] = $news;
        }
        echo  json_encode($success);
        exit;
    }

    /**
     * Method to render news.
     *
     * @param $news
     * @return bool|string
     */
    private function renderArticles($news)
    {
        global $core;
        $context = $core->get_context();
        $context['articles'] = $news;
        return $core->renderWithoutOutput('articles_block.twig', $context);
    }

}