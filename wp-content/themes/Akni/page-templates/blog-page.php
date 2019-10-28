<?php
/* Template Name: Blog Template */

use Akni\app\Helper\Data;
use Akni\app\Model\Blog;

global $core;
global $post;

$context = $core->get_context();
$model  = $core->getModel();
$blogModel  = new Blog();
$config = $core->getConfig();
$showConfig = $config->getConfig('show', 'show');

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

#fitlers
$filters = get_terms([
    'taxonomy' => 'class',
    'hide_empty' => true,
]);

if (!empty($filters)) {
    foreach ($filters as $k => $filter) {
        if ($order = get_field('order', 'class_' . $filter->term_id)) {
            $filter->order = $order;
        }
    }
    $context['filters'] = Data::sortFields($filters, 'obj');
}

#all articles

$context['next'] = false;
$context['articles'] = [];
if ($context['filters']) {
    if ($showConfig['posts']) {
        $args = $showConfig['posts'];
        $currentFilter =  reset($context['filters']);
        $context['filter_data'] = $currentFilter->slug;
        $context['more_text_data']  = get_field('genitive', 'class_' . $currentFilter->term_id);

        $args['tax_query'] = [
            [
                'taxonomy' => 'class',
                'field' => 'slug',
                'terms' => reset($context['filters'])->slug
            ]
        ];

        $blogModel->setArgs($args);
        $blogModel->setPosts();
        $blogModel->setMainThumbnailUrls();
        $blogModel->setPostUrls();
        $blogModel->formattedACF();
        $blogModel->setBlogFormateDate();
        $blogModel->setBlogActions();
        $context['articles'] = $blogModel->getResult();
        $context['next'] = Data::isNext($args, 1);
    }
}

$core->fastRender('blog_template.twig', $context);