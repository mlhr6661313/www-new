<?php

namespace Akni\app\Model;

use Akni\app\Model\Abstraction\Metabox;
use Akni\app\Helper\Data;

/**
 * Class TarifMetaboxMetabox
 * @package Akni\app\Model
 */
class TariffMetabox extends Metabox
{

    /**
     * TariffMetabox constructor.
     */
    public function __construct()
    {
        parent::__construct();
        add_action(
            'admin_enqueue_scripts', [&$this, 'addTariffScripts']
        );
        add_action(
            'wp_ajax_createTariffTable',
            [&$this, 'createTariffTable']
        );
    }

    public function addTariffScripts()
    {
        global $core;
        wp_enqueue_script(
            'tariff', $core->themeUri . '/public/js/tariff-metabox.js', ['jquery']
        );
    }

    public function createTariffTable()
    {
        global $core;
        $context = $core->get_context();
        $tariffId = Data::cleanString($_POST['tariff_id']);

        $context['from'] = get_post_meta($tariffId, 'from', true);
        $context['to'] = get_post_meta($tariffId, 'to', true);
        $context['coating'] = get_post_meta($tariffId, 'coating', true);
        $context['rate'] = get_post_meta($tariffId, 'rate', true);

        $context['call'] = $_POST['call'] ? $_POST['call']  : 0;
        $core->render('metaboxes/tariff-table.twig', $context);
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
        $postTypes = ['tariff'];
        if (in_array($postType, $postTypes)) {
            add_meta_box(
                'tariff_metabox',
                __('Tariff Data'),
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
            $path = $core->themePath .  '/page-templates/metaboxes/tariff-metabox.php';

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
            if (isset($_POST['time_periods_count'] )) {
                update_post_meta( $postId, 'time_periods_count', $_POST['time_periods_count'] );
            }
            if (isset($_POST['from'] )) {
                update_post_meta( $postId, 'from', $_POST['from'] );
            }
            if (isset($_POST['to'] )) {
                update_post_meta( $postId, 'to', $_POST['to'] );
            }
            if (isset($_POST['coating'] )) {
                update_post_meta( $postId, 'coating', $_POST['coating'] );
            }
            if (isset($_POST['rate'] )) {
                update_post_meta( $postId, 'rate', $_POST['rate'] );
            }

        }
        return $postId;
    }

}