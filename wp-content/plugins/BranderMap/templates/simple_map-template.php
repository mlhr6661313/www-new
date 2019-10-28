<?php
use BranderMap\Model\View;

$pageView = new View();

if (!isset($context)) {
    $context = [];
}

# Coordinates for simple map
$departmentCoordinates = [];

if (isset($mapData) && !empty($mapData)) {
    foreach ($mapData as $department) {
        if (isset($department->post_meta) && !empty($department->post_meta['department_group'])) {
            $departmentGroup = $department->post_meta['department_group'];
            if ($departmentGroup['lat'] !='' && $departmentGroup['lng'] !='') {
                $departmentCoordinates[] = [
                    'position'=> [
                        'lat' => (float)$departmentGroup['lat'],
                        'lng' => (float)$departmentGroup['lng'],
                    ]
                ];
            }
        }
    }
}

ob_start();
if (!empty($departmentCoordinates)) {
    $context['departmentCoordinates'] = json_encode($departmentCoordinates);
    $context['serial'] = $this->getSerial();
    $pageView->display('simple-map.twig', $context);
} else {
    echo '';
}

return ob_get_clean();
