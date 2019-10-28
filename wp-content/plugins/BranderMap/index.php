<?php
/**
 * Plugin Name: Brander Map
 * Description: makes map for pawnshops
 * Version: 0.0.1
 * Author: Brander
 * Author URI: https://brander.ua/
 */

use BranderMap\Model\Constructor\Constructor;

$composerLoader =  __DIR__ . '/vendor/autoload.php';

if (file_exists($composerLoader)) {
    require_once $composerLoader;
} else {
    _e('Install composer for current work');
    exit;
}

$constructor = Constructor::getInstance();

/**
 * provide access to mapCreator in wp project
 */
global $mapCreator;

$mapCreator = $constructor->getMapCreator();