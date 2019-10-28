<?php

namespace Akni\app\Helper;

class Data
{
    /**
     * usort orderSort method for sortFields function.
     * @param $a
     * @param $b
     * @return bool
     */
    public static function orderSort($a, $b)
    {
        return $a['order'] > $b['order'];
    }

    /**
     * @param $string
     * @param string $allow
     * @return string
     * Function for clear text from text
     */
    public static function cleanString($string, $allow = '')
    {
        return trim(strip_tags($string, $allow));
    }

    /**
     * @param $attachment_id
     * @return mixed
     * Return attachment images
     */
    public static function getAttachmentMeta($attachment_id)
    {
        $alt = get_post_meta(
            $attachment_id, '_wp_attachment_image_alt', true
        );
        if ($alt == '') {
            $alt = explode(
                '.', basename(get_attached_file($attachment_id)))[0];
        }
        return $alt;
    }

    /**
     * Sort fields by order value.
     * @param $arr
     * @param $type
     * @return mixed
     */
    public static function sortFields($arr, $type = 'arr')
    {
        if ($type =='arr') {
            uasort($arr, function ($a, $b) {
                return $a['order'] > $b['order'];
            });
        } elseif($type ='obj') {
            uasort($arr, function ($a, $b) {
                return $a->order > $b->order;
            });
        }

        return $arr;
    }

    public static function sortPostsByDate($arr, $way ='DESC') {
        switch ($way) {
            case 'DESC':
                uasort($arr, function ($a, $b) {
                    return $a->post_date < $b->post_date;
                });
                break;
                case 'ASC':
                uasort($arr, function ($a, $b) {
                    return $a->post_date > $b->post_date;
                });
                break;
        }
        return $arr;

    }

    /**
     * Main term getter.
     * @param $postId
     * @param $termName
     * @return bool|\WPSEO_Primary_Term
     */
    public static function getMainTerm($postId, $termName)
    {
        if ($postId !=0 && $termName !='') {
            $terms = wp_get_post_terms($postId, $termName);
            if (count($terms) == 1) {
                return $terms[0];
            } elseif (count($terms) > 1)  {
                if ( class_exists('WPSEO_Primary_Term') ) {
                    $primaryTerm = new \WPSEO_Primary_Term( $termName, $postId);
                    $mainTerm = get_term_by( 'id', $primaryTerm->get_primary_term(), $termName);
                    if ($mainTerm) {
                        return $mainTerm;
                    }
                }

            }
        }
        return false;
    }

    /**
     * Function to test load more btn.
     *
     * @param $args
     * @param int $page
     * @return bool
     */
    public static function isNext($args, $page=1)
    {
        ++$page;
        $args['paged'] = $page;
        $posts = get_posts($args);
        if (count($posts) > 0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * method to clear phone
     *
     * @param $str
     * @return mixed
     */
    public static function clearPhone($str)
    {
        return  preg_replace("/[^0-9+]/", '', $str);
    }

    /**
     * formated theme phones
     *
     * @param $phonesData
     * @return array
     */
    public static function formatedPhones(array $phonesData)
    {
        $phones = [];
        if (!empty($phonesData)) {
            foreach ($phonesData as $value) {
                $original_phone = $value['phone'];
                $clear_phone = self::clearPhone($original_phone);
                $value['phone'] = [
                    'original'=> $original_phone,
                    'clear' =>  $clear_phone
                ];
                $phones[] = $value;
            }
        }
        return $phones;
    }

    /**
     * Method to explode date
     *
     * @param $date
     * @return array
     */
    public static function explodeDate($date) {
        $date_explode = explode(" ", $date);
        $date = explode("-", $date_explode[0]);
        $time = explode(":", $date_explode[1]);
        $dateTime = [
            'year' => $date[0],
            'month' => $date[1],
            'day' => $date[2],
            'hours' => $time[0],
            'minutes' => $time[1],
            'seconds' => $time[2],
        ];
        return $dateTime;
    }

    /**
     * simple translation
     *
     * @param $word
     * @return mixed
     */
    public static function getTranslate($word)
    {
        global $core;
        $langConfig = $core->getConfig()->getConfig('lang');
        return customTranslate($langConfig[$word]);
    }
}