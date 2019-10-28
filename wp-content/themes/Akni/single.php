<?php
/* Template Name: Single-article Template */

use Akni\app\Helper\Data;

global $core;
global $post;

$context = $core->get_context();
$model  = $core->getModel();
$config = $core->getConfig();

if ($post) {
    $model->setResult(['0'=>$post]);
    $model->formattedACF();
    $model->setMainThumbnailUrls();
    $context['page'] = $model->getResult()[0];

    #meta data
    $context['meta_description'] = get_post_meta($context['page']->ID,'_yoast_wpseo_metadesc', true);
    $context['meta_title'] = get_post_meta($context['page']->ID,'_yoast_wpseo_title', true);
    if ($context['meta_title'] =='') {
        $context['meta_title'] = $context['article']->post_title;
    }


    #Similar products
    $similarProducts = [];
    $similarProducts = $context['page']->acf['similar_products']['value'];
    if (!empty($similarProducts)) {
        foreach ($similarProducts as $k=>$v) {
            if ($v->ID == $context['page']->ID) {
                unset($similarProducts[$k]);
            }
        }
    }
    if (!empty($similarProducts)) {
        $model->setResult( $similarProducts);
        $model->setMainThumbnailUrls();
        $model->setPostUrls();
        $similarProducts = $model->getResult();
    }
    $context['similarProducts'] = $similarProducts;

    #Similar articles
    $similarArticles = [];
    $similarArticles = $context['page']->acf['similar_posts']['value'];
    if (!empty($similarArticles)) {
        $model->setResult($similarArticles);
        $model->setMainThumbnailUrls();
        $model->setPostUrls();
        $similarArticles  = $model->getResult();
    }
    $context['similarArticles'] = $similarArticles ;

    #breadcrumbs
    $mainCategory = Data::getMainTerm($context['page']->ID, 'category');
    if (isset($mainCategory)) {
        $context['breadcrumbs']['0'] = [
            'url' => get_category_link($mainCategory->term_id),
            'title' => __($mainCategory->name)
        ];
    }

    $context['breadcrumbs']['1'] = [
        'url' => get_permalink($context['page']->ID),
        'title' => __($context['page']->post_title)
    ];
}

$core->fastRender('single.twig', $context);