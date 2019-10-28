<?php
use BranderMap\Model\View;

$pageView = new View();

if (!isset($context)) {
    $context = [];
}

# Coordinates for single map
$departmentData = [];
if (isset($mapData) && !empty($mapData->post_meta)) {

    if (!empty($mapData->post_meta['department_group'])) {
        $departmentGroup = $mapData->post_meta['department_group'];
        if ($departmentGroup['lat'] !='' && $departmentGroup['lng'] !='') {
            $departmentData[] = [
                'position'=> [
                    'lat' => (float)$departmentGroup['lat'],
                    'lng' => (float)$departmentGroup['lng'],
                ]
            ];
        }
    }
}

ob_start();
if (!empty($departmentData)) {
    $context['departmentData'] = json_encode($departmentData);
    $context['serial'] = $this->getSerial();
    $pageView->display('single-map.twig', $context);
} else {
    echo '';
}

return ob_get_clean();
