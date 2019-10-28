<?php

global $core;
global $post;

$context = $core->get_context();
$config = $core->getConfig();

$context['tariff_id'] = $post->ID;
$context['time_periods_count'] = esc_html(get_post_meta($post->ID, 'time_periods_count', true ));

ob_start();
$core->render('metaboxes/tariff-metabox.twig', $context);
return ob_get_clean();
