<?php

namespace BranderMap\Helper;

/**
 * Class Data
 * @package BranderMap\Helper
 */
class Data
{
    /**
     * Method to clear string
     *
     * @param $string
     * @return string
     */
    public static function clearString($string)
    {
        return trim(strip_tags($string));
    }

    /**
     * Method to clear array
     *
     * @param $arr
     * @return array
     */
    public static function clearArray(array $arr)
    {
        if (!empty($arr)) {
            foreach ($arr as &$value) {
                if (is_array($value)) {
                    self::clearArray($value);
                } else {
                    $value = self::clearString($value);
                }
            }
        }
        return $arr;
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

    public static function clearPhone($str)
    {
        return  preg_replace("/[^0-9+]/", '', $str);
    }
}