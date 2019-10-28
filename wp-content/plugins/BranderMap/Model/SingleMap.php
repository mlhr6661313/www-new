<?php

namespace BranderMap\Model;

use BranderMap\Model\Abstractions\Map as MapAbstract;

/**
 * Class SingleMap
 * @package BranderMap\Model
 */
class SingleMap extends MapAbstract
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
            $path = $this->_config->getTemplatesPath(). '/single_map-template.php';

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
        if ($this->_params['id']) {
            $this->_postModel->setPostById($this->_params['id']);
        }
        $this->_postModel->setPostsMeta('department_group', true);
        $mapData = $this->_postModel->getResult();
        $this->_mapData = isset($mapData[0]) ? $mapData[0] : [];
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