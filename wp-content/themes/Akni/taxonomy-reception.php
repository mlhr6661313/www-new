<?php

global $core;
global $post;
global $mapCreator;

$context = $core->get_context();
$model  = $core->getModel();
$config = $core->getConfig();
$showConfig = $config->getConfig('show', 'show');
$langConfig = $config->getConfig('lang');

$context['page'] = get_queried_object();

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

$context['breadcrumbs']['1'] = [
    'url' =>  get_term_link($context['page']->term_id),
    'title' => __($context['page']->name)
];

#meta data
$context['page']->info_title = get_field('info_title', 'reception_'.$context['page']->term_id);
$context['page']->info = get_field('info', 'reception_'.$context['page']->term_id);
$context['page']->page_text_content = get_field('page_text_content', 'reception_'.$context['page']->term_id);

$context['slider_widget'] = get_field('slider_widget', 'reception_'.$context['page']->term_id);
$context['slider_widget_title'] = get_field('slider_widget_title', 'reception_'.$context['page']->term_id);

$context['meta_title'] = WPSEO_Taxonomy_Meta::get_term_meta( $context['page']->term_id, 'reception', 'title');

if(strpos($context['page']->page_text_content, '{SLIDER}') !== false && $context['slider_widget'] && count($context['slider_widget']) > 0) {

    foreach ($context['slider_widget'] as &$slide) {
        $slide['image']['alt'] = customTranslate($slide['image']['alt']);
        $slide['image']['title'] = customTranslate($slide['image']['title']);
    }

    $slider = $core->renderWithoutOutput('widgets/slider.twig', $context);
    $context['page']->page_text_content = str_replace('{SLIDER}', $slider, $context['page']->page_text_content);
}

if(strpos($context['page']->page_text_content, '{{TABS}}') !== false) {
    if ($mapCreator) {
        $deparmentsMap = $mapCreator::create('advanced_new');
        $deparmentsMap->setParams([
            'filters' => [
                'city' => true,
                'reception' => true,
                'work' => true
            ]
        ]);
        $deparmentsMap->createMap();
        $context['reception_map'] = $deparmentsMap->getMap();
    }
    $context['context_suffix'] = '_receptions';
    $context['calculator_form_1'] = $core->renderWithoutOutput('modules/_calc-block.twig', $context);
    $tabs = $core->renderWithoutOutput('modules/_reception_tabs.twig', $context);
    $context['page']->page_text_content = str_replace('{{TABS}}', $tabs, $context['page']->page_text_content);
}

#child_credits
$model->setArgs($showConfig['credits']);
$model->setSpecialArgs('tax_query', [
    [
        "taxonomy" => 'reception',
        "field" => "term_id",
        "terms" => $context['page']->term_id
    ]
]);

$model->setPosts();
$model->setMainThumbnailUrls();
$model->setPostUrls();
$model->formattedACF();
$credits = $model->getResult();
if (!empty($credits)) {
    $context['credits'] =  $credits;
}

#reception
$receptions = get_field('other_pledge_variants', 'reception_'.$context['page']->term_id);
$receptions = !empty($receptions) ? $receptions : [];
$options = (array)get_option('ice-theme-settings');
$defaultImage = '';
if (!empty($options)) {
    $defaultImage = image_downsize ($options['default_image_id'], 'full' )[0];
}
if (!empty($receptions)) {
    foreach ($receptions as $k => $reception) {
        if ($reception->term_id == $context['page']->term_id) {
            unset($receptions[$k]);
            continue;
        }
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

$core->fastRender('reception-template.twig', $context);