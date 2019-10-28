<?php
/* Template Name: Home Template */

use Akni\app\Helper\Data;
use Akni\app\Model\Blog;

global $core;
global $post;
global $mapCreator;

$context = $core->get_context();
$model  = new Blog();
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
    $model->setBlogFormateDate();
    $homePosts = $model->getResult();
    if (!empty($homePosts)) {
        $context['homePosts'] =  $homePosts;
    }
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

    #map-block
    if ($mapCreator) {
        $map = $mapCreator::create('advanced');
        //$map->setParam('city','kharkov');
        $map->setParams([
            'filters' => [
                'city' => false,
                'reception' => false,
                'work' => false
            ]
        ]);
        $map->createMap();
        $context['home_map'] = $map->getMap();
    }
}
$context['site_url'] = '';
foreach ($context['page']->acf['slider']['value'] as &$item) {
    $item['image']['alt'] = customTranslate($item['image']['alt']);
    $item['image']['title'] = customTranslate($item['image']['title']);
}

foreach ($context['page']->acf['credits_slider']['value'] as &$item) {
    $item['image']['alt'] = customTranslate($item['image']['alt']);
    $item['image']['title'] = customTranslate($item['image']['title']);
}

$context['page']->acf['block_one_image']['value']['alt'] = customTranslate($context['page']->acf['block_one_image']['value']['alt']);
$context['page']->acf['block_one_image']['value']['title'] = customTranslate($context['page']->acf['block_one_image']['value']['title']);

if(isset($context['config_page']['advantages_home']['value'])) {
    foreach ($context['config_page']['advantages_home']['value'] as &$item) {
        $item['image']['alt'] = customTranslate($item['image']['alt']);
        $item['image']['title'] = customTranslate($item['image']['title']);
    }
}

if(isset($context['config_page']['advantages']['value'])) {
    foreach ($context['config_page']['advantages']['value'] as &$item) {
        $item['image']['alt'] = customTranslate($item['image']['alt']);
        $item['image']['title'] = customTranslate($item['image']['title']);
    }
}

if(isset($context['config_page']['block_one_image']['value'])) {
    foreach ($context['config_page']['block_one_image']['value'] as &$item) {
        $item['image']['alt'] = customTranslate($item['image']['alt']);
        $item['image']['title'] = customTranslate($item['image']['title']);
    }
}

$context['logo_url'] = '';
$context['home_url'] = get_home_url();

$core->fastRender('home-template.twig', $context);