<?php

use BranderMap\Model\View;

global $wp;
global $post;

$pageView = new View();

if (!isset($context)) {
    $context = [];
}

$context['days'] = [
    __('Monday'),
    __('Tuesday'),
    __('Wednesday'),
    __('Thursday'),
    __('Friday'),
    __('Saturday'),
    __('Sunday')
];

$context['messages'] = [
  'required' => __('This field Required', 'BranderMap'),
  'lat' => __('Latitude:', 'BranderMap'),
  'address' => __('Address:', 'BranderMap'),
  'notes' => __('Notes', 'BranderMap'),
  'phone' => __('Phone', 'BranderMap'),
];

$context['nonce'] = wp_nonce_field('department_check', 'department_check_value', true);
$context['department_group'] = get_post_meta($post->ID, 'department_group', true);

ob_start();
$pageView->display('modules/_department_metabox.twig', $context);
return ob_get_clean();