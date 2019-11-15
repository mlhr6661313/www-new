<?php

namespace Akni\app\core;

use Akni\app\Model\Construct;
use Akni\app\Model\Model;
use Akni\app\Helper\Data;
use Timber\Loader;
use Timber\Timber;
use Akni\app\Model\CalculatorForms\OrderForms;
use Akni\app\Model\CalculatorForms\TechForms;
use Akni\app\Model\Subscribe\Subscribe;
use Akni\app\Model\Callback\Callback;

class CoreTheme extends Timber 
{
    /**
     * TODO::remove this hard solution
     */
    const DEFAULT_HEAD = 'layout-blocks/_head.twig';

    /**
     * TODO::remove this hard solution
     */
    const DEFAULT_FOOT = 'layout-blocks/_foot.twig';

    /**
     * @var Config load configurations method
     */
    private $_config;

    /**
     * @var Construct register parts of wp
     */
    private $_construct;

    /**
     * Model usages
     */
    public $model;

    /**
     * Uri to theme
     * @var $themeUri .
     */
    public $themeUri;

    /**
     * Path to current theme
     * @var $themePath .
     */
    public $themePath;

    public $orderFormModel;
    public $techFormModel;
    public $subscribe;
    public $callback;

    private $context = null;

    /**
     * Core constructor.
     */
    public function __construct()
    {
        $this->themeUri = get_template_directory_uri();
        $this->themePath = get_template_directory();
        add_action('after_setup_theme', [$this, 'setUp']);
        add_action('walker_nav_menu_start_el', [$this, 'setupMenuCustom'], 10, 4);
        add_action('nav_menu_css_class', [$this, 'setupMenuCustomClass'], 10, 4);
        add_action('nav_menu_item_id', [$this, 'setupMenuCustomId'], 10, 4);

        add_filter(
            'acf/fields/google_map/api', [$this, 'setMapApiKey']
        );
        add_action(
            'admin_enqueue_scripts', [&$this, 'addAdminScripts']
        );

        parent::__construct();
    }

    /**
     * @param $name
     * @param $arguments
     * @return mixed
     * This method need for use $this,
     * for default php functions.
     */
    public function __call($name, $arguments)
    {
        if (function_exists($name)) {
            return call_user_func_array($name, $arguments);
        }
        return false;
    }

    /**
     * @return Model
     * Model getter
     */
    public function getModel()
    {
        return $this->model;
    }


    /**
     * @return Config
     * Config getter
     */
    public function getConfig()
    {
        return $this->_config;
    }

    /**
     * Setup all main classes
     */
    public function setUp()
    {
        $this->_config = new Config();
        $this->_construct = new Construct();
        $this->model = new Model();
        add_filter('timber_context', [$this, 'addToContext']);
        if(is_admin()) {
            $this->orderFormModel = OrderForms::getInstance();
            $this->techFormModel = TechForms::getInstance();
            $this->subscribe = Subscribe::getInstance();
            $this->callback = Callback::getInstance();
        }
    }

    /**
     * @param $data
     * @return mixed
     * return all variables added to context
     */
    public function addToContext($data)
    {

        if(!$this->context) {
            $data['currentPageId'] = get_the_ID();

            #lang
            $data['lang'] = [];
            $langConfig = $this->_config->getConfig('lang');
            foreach ($langConfig as $config => $value) {
                if (!is_array($value)) {
                    $data['lang'][$config] = __($value);
                } else {
                    foreach ($value as &$val) {
                        $val = __($val);
                    }
                    $data['lang'][$config] = $value;
                }
            }
            $data['lang']['copyright_text'] = sprintf( $data['lang']['copyright_text'], date( 'Y' ) );
            $data['map_config'] = do_shortcode("[brander_map_config]");

            #site urls
            $data['site_url'] = $this->get_site_url();
            $data['ajax_url'] = $this->get_site_url() . "/wp-admin/admin-ajax.php";
            $data['logo_url'] = $data['site_url'];

            #theme_options
            $data['theme_options'] = (array)get_option('ice-theme-settings');

            #menus
            $data['menus'] = $this->setMenus();
            $data['menus']['products_and_services'] = $this->model->getMenuCategories();

            #language
            $data['language_switcher'] = $this->langugeSwitcher();
            $data['current_lang']= 'ru';
            if (function_exists('qtrans_getLanguage')) {
                $data['current_lang']= qtrans_getLanguage();
            }

            #contacts
            if ($data['theme_options']['contact_page_id']) {
                $data['contacts'] = $this->setContacts($data['theme_options']['contact_page_id']);
            } else {
                $data['contacts'] = [];
            }

            #allCredits
            if ($data['theme_options']['all_credits_id']) {
                $data['allCredits'] = $this->setAllCredits($data['theme_options']['all_credits_id']);
            } else {
                $data['allCredits'] = [];
            }

            #config_page
            if ($data['theme_options']['config_page_id']) {
                $data['config_page'] = $this->setConfigPage($data['theme_options']['config_page_id']);
            } else {
                $data['config_page'] = [];
            }
            $data['header_receptions'] = $this->setHeaderReception();
            $data['theme_options']['logo_alt'] = customTranslate($data['theme_options']['logo_alt']);
            $data['theme_options']['logo_title'] = customTranslate($data['theme_options']['logo_title']);
            $data['search_form'] = get_search_form(false);

            $data = array_merge($data, $this->addCalculator($data));
            $this->context = $data;
        }
        return $this->context;
    }

    /**
     * Method to set contacts
     * @param $contactsId
     * @return array
     */
    public function setContacts($contactsId)
    {
        if (get_page_template_slug($contactsId) =='page-templates/contact-page.php') {
            $contactData = [];
            $model = $this->getModel();
            $contact = get_post($contactsId);
            $model->setResult([$contact]);
            $model->setPostUrls();
            $contact = $model->getResult()[0];
            $contactData['url'] = $contact->post_url;
            return  $contactData;
        }
        return [];
    }

    /**
     * @param $max_num_pages
     * @param $paged
     * @return string
     */
    public function kapital_pagenavi($max_num_pages, $paged) {
        $lang_config = $this->_config->getConfig('lang');
        $big = 999999999;
        $args = array(
            'base' => str_replace( $big, '%#%', get_pagenum_link( $big ) )
        ,'format' => ''
        ,'current' => $paged
        ,'total' => $max_num_pages
        ,'prev_text'    => __( $lang_config['prev_arrow_text'])
        , 'next_text'    => __( $lang_config['next_arrow_text']),
        );
        $result = paginate_links( $args );
        $result = str_replace( '/page/1/', '', $result );
        return $result;
    }

    /**
     * Method to set all credits
     * @param $allCreditsId
     * @return array
     */
    public function setAllCredits($allCreditsId)
    {
        if (get_page_template_slug($allCreditsId) =='page-templates/credits_catalog-page.php') {
            $allCreditsData = [];
            $model = $this->getModel();
            $allCredits = get_post($allCreditsId);
            $model->setResult([$allCredits]);
            $model->setPostUrls();
            $allCredits = $model->getResult()[0];
            $allCreditsData['url'] = $allCredits->post_url;
            return  $allCreditsData;
        }
        return [];
    }

    /**
     * Method to set contacts
     * @param $configPageId
     * @return array
     */
    public function setConfigPage($configPageId)
    {
        if (get_page_template_slug($configPageId) == 'page-templates/config-page.php') {
            $model = $this->getModel();
            $config = get_post($configPageId);
            $model->setResult([$config]);
            $model->formattedACF();
            $config = $model->getResult()[0];
            if($config->acf) {
                if (isset($config->acf['header_phones']) && !empty($config->acf['header_phones']['value'])) {
                    $config->acf['header_phones'] = Data::formatedPhones($config->acf['header_phones']['value']);
                }
                if (isset($config->acf['footer_phones']) && !empty($config->acf['footer_phones']['value'])) {
                    $config->acf['footer_phones'] = Data::formatedPhones($config->acf['footer_phones']['value']);
                }
                return $config->acf;
            }
        }
        return [];
    }


    /**
     * This format date.
     * @param $date
     * @return string
     */
    public function specialDateFormat($date)
    {
        $d = date('d', strtotime($date));
        $m = date('m', strtotime($date));
        $y = date('Y', strtotime($date));
        $month = __($this->_config->getConfig(
            "date",
            "style_config"
        )
        ['months'][$m]);
        $formated_date = $d . ' ' . mb_strtolower($month, 'UTF-8') . ' ' . $y;
        return $formated_date;
    }

    /**
     * @param $api
     * @return mixed
     * This set google map api
     */
    public function setMapApiKey($api)
    {
        $api['key'] = 'AIzaSyDVZ8DqPNhFy_iRlDZe-YXJHR3i7XDsq9E';
        return $api;
    }


    /**
     * This function add theme.
     */
    public function addAdminScripts()
    {
        wp_enqueue_script(
            'acf_translate', $this->themeUri . '/public/js/acf_translate.js', ['jquery']
        );
    }

    public function addCalculator($data)
    {
        $context = $data;
        $model  = $this->model;
        $showConfig = $this->_config->getConfig('show', 'show');
        #calculators
        $calcTerms = get_terms([
            'taxonomy' => 'pledge',
            'hide_empty' => true,
        ]);

        $tabs = [];

        if(!empty($calcTerms)) {
            foreach ($calcTerms as $term) {
                $tabs[] = [
                    'id' => $term->term_id,
                    'name' => $term->name,
                    'slug' => $term->slug
                ];
            }
        }
        $context['tabs'] = $tabs;

        foreach ($tabs as $tab) {
            $model->setArgs($showConfig['tariffs']);
            $model->setSpecialArgs('tax_query', array(
                array(
                    "taxonomy" => "pledge",
                    "field" => "id",
                    "terms" => $tab['id']
                )
            ));

            $model->setPosts();
            $model->setPostUrls();
            $model->formattedACF();
            $credits = $model->getResult();
            $contents = [];
            if(!empty($credits)){
                foreach($credits as $key => $credit){
                    if(empty($proba = get_post_meta($credit->ID,'proba')[0])) {
                        unset($credits[$key]);
                    } else{
                        foreach($proba as $val) {
                            if(array_search($val, $contents) === false) {$contents[] = $val;}
                        }
                    }
                }
            }
            $context['samples'][$tab['id']] = json_encode($contents);
        }

        $options = (array)get_option('akni-tech-settings');
        $context['tech_options'] = explode(',', $options['manufacturers']);

        /* $context['tech_array'] = [
            "",    
            "",    
        ]; */

        $context['send_form'] = $this->renderWithoutOutput('calculator-forms/send_form.twig', $context);
        $context['send_form_to_1c'] = $this->renderWithoutOutput('calculator-forms/send_form_to_1c.twig', $context);
        $context['other_form'] = $this->renderWithoutOutput('calculator-forms/other_tech_form.twig', $context);
        $context['mobile_form'] = $this->renderWithoutOutput('calculator-forms/mobile_tech_form.twig', $context);
        $context['tech_select'] = $this->renderWithoutOutput('calculator-forms/tech_select.twig', $context);
        $context['order_form'] =  $this->renderWithoutOutput('calculator-forms/order_form.twig', $context);
        $context['file_max_size'] = (string)ini_get('upload_max_filesize');
        $context['calculator_form'] = $this->renderWithoutOutput('modules/_calc-block.twig', $context);
        $context['authorization_page'] = $this->renderWithoutOutput('authorization_page.twig', $context);

        return $context;
    }

    /**
     *This is temporary solution of lang switcher.
     * Rewrite it and update as soon as possible.
     * @return string
     */
    private final function langugeSwitch()
    {
        global $q_config;
        $href ='';
        $aText = '';
        if(is_404()) $url = get_option('home'); else $url = '';
        foreach(qtranxf_getSortedLanguages() as $language) {
            if($language != $q_config['language']) {
                $aText = $q_config['language_name'][$language];
                $href = qtranxf_convertURL($url, $language, false, true);
            }
        }
        $switcher = '<a class="lang-switcher" rel="nofollow" href="' . $href . '">' . $aText . '</a>';
        return $switcher;
    }

    private final function langugeSwitcher()
    {
        global $q_config;
        $switcher ='';

        $id = 'switcher';
        $id .= '-chooser';

        if(is_404()) {
            $url = get_option('home');
        } else  {
            $url = '';
        }

        $switcher .= PHP_EOL.'<ul class="language-switcher qtranxs_language_chooser" id="'.$id.'">'.PHP_EOL;

        foreach(qtranxf_getSortedLanguages() as $language) {

            $alt = $language ;
            $classes = array('lang-'.$language);

            if($language == $q_config['language']) {
                $classes[] = 'active';
            }

            $switcher .= '<li class="'. implode(' ', $classes) .'" data-am-lang>';
            if($language == $q_config['language']) {
                $switcher .=  '<span class="lang-switcher-link active">'.$q_config['language_name'][$language].'</span>';
            } else {
                $switcher .= '<a href="'.qtranxf_convertURL($url, $language, false, true).'"';
                $switcher .=  ' hreflang="'.$language.'"';
                $switcher .=  ' title="'.$alt.'"';
                $switcher .=  ' class="lang-switcher-link"';
                $switcher .=  '>';
                $switcher .=  ''.$q_config['language_name'][$language].'';
                $switcher .=  '</a>';

            }
            $switcher .=  '</li>'.PHP_EOL;
        }

        $switcher .=  '</ul>'.PHP_EOL;
        return $switcher;
    }
    /**
     * Method for adding new menu to context.
     */
    private function setMenus() {
        $menus = [];
        $menu_config = $this->_config->getConfig('menu_config','style_config');
            $menus['primary_header_menu'] =  $this->wp_nav_menu(
            $menu_config['primary_header_menu']
        );

        $footerMenuLocation  = get_nav_menu_locations()['primary_footer_menu'];
        if (isset($footerMenuLocation)) {
            $menus['primary_footer_menu'] = wp_get_nav_menu_items(
                $footerMenuLocation
            );
        }
        return $menus;
    }

    /**
     * Method for customization  menu .
     */
    public function setupMenuCustom( $output, $item,  $args,  $depth ){

        $theme_options = (array)get_option('ice-theme-settings');

        if($item->object_id == $theme_options['all_credits_id'] ) {

            $header_receptions = $this->setHeaderReception();
            $output .=' <div class="header-credits__dropdown"> ';
			if( !empty($header_receptions) ){
                $output .='<div class="reception__box">';
                $output .='<div class="reception__box_wrap">';
                $output .='    <ul class="reception__list">';
                foreach ( $header_receptions as  $reception ) {
                    $output .='<li class="reception-item swiper-slide">';
                    $output .=' <a href="'. $reception->link .'"> ';
					$output .='	<span><img src="'. $reception->image['url'] .'"></span>';
                    $output .='	<div data-title="h3" class="reception-item__name">'. $reception->shown_name .'</div>';
                    $output .='</a>';
                    $output .='</li>';
                }
                $output .='    </ul>';
                $output .='<div class="prev disabled"></div><div class="next"></div>';
                $output .='</div>';
                $output .='</div>';
            }
            $output .=' </div>';
        }
        return $output;
    }

    /**
     * Method for customization  class of element menu .
     */
    public function setupMenuCustomClass( $classes, $item,  $args,  $depth ){

        $theme_options = (array)get_option('ice-theme-settings');
        if($item->object_id == $theme_options['all_credits_id'] ) {
            array_push($classes, "header-credits");
        }
        return $classes;
    }

    /**
     * Method for customization  id of element menu .
     */
    public function setupMenuCustomId( $id, $item,  $args,  $depth ){

        $theme_options = (array)get_option('ice-theme-settings');
        if($item->object_id == $theme_options['all_credits_id'] ) {
            $id = 'credits';
        }
        return $id;
    }
    /**
     * TODO: override this, and all receptions call in template
     * @return array
     */
    public function setHeaderReception()
    {
        $receptions = get_terms([
            'taxonomy' => 'reception',
            'hide_empty' => true,
        ]);

        if (!empty($receptions)) {
            foreach ($receptions as $k => $reception) {
                $reception->shown_name =  get_field('subtitle', 'reception_'.$reception->term_id) !=''
                    ? get_field('subtitle', 'reception_'.$reception->term_id) : $reception->name;
                $reception->image = get_field('image', 'reception_'.$reception->term_id);
                $reception->link = get_category_link($reception->term_id);
                $reception->main = get_field('main', 'reception_'.$reception->term_id);
                $reception->order = get_field('order', 'reception_'.$reception->term_id);
            }
        }
        return Data::sortFields($receptions, 'obj');
    }

    /**
     * Render without output function.
     * @api
     * @param array|string   $filenames
     * @param array   $data
     * @param bool    $expires
     * @param string  $cache_mode
     * @return bool|string
     */
    public static function renderWithoutOutput( $filenames, $data = array(), $expires = false, $cache_mode = Loader::CACHE_USE_DEFAULT ) {
        $output = self::fetch($filenames, $data, $expires, $cache_mode);
        return $output;
    }

    /**
     * TODO::REWRITE THIS!
     *
     * Method to render page
     *
     * @param $filenames
     * @param array $data
     * @param bool $expires
     * @param string $cache_mode
     * @param string $head
     * @param string $foot
     * @return bool
     */
    public function fastRender($filenames, $data = array(), $expires = false, $cache_mode = Loader::CACHE_USE_DEFAULT, $head = self::DEFAULT_HEAD, $foot = self::DEFAULT_FOOT)
    {
        self::render([$head]);
        wp_head();
        self::render($filenames, $data, $expires, $cache_mode);
        wp_footer();
        self::render([$foot]);
        return true;
    }
}