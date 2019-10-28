<?php
/* Template Name: Single-credit Template */

use Akni\app\Helper\Data;

global $core;
global $post;
global $mapCreator;


$context = $core->get_context();
$model  = $core->getModel();
$config = $core->getConfig();
$showConfig = $config->getConfig('show', 'show');
$langConfig = $config->getConfig('lang');

if ($post) {
    $model->setResult([$post]);
    $model->formattedAcf();
    $model->setMainThumbnailUrls();
    $context['page'] = $model->getResult()[0];
    $receptions = wp_get_post_terms($context['page']->ID, 'reception');

    #meta data
    $context['meta_title'] = get_post_meta($context['page']->ID,'_yoast_wpseo_title', true);
    if ($context['meta_title'] == '') {
        $context['meta_title'] = $context['page']->post_title;
    }



    #breadcrumbs
    if (isset($context['theme_options']['all_credits_id'])) {
        $allCreditsPageId = $context['theme_options']['all_credits_id'];
        if (get_page_template_slug($allCreditsPageId) == 'page-templates/credits_catalog-page.php') {
            $allCreditsPage = get_post($allCreditsPageId);
            $model->setResult([$allCreditsPage]);
            $model->setPostUrls();
            $allCreditsPage = $model->getResult()[0];
        }
    }

    if (isset($allCreditsPage) && $allCreditsPage->post_title !='') {
        $context['allCredits_permalink'] = $allCreditsPage->post_url;
        $context['breadcrumbs']['0'] = [
            'url' => $context['allCredits_permalink'],
            'title' => customTranslate($allCreditsPage->post_title)
        ];
    }
    if(is_object($receptions[0])) {
        $context['breadcrumbs'][] = [
            'url' => get_term_link($receptions[0]),
            'title' => __($receptions[0]->name)
        ];
    }
    $context['breadcrumbs'][] = [
        'url' => get_permalink($context['page']->ID),
        'title' => __($context['page']->post_title)
    ];

    #reception
    if (isset($context['page']->acf['other_pledge_variants']['value']))
    {
        $receptions = $context['page']->acf['other_pledge_variants']['value'];
    }
    $options = (array)get_option('ice-theme-settings');
    $defaultImage = '';
    if (!empty($options)) {
        $defaultImage = image_downsize ($options['default_image_id'], 'full' )[0];
    }
    if (!empty($receptions)) {
        foreach ($receptions as $k => $reception) {
            $image = get_field('image', 'reception_'.$reception->term_id);
            $reception->link = get_category_link($reception->term_id);
            $reception->shown_name =  get_field('subtitle', 'reception_'.$reception->term_id) !=''
                ? get_field('subtitle', 'reception_'.$reception->term_id) : $reception->name;
            if ($image !='') {
                $reception->image = $image;
            } elseif ($defaultImage !='') {
                $reception->image = $defaultImage;
            } else {
                unset($receptions[$k]);
            }
        }
    }
    $context['receptions'] = !empty($receptions) ? $receptions : [];

    $context['slider_widget'] = $context['page']->acf['slider_widget']['value'];
    $context['slider_widget_title'] = $context['page']->acf['slider_widget_title']['value'];

    if(strpos($context['page']->acf['page_text_content']['value'], '{SLIDER}') !== false && $context['slider_widget'] && count($context['slider_widget']) > 0) {

        foreach ($context['slider_widget'] as &$slide) {
            $slide['image']['alt'] = customTranslate($slide['image']['alt']);
            $slide['image']['title'] = customTranslate($slide['image']['title']);
        }

        $slider = $core->renderWithoutOutput('widgets/slider.twig', $context);
        $context['page']->acf['page_text_content']['value'] = str_replace('{SLIDER}', $slider, $context['page']->acf['page_text_content']['value']);
    }
}

$core->fastRender('single_credit-template.twig', $context);