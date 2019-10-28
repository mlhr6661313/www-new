<?php
/*
Template Name: Search Page
*/

use Akni\app\Helper\Data;
global $core;

$context = $core->get_context();

$model  = $core->getModel();
$config = $core->getConfig();
$configs = $config->getConfig('show','show');
$lang_config = $config->getConfig('lang');

$context = $core->get_context();
$paged = ( get_query_var( 'paged' ) ) ? get_query_var( 'paged' ) : 1;

global $wp_query;
if(empty($_GET['s'])){
    $context['not_found'] = __($lang_config['empty_search_text']);
}else{
    $search = $wp_query->posts;

    foreach($search as &$val){
        $val->page_url = get_permalink ($val->ID);
        if($val->post_content){
            $val->post_content = mb_strimwidth(Data::cleanString($val->post_content),0,250,'...');
        }
        else{
            $val->post_content = __($lang_config['more_search_text']);
        }
    }

    if(!empty($search)){
        $context['search_results'] = $wp_query->posts;
        $context['finded'] = $wp_query->found_posts;
        $context['form_url'] =  esc_url( home_url( '/' ) );
        $context['pager'] = $core->kapital_pagenavi($wp_query->max_num_pages, $paged);

    }
    else{
        $context['not_found'] = sprintf(__($lang_config['results_not_found']), $_GET['s']);
    }
    $context['search_question'] = $_GET['s'];
}

$context['title'] = customTranslate('<!--:ru-->Поиск<!--:--><!--:ua-->Пошук<!--:-->');
$context['meta_tag'] = '<meta name=“robots” content=“noindex,nofollow”>';


$core->render('search.twig', $context);