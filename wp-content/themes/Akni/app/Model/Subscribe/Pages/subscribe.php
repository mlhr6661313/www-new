<?php
use Akni\app\Model\Subscribe\Subscribe;

global $core;
$subscribeModel = Subscribe::getInstance();
$orders = [];

if(isset($_POST['delete'])) {
    if($_POST['id']) {
        $subscribeModel->deleteSubscribe((int)$_POST['id']);
    }
}

$context['statuses'] = [
    __('New'),
    __('Ok'),
    __('Rejected')
];

$context['subscribes'] = $subscribeModel->getSubscribes();
$context['current_url'] = home_url() . '/wp-admin/admin.php?page=' . $_GET['page'];

if(isset($_POST['export'])) {
    $csv = '';

    $columns = [
        'email',
        'date'
    ];

    $data = array();
    foreach ($columns as $column) {
        $data[] = '"'.$column.'"';
    }
    $csv.= implode(',', $data)."\n";

    foreach ($context['subscribes'] as $subscribe) {
        $data = array();
        foreach ($columns as $column) {
            $data[] = '"' . str_replace(array('"', '\\'), array('""', '\\\\'),
                    $subscribe[$column]) . '"';
        }
        $csv.= implode(',', $data)."\n";
    }

    file_put_contents('export_subscribers.csv', $csv);

    $context['file'] = '/wp-admin/export_subscribers.csv';
}

echo $core->renderWithoutOutput('admin/subscribe.twig', $context);

