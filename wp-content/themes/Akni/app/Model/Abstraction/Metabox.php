<?php

namespace Akni\app\Model\Abstraction;

/**
 * Class Metabox
 * @package Akni\app\Model\Abstraction
 */
abstract class Metabox
{
    /**
     * Metabox constructor.
     */
    public function __construct()
    {
        add_action('add_meta_boxes', [$this, 'addMetaboxes']);
        add_action('save_post', [$this, 'saveData']);
    }

    /**
     * @return mixed
     */

    /**
     * Method to add metaboxes
     *
     * @param $postType
     * @return mixed
     */
    abstract public function addMetaboxes($postType);

    /**
     * Method to save meta data
     *
     * @param $postId
     * @return mixed
     */
    abstract public function saveData($postId);

    /**
     * Method to render meta content
     *
     * @param $post
     * @return mixed
     */
    abstract public function renderMetaboxContent($post);
}