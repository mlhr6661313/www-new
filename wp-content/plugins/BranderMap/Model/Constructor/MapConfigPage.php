<?php


namespace BranderMap\Model\Constructor;


use BranderMap\Model\Abstractions\AdminPages;
use BranderMap\Model\Config;

/**
 * Class MapConfigPage
 * @package BranderMap\Model\Constructor
 */
class MapConfigPage extends AdminPages
{
    /**
     * Plugin configs
     *
     * @var Config $_config
     */
    private $_config;

    /**
     * MapConfigPage constructor.
     * @param Config $config
     */
    public function __construct($config)
    {
        parent::__construct();
        $this->_config = $config;
    }

    public function addAdminPage()
    {
        add_menu_page(
            __('Brander Map', $this->_config->getPluginName()),
            __('Brander Map', $this->_config->getPluginName()),
            'edit_posts',
            'brander_map',
            [&$this, 'displaySettingsPage']
        );
    }

    public function registerSettings()
    {
        register_setting(
            'brander-map-settings', 'brander-map-settings'
        );
    }

    /**
     * TODO: Create method || Class method to remove code duplication
     *
     * Method to display settings page
     *
     * @return bool
     */
    public function displaySettingsPage()
    {
        try {
            $error = __('You have some problems with template');
            $path = $this->_config->getTemplatesPath(). '/brander_map-config.php';

            if (!file_exists($path)) {
                throw new \Exception($error);
            }
            $content = require_once ($path);
            if ($content !='') {
                echo $content;
                return true;
            }
            throw new \Exception($error);
        } catch (\Exception $e) {
            echo $e->getMessage();
        }
        return false;
    }
}