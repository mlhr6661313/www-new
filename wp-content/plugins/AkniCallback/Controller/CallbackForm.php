<?php

namespace AkniCallback\Controller;

/**
 * Class CallbackForm
 * @package AkniCallback\Controller
 */
class CallbackForm
{

    /**
     * Self specimen.
     * @var $_instance
     */
    private static $_instance;

    /**
     * Page View Object for rendering.
     * @var PageView
     */
    private $_pageView;

    /**
     * Variable path to twig template directory.
     * @var $_pluginDir
     */
    private $_pluginDir;

    /**
     * Default form params.
     * @var $_default
     */
    private $_default;

    /**
     * This is variable for count $_getForm method.
     * @var $_getFormCounter.
     */
    private static $_getFormCounter;

    /**
     * CallbackForm constructor.
     * @param $pluginDir
     */
    private function __construct( $pluginDir )
    {
        $this->setDefault();
        $this->_pluginDir = $pluginDir;
        $this->_pageView = PageView::getInstance($this->_pluginDir);

        add_shortcode(
            'callback', [$this, 'getForm']
        );
        add_shortcode(
            'special_callback', [$this, 'getSpecialForm']
        );
    }

    /**
     * usort orderSort method for sortFields function.
     * @param $a
     * @param $b
     * @return bool
     */
    private static function orderSort( $a, $b )
    {
        return $a['order'] > $b['order'];
    }

    /**
     * Method for sorting form fields by by order.
     * @param array $arr
     * @return array
     */
    private function sortFields(array $arr)
    {
        uasort($arr, [$this, 'orderSort']);

        return $arr;
    }

    /**
     * this method set default params.
     */
    private final function  setDefault(){
        $this->_default = [
            'content'=>[
                'type' => 'callback',
                'formTitle' => __('Callback'),
                'formDescription' => __('Leave your callback, and we are call you'),
                'thankYouText' => __('Thank you for calling'),
                'thankYouTextTitle' =>'',
                'submitText' => __('Submit'),
                'url' => site_url() .'/wp-admin/admin-ajax.php',
                'order' => 0,
            ],

            'name' =>  [
                'show' => 1,
                'order' => 1,
                'type' => 'text',
                'description' => '',
                'placeholder' =>__('Name'),
                'class' => 'form-field name',
                'error' => __('Sorry it`s invalid name')
            ],
            'phone' => [
                'show' => 1,
                'order' => 2,
                'type' => 'tel',
                'description' => '',
                'placeholder' => __('Phone'),
                'class' => 'form-field tel',
                'error' => __('Sorry its invalid phone'),
            ],
            'email' => [
                'show'  => 0,
                'order' => 3,
                'type' => 'text',
                'description' => '',
                'placeholder' => __('Email'),
                'class' => 'form-field email',
                'error' => __('Sorry its invalid email')
            ],
            'comment' => [
                'show' => 0,
                'order' => 4,
                'type' => 'area',
                'description' => '',
                'placeholder' => __('Comment'),
                'class' => 'form-field',
                'error' => __('Sorry its invalid comment')
            ],
            'company' => [
                'show' => 0,
                'order' => 5,
                'type' => 'text',
                'description' => '',
                'placeholder' => __('Company'),
                'class' => 'form-field',
                'error' => __('Sorry its invalid company')
            ],
            'city' => [
                'show' => 0,
                'order' => 6,
                'type' => 'text',
                'description' => '',
                'placeholder' => __('City'),
                'class' => 'form-field city',
                'error' => __('Sorry its invalid city')
            ],
            'date_from' => [
                'show' => 0,
                'order' => 7,
                'type' => 'text',
                'description' => '',
                'placeholder' => __('Date from'),
                'class' => 'form-field date_from',
                'error' => __('Sorry its invalid date')
            ],
            'date_to' => [
                'show' => 0,
                'order' => 8,
                'type' => 'text',
                'description' => '',
                'placeholder' => __('Date to'),
                'class' => 'form-field date_to',
                'error' => __('Sorry its invalid date')
            ],
            'sum' => [
                'show' => 0,
                'order' => 9,
                'type' => 'text',
                'description' => '',
                'placeholder' => __('Sum'),
                'class' => 'form-field sum',
                'error' => __('Sorry its invalid sum')
            ],
            'delivery' => [
                'show' => 0,
                'order' => 10,
                'type' => 'text',
                'placeholder' => __('Delivery'),
                'description' => __('Delivery'),
                'class' => 'form-field Delivery',
                'error' => __('Sorry its invalid Delivery')
            ],
            'days' => [
                'show' => 0,
                'order' => 11,
                'placeholder' => __('Days'),
                'description' => __('Days'),
                'class' => 'form-field Days',
                'error' => __('Sorry its invalid Day')
            ],
            'info' => [
                'show' => 0,
                'order' => 12,
                'placeholder' => __('Info'),
                'description' => __('Info'),
                'class' => 'form-field info',
                'type' => 'hidden',
                'error' => __('Sorry its invalid Info')
            ],
        ];
    }

    /**
     * protect singleton  clone
     */
    private function __clone()
    {

    }

    /**
     * protect singleton __wakeup
     */
    private function __wakeup()
    {

    }

    /**
     * This function add custom params for form and return it.
     * @param array $params
     * @return array
     */
    private function formateData(array $params) {
        $data = $this->_default;
        if (!empty($params)) {
            foreach ($params as $paramName => $paramValue) {
                if (array_key_exists($paramName, $data)) {
                    if (is_array($paramValue) && is_array($data[$paramName])) {
                        foreach ($paramValue as $k=>$v) {
                            if (array_key_exists($k, $data[$paramName])) {
                                $data[$paramName][$k] = $v;
                            }
                        }
                    } elseif(!is_array($paramValue) && !is_array($data[$paramName])) {
                        $data[$paramName] = $paramValue;
                    }
                }
            }
        }
        return $data;
    }

    /**
     * get self object
     * @return CallbackForm object
     */
    public static function getInstance( $pluginDir ) {
        if (empty(self::$_instance)) {
            self::$_instance = new self( $pluginDir );
        }
        return self::$_instance;
    }


    /**
     * @param string $params
     * @return string
     */
    public function getForm($params = '')
    {
        $data = [];

        if (!empty($this->_default)) {
            if ($params['params']){
                $params = unserialize($params['params']);
                if (is_array($params) && !empty($params)) {
                    $data['form'] = $this->formateData($params);
                } else {
                     $data['form'] = $this->_default;
                }
            }
        }
        
        self::$_getFormCounter++;
        
        #set form id after adding all special params.
        $data['form']['content']['formID'] = self::$_getFormCounter;
        $data['form'] = $this->sortFields($data['form']);
        return $this->_pageView->render('callback_form.twig', $data);
       
    }

    /**
     * @param string $params
     * @return string
     */
    public function getSpecialForm($params = '')
    {
        $data = [];

        if (!empty($this->_default)) {
            if ($params['params']){
                $params = unserialize($params['params']);
                if (is_array($params) && !empty($params)) {
                    $data['form'] = $this->formateData($params);
                } else {
                     $data['form'] = $this->_default;
                }
            }
        }

        self::$_getFormCounter++;

        #set form id after adding all special params.
        $data['form']['content']['formID'] = self::$_getFormCounter;
        $data['form'] = $this->sortFields($data['form']);
        return $this->_pageView->render('special/order.twig', $data);

    }
}