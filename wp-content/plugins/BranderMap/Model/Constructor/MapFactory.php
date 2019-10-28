<?php

namespace BranderMap\Model\Constructor;

use BranderMap\Model\Interfaces\Map;
use BranderMap\Model\SimpleMap;
use BranderMap\Model\AdvancedMap;
use BranderMap\Model\AdvancedNewMap;
use BranderMap\Model\SingleMap;

/**
 * Class MapFactory
 * @package BranderMap\Model\Constructor
 */
class MapFactory
{
    /**
     * counter of created maps.
     *
     * @var $_mapCounter
     */
    private static $_mapCounter = 0;

    /**
     * Method to get number of created maps
     *
     * @return int
     */
    public function getMapCounter()
    {
        return (int)self::$_mapCounter;
    }

    /**
     * Method to create maps.
     *
     * @param $type
     * @return Map object
     */
    public static function create($type ='')
    {
        ++self::$_mapCounter;

        switch ($type) {
            case 'advanced_new':
                $map = new AdvancedNewMap(self::$_mapCounter);
                break;
            case 'advanced':
                $map = new AdvancedMap(self::$_mapCounter);
                break;
            case 'single':
                $map = new SingleMap(self::$_mapCounter);
                break;
            case 'simple':
            default :
                $map = new SimpleMap(self::$_mapCounter);
        }
        return $map;
    }
}