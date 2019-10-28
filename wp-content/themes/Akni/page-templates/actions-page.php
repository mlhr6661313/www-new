<?php
/* Template Name: Actions Template */

use Akni\app\Helper\Data;
use Akni\app\Model\Actions;

global $core;
global $post;

$context = $core->get_context();
$model  = $core->getModel();
$actionsModel  = new Actions();
$config = $core->getConfig();

if ($post && $post->post_type == 'page') {
    $model->setResult([$post]);
    $model->formattedAcf();
    $context['page'] = $model->getResult()[0];

    $context['breadcrumbs']['0'] = [
        'url' => get_permalink($post->ID),
        'title' => $post->post_title
    ];
    $context['meta_description'] = get_post_meta($context['page']->ID,'_yoast_wpseo_metadesc', true);
    $context['meta_title'] = get_post_meta($context['page']->ID,'_yoast_wpseo_title', true);
    if ($context['meta_title'] =='') {
        $context['meta_title'] = $context['page']->post_title;
    }
}

$aktsiiOver = get_posts(array(
    'post_type'         => 'aktsii',
    'meta_key'			=> 'action_to_day',
    'posts_per_page'     => -1,
    'orderby'			=> 'meta_value',
    'order'				=> 'DESK'
));
$tmp =[];
foreach ($aktsiiOver as $item) {
    $to = $actionsModel->getDaysTo(get_field('action_to_day', $item->ID));

    switch ($to['entity']) {
        case 'd':
            $langConfig = $context['lang']['days_config'];
            break;
        case 'h':
            $langConfig = $context['lang']['hour_config'];
            break;
        case 'm':
            $langConfig = $context['lang']['min_config'];
            break;
    }
    if ($to['number']) {
        $context['aktsii_to'][] = [
            'name' => $item->post_title,
            'url' => get_permalink($item),
            'image' => get_the_post_thumbnail_url($item),
            'to_data' => $to['number'],
            'days' => $to['number'] ? $actionsModel->getDayFormat($to['number'],$langConfig) : $context['lang']['the_end_text']
        ];
    } else {
        $tmp[] = [
            'name' => $item->post_title,
            'url' => get_permalink($item),
            'image' => get_the_post_thumbnail_url($item),
            'to_data' => $to['number'],
            'days' => $to['number'] ? $actionsModel->getDayFormat($to['number'],$langConfig) : $context['lang']['the_end_text']
        ];
    }
}

$context['aktsii_to'] = array_merge($context['aktsii_to'], $tmp);


//$aktsii = get_posts(array(
//    'post_type' => 'aktsii',
//    'orderby'=> 'date'
//));
//
//foreach ($aktsii as $item) {
//    $to = $actionsModel->getDaysTo(get_field('action_to_day', $item->ID));
//    switch ($to['entity']) {
//        case 'd':
//            $langConfig = $context['lang']['days_config'];
//            break;
//        case 'h':
//            $langConfig = $context['lang']['hour_config'];
//            break;
//        case 'm':
//            $langConfig = $context['lang']['min_config'];
//            break;
//    }
//
//    $context['aktsii'][] = [
//        'name' => $item->post_title,
//        'url' => get_permalink($item),
//        'image' => get_the_post_thumbnail_url($item),
//        'to_data' => $to['number'],
//        'days' => $to['number'] ? $actionsModel->getDayFormat($to['number'],$langConfig) : $context['lang']['the_end_text']
//    ];
//}

$core->fastRender('actions_template.twig', $context);