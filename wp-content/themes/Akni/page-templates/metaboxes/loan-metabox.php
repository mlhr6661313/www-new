<?php

global $core;
global $post;

$context = $core->get_context();
$config = $core->getConfig();
$showConfig = $config->getConfig('show', 'show');

$context['loan_id'] = $post->ID;
$discountsArgs = $showConfig['discounts'];
$context['discounts'] = get_posts($discountsArgs);
$context['count_discounts'] = count($context['discounts']);
$context['sample_count'] = esc_html(get_post_meta($post->ID, 'sample_count', true ));

ob_start();
$core->render('metaboxes/loan-metabox.twig', $context);
return ob_get_clean();
