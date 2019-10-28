<?php

namespace BranderMap\Model;

use BranderMap\Model\Abstractions\Map as MapAbstract;

/**
 * TODO: Refactor this class and make better solution
 * TODO: REFACTOR ALL METHODS, REALY
 * Class AdvancedMap
 * @package BranderMap\Model
 */
class AdvancedMap extends MapAbstract
{

    /**
     * Current map data
     *
     * @var array
     */
    protected $_mapData = [];

    /**
     * filters to show
     *
     * @var array
     */
    public $filters = [];

    /**
     * All filters data
     *
     * @var $_typeFiltersData
     */
    protected $filtersData;

    /**
     * Method to create map
     */
    public function createMap()
    {
        $this->getMapData();
        $this->_setFilters();

        try {
            $error = __('You have some problems with template');
            $path = $this->_config->getTemplatesPath() . '/advanced_map-template.php';

            if (!file_exists($path)) {
                throw new \Exception($error);
            }
            $content = require($path);
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
     * @return void
     */
    protected function _setMapData()
    {
        $args = $this->_config->getConfig('maps');
        if ($args && $args['advanced_map']) {
            $this->_postModel->setArgs($args['advanced_map']);
            $this->_postModel->setPosts();
            $this->_postModel->setPostTaxIds('reception');
            $this->_postModel->setPostTaxNames('reception');
            $this->_postModel->setPostTaxIds('regions_cities');
            $this->_postModel->setPostsMeta('department_group', true);
            $mapData = $this->_postModel->getResult();
            $this->_mapData = is_array($mapData) ? $mapData : [];
        }
    }

    /**
     * Method to set filters
     */
    protected function _setFilters()
    {
        if ($this->_params['filters'] && !empty($this->_params['filters'])) {
            foreach ($this->_params['filters'] as $name => $filter) {
                switch ($name) {
                    case 'reception':
                        $this->_setReceptionFiltersData();
                        break;
                    default;
                }
                $this->filters[$name] = $filter;
            }
        }
    }

    /**
     * TODO: Move all filters to one foreach
     */
    protected function _setReceptionFiltersData()
    {
        $receptionFilters = [];
        if (!empty($this->_mapData)) {
            foreach ($this->_mapData as $department) {
                if ($department) {
                    /**
                     * TODO: move to config
                     */
                    $departmentFilters = wp_get_post_terms($department->ID, 'reception');
                    if (!empty($departmentFilters)) {
                        foreach ($departmentFilters as $filter) {
                            if (!isset($receptionFilters[$filter->term_id])) {
                                $receptionFilters[$filter->term_id] = $filter->name;
                            }
                        }
                    }
                }
            }
        }
        $this->filtersData['reception'] = $receptionFilters;
    }

    protected function _setWorkFiltersData()
    {

    }

    /**
     * Method to get map data.
     *
     * @param $reset
     * @return mixed
     */
    public function getMapData($reset = false)
    {
        if ($reset || empty($this->_mapData)) {
            $this->_setMapData();
        }
        return $this->_mapData;
    }

}