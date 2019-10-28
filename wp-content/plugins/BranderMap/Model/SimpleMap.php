<?php

namespace BranderMap\Model;

use BranderMap\Model\Abstractions\Map as MapAbstract;
use BranderMap\Helper\Data;

/**
 * Class SimpleMap
 * @package BranderMap\Model
 */
class SimpleMap extends MapAbstract
{

    /**
     * Current map data
     *
     * @var array
     */
    protected $_mapData =[];

    /**
     * Method to create map
     *
     * @return bool
     */
    public function createMap()
    {
        $mapData = !empty($this->_mapData) ? $this->_mapData : $this->getMapData();

        if (empty($mapData)) {
            return false;
        }

        try {
            $error = __('You have some problems with template');
            $path = $this->_config->getTemplatesPath(). '/simple_map-template.php';

            if (!file_exists($path)) {
                throw new \Exception($error);
            }
            $content = require ($path);
            if ($content != '') {
                $this->_map = $content;
                return true;
            }
            throw new \Exception($error);
        } catch (\Exception $e) {
            echo $e->getMessage();
        }
        return false;
    }

    /**
     * Method to set map data for creation
     *
     * TODO: this is temporary solution, override it
     * @return void
     */
    protected function _setMapData()
    {
        $args = $this->_config->getConfig('maps');
        if ($args && $args['simple_map']) {
            $this->_postModel->setArgs($args['simple_map']);

            $cityArgs = $this->_formateCityArgs();
            if (!empty($cityArgs)) {
                $this->_postModel->setSpecialArgs('tax_query', $cityArgs);
            }

            $this->_postModel->setPosts();
            $this->_postModel->setPostsMeta('department_group', true);
            $mapData = $this->_postModel->getResult();
            $this->_mapData = is_array($mapData) ? $mapData : [];
        }

    }

    /**
     * TODO: this is temporary solution, override it
     *
     * @return array $args
     */
    protected function _formateCityArgs()
    {
        $args = [];
        if (isset($this->_params['city'])) {
            if (is_array($this->_params['city'])) {
                $cities = Data::clearArray($this->_params['city']);
                $args = [
                    [
                        "taxonomy" => "regions_cities",
                        "field" => "slug",
                        "terms" =>  $cities,
                        "operator" =>"in"
                    ]
                ];
            } elseif(is_string($this->_params['city'])) {
                $cities = Data::clearString($this->_params['city']);
                $args = [
                    [
                        "taxonomy" => "regions_cities",
                        "field" => "slug",
                        "terms" =>  $cities
                    ]
                ];

            }
        }
        return $args;
    }

    /**
     * Method to get map data.
     *
     * @return mixed
     */
    public function getMapData()
    {
        $this->_setMapData();
        return $this->_mapData;
    }

}