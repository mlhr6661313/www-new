<?php
/**
 * File with list of redirections
 */

$actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";

if( $actual_link == 'https://lombard1.com.ua/ru/credit/ru-kredity-pod-zalog-smartfona/' ) {
    wp_redirect( 'https://lombard1.com.ua/ru/reception/kredity-pod-zalog-telefonov-i-planshetov/', 301  );
    exit;
}

if( $actual_link == 'https://lombard1.com.ua/ru/credit/ru-kredity-pod-zalog-plansheta/' ) {
    wp_redirect( 'https://lombard1.com.ua/ru/reception/kredity-pod-zalog-telefonov-i-planshetov/', 301  );
    exit;
}

if( $actual_link == 'https://lombard1.com.ua/ru/credit/ru-kredity-pod-zalog-telefona/' ) {
    wp_redirect( 'https://lombard1.com.ua/ru/reception/kredity-pod-zalog-telefonov-i-planshetov/', 301  );
    exit;
}

if( $actual_link == 'https://lombard1.com.ua/credit/ru-kredity-pod-zalog-telefona/' ) {
    wp_redirect( 'https://lombard1.com.ua/ru/reception/kredity-pod-zalog-telefonov-i-planshetov/', 301  );
    exit;
}

if( $actual_link == 'https://lombard1.com.ua/credit/ru-kredity-pod-zalog-plansheta/' ) {
    wp_redirect( 'https://lombard1.com.ua/ru/reception/kredity-pod-zalog-telefonov-i-planshetov/', 301  );
    exit;
}

if( $actual_link == 'https://lombard1.com.ua/credit/ru-kredity-pod-zalog-smartfona/' ) {
    wp_redirect( 'https://lombard1.com.ua/ru/reception/kredity-pod-zalog-telefonov-i-planshetov/', 301  );
    exit;
}
