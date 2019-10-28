<?php

namespace BranderMap\Model\Constructor;

use BranderMap\Model\Abstractions\Metabox;
use BranderMap\Helper\Data;
use BranderMap\Model\Config;

/**
 * Class DeparmentMetabox
 * @package BranderMap\Model\Constructor
 */
class DeparmentMetabox extends Metabox
{
    /**
     * @var Config
     */
    private $_config;

    /**
     * DeparmentMetabox constructor.
     * @param Config $config
     */
    public function __construct($config)
    {
        parent::__construct();
        $this->_config = $config;
    }

    /**
     * Method to add metabox to post post type.
     *
     * @param $postType
     * @return void
     */
    public function addMetaboxes($postType)
    {
        $postTypes = ['department'];
        if (in_array($postType, $postTypes)) {
            add_meta_box(
                'department_metabox',
                __('Advanced'),
                [$this, 'renderMetaboxContent']
                ,$postType
                ,'advanced'
                ,'high'
            );
        }
    }

    /**
     * Method to get rendered metabox
     *
     * @param $post
     * @return bool
     */
    public function renderMetaboxContent($post)
    {
        try {
            $error = __('You have some problems with template');
            $path = $this->_config->getTemplatesPath(). '/department-metabox.php';

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


    /**
     * Method to save department metabox Data
     *
     * @param $postId
     * @return bool
     */
    public function saveData($postId)
    {
        if ($_POST) {
            if ($this->checkCorrectData($postId, $_POST)) {
                $departmentGroup = [];
                if ($_POST['lat']) {
                    $departmentGroup['lat'] = $_POST['lat'];
                }
                if ($_POST['lng']) {
                    $departmentGroup['lng'] = $_POST['lng'];
                }
                if ($_POST['address']) {
                    $departmentGroup['address'] = $_POST['address'];
                }
                if ($_POST['notes']) {
                    $departmentGroup['notes'] = $_POST['notes'];
                }
                if ($_POST['phone']) {
                    $departmentGroup['phone'] = $_POST['phone'];
                }
                if ($_POST['days_group']) {
                    if (!empty($_POST['days_group']['days'])) {
                        $departmentGroup['days'] = $_POST['days_group']['days'];
                    }
                    if (!empty($_POST['days_group']['work_from'])) {
                        $departmentGroup['work_from'] = $_POST['days_group']['work_from'];
                    }
                    if (!empty($_POST['days_group']['work_to'])) {
                        $departmentGroup['work_to'] = $_POST['days_group']['work_to'];
                    }
                }
                if (!empty($departmentGroup)) {
                    $departmentGroup = Data::clearArray($departmentGroup);
                    if ($_POST['address']) {
                        $departmentGroup['address'] = $_POST['address'];
                    }
                    update_post_meta( $postId, 'department_group', $departmentGroup);
                }

            }
        }
        return $postId;
    }

    /**
     * Method to check correct current save
     *
     * @param $postId
     * @param $postData
     * @return bool
     */
    private function checkCorrectData($postId, $postData)
    {
        if (!isset($postData['department_check_value'])) {
            return false;
        }

        $nonce = $postData['department_check_value'];
        if (!wp_verify_nonce($nonce, 'department_check')) {
            return false;
        }

        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
            return false;
        }

        if (!current_user_can('edit_post', $postId)) {
            return false;
        }
        return true;
    }
}