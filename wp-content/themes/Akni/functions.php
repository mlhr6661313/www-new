<?php
/**
 * @global \Akni\app\core\CoreTheme
 */
global $core;

use Akni\app\Model\Blog;
use Akni\app\Model\MainAjax;
use \Akni\app\Model\Calculator;
use Akni\app\Model\LoanMetabox;
use Akni\app\Model\TariffMetabox;
use Akni\app\core\CoreTheme;
use Akni\app\Helper\Data;

if (file_exists($redirections = __DIR__ . '/redirections.php')) {
    require_once $redirections;
}else{
    _e('Install composer for current work');
    exit;
}

/**
 * Use composer
 */
if (file_exists($composer_autoload = __DIR__ . '/vendor/autoload.php')) {
    require_once $composer_autoload;
}else{
    _e('Install composer for current work');
    exit;
}

$core = new CoreTheme();
$calculator = new Calculator($core);
if(is_admin()) {
    $mainAjax = new MainAjax($core);
}
/**
 * TODO::Move all functions, that located below to theme classes.
 */

/**
 * Special block for translating default plugins.
 * @param $text
 * @return WP_Post
 */
function customTranslate($text){
    $str = $text;
    $text = qtranxf_split($text);
    if(qtrans_getLanguage()=="ua"){
        $str = $text['ua'];
    }
    elseif(qtrans_getLanguage()=="ru"){
        $str = $text['ru'];
    }
    elseif(qtrans_getLanguage()=="en"){
        $str = $text['en'];
    }
    return $str;
}

include_once("lombard_calculator.php");

/**
 * SEO SOLUTIONS
 */
function addSeoScript() {
    wp_enqueue_script( 'seo', '/wp-content/themes/Akni/public/js/switch.js' );
}
add_action( 'admin_enqueue_scripts', 'addSeoScript' );

remove_action('wp_head', 'wp_shortlink_wp_head');

/**
 * Remove plugins notices solution
 */
remove_action( 'load-update-core.php', 'wp_update_plugins' );
add_filter( 'pre_site_transient_update_plugins', create_function( '$a', "return null;" ) );
wp_clear_scheduled_hook( 'wp_update_plugins' );

/**
 * Disable file type check
 */
function DdisableMimeCheck( $data, $file, $filename, $mimes ) {
    $wp_filetype = wp_check_filetype( $filename, $mimes );

    $ext = $wp_filetype['ext'];
    $type = $wp_filetype['type'];
    $proper_filename = $data['proper_filename'];

    return compact( 'ext', 'type', 'proper_filename' );
}
add_filter( 'wp_check_filetype_and_ext', 'DdisableMimeCheck', 10, 4 );

add_action( 'admin_init', 'addLoanMetabox');
function addLoanMetabox()
{
    new LoanMetabox();
}

//add_action( 'admin_init', 'addTariffMetabox');
function addTariffMetabox()
{
    new TariffMetabox();
}

function rrl_prevent_server_prefix( $settings )
{
    $settings['strip_server_prefix_on_all_links']     = FALSE;
    $settings['title']     = FALSE;
    return $settings;
}

add_filter( 'rrl_settings', 'rrl_prevent_server_prefix', 10, 1);

function wpay_search() {
    $args = array(
        'posts_per_page' => 4,
        'post_type' => array('page', 'blog', 'faq', 'credit', 'department', 'aktsii'),
        'orderby' => 'post_date',
        'order' => 'DESC',
        's' => $_POST['search'],
        'sentence' => 1,
    );
    $html ='';
    $url = get_site_url() . '?s=' . $_POST['search'] ;
    $search = new WP_Query( $args );

    if(!empty($search->posts)){
        foreach($search->posts as $val){
            $html .= '<a' . ' class="item"' .  ' href="'. get_permalink ($val->ID) .'" >';
            $html .= '<div class ="search-item">';
            $html .= '<h3 class="search-title">' . customTranslate( __($val->post_title)) . '</h3>';

            if($val->post_content){
                $val->post_content =  customTranslate(mb_strimwidth(Data::cleanString(__($val->post_content)),0,40,'...'));
            }
            else{
                $val->post_content =  customTranslate(__('<!--:ru-->Перейдите на страницу...<!--:--><!--:ua-->Перейдіть на сторінку...<!--:-->'));
            }
            $html .= '<p>' . $val->post_content . '</p>';
            $html .= '</div>';
            $html .= '</a>';
        }
        $html .= '<a class="button" href="'. $url . '">'.customTranslate('<!--:ru-->Ко всем результатам поиска<!--:--><!--:ua-->До всіх результів пошуку<!--:-->').'</a>';
    }
    else{
        $html = '<h3>' . sprintf( customTranslate(__('<!--:ru-->Сожалеем, поиск по запросу <strong>«%s»</strong> не дал результатов<!--:--><!--:ua-->Шкодуємо, пошук за запитом, «%s» не дав результатів <!--:-->')), $_POST['search']) .'</h3>';
    }
    echo $html;
}
add_action( 'wp_ajax_wpay_search', 'wpay_search' );
add_action( 'wp_ajax_nopriv_wpay_search', 'wpay_search' );

function taxonomy_slug_rewrite($wp_rewrite) {
    $actionsPageId = $GLOBALS['options']['actions_page_id'];
    $post = get_post($actionsPageId);
    $actionsPageUrl = $post->post_name;
    $url = $actionsPageUrl.'/?$';
    $urlPagin = $actionsPageUrl.'/page/([0-9]{1,})/?';
    $rules[$url] = 'index.php?page_id='. $GLOBALS['options']['actions_page_id'];
    $rules[$urlPagin] = 'index.php?page_id='. $GLOBALS['options']['actions_page_id']. '&paged=$matches[1]';

    $wp_rewrite->rules = $rules + $wp_rewrite->rules;
}
add_filter('generate_rewrite_rules', 'taxonomy_slug_rewrite');


function  removePaginationUrls() {
    global $wp;
    $current_url =  home_url( $wp->request  );
    $url_without_page =  stristr($current_url, '/page/', true);

    if ($url_without_page) {
        wp_redirect($url_without_page . "/", 301);
        exit;
    }

}
add_action( 'template_redirect', 'removePaginationUrls' );



remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_head', 'qtranxf_wp_head_meta_generator');
remove_action('wp_head', 'qtranxf_wp_head');
remove_action('wp_print_styles', 'print_emoji_styles');

function remove_wpseo_head_actions() {
    // If the Yoast plugin isn't installed, don't run this
    if ( ! is_callable( array( 'WPSEO_Frontend', 'get_instance' ) ) ) {
        return;
    }
    // Get the Yoast instantiated class
    $yoast = WPSEO_Frontend::get_instance();
    remove_action( 'wpseo_head', array( $yoast, 'adjacent_rel_links' ), 21 );
}
remove_wpseo_head_actions();

function qtranxf_head(){
    global $q_config;

    // skip the rest if 404
    if(is_404()) return;

    global $wp;
    $current_url = home_url( add_query_arg( array(), $wp->request ) );
    // set links to translations of current page
    foreach($q_config['enabled_languages'] as $lang) {
        if (!empty($q_config['locale_html'][$lang])){
            $hreflang = $q_config['locale_html'][$lang];
        } else{
            $hreflang = $lang;
        }

        if (isset($q_config['default_language'])
            && isset($q_config['language_name'][$q_config['default_language']])
        ) {
            $hreflang .= "-{$q_config['language_name'][$q_config['default_language']]}";
        }

        echo '<link rel="alternate"  hreflang="'.$hreflang.'" href="'.qtranxf_convertURL($current_url, $lang).'" />'.PHP_EOL;
    }
}
add_action('wp_head', 'qtranxf_head');

// define the wpseo_title callback
function filter_wpseo_title( $wpseo_replace_vars ) {
    // make filter magic happen here...
    global $post;

    if ( $post->post_type === 'department' ) {
        $departmentMeta = get_post_meta($post->ID, 'department_group', true);
        $address = $departmentMeta['address'] ? customTranslate($departmentMeta['address']) : '';
        $phone = $departmentMeta['phone'];
        $pregs = array('{$address$}', '{$phone$}');
        $meta_values   = array($address, $phone);
        return  str_replace( $pregs, $meta_values, $wpseo_replace_vars);
    }
    return $wpseo_replace_vars;
};

// add the filter
add_filter( 'wpseo_title', 'filter_wpseo_title', 10, 1 );

// define the wpseo_metadesc callback
function filter_wpseo_metadesc( $wpseo_replace_vars ) {
    // make filter magic happen here...
    global $post;

    if ( $post->post_type === 'department' ) {
        $departmentMeta = get_post_meta($post->ID, 'department_group', true);
        $address = $departmentMeta['address'] ? customTranslate($departmentMeta['address']) : '';
        $phone = $departmentMeta['phone'];
        $pregs = array('{$address$}', '{$phone$}');
        $meta_values   = array($address, $phone);
        return  str_replace( $pregs, $meta_values, $wpseo_replace_vars);
    }
    return $wpseo_replace_vars;
};

// add the filter
add_filter( 'wpseo_metadesc', 'filter_wpseo_metadesc', 10, 1 );


function getBlogArticles()
{
    global $core;
    $blogModel  = new Blog();
    $config = $core->getConfig();
    $showConfig = $config->getConfig('show', 'show');
    $showConfig['posts']['posts_per_page'] = -1;
    $args = $showConfig['posts'];
    $blogModel->setArgs($args);
    $blogModel->setPosts();
    $blogModel->setMainThumbnailUrls();
    $blogModel->setPostUrls();
    $blogModel->formattedACF();
    $blogModel->setBlogFormateDate();
    $blogModel->setBlogActions();
    $newsPosts = $blogModel->getResult();
    $context = $core->get_context();
    $context['articles'] = $newsPosts;
    return $core->renderWithoutOutput('articles-template.twig', $context);
}

add_shortcode('get_blog_articles', 'getBlogArticles');