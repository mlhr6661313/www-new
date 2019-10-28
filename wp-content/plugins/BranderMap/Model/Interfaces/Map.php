<?php

namespace BranderMap\Model\Interfaces;

/**
 * Interface Map
 * @package BranderMap\Model\Interfaces
 */
interface Map
{
    /**
     * Map constructor.
     * @param $serial
     */
    public function __construct($serial);

    /**
     * Method to create map by params.
     *
     * @return mixed
     */
    public function createMap();

    /**
     * Method to set param for map
     *
     * @param $key
     * @param $value
     * @return mixed
     */
    public function setParam($key, $value);

    /**
     * Method to set params
     * @param array $params
     * @return mixed
     */
    public function setParams(array $params);

    /**
     * Method to get map data without map
     *
     * @return mixed
     */
    public function getMapData();

    /**
     * Method to get map
     *
     * @return mixed
     */
    public function getMap();

    /**
     * Method to show map
     *
     * @return mixed
     */
    public function showMap();
}