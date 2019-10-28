<?php

namespace Akni\app\Model\CalculatorForms;

/**
 * This use for work with callback db.
 * Class Callback
 * @package AkniCallback\Model
 */
class TechForms
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

    /**
     * Callback constructor.
     */
    private function __construct()
    {
        $this->setDefault();
        $this->_db = new Db($this->_table_name, $this->_fields);
        add_action('admin_menu', [ &$this, 'addAdminPages' ]);
        add_action('admin_init', [ &$this, 'registerSettings' ]);
    }

    public function addAdminPages()
    {
        add_menu_page(
            'Заказы техника',
            'Заказы техника',
            'edit_posts',
            'techorders',
            [&$this, 'displayPages']
        );
    }

    public function registerSettings() {
        register_setting(
            'akni-tech-settings', 'akni-tech-settings'
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
        $this->_table_name = 'calculator_tech_forms';
        $this->_fields = [
            "id int NOT NULL AUTO_INCREMENT",
            "stars text",
            "photo text",
            "pack text",
            "summ text",
            "complectation text",
            "prod_year text",
            "model text",
            "manufacturer text",
            "pledge text",
            "your_name text",
            "your_tel text",
            "your_email text",
            "status int default 0",
            "date  datetime NOT NULL",
            "UNIQUE KEY id (id)"
        ];
        $this->_allFields = [
            "id",
            "stars",
            "photo",
            "pack",
            "summ",
            "complectation",
            "prod_year",
            "model",
            "manufacturer",
            "pledge",
            "your_name",
            "your_tel",
            "your_email",
            "status",
            "date",
        ];
    }

    /**
     * This method need to create single object.
     * @return TechForms object
     */
    public static function getInstance()
    {
        if (empty(self::$_instance)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function getOrders()
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
    public function addNewOrder(array $data)
    {
        $data = $this->prepareToInsert($this->clearData($data));

        if (!empty($data)) {
            if ($this->_db->insertIntoTable($data)) {
                return true;
            }
        }
        return false;
    }

    public function unsetArrayValue($val, array $arr)
    {
        $arr = array_flip($arr);
        unset ($arr[$val]);
        $arr = array_flip($arr);

        return $arr;
    }

    /**
     * This method delete callback with id $id.
     * @param $id
     * @return bool
     */
    public function deleteOrder( $id )
    {
        return $this->_db->deleteTableData($id);
    }

    public function updateStatus($id, $status)
    {
        return $this->_db->updateTableData( $id,'status', $status);
    }
}