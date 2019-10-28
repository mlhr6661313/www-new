<?php

namespace BranderMap\Model;

use Twig_Loader_Filesystem;
use Twig_Environment;

class View
{
    /**
     * Config object.
     *
     * @var $_config
     */
    private $_config;

    /**
     * Template path for rendering by twig
     * @var $_templateDir
     */
    protected $_templateDir;

    /**
     * @var Twig_Loader_Filesystem
     * Must be twig loader object
     */
    protected $_loader;

    /**
     * @var Twig_Environment
     * Must be twig environment object
     */
    protected $_twig;

    /**
     * @var $_renderer
     * use this for make something with rendered template
     */
    protected $_renderer;

    /**
     * View constructor.
     */
    public function __construct()
    {
        $this->_config = new Config();
        $this->_loader = new Twig_Loader_Filesystem(
           $this->_config->getViewsPath()
        );
        $this->_twig = new Twig_Environment($this->_loader);
    }

    /**
     * This render twig data.
     * @param $template
     * @param array $options
     * @return string
     */
    public function render($template, array $options)
    {
        $this->_renderer = $this->_twig->render(
            $template, $options
        );
        return $this->_renderer;
    }

    /**
     * @param string $template
     * @param array $options
     * show rendered data on frontend
     */
    public function display($template='', array $options = [])
    {
        if ($template !='') {
            $this->render($template, $options);
        }
        echo  $this->_renderer;
    }
}