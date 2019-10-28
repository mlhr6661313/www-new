<?php

/* Template Name: 404 */
global $core;

$context = $core->get_context();
$context['breadcrumbs']['0'] = [
    'url' => '',
    'title' => 404
];

$core->fastRender('404.twig', $context);
