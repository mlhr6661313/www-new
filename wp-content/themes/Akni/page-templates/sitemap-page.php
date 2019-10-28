<?php
/* Template Name: Sitemap Template */

use Akni\app\Model\WalkerNavMenu;

global $core;
global $post;
global $mapCreator;

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

    #blog-block
    $model->setArgs($showConfig['home_posts']);
    $model->setPosts();
    $model->setMainThumbnailUrls([300, 300]);
    $model->setPostUrls();
    $model->formattedACF();

}

$context['sitemap_pages'] = [];
$sitemap_pages = get_field('sitemap_pages', $context['page']->ID);
foreach ( $sitemap_pages as $key => $page ){
    $context['sitemap_pages'][$key]['title'] = $page->post_title;
    $context['sitemap_pages'][$key]['permalink'] = get_the_permalink($page->ID);
   // $context['sitemap_pages'][$key]['post_name'] =  $page->post_name;

}
$sitemapMenuLocation  = get_nav_menu_locations()['sitemap_menu'];

ob_start();

  wp_nav_menu(
        array(
        'theme_location'  => 'sitemap_menu',
        'menu'            => '',
        'container'       => 'div',
        'container_class' => '',
        'container_id'    => '',
        'menu_class'      => 'menu',
        'menu_id'         => '',
        'echo'            => true,
        'fallback_cb'     => 'wp_page_menu',
        'before'          => '',
        'after'           => '',
        'link_before'     => '',
        'link_after'      => '',
        'items_wrap'      => '<ul>%3$s</ul>',
        'depth'           => 0,
        'walker'          => new WalkerNavMenu(),
    ) );

$context['sitemap_pages'] = ob_get_contents();

ob_end_clean();


$core->fastRender('sitemap-template.twig', $context);