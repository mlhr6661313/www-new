<?php
/* Template Name: Vacancy Template */

use Akni\app\Helper\Data;


global $core;
global $post;

$context = $core->get_context();
$model  = $core->getModel();
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
$core->fastRender('vacancy_template.twig', $context);