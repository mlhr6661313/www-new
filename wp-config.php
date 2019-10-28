<?php
/** Enable W3 Total Cache */
define('WP_CACHE', true); // Added by W3 Total Cache

/**
 * Основные параметры WordPress.
 *
 * Скрипт для создания wp-config.php использует этот файл в процессе
 * установки. Необязательно использовать веб-интерфейс, можно
 * скопировать файл в "wp-config.php" и заполнить значения вручную.
 *
 * Этот файл содержит следующие параметры:
 *
 * * Настройки MySQL
 * * Секретные ключи
 * * Префикс таблиц базы данных
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** Параметры MySQL: Эту информацию можно получить у вашего хостинг-провайдера ** //
/** Имя базы данных для WordPress */
define('DB_NAME', 'www-new');

/** Имя пользователя MySQL */
define('DB_USER', 'root');

/** Пароль к базе данных MySQL */
define('DB_PASSWORD', '');

//define('DB_USER', 'pershii');

/** Пароль к базе данных MySQL */
//define('DB_PASSWORD', 'AAuKLm9cuLvS9que');

/** Имя сервера MySQL */
define('DB_HOST', 'localhost');

/** Кодировка базы данных для создания таблиц. */
define('DB_CHARSET', 'utf8mb4');

/** Схема сопоставления. Не меняйте, если не уверены. */
define('DB_COLLATE', '');

/**#@+
 * Уникальные ключи и соли для аутентификации.
 *
 * Смените значение каждой константы на уникальную фразу.
 * Можно сгенерировать их с помощью {@link https://api.wordpress.org/secret-key/1.1/salt/ сервиса ключей на WordPress.org}
 * Можно изменить их, чтобы сделать существующие файлы cookies недействительными. Пользователям потребуется авторизоваться снова.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '3RWDMo`YI`S?&K$VEv1bzQ=8u_.rOK;oNvT/Oybv^)DE{R=+Hn.-_ChPthv*1I6_');
define('SECURE_AUTH_KEY',  ':2t*zRI=cSmu|7.Rz/KY,RUd_-s4VuNNH6OPWY!H!1fv/4UXX-x shu,l|#5y>}5');
define('LOGGED_IN_KEY',    '.Zo;cL.MMWR?qu,_bLzO[zYY^ph31HH`OEC>`r8Q*u#j*Y3o%;QhD8wJKqPZFjsg');
define('NONCE_KEY',        '{$`$|@A9j;<H:rigU1mp{Ink1l)<&chw#?yg55:mCU-pj5&8#:J`~p8coaBlx8ap');
define('AUTH_SALT',        '_`Mm/F0VdEE%B0.:s84ee_S!KWoyBY7[}b= 8-m+kNmNPKY6P|k845i6^o]02j*U');
define('SECURE_AUTH_SALT', '_yDcH~):^[ ;__eBM`p-?=rVhmI9D7JCGjK6?qJyv4.anL$j)FB*OMIeo9{{Ow8e');
define('LOGGED_IN_SALT',   '_:_m&IG%e{K>e+/EY!B)Cq4lU}}V3SCo}5&jG!x0A6,gt=|*Sp|p{3J?D,oWD)eh');
define('NONCE_SALT',       'j4L> l -5myIizEn42tvH03LE3C](KwInR[Vk(spB#.4F%4p ,9]0}:SD?^M`8wj');

/**#@-*/

/**
 * Префикс таблиц в базе данных WordPress.
 *
 * Можно установить несколько сайтов в одну базу данных, если использовать
 * разные префиксы. Пожалуйста, указывайте только цифры, буквы и знак подчеркивания.
 */
$table_prefix  = 'akni_';

/**
 * Для разработчиков: Режим отладки WordPress.
 *
 * Измените это значение на true, чтобы включить отображение уведомлений при разработке.
 * Разработчикам плагинов и тем настоятельно рекомендуется использовать WP_DEBUG
 * в своём рабочем окружении.
 * 
 * Информацию о других отладочных константах можно найти в Кодексе.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* Это всё, дальше не редактируем. Успехов! */

/** Абсолютный путь к директории WordPress. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Инициализирует переменные WordPress и подключает файлы. */
require_once(ABSPATH . 'wp-settings.php');
