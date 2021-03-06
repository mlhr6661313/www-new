<?php

namespace Akni\app\Model;

/**
 * This class need to send callback emails.
 * Class Mailer
 * @package AkniCallback\Model
 */
class Mailer
{
    /**
     * This is Mailer object.
     * @var $_instance
     */
    private static $_instance;

    /**
     * @var $_senderName
     */
    private $_senderName;

    /**
     * @var $_senderEmail
     */
    private $_senderEmail;
    
    private function __construct()
    {
        $options = (array) get_option('akni-callback-settings');
        if ($options['sender_email'] !='') {
            $this->_senderEmail = $options['sender_email'];
        } else {
            $this->_senderEmail = get_option('admin_email');
        }
        
        if ($options['sender_name'] !='') {
            $this->_senderName = $options['sender_name'];
        } else {
            $this->_senderName = '';
        }
    }

    /**
     * this is clone action.
     */
    private function __clone()
    {
        //protect from clone

    }

    /**
     * this is wakeup action.
     */
    private function __wakeup()
    {
        //protect from wakeup
    }

    /**
     * @param array $data
     * @param string $template
     * @return string
     */
    private function getMailBody(array $data, $template = '')
    {
        global $core;
        $body = $core->renderWithoutOutput($template, ["data"=>$data]);
        if ($body) {
            return $body;
        }
        return "";
    }

    /**
     * This get self object.
     * @return Mailer
     */
    public static function getInstance() {
        if (empty(self::$_instance)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    /**
     * Callback sendMail method
     * @param array $data
     * @param string $recipient
     * @param string $template
     * @return bool
     */
    public function sendMail(array $data, $recipient = '', $template = '')
    {
        if (!empty($data) && $recipient != '' ) {
            $mailBody = $this->getMailBody($data, $template);
            if ($this->_senderEmail != '' && $mailBody !='') {
                $headers[] = "Content-type: text/html; charset=utf-8";
                do_action('plugins_loaded');
                $headers[] = "From:{$this->_senderName} <{$this->_senderEmail}>";
                $headers[] = "Lombard mail";
                $send = wp_mail($recipient, 'lombard mail', $mailBody, $headers);
                return  $send;
            }
        }
        return false;
    }
}