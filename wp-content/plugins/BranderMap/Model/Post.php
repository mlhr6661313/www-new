<?php

namespace BranderMap\Model;

/**
 * Class Post
 * @package BranderMap\Model
 */
class Post
{
    /**
     * result of all functions
     * @var $result
     */
    protected $_result;

    /**
     * params to get posts
     * @var $args
     */
    protected $_args;

    /**
     * This method need to use default functions as methods,
     *
     * @param $name
     * @param $arguments
     * @return mixed
     */
    public function __call($name, $arguments)
    {
        if (function_exists($name)) {
            return call_user_func_array($name, $arguments);
        }
        return false;
    }

    /**
     * Method to set args
     *
     * @param array $args
     * @return void
     */
    public function setArgs($args=[])
    {
        $this->_args = $args;
    }

    /**
     * Method to update existing args
     *
     * @param string $name
     * @param $args
     * @return void
     */
    public function setSpecialArgs($name='', $args)
    {
        $this->_args[$name] = $args;
    }

    /**
     * Method to reset all args
     *
     * @return void
     */
    public function resetArgs()
    {
        $this->_args = [];

    }

    /**
     * Method to set posts getting by args to result
     *
     * @return void
     */
    public function setPosts()
    {
        #get_posts is default wp function
        $this->_result = $this->get_posts($this->_args);
    }

    /**
     * Set single post getting buy id to result
     *
     * @param $id
     */
    public function setPostById($id)
    {
        $this->_result = [$this->get_post($id)];
    }

    /**
     * Method to formated posts acf if exists.
     *
     * @return void
     */
    public function formattedACF()
    {
        if (function_exists('get_fields')){
            foreach ($this->_result as &$item) {
                $item->acf = get_field_objects($item->ID);
            }
        }
    }

    /**
     * Method to cut results by limit
     *
     * @param int $lim
     * @return void
     */
    public function cutResultByLimit($lim = 50)
    {
        $this->_result = array_slice($this->_result, 0, $lim);
    }

    /**
     * Method to set post's thumbnails
     *
     * @param string $size
     * @return void
     */
    public function setMainThumbnailUrls($size='full')
    {
        foreach ($this->_result as &$item) {
            $item->main_thumnail_url = $this->get_the_post_thumbnail_url($item->ID,$size)
                ? $this->get_the_post_thumbnail_url($item->ID,$size) : '' ;
        }
    }

    /**
     * Method to set posts to result from outside
     *
     * @param $result
     * @return void
     */
    public function setResult($result)
    {
        $this->_result = $result;
    }

    /**
     * Method to get remove posts by Ids
     * @param array $ids
     * @return void
     */
    public function removePostsByIds(array $ids)
    {
        foreach ($this->_result as $k=>$item) {
            if (in_array($item->_ID,$ids)) {
                unset($this->_result[$k]);
            }
        }
    }

    /**
     * Method to set meta to posts
     *
     * @param string $key
     * @param bool $single
     */
    public function setPostsMeta($key = '', $single = false)
    {
        if ($key !='') {
            foreach ($this->_result as &$item) {
                $item->post_meta = [];
                $item->post_meta[$key] = $this->get_post_meta($item->ID, $key, $single);
            }
        } else {
            foreach ($this->_result as &$item) {
                $item->post_meta = (array)get_post_meta($item->ID);

            }
        }

    }

    /**
     * Method to set taxonomy ids
     *
     * @param $tax
     */
    public function setPostTaxIds($tax)
    {
        foreach ($this->_result as &$item) {
            $termIds = [];
            $terms = wp_get_post_terms($item->ID, $tax);
            if (!empty($terms))
            {
                foreach($terms as $term) {
                    $termIds[] = $term->term_id;
                }
            }
            $item->{$tax} = $termIds;
        }
    }

    /**
     * Method to set taxonomy names
     *
     * @param $tax
     */
    public function setPostTaxNames($tax)
    {
        $key = $tax . 'Names';
        foreach ($this->_result as &$item) {
            $termIds = [];
            $terms = wp_get_post_terms($item->ID, $tax);
            if (!empty($terms))
            {
                foreach($terms as $term) {
                    $termIds[] = $term->name;
                }
            }
            $item->{$key} = $termIds;
        }
    }

    /**
     * Method to get result
     *
     * @return array
     */
    public function getResult()
    {
        return $this->_result;
    }
}