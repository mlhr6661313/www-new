<?php
/* Template Name: Calc Template */

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
}

//#calculators
//$calcTerms = get_terms([
//    'taxonomy' => 'pledge',
//    'hide_empty' => true,
//]);
//
//$categories = [];
//$tariffs = [];
//$discounts = [];
//$tabs = [];
//
//if(!empty($calcTerms)) {
//    foreach ($calcTerms as $term) {
//        $tabs[] = [
//            'id' => $term->term_id,
//            'name' => $term->name,
//            'slug' => $term->slug
//        ];
//        $loanArgs = $showConfig['loans'];
//        $loanArgs['tax_query'] = [
//            [
//                'taxonomy' => 'pledge',
//                'field' => 'id',
//                'terms' => $term->term_id
//            ]
//        ];
//        $model->setArgs($loanArgs);
//        $model->setPosts();
//        $loans = $model->getResult();
//        if (!empty($loans)) {
//            foreach ($loans as $k=>$loan) {
//                if (empty($loan->custom['sample'])) {
//                    unset($loans[$k]);
//                }
//            }
//            $categories[$term->term_id] = $loans;
//            $categories['json'][$term->term_id] = json_encode($loans);
//        }
//    }
//}
//
//#discounts
//$discountsArgs = $showConfig['discounts'];
//$model->setArgs($discountsArgs);
//$model->setPosts();
//$discounts = $model->getResult();
//
//#tarifs
//$tariffsArgs = $showConfig['tariffs'];
//$model->setArgs($tariffsArgs);
//$model->setPosts();
//$tariffs = $model->getResult();
//
//if (!empty($tariffs)) {
//    foreach($tariffs as $k=>$tariff) {
//        if (!empty($tariff->from) && !empty($tariff->to)) {
//            $tariff->fromLine = min($tariff->from);
//            $tariff->toLine = max($tariff->to);
//        } else {
//            unset ($tariffs[$k]);
//        }
//    }
//}
//$context['tabs'] = $tabs;
//$context['categories'] = $categories;
//
//$context['tariffs'] = $tariffs;
//$context['tariffs_json'] =  json_encode($tariffs);
//
//$context['discounts'] = $discounts;
//$context['discounts_json'] = json_encode($discounts);


#other block
//$context['other_form'] = do_shortcode("[contact-form-7 id=\"452\" title=\"Contact form 1\"]");
//$context['order_form'] =  do_shortcode("[contact-form-7 id=\"488\" title=\"Order\"]");
//$context['file_max_size'] = (string)ini_get('upload_max_filesize');

$core->fastRender('calc-template.twig', $context);