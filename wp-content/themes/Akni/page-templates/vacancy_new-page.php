<?php
/* Template Name: Vacancy-New Template */

use Akni\app\Helper\Data;

global $core;
global $post;

$context = $core->get_context();
$model  = $core->getModel();
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

    $model->setArgs($showConfig['vacancy_posts']);
    $model->setPosts();
    $model->setMainThumbnailUrls([300, 300]);
    $model->setPostUrls();
    $model->formattedACF();
    $model->setBlogFormateDate();
    $context['blog_posts'] = $model->getResult();

    if (isset($context['theme_options']['blog_page_id'])) {
        $blogID = $context['theme_options']['blog_page_id'];
        if (get_page_template_slug($blogID) =='page-templates/blog-page.php') {
            $blog = get_post($blogID);
            $model->setResult([$blog]);
            $model->setPostUrls();
            $blog = $model->getResult()[0];
            if ($blog) {
                $context['blog_url'] = $blog->post_url;
            }
        }
    }
}
$core->fastRender('vacancy_new_template.twig', $context);