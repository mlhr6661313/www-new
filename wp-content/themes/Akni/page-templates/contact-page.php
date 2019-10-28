<?php

/* Template Name: Contact Template */

use Akni\app\Helper\Data;

global $core;
global $post;

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

    #offices
    $officesData = [];
    $officesDataMap = [];
    if (isset($context['page']->acf['ofices']) && !empty($context['page']->acf['ofices']['value'])) {
        $offices = $context['page']->acf['ofices']['value'];
        foreach ($offices as $office) {
            $officesData[] = [
                'address' => $office['adress'],
                'name' => $office['name'],
                'email' => $office['email'],
                'phones' => Data::formatedPhones($office['contacts'])
            ];
            $officesDataMap[] = [
                'lat' => $office['lat'],
                'lng' => $office['lng']
            ];
        }
    }
    $context['offices_data'] = json_encode($officesData);
    $context['offices_data_map'] = json_encode($officesDataMap);
}

$core->fastRender('contact-template.twig', $context);