<?php

namespace Akni\app\Model;

use Akni\app\Model\Abstraction\Metabox;
use Akni\app\Helper\Data;

/**
 * Class LoanMetabox
 * @package Akni\app\Model
 */
class LoanMetabox extends Metabox
{

    /**
     * LoanMetabox constructor.
     */
    public function __construct()
    {
        parent::__construct();
        add_action(
            'admin_enqueue_scripts', [&$this, 'addLoanScripts']
        );
        add_action(
            'wp_ajax_createLoanTable',
            [&$this, 'createLoanTable']
        );
    }

    public function addLoanScripts()
    {
        global $core;
        wp_enqueue_script(
            'loan', $core->themeUri . '/public/js/loan-metabox.js', ['jquery']
        );
    }

    public function createLoanTable()
    {
        global $core;
        $context = $core->get_context();
        $loadId = Data::cleanString($_POST['loan_id']);

        $context['price'] = get_post_meta($loadId, 'price', true);
        $context['sample'] = get_post_meta($loadId, 'sample', true);

        $discountsArgs = [
            "posts_per_page" => -1,
            "post_type" =>  "discount",
            "post_status" => "publish",
            "orderby"   =>  "post_date",
            "order"     =>  "ASC",
        ];
        $context['discounts'] = get_posts($discountsArgs);
        if ($_POST['row']) {
            $context['row'] = $_POST['row'];
        }

        $context['call'] = $_POST['call'] ? $_POST['call']  : 0;
        $core->render('metaboxes/loan-table.twig', $context);
        wp_die();
    }

    /**
     * Method to add metabox to post post type.
     *
     * @param $postType
     * @return void
     */
    public function addMetaboxes($postType)
    {
        $postTypes = ['loan'];
        if (in_array($postType, $postTypes)) {
            add_meta_box(
                'loan_metabox',
                __('Loan Data'),
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
        global $core;
        try {
            $error = __('You have some problems with template');
            $path = $core->themePath .  '/page-templates/metaboxes/loan-metabox.php';

            if (!file_exists($path)) {
                throw new \Exception($error);
            }
            $content = require($path);
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
            if (isset($_POST['sample_count'] )) {
                update_post_meta( $postId, 'sample_count', $_POST['sample_count'] );
            }
            if (isset($_POST['sample'] )) {
                update_post_meta( $postId, 'sample', $_POST['sample'] );
            }
            if (isset($_POST['price'] )) {
                update_post_meta( $postId, 'price', $_POST['price'] );
            }
        }
        return $postId;
    }

}