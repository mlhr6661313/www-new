<?php
/* Template Name: Credits-catalog Template */

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
    #metaData
    $context['meta_description'] = get_post_meta($context['page']->ID,'_yoast_wpseo_metadesc', true);
    $context['meta_title'] = get_post_meta($context['page']->ID,'_yoast_wpseo_title', true);
    if ($context['meta_title'] =='') {
        $context['meta_title'] = $context['page']->post_title;
    }

    #receptions
    $receptions = get_terms([
        'taxonomy' => 'reception',
        'hide_empty' => true,
    ]);

    $options = (array)get_option('ice-theme-settings');
    $defaultImage = '';
    if (!empty($options)) {
        $defaultImage = image_downsize ($options['default_image_id'], 'full' )[0];
    }
    if (!empty($receptions)) {
        foreach ($receptions as $k => $reception) {
            $image = get_field('image', 'reception_'.$reception->term_id);
            $image['alt'] = customTranslate($image['alt']);
            $image['title'] = customTranslate($image['title']);
            $reception->shown_name =  get_field('subtitle', 'reception_'.$reception->term_id) !=''
                ? get_field('subtitle', 'reception_'.$reception->term_id) : $reception->name;
            $reception->link = get_category_link($reception->term_id);
            $reception->main = get_field('main', 'reception_'.$reception->term_id);
            $reception->order = get_field('order', 'reception_'.$reception->term_id);
            if ($image !='') {
                $reception->image = $image;
            } elseif ($defaultImage !='') {
                $reception->image = $defaultImage;
            } else {
                unset($receptions[$k]);
            }
        }
    }
    $receptionsMain = [];
    $receptionsAdvanced = [];

    if(!empty($receptions)) {
        foreach($receptions as $reception) {
            if ($reception->main) {
                $receptionsMain[] = $reception;
            } else {
                $receptionsAdvanced[] = $reception;
            }
        }
    }
    $context['receptionsMain'] = !empty($receptionsMain) ? Data::sortFields($receptionsMain, 'obj') : [];
    $context['receptionsAdvanced'] = !empty($receptionsAdvanced) ? Data::sortFields($receptionsAdvanced,'obj') : [];

    $tabs = get_terms([
        'taxonomy'      => 'credit_tabs',
        'hide_empty'    => false,
        'meta_key'      => 'sort_order',
        'orderby'       => 'meta_value',
        'order'         => 'ASC'
    ]);

    foreach ($tabs as &$tab) {
        $tab->bottom_text = __(get_term_meta($tab->term_id, 'bottom_text', true));
        $tab->button_text = __(get_term_meta($tab->term_id, 'button_text', true));
        $tab->tab_id = __(get_term_meta($tab->term_id, 'tab_id', true));
        $tab->tariffs = get_posts(
            array(
                'posts_per_page' => -1,
                'post_type' => 'credit_tariffs',
                'tax_query' => array(
                    array(
                        'taxonomy' => 'credit_tabs',
                        'field' => 'id',
                        'terms' => $tab->term_id,
                        'include_children' => false
                    )
                ),
                'meta_key'      => 'sort_order',
                'orderby'       => 'meta_value',
                'order'         => 'ASC'
            )
        );

        foreach ($tab->tariffs as &$tariff) {
            $tariff->text_1 = get_post_meta($tariff->ID, 'text_1', true);
            $tariff->text_2 = get_post_meta($tariff->ID, 'text_2', true);
            $tariff->text_3 = get_post_meta($tariff->ID, 'text_3', true);
            $tariff->text_4 = get_post_meta($tariff->ID, 'text_4', true);
            $tariff->text_5 = get_post_meta($tariff->ID, 'text_5', true);
            $tariff->image = wp_get_attachment_image_src( get_post_meta($tariff->ID, 'image', true), 'full')[0];
            $tariff->mobile_image = wp_get_attachment_image_src(get_post_meta($tariff->ID, 'mobile_image', true), 'full')[0];
        }
    }

    $context['credit_tabs'] = $tabs;
}

$core->fastRender('credits_catalog-template.twig', $context);