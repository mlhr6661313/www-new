<?php

use BranderMap\Model\View;
use BranderMap\Helper\Data;

$pageView = new View();

if (!isset($context)) {
    $context = [];
}

$lang = $this->_config->getConfig('lang');

foreach ($lang as $config => $value) {
    if (!is_array($value)) {
        $data[$config] = __($value);
    } else {
        foreach ($value as &$val) {
            $val = __($val);
        }
        $data[$config] = $value;
    }
}
global $q_config;
$context['lang'] = json_encode($data);
#filters
$context['serial'] = $this->getSerial();
$context['filters'] = json_encode($this->filters);
$context['filtersData'] = json_encode($this->filtersData);
$context['mapData'] = $this->_mapData;
$context['labels'] = json_encode([
    'what_gets' => __('What gets','BranderMap'),
    'when_works' => __('When works','BranderMap'),
    'lombard_filters' => __('Lombard filters','BranderMap'),
    'now' => __('Now','BranderMap'),
    'weekend' => __('Weekend','BranderMap'),
    'round_the_clock' => __('Round the clock','BranderMap'),
    'every_day' => __('Every day','BranderMap'),
    'more_info' => __('More info','BranderMap'),
    'calculate_text' => __('Calculate loan','BranderMap'),
    'accepts_text' => __('Lombard accepts','BranderMap'),
    'language' => ($q_config['language']) ? $q_config['language'] : 'uk'
]);

# Department map data
$departmentCoordinates = [];
if (!empty($context['mapData'])) {
    $i = 0;
    foreach ($context['mapData'] as $department) {
        if (isset($department->post_meta) && !empty($department->post_meta['department_group'])) {
            $departmentGroup = $department->post_meta['department_group'];
            if ($departmentGroup['lat'] !='' && $departmentGroup['lng'] !='') {
                $departmentData[$i] = [
                    'id' => $department->ID,
                    'name' =>  str_ireplace( '№', '', $department->post_title),
                    'image' => get_the_post_thumbnail_url($department->ID),
                    'link' => get_permalink($department->ID),
                    'address' => $departmentGroup['address'],
                    'receptionNames' => $department->receptionNames,
                    'notes' => isset($departmentGroup['notes']) ? $departmentGroup['notes'] : '',
                    'position'=> [
                        'lat' => (float)$departmentGroup['lat'],
                        'lng' => (float)$departmentGroup['lng'],
                    ]
                ];
                if (isset($departmentGroup['phone'])) {
                    $phones = Data::formatedPhones([
                        ['phone' => $departmentGroup['phone']]
                    ]);
                    $departmentData[$i]['phone'] = !empty($phones[0]['phone']) ? $phones[0]['phone']  : [];
                }

                if ($departmentGroup['days']) {
                    $departmentData[$i]['days'] = $departmentGroup['days'];
                }
                if (!empty($departmentGroup['work_from']) && !empty($departmentGroup['work_to'])) {
                    $departmentData[$i]['work_from'] = $departmentGroup['work_from'];
                    $departmentData[$i]['work_to'] = $departmentGroup['work_to'];
                }
                if ($department->reception && !empty($department->reception))
                {
                    $departmentData[$i]['reception'] = $department->reception;
                }
                if ($department->regions_cities && !empty($department->regions_cities))
                {
                    $departmentData[$i]['city'] = $department->regions_cities[0];
                    $departmentData[$i]['region'] = get_term($department->regions_cities[0], 'regions_cities')->parent;
                }
                #block end
            }
        }
        $i++;
    }
}
$context['departmentData'] = json_encode($departmentData);

ob_start();

$pageView->display('advanced-new-map.twig', $context);
return ob_get_clean();
