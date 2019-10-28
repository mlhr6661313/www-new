<?php

namespace Akni\app\Model\Subscribe;

use Akni\app\Model\VersionControl\Version;
use Akni\app\Model\Subscribe\UpdateScripts\Update;

class Subscribe
{
    /**
     * Callback object.
     * @var $_instance
     */
    private static $_instance;

    /**
     * Db object.
     * @var Db
     */
    private $_db;

    /**
     * Plugin table name.
     * @var $_table_name
     */
    private $_table_name;

    /**
     * Fields to create table.
     * @var $_fields
     */
    private $_fields;

    /**
     * This are fields names for select/insert.
     * @var $_allFields
     */
    private $_allFields;

    private $_version = 1;

    private $_module_name = 'subscribe_module';

    /**
     * Callback constructor.
     */
    private function __construct()
    {
        $this->setDefault();
        $this->versionControl();
        $this->_db = new Db($this->_table_name, $this->_fields);
        add_action('admin_menu', [ &$this, 'addAdminPages' ]);
    }

    private function versionControl()
    {
        $versionModel = Version::getInstance();
        if($versionModel->isVersionUp($this->_module_name, $this->_version)) {

            $updateModel = new Update();
            $updateModel->updateOrderForms($versionModel->getVersion($this->_module_name));

            $versionModel->setVersion($this->_module_name, $this->_version);
        }
    }

    public function addAdminPages()
    {
        add_menu_page(
            'Подписка на новости',
            'Подписка на новости',
            'edit_posts',
            'subscribe',
            [&$this, 'displayPages']
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

    /**
     * this method set default params.
     */
    private final function setDefault()
    {
        $this->_table_name = 'subscribes';
        $this->_fields = [
            "id int NOT NULL AUTO_INCREMENT",
            "email text",
            "date  datetime NOT NULL",
            "UNIQUE KEY id (id)"
        ];
        $this->_allFields = [
            'id',
            'email',
            'date'
        ];
    }

    /**
     * This method need to create single object.
     * @return Subscribe object
     */
    public static function getInstance()
    {
        if (empty(self::$_instance)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function getSubscribes()
    {
        return $this->_db->selectFromTable('*','','');
    }

    /**
     * This method clear data before adding.
     * @param array $data
     * @return array
     */
    private function clearData(array $data)
    {
        if (!empty($data)) {
            foreach ($data as &$item) {
                $item = trim(strip_tags($item));
            }
        }
        return $data;
    }

    /**
     * remove fields, that are not in array.
     * @param array $data
     * @return array
     */
    private function prepareToInsert(array $data)
    {
        $return = [];
        if (!empty($data)) {
            foreach ($data as $key => $item) {

                if (!in_array(str_replace('-', '_', $key), $this->_allFields)) {
                    unset($data[$key]);
                } else {
                    $return[str_replace('-', '_', $key)] = $item;
                }
            }
        }
        return $return;
    }

    /**
     *  This method work with new.
     * @param array $data
     * @return bool
     */
    public function addNewSubscribe(array $data)
    {
        $data = $this->prepareToInsert($this->clearData($data));

        if (!empty($data)) {
            if ($this->_db->insertIntoTable($data)) {
                return true;
            }
        }
        return false;
    }

    /**
     * This method delete callback with id $id.
     * @param $id
     * @return bool
     */
    public function deleteSubscribe( $id )
    {
        return $this->_db->deleteTableData($id);
    }
}