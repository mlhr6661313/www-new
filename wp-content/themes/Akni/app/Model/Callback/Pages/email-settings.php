<?php

global $core;
$context = [];
$context['labels'] = [
    'sender_name' => __('Sender Name'),
    'sender_email'=> __('Sender Email'),
    'recipient'   => __('Callback, Gold/Silver Mail Recipient'),
    'vacancy'   => __('Vacancy Mail Recipient'),
    'tech'   => __('Tech Mail Recipient'),
    'subscribe'   => __('Subscribe Mail Recipient'),
    'submit_text' => __('Save changes'),
    'success_msg' => __('All changes saved.'),
    'page_title'  => __('Mail Settings')
];
$context['options'] = (array) get_option('akni-callback-settings');
?>

<div class="msgs">
    <?php if ($_REQUEST['settings-updated']):?>
        <span class="success-msg"><?php echo $context['labels']['success_msg'];?></span>
    <?php endif;?>
</div>

<h3><?php echo $context['labels']['page_title'];?></h3>
<form method="post" action="options.php" class="settings-form">
    <?php
    settings_fields('akni-callback-settings');
    echo $core->renderWithoutOutput('admin/email-settings.twig', $context);
    ?>
</form>