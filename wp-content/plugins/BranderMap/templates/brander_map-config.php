<?php

use BranderMap\Model\View;

global $wp;
global $post;

$pageView = new View();

if (!isset($context)) {
    $context = [];
}
$context['options'] = (array) get_option('brander-map-settings');
$context['options_group'] = 'brander-map-settings';

$context['labels'] = [
    'map_key' => __('Map key', $this->_config->getPluginName()),
    'save_text' => __('Save',  $this->_config->getPluginName()),
    'title' => __('Brander Map settings',  $this->_config->getPluginName())
];
ob_start();

/**
 * TODO: REWRITE THE CODE BELOW, WHEN HAVE ENOUGH TIME!
 */
?>
<form method="post" action="options.php" class="settings-form">
    <?php
        settings_fields($context['options_group']);
        $pageView->display('brander_map-config.twig', $context);
    ?>
</form>
<?php
return ob_get_clean();
?>

