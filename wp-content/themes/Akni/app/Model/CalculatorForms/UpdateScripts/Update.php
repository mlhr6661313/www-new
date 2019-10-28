<?php

namespace Akni\app\Model\CalculatorForms\UpdateScripts;

class Update
{
    public function __construct()
    {

    }

    public function updateOrderForms($currendDbVersion)
    {
        global $wpdb;

        if($currendDbVersion < 1) {
            $sql = "ALTER TABLE akni_calculator_order_forms ADD order_stones VARCHAR(5);";

            require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
            $wpdb->query($sql);
        }
    }
}


