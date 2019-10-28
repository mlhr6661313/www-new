<?php

namespace Akni\app\Model;

use Carbon\Carbon;
use Akni\app\Helper\Data;
/**
 * Class Blog
 * @package Akni\app\Model
 */
class Blog extends Model
{

    /**
     * Method to formate date for blog posts
     */
    public function setBlogFormateDate()
    {
        foreach ($this->result as &$item) {
            $timeZone =  get_option('gmt_offset');
            $currentTime = Carbon::now($timeZone);
            $dateTime =  Data::explodeDate($item->post_date);
            $itemTime =  Carbon::createFromDate($dateTime['year'], $dateTime['month'] , $dateTime['day'], 3);
            $itemTime->setTime($dateTime['hours'],$dateTime['seconds'], $dateTime['minutes']);
            $diffInDays = $itemTime->diffInDays($currentTime);
            $diffInYears = $itemTime->diffInYears($currentTime);
            if ($diffInDays == 0 && $itemTime->day == $currentTime->day) {
                $item->date = Data::getTranslate('today_text');
                continue;
            } elseif($diffInYears< 1 && $itemTime->year == $currentTime->year) {
                $item->date = $itemTime->format('d.m');
            } else {
                $item->date = $itemTime->format('d.m.Y');
            }
        }
    }

    /**
     * Method to set blog action
     */
    public function setBlogActions()
    {
        foreach ($this->result as &$item) {
            if (isset($item->acf['action']) && $item->acf['action']['value']) {
                if (isset($item->acf['action_date_end']['value']) && $item->acf['action_date_end']['value'] !='') {
                    $itemDate = explode('/', $item->acf['action_date_end']['value']);

                    $timeZone =  get_option('gmt_offset');
                    $currentTime = Carbon::now($timeZone);
                    $itemTime =  Carbon::createFromDate($itemDate[2], $itemDate[1] , $itemDate[0], 3);
                    if ($itemTime->toDateString() >= $currentTime->toDateString()) {
                        $item->action_date = $itemTime->format('d.m');
                    }
                }
            }
        }
    }
}