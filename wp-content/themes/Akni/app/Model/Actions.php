<?php

namespace Akni\app\Model;

use Carbon\Carbon;

/**
 * Class Blog
 * @package Akni\app\Model
 */
class Actions extends Model
{

    public function getDaysTo($item)
    {
        $diff = [];
        if ($item !='') {
            $itemDate = explode('/', $item);
            $carbon = new Carbon();
            $timeZone =  get_option('gmt_offset');
            $currentTime = Carbon::now($timeZone);
            $itemTime =  Carbon::create($itemDate[0], $itemDate[1] , $itemDate[2], $itemDate[3], $itemDate[4], $itemDate[5], $timeZone);
            //if (strtotime("{$itemDate[0]}:{$itemDate[1]}:{$itemDate[2]} {$itemDate[3]}:{$itemDate[4]}:{$itemDate[5]}") > (current_time('timestamp', $timeZone))) {
            if ($itemTime->timestamp > $currentTime->timestamp) {
                if($dif = $carbon->diffInDays($itemTime)) {
                    $diff['number'] = $dif;
                    $diff['entity'] = 'd';
                    return $diff;
                } elseif ($dif = $carbon->diffInHours($itemTime)) {
                    $diff['number'] = $dif;
                    $diff['entity'] = 'h';
                    return $diff;
                } elseif ($dif = $carbon->diffInMinutes($itemTime)) {
                    $diff['number'] = $dif;
                    $diff['entity'] = 'm';
                    return $diff;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    public function getDayFormat($n, $form)
    {
        $n = abs($n) % 100;
        $n1 = $n % 10;

        if ($n > 10 && $n < 20) {
            return $form[2];
        }

        if ($n1 > 1 && $n1 < 5) {
            return $form[1];
        }

        if ($n1 == 1) {
            return $form[0];
        }

        return $form[2];
    }
}