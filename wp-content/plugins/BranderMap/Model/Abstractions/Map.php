<?php

namespace BranderMap\Model\Abstractions;

use BranderMap\Model\Interfaces\Map as MapInterface;
use BranderMap\Model\Config;
use BranderMap\Model\Post;

/**
 * Class Map
 * @package BranderMap\Model\Abstractions
 */
abstract class Map implements MapInterface
{
    /**
     * This is a current map number.
     *
     * warning: don't work with clone
     *
     * @var $_serial
     */
    protected $_serial;

    /**
     * plugin configuration
     *
     * @var Config
     */
    protected $_config;

    /**
     * Post object, for working with posts
     *
     * @var Post
     */
    protected $_postModel;

    /**
     * Rendered map view
     *
     * @var string
     */
    protected $_map = '';

    /**
     * Map params
     *
     * @var array
     */
    protected $_params = [];

    /**
     * Method to set map data
     * @return mixed
     */
    abstract protected function _setMapData();

    /**
     * Method to get map data.
     *
     * @return mixed
     */
    abstract public  function getMapData();

    /**
     * Map constructor.
     * @param $serial
     */
    public function __construct($serial)
    {
        $this->_serial = $serial;
        $this->_config = new Config();
        $this->_postModel = new Post();
    }

    /**
     * Map params setter.
     *
     * @param $key
     * @param $value
     * @return void
     */
    public function setParam($key, $value)
    {
        $this->_params[$key] = $value;
    }

    /**
     * Method to set params
     *
     * @param array $params
     * @return void
     */
    public function setParams(array $params)
    {
        if (empty($this->_params)) {
            $this->_params = $params;
        } else {
            foreach ($params as $param) {
                array_push($this->_params, $param);
            }
        }
    }

    /**
     * Method to get map view.
     *
     * @return string
     */
    public function getMap()
    {
        return $this->_map;
    }

    /**
     * Method to show map view
     */
    public function showMap()
    {
        echo $this->_map;
    }

    /**
     * Method to return current map serial number.
     *
     * @return mixed
     */
    public function getSerial()
    {
       return $this->_serial;
    }
}