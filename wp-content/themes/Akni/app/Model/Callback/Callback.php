<?php

namespace Akni\app\Model\Callback;

class Callback
{
    /**
     * Callback object.
     * @var $_instance
     */
    private static $_instance;

    /**
     * This method need to create single object.
     * @return Callback object
     */
    public static function getInstance()
    {
        if (empty(self::$_instance)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    private function __construct()
    {
        add_action('admin_init', [ &$this, 'registerSettings' ]);
        add_action('admin_menu', [ &$this, 'addAdminPages' ]);
    }

    public function addAdminPages()
    {
        add_menu_page(
            __('Email Settings'),
            __('Email Settings'),
            'edit_posts',
            'email-settings',
            [&$this, 'displayPages']
        );
    }

    public function registerSettings() {
        register_setting(
            'akni-callback-settings', 'akni-callback-settings'
        );
    }

    public function displayPages()
    {
        if ($_REQUEST['page']) {
            $path =  __DIR__.'/Pages/' . $_REQUEST['page'] . '.php';
            if (file_exists($path)) {
                require_once $path;
                return true;
            }
        }
        return false;
    }

    /**
     * clone method.
     */
    private function __clone()
    {

    }

    /**
     * wakeup method.
     */
    private function __wakeup()
    {

    }
}