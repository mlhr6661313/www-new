<?php
use Akni\app\Model\CalculatorForms\TechForms;
global $core;
$orderModel = TechForms::getInstance();
$orders = [];
$options = (array) get_option('akni-tech-settings');
if (isset($_POST['update'])) {
    if ($_POST['id'] && $_POST['status']) {
        $orderModel->updateStatus((int)$_POST['id'], (int)$_POST['status']);
    }
}
if(isset($_POST['delete'])) {
    if($_POST['id']) {
        $orderModel->deleteOrder((int)$_POST['id']);
    }
}
?>
<?php
$context['statuses'] = [
__('New'),
__('Ok'),
__('Rejected')
];

$context['orders'] = $orderModel->getOrders();
$context['current_url'] = home_url() . '/wp-admin/admin.php?page=' . $_GET['page'];

echo $core->renderWithoutOutput('admin/admin-tech-order.twig', $context); ?>
<div class="msgs">
    <?php if ($_REQUEST['settings-updated']):?>
        <span class="success-msg"><?php echo 'updated';?></span>
    <?php endif;?>
</div>
<div>
    <form method="post" action="options.php" class="settings-form">
        <?php
        settings_fields('akni-tech-settings');
        ?>
            <span>Производители (через запятую)</span>
            <textarea
                placeholder="Производители"
                name="akni-tech-settings[manufacturers]"
                type="text"
                required
                cols="50"
                rows="7"
            ><?php echo $options['manufacturers']?></textarea>
            <input type="submit" value="Обновить" />
    </form>
</div>