<?php
/* Template Name: Single-aktsii Template */

use Akni\app\Helper\Data;
use Akni\app\Model\Actions;

global $core;
global $post;

$context = $core->get_context();
$model  = $core->getModel();
$config = $core->getConfig();
$actionsModel  = new Actions();

if ($post) {
    $model->setResult([$post]);
    $model->formattedACF();
    $model->setPostUrls();
    $model->setMainThumbnailUrls();
    $context['page'] = $model->getResult()[0];

    #meta data
    $context['meta_description'] = get_post_meta($context['page']->ID,'_yoast_wpseo_metadesc', true);
    $context['meta_title'] = get_post_meta($context['page']->ID,'_yoast_wpseo_title', true);
    if ($context['meta_title'] =='') {
        $context['meta_title'] = $context['page']->post_title;
    }

    #breadcrumbs
    if (isset($context['theme_options']['actions_page_id'])) {
        $blogID = $context['theme_options']['actions_page_id'];
        if (get_page_template_slug($blogID) =='page-templates/actions-page.php') {
            $blog = get_post($blogID);
            $model->setResult([$blog]);
            $model->setPostUrls();
            $blog = $model->getResult()[0];
        }
    }
    if (isset($blog) && $blog->post_title !='') {
        $context['breadcrumbs']['0'] = [
            'url' => $blog->post_url,
            'title' => __($blog->post_title)
        ];
    }
    $context['breadcrumbs']['1'] = [
        'url' => get_permalink($context['page']->ID),
        'title' => __($context['page']->post_title)
    ];
    $context['action_image'] = get_the_post_thumbnail_url($post);
    $dayTo = explode('/', get_field('action_to_day', $post->ID));

    $to = $actionsModel->getDaysTo(get_field('action_to_day', $post->ID));
    $context['is_action_active'] = $to['number'] ? true : false;

    $context['action_to'] = $dayTo[2].'.'.$dayTo[1].'.'.$dayTo[0]. ' '. $dayTo[3].':'.$dayTo[4];
    $context['to_data'] = [
        'year' => $dayTo[0],
        'month' => $dayTo[1],
        'day' => $dayTo[2],
        'hour' => $dayTo[3],
        'minute' => $dayTo[4],
        'sec' => $dayTo[5]
    ];
}

$core->fastRender('single_action.twig', $context);