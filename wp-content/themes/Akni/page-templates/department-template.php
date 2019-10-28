<?php
/* Template Name: Departments Template */

global $core;
global $post;
global $mapCreator;

$context = $core->get_context();
$model  = $core->getModel();
$config = $core->getConfig();
$showConfig = $config->getConfig('show', 'show');
$langConfig = $config->getConfig('lang');

if ($post && $post->post_type == 'page') {
    $model->setResult([$post]);
    $model->formattedAcf();
    $model->setMainThumbnailUrls();
    $context['page'] = $model->getResult()[0];

    #meta data
    $context['meta_title'] = get_post_meta($context['page']->ID,'_yoast_wpseo_title', true);
    if ($context['meta_title'] == '') {
        $context['meta_title'] = $context['page']->post_title;
    }

    #breadcrumbs
    $context['breadcrumbs']['0'] = [
        'url' => get_permalink($context['page']->ID),
        'title' => __($context['page']->post_title)
    ];
    #map
    if ($mapCreator) {
        $deparmentsMap = $mapCreator::create('advanced');
        $deparmentsMap->setParams([
            'filters' => [
                'city' => true,
                'reception' => true,
                'work' => true
            ]
        ]);
        $deparmentsMap->createMap();
        $context['department_map'] = $deparmentsMap->getMap();
    }
}

$core->fastRender('departments-template.twig', $context);