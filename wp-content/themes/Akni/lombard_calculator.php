<?php
/**
 * Created by PhpStorm.
 * User: ice-and-fire
 * Date: 07.06.16
 * Time: 13:58
 */
add_action('admin_enqueue_scripts', 'add_calc_js');
add_action('admin_enqueue_scripts', 'styles');
function add_calc_js(){
    wp_enqueue_script('calculator_admin',  get_template_directory_uri(). '/public/js/calculator_admin.js');
}
function styles() {
    wp_register_style( 'admin-styles', get_template_directory_uri(). '/public/css/admin.css' );
    wp_enqueue_style(  'admin-styles' );
}

//Create metabox with fields
add_action( 'admin_init', 'credit_fields' );
function credit_fields(){
    add_meta_box( 'credit_meta_box',
        'Credit Fields',
        'display_test_meta_box',
        'tariff', 'normal', 'high'
    );
}

add_action( 'wp_ajax_createFirstTable', 'createFirstTable');
function createFirstTable(){
    global $core;
    $config = $core->getConfig();
    $lang_config = $config->getConfig('lang');
    echo get_the_ID();
    $price = get_post_meta( $_POST['cr_id'], 'price', true );
    $proba = get_post_meta( $_POST['cr_id'], 'proba', true );
    $args = array(
        "posts_per_page" => -1,
        "post_type" =>  "discount",
        "post_status" => "publish",
        "orderby"   =>  "post_date",
        "order"     =>  "DESC",

    );
    $discounts = get_posts( $args  );
    if($_POST['call']){
        $htm='';
        $rows = $_POST['row'] + 2;
        if($_POST['call'] > 400){
            $call = 400;
        }
        else {
            $call = $_POST['call'];
        }
        $htm.='<tr>';
        $htm.='<th>'.customTranslate($lang_config['metal_proba_text']).'</th>';
        $htm.='<th>'.customTranslate($lang_config['none_status_text']).'</th>';
        foreach($discounts as $discount){
            $htm.='<th>'.customTranslate($discount->post_title) . '</th>';
        }
        $htm.='</tr>';
        for($i=0;$i<$call;$i++){

            $htm.='<tr>';
            for($k=0;$k < $rows; $k++){
                $priceID = $discounts[$k]->ID;
                if($k==0){
                    $htm.='<td>';
                    $htm.='<input ' .  'min="1" step="1"' .  'value="'.  $proba[$i] .'" name ="'.'proba['.$i.']'.'"/>';
                    $htm.='</td>';
                }else{
                    $htm.='<td>';
                    $htm.='<input  type="number"' .  'min="0" step="any"' .  'value="'. $price[$i][$k] .'" name ="'.'price['.$i.']['.$k.']'.'"/>';
                    $htm.='</td>';
                }

            }
            $htm.='</tr>';
        }

        echo $htm;
    }
    wp_die();
}
add_action( 'wp_ajax_createSecondTable', 'createSecondTable');
function createSecondTable(){
    global $core;
    $config = $core->getConfig();
    $lang_config = $config->getConfig('lang');
    $from_field = get_post_meta( $_POST['cr_id'], 'from_field', true );
    $to_field = get_post_meta( $_POST['cr_id'], 'to_field', true );
    $sum = get_post_meta( $_POST['cr_id'], 'sum', true );
    $rate = get_post_meta( $_POST['cr_id'], 'rate', true );
    $args = array(
        "posts_per_page" => -1,
        "post_type" =>  "discount",
        "post_status" => "publish",
        "orderby"   =>  "post_date",
        "order"     =>  "DESC",

    );
    $discounts = get_posts( $args  );
    if($_POST['money'] && $_POST['time']){
        $htm='';
        if($_POST['money'] > 100){
            $money = 100;
        }
        else {
            $money= $_POST['money'];
        }
        if($_POST['time'] > 100){
            $time = 100;
        }
        else {
            $time = $_POST['time'];
        }
        if($time > 0 && $money > 0){
            $htm.='<tr>';
            $htm.='<td class="caption" >'.customTranslate($lang_config['amount_of_credit_text']).'</th>';
            $htm.='<td class="caption"  colspan ="'. $time. '">'.customTranslate($lang_config['none_status_text']).'</th>';

            foreach($discounts as $discount){
                $htm.='<td class="caption"  colspan="'. $time . '">'.customTranslate($discount->post_title) . '</th>';
            }
            $htm.='</tr>';
            for($i=0; $i<($money+1); $i++){
                if($i==0){
                    $htm.='<tr>';
                    $htm.='<td></td>';
                    for($j=0;$j<(count($discounts)+1);$j++){
                        for($k=0;$k<$time;$k++){
                            $htm.='<td><span >'.customTranslate($lang_config['credit_period']).'</span><br/>';
                            $htm.='<input class="from_field['.$k.']" style="width:75px" type="number"'  ."min=1 " ." "  . 'value="'. $from_field[$k][$j]  .'"'. 'name ="'.'from_field['.$k.']['.$j.']'.'"/>'.'-'. '<input class="to_field['.$k.']" style="width:75px" type="number"' ."min=1" ." ".  'value="'. $to_field[$k][$j] .'"'. 'name ="'.'to_field['.$k.']['.$j.']'.'"/>';
                            $htm.='</td>';
                        }

                    }
                    $htm.='</tr>';
                }
                else{
                    $htm.='<tr>';
                    $htm.='<td>'.customTranslate($lang_config['before_text']).'<input type="number" name="sum['.$i.']" value="'.$sum[$i] .'"></td>';
                    for($j=0;$j<(count($discounts)+1);$j++){
                        for($k=0;$k<$time;$k++){
                            $htm.='<td>';
                            $htm.='<span class="time-'. $k .'">ставка</span><br/>';
                            $htm.='<input style="width:75px" min="0" step="0.001" type="number"'  ." "  . 'value="'. $rate[$i][$j][$k] .'"'. 'name ="rate['.$i.']['.$j.']['.$k.']"';
                            $htm.='</td>';
                        }

                    }
                    $htm.='</tr>';
                }
            }

        }
        echo $htm;
    }
    wp_die();
}
function display_test_meta_box($credit) {
    global $core;
    $config = $core->getConfig();
    $lang_config = $config->getConfig('lang');


    $args = [
        "posts_per_page" => -1,
        "post_type" =>  "discount",
        "post_status" => "publish",
        "orderby"   =>  "post_date",
        "order"     =>  "DESC",
    ];
    $discounts = get_posts($args );
    $count_discounts = count($discounts);

    $sample_count = esc_html(get_post_meta( $credit->ID, 'sample_count', true ));
    $time_line_count =  esc_html(get_post_meta( $credit->ID, 'time_line_count', true ));
    $money_count =  esc_html(get_post_meta( $credit->ID, 'money_count', true ));
    $from_field = get_post_meta( $credit->ID, 'from_field', true );
    $to_field = get_post_meta( $credit->ID, 'to_field', true );
    $sum = get_post_meta( $credit->ID, 'sum', true );
    $rate = get_post_meta( $credit->ID, 'rate', true );
    if($time_line_count == ''){
        $time_line_count = 0;
    }

    ?>
    <div>
        <?php echo customTranslate($lang_config['metal_sample_count'])?>
        <input  type="number" min="0" max="100" value="<?php echo $sample_count ?>" name="sample_count" onchange="createFirstTableFields(this.value,<?php echo $count_discounts ?>,<?php echo $credit->ID ?>)"/>
    </div>
    <table id="first_table">
        <?php
        global $core;
        if($sample_count){
            $price = get_post_meta( $credit->ID, 'price', true );
            $proba = get_post_meta( $credit->ID, 'proba', true );
            $htm='';
            $rows = count($discounts) + 2;
            if($sample_count > 400){
                $call = 400;
            }
            else {
                $call = $sample_count;
            }
            $htm.='<tr>';
            $htm.='<th>'.customTranslate($lang_config['metal_proba_text']).'</th>';
            $htm.='<th>'.customTranslate($lang_config['none_status_text']).'</th>';
            foreach($discounts as $discount){
                $htm.='<th>'.customTranslate($discount->post_title) . '</th>';
            }
            $htm.='</tr>';
            for($i=0;$i<$call;$i++){

                $htm.='<tr>';
                for($k=0;$k < $rows; $k++){

                    if($k==0){
                        $htm.='<td>';
                        $htm.='<input ' .  'min="1" step="1"'  .  'value="'.  $proba[$i] .'" name ="'.'proba['.$i.']'.'"/>';
                        $htm.='</td>';
                    }else{
                        $htm.='<td>';
                        $htm.='<input  type="number"' . 'min="0" step="any"' .  'value="'. $price[$i][$k] .'" name ="'.'price['.$i.']['.$k.']'.'"/>';
                        $htm.='</td>';
                    }

                }
                $htm.='</tr>';
            }

            echo $htm;
        }
        ?>
    </table>
        <div>
            <?php _e('Time lines') ?>
            <input  type="number" min="0" max="400" value="<?php echo $time_line_count ?>" name="time_line_count" id="time_line_count" onchange=""/>
            <?php _e('Money lim counter') ?>
            <input  type="number" min="0" max="100" value="<?php echo $money_count ?>" name="money_count" id="money_count" onchange=""/>
            <button class="drow" data-id="<?php echo $credit->ID ?>" data-discounts="<?php echo $count_discounts ?>" id="drow">drow</button>
        </div>
        <table id="second_table">
            <?php
            global $core;

            $args = array(
                "posts_per_page" => -1,
                "post_type" =>  "discount",
                "post_status" => "publish",
                "orderby"   =>  "post_date",
                "order"     =>  "DESC",

            );
            $discounts = get_posts( $args  );
            if($money_count && $time_line_count ){
                $htm='';
                if($money_count > 100){
                    $money = 100;
                }
                else {
                    $money= $money_count;
                }
                if($time_line_count > 100){
                    $time = 100;
                }
                else {
                    $time = $time_line_count;
                }
                if($time > 0 && $money > 0){
                    $htm.='<tr>';
                    $htm.='<td class="caption">'.customTranslate($lang_config['amount_of_credit_text']).'</th>';
                    $htm.='<td class="caption"  colspan ="'. $time. '">'.customTranslate($lang_config['none_status_text']).'</th>';
                    foreach($discounts as $discount){
                        $htm.='<td class="caption"  colspan ="'. $time. '">'.customTranslate($discount->post_title) . '</th>';
                    }
                    $htm.='</tr>';
                    for($i=0; $i<($money+1); $i++){
                        if($i==0){
                            $htm.='<tr>';
                            $htm.='<td></td>';
                            for($j=0;$j<(count($discounts)+1);$j++){
                                for($k=0;$k<$time;$k++){
                                    $htm.='<td><span class="time-'. $k .'">'.customTranslate($lang_config['credit_period']).'</span><br/>';
                                    $htm.='<input class="from_field['.$k.']" style="width:75px" type="number"'  ."min=1 " ." "  . 'value="'. $from_field[$k][$j]  .'"'. 'name ="'.'from_field['.$k.']['.$j.']'.'"/>'.'-'. '<input class="to_field['.$k.']" style="width:75px" type="number"' ."min=1" ." ".  'value="'. $to_field[$k][$j] .'"'. 'name ="'.'to_field['.$k.']['.$j.']'.'"/>';
                                    $htm.='</td>';
                                }

                            }
                            $htm.='</tr>';
                        }
                        else{
                            $htm.='<tr>';
                            $htm.='<td>'.customTranslate($lang_config['before_text']).'<input type="number" name="sum['.$i.']" value="'.$sum[$i] .'"></td>';
                            for($j=0;$j<(count($discounts)+1);$j++){
                                for($k=0;$k<$time;$k++){
                                    $htm.='<td>';
                                    $htm.='<span class="time-'. $k .'">ставка</span><br/>';
                                    $htm.='<input style="width:75px" min="0"  step="0.001" type="number"' ." "  . 'value="'. $rate[$i][$j][$k] .'"'. 'name ="rate['.$i.']['.$j.']['.$k.']"';
                                    $htm.='</td>';
                                }

                            }
                            $htm.='</tr>';
                        }
                    }

                }
                echo $htm;
            }
            ?>
        </table>
    <?php
}
?>
<?php
//this - for save fields
add_action( 'save_post', 'save_credit_fields', 10 , 2 );
function save_credit_fields( $credit_id, $credit ) {
    if ( $credit->post_type == 'tariff' ) {
        if ( isset($_POST['sample_count'] )) {
            update_post_meta( $credit_id, 'sample_count', $_POST['sample_count'] );
        }
        if ( isset($_POST['money_count'] )) {
            update_post_meta( $credit_id, 'money_count', $_POST['money_count'] );
        }
        if ( isset($_POST['time_line_count'] )) {
            update_post_meta( $credit_id, 'time_line_count', $_POST['time_line_count'] );
        }
        if ( isset($_POST['price'] )) {
            update_post_meta( $credit_id, 'price', $_POST['price'] );
        }
        if ( isset( $_POST['proba'] )) {
            update_post_meta( $credit_id, 'proba', $_POST['proba'] );
        }

        if ( isset( $_POST['from_field'] )) {
            update_post_meta( $credit_id, 'from_field', $_POST['from_field'] );
        }
        if ( isset( $_POST['to_field'] )) {
            update_post_meta( $credit_id, 'to_field', $_POST['to_field'] );
        }

        if ( isset( $_POST['rate'] )) {
            update_post_meta( $credit_id, 'rate', $_POST['rate'] );
        }
        if ( isset( $_POST['sum'] )) {
            update_post_meta( $credit_id, 'sum', $_POST['sum'] );
        }

    }
}
?>
<?php
add_action( 'admin_footer', 'send_counter_fields' );
function send_counter_fields() { ?>
    <script type="text/javascript">
        function createFirstTableFields(call,row,cr_id) {
            if(call){
                jQuery.ajax({
                    type: 'POST',
                    url: ajaxurl,
                    data: {
                        'action':'createFirstTable',
                        'call':call,
                        'row':row,
                        'cr_id':cr_id
                    },
                    dataType: 'html',
                    success: function(responce){
                        jQuery('#first_table').html(responce);
                    },
                    error: function() {
                        alert('Sory... error');
                    }

                })
            }
        }
        function createSecondTableFields(money,time,cr_id,counter_discounts){
            if(money && time){
                jQuery.ajax({
                    type: 'POST',
                    url: ajaxurl,
                    data: {
                        'action':'createSecondTable',
                        'money':money,
                        'time':time,
                        'cr_id':cr_id,
                        'counter_discounts':counter_discounts
                    },
                    dataType: 'html',
                    success: function(responce){
                        jQuery('#second_table').html(responce);
                    },
                    error: function() {
                        alert('Sory... error');
                    }

                })
            }
        }
        jQuery( "#drow" ).click(function( event ) {
            event.preventDefault();
            var time = document.getElementById('time_line_count').value;
            var money  = document.getElementById('money_count').value;
            var cr_id  = jQuery( "#drow" ).data("id");
            var counter_discounts  = jQuery( "#drow" ).data("discounts");
            createSecondTableFields(money,time,cr_id,counter_discounts)
        });

    </script>

    <?php
}
?>