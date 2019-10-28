<?php
/* Template Name: FAQ Template */

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

    #faqData
    $faqData = [];
    $faqCategories = [];
    $terms = $model->get_terms('groups');
    if (!empty($terms)) {
        foreach ($terms as $k=>$term) {
            if ($order = get_field('order', 'groups_' . $term->term_id)) {
                $terms[$k]->order = $order;
            }
        }
        $terms = Data::sortFields($terms,'obj');
        $model->setArgs($showConfig['faqs']);
        foreach ($terms as $term) {
            if ($term->count > 0) {
                $model->setSpecialArgs('tax_query', [
                    [
                        "taxonomy" => "groups",
                        "field" => "term_id",
                        "terms" => $term->term_id
                    ]
                ]);
                $model->setPosts();
                $model->formattedACF();
                $termPosts = Data::sortFields($model->getResult(),'obj');
                foreach ($termPosts as $termPost) {
                    if ($termPost->post_title !='' && $termPost->post_content !='') {
                        if (!isset($faqCategories[$term->slug])) {
                            $faqCategories[$term->slug] = $term->name;
                        }
                        if (!isset($faqData[$term->slug])) {
                            $faqData[$term->slug] = [
                                'title' => $term->name,
                                 $termPost
                            ];
                        } else {
                            array_push($faqData[$term->slug], $termPost);
                        }
                    }
                }
            }
        }
    }
    $context['faqData'] = $faqData;
    $context['faqCategories'] = $faqCategories;

    $faqFormData = [
        'content' => [
            'type' => 'FAQ',
            'formTitle' =>'',
            'formDescription' => '',
            'thankYouText' => $context['lang']['thank_you_for_callback_text'],
            'thankYouTextTitle' => $context['lang']['thank_you_for_callback_text_title'],
            'submitText' => $context['lang']['send_text'],
        ],
        'comment' => [
            'show' => 1,
            'order' => 1,
            'type' => 'text',
            'class' => 'form-field comment need_validate',
            'placeholder' => $context['lang']['your_question_text'],
            'error' => $context['lang']['question_error_text'],
        ],
        'email' => [
            'show' => 1,
            'order' => 3,
            'type' => 'email',
            'placeholder' => $context['lang']['email_faq_text'],
            'error' => $context['lang']['email_error_text'],
        ],
        'name' => [
            'show' =>1,
            'order' => 4,
            'placeholder' => $context['lang']['your_name_text'],
            'class' => 'form-field name need_validate',
            'error' => $context['lang']['name_error_text']
        ],
        'phone' => [
            'show' => 1,
            'order' => 2,
            'placeholder' => $context['lang']['phone_text'],
            'error' => $context['lang']['phone_error_text']
        ]
    ];

    $faq_params = serialize($faqFormData);
    $context['forms']['faq'] = do_shortcode("[callback params='{$faq_params}']");
}

$core->fastRender('faq-template.twig', $context);