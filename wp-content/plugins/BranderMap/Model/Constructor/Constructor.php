<?php

namespace BranderMap\Model\Constructor;

use BranderMap\Model\PageTemplates;
use BranderMap\Model\Config;
use BranderMap\Model\View;

/**
 * Init all main functionality
 *
 * Class Constructor
 * @package BranderMap\Model\Constructor
 */
class Constructor
{
    /**
     * Self Constructor object.
     * @var $_instance
     */
    private static $_instance;

    /**
     * @var Config
     */
    private $_config;

    /**
     * protect singleton  clone
     */
    private function __clone()
    {

    }

    /**
     * Factory for creating maps
     *
     * @var $mapCreator
     */
    private $_mapCreator;

    /**
     * @var View
     */
    private $_view;

    /**
     * Method to use native functions as methods
     *
     * @param $name
     * @param $arguments
     * @return bool|mixed
     */
    public function __call($name, $arguments)
    {
        if (function_exists($name)) {
            return call_user_func_array($name, $arguments);
        }
        return false;
    }

    /**
     * protect singleton __wakeup
     */
    private function __wakeup()
    {

    }

    /**
     * Method to setup WP actions.
     */
    private function _setUpActions()
    {
        add_action('init', [ &$this, 'addLocale' ]);
        add_action('init', [ &$this, 'registerPostType']);
        add_action('init', [ &$this, 'registerTaxType' ]);
        add_action('init', [ &$this, 'addScripts']);
        add_action('wp_footer', [ &$this, 'addStyles']);
        add_shortcode("brander_map_config", [ &$this, 'addExtraConfig']);
        add_action('admin_notices', [ &$this, 'dependencyTest' ]);
    }

    /**
     * Constructor constructor method.
     *
     */
    private function __construct()
    {
        $this->_config = new Config();
        $this->_departmentMetabox = new DeparmentMetabox($this->_config);
        $this->_view = new View();
        $this->_mapConfigPage = new MapConfigPage($this->_config);
        $this->_mapCreator = new MapFactory();
        $this->_setUpActions();
    }

    /**
     * Method to translate labels$this->_pluginName
     *
     * @param array $labels
     * @return array
     */
    private function translateLabels(array $labels)
    {
        if (!empty($labels)) {
            foreach ($labels as &$label) {
                $label = __($label, $this->_config->getPluginName());
            }
        }
        return $labels;
    }

    /**
     * Register custom post types
     */
    public function registerPostType()
    {
        $posts = $this->_config->getConfig('posts');
        foreach ($posts as $key => $item) {
            $item['args']['labels'] = $this->translateLabels($item['labels']);
            $this->register_post_type($key, $item['args']);
        }
    }

    /**
     * Register custom taxonomies
     */
    public function registerTaxType()
    {
        $tax = $this->_config->getConfig('tax');
        foreach ($tax as $key => $item) {
            $item['args']['labels'] = $this->translateLabels($item['labels']);
            register_taxonomy($key, $item['post_type'], $item['args']);
        }

    }

    /**
     * Method to register plugin styles
     */
    public function addStyles()
    {
        wp_enqueue_style( $this->_config->getPluginName(), $this->_config->getStylesPath() . '/app.css');
    }

    /**
     * Method to register plugin scripts
     */
    public function addScripts()
    {
       wp_enqueue_script( $this->_config->getPluginName(), $this->_config->getScriptsPath() . '/app.js', '', '1.0.0', true );
    }

    /**
     * Method to add extra config string for js
     *
     * @return string
     */
    public function addExtraConfig()
    {
        $key = '';
        $lang = $this->_config->getDefaultLang();

        $options = (array)get_option('brander-map-settings');

        if (!empty($options) && $options['map_key'] != '') {
            $key = $options['map_key'];
        }

        #only for qtranslate plugin
        if (function_exists('qtrans_getLanguage')) {
            $lang = (string) qtrans_getLanguage();
        }

        $context = [
            'extra_data' => [
                'lang' => $lang,
                'map_key'  => $key,
            ]
        ];
        return $this->_view->render('modules/_extraConfig.twig', $context);

    }

    /**
     * Method to register localization
     */
    public function addLocale()
    {
        load_plugin_textdomain($this->_config->getPluginName(), false, $this->_config->getLangPath());
    }

    /**
     * Method to test dependencies
     *
     * @return void
     */
    public function dependencyTest()
    {
        try {
            if(!function_exists('qtrans_getLanguage')) {
                throw new \Exception(__('Install qtranslate plugin for correct work Brander Map plugin!'));
            }
        } catch (\Exception $e) {
            echo "<div class='notice notice-error'><p>".$e->getMessage()."</p></div>";
        }

    }

    /**
     * Method to get MapFactory object
     *
     * @return MapFactory
     */
    public function getMapCreator()
    {
        return $this->_mapCreator;
    }

    /**
     * Get self object
     *
     * @return Constructor object
     */
    public static function getInstance()
    {
        if (empty(self::$_instance)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }
}