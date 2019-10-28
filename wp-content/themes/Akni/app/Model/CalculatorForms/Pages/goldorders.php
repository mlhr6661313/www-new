<?php

use Akni\app\Model\CalculatorForms\OrderForms;
global $core;
$orderModel = OrderForms::getInstance();
$orders = [];
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

$context['statuses'] = [
    __('New'),
    __('Ok'),
    __('Rejected')
];

$context['orders'] = $orderModel->getOrders();
$context['current_url'] = home_url() . '/wp-admin/admin.php?page=' . $_GET['page'];

echo $core->renderWithoutOutput('admin/admin-orders.twig', $context);

