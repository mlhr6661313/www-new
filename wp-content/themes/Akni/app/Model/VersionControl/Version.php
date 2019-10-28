<?php

namespace Akni\app\Model\VersionControl;

/**
 * This use for work with callback db.
 * Class Callback
 */
class Version
{
    private static $_instance;

    private $_optionName = 'akni-version-control';

    /**
     * Callback constructor.
     */
    private function __construct()
    {
        add_action('admin_init', [ &$this, 'registerSettings' ]);
    }

    public function registerSettings() {
        register_setting(
            $this->_optionName,$this->_optionName
        );
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

    /**
     * This method need to create single object.
     * @return Version object
     */
    public static function getInstance()
    {
        if (empty(self::$_instance)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function getVersion($module)
    {
        $options = unserialize(get_option($this->_optionName));
        return $options[$module];
    }

    public function setVersion($module, $version)
    {
        $options = unserialize(get_option($this->_optionName));
        $options[$module] = $version;

        update_option($this->_optionName, serialize($options));
    }

    public function isVersionUp($module, $version)
    {
        $options = unserialize(get_option($this->_optionName));
        return $options[$module] < $version;
    }
}
