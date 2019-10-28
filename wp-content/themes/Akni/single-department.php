<?php
/* Template Name: Single-department Template */

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

    #meta data
    $context['meta_title'] = get_post_meta($context['page']->ID,'_yoast_wpseo_title', true);
    if ($context['meta_title'] == '') {
        $context['meta_title'] = $context['page']->post_title;
    }
    $departmentMeta = get_post_meta($post->ID, 'department_group', true);
    $context['address'] = $departmentMeta['address'] ? customTranslate($departmentMeta['address']) : '';
    $context['pageTitle'] =  $context['address'] !=''
        ? "{$context['address']} {$context['page']->post_title}"
        : $context['page']->post_title;
    $context['days'] = !empty($departmentMeta['days']) ? $departmentMeta['days'] : [];
    $context['work_from'] = !empty($departmentMeta['work_from']) ? $departmentMeta['work_from'] : [];
    $context['work_to'] = !empty($departmentMeta['work_to']) ? $departmentMeta['work_to'] : [];
    $context['notes'] = $departmentMeta['notes'] !='' ? $departmentMeta['notes'] : '';

    #other data
    if ($departmentMeta['phone']) {
        $phones = Data::formatedPhones([
            ['phone' => $departmentMeta['phone']]
        ]);
        $context['phone'] = !empty($phones[0]) ? $phones[0]  : [];
    }

    #breadcrumbs
    if (isset($context['theme_options']['department_page_id'])) {
        $departmentPageID = $context['theme_options']['department_page_id'];
        if (get_page_template_slug($departmentPageID) =='page-templates/department-new-template.php') {
            $departmentsPage = get_post($departmentPageID);
            $model->setResult([$departmentsPage]);
            $model->setPostUrls();
            $departmentsPage = $model->getResult()[0];
        }
    }

    if (isset($departmentsPage) && $departmentsPage->post_title !='') {
        $context['department_page_permalink'] = $departmentsPage->post_url;
        $context['breadcrumbs']['0'] = [
            'url' => $context['department_page_permalink'],
            'title' => __($departmentsPage->post_title)
        ];
    }

    $context['breadcrumbs']['1'] = [
        'url' => get_permalink($context['page']->ID),
        'title' => __($context['pageTitle'])
    ];

    #reception
    $receptions = wp_get_post_terms($context['page']->ID, 'reception');
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

    #map
    if ($mapCreator) {
        $deparmentMap = $mapCreator::create('single');
        $deparmentMap->setParams(['id' => $context['page']->ID]);
        $deparmentMap->createMap();
        $context['department_map'] = $deparmentMap->getMap();
    }
}

$core->fastRender('single_department-template.twig', $context);