<?php
/* Template Name: Single-post Template */

use \Akni\app\Model\Blog;
use Akni\app\Helper\Data;
global $core;
global $post;

$context = $core->get_context();
$model  = new Blog();
$config = $core->getConfig();

if ($post) {

    $model->setResult(['0'=>$post]);
    $model->formattedACF();
    $model->setPostUrls();
    $model->setMainThumbnailUrls();
    $model->setBlogFormateDate();
    $context['page'] = $model->getResult()[0];

    #meta data
    $context['meta_description'] = get_post_meta($context['page']->ID,'_yoast_wpseo_metadesc', true);
    $context['meta_title'] = get_post_meta($context['page']->ID,'_yoast_wpseo_title', true);
    if ($context['meta_title'] =='') {
        $context['meta_title'] = $context['page']->post_title;
    }

    #breadcrumbs
    if (isset($context['theme_options']['blog_page_id'])) {
        $blogID = $context['theme_options']['blog_page_id'];
        if (get_page_template_slug($blogID) =='page-templates/blog-page.php') {
            $blog = get_post($blogID);
            $model->setResult([$blog]);
            $model->setPostUrls();
            $blog = $model->getResult()[0];
        }
    }
    if (isset($blog) && $blog->post_title !='') {
        $context['blog_permalink'] = $blog->post_url;
        $context['breadcrumbs']['0'] = [
            'url' => $context['blog_permalink'],
            'title' => __($blog->post_title)
        ];
    }
    $context['breadcrumbs']['1'] = [
        'url' => get_permalink($context['page']->ID),
        'title' => __($context['page']->post_title)
    ];

    #similar posts
    if (isset($context['page']->acf) && !empty($context['page']->acf['similar_posts']['value'])) {
        $context['similar_posts_label'] = $context['page']->acf['similar_posts']['label'];
        $model->setResult($context['page']->acf['similar_posts']['value']);
        $model->removePostsByIds([$context['page']->ID]);
        $model->formattedACF();
        $model->setPostUrls();
        $model->setMainThumbnailUrls();
        $model->setBlogFormateDate();
        $model->setBlogActions();
        $context['similar_posts'] = array_slice(Data::sortPostsByDate($model->getResult()),0,3);
        $pageTerm = wp_get_post_terms($context['page']->ID, 'class')[0];
        $context['more_text_data']  = get_field('genitive', 'class_' . $pageTerm->term_id);
    }

    $title = htmlspecialchars($context['page']->post_title);
    $text = htmlspecialchars($context['page']->post_excerpt);

    #sharing
    $context['tw_sharing_url'] = "https://twitter.com/intent/tweet?text={$text}&url={$context['page']->post_url}";
    $context['fb_sharing_url'] = "https://www.facebook.com/sharer/sharer.php?u={$context['page']->post_url}&title={$title}&description={$text}";
}
$core->fastRender('single_blog.twig', $context);