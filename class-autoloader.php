<?php

/** 
* Autoloader for Argentum PermalinkPlugin Classes
* Uses Singleton model to allow only one instantiation
*/

namespace ArgentumPostStatus;
class Autoloader
{
    private static $_instance = null;
    private function __construct()
    {
        spl_autoload_register( array( $this, 'autoloader' ) );
    }
    public static function _instance() {
        if ( ! self::$_instance ) {
            self::$_instance = new Autoloader();
        }
        return self::$_instance;
    }
    public function autoloader($className)
    {

       // If the specified $class_name does not include our namespace, exit
        if ( false === strpos( $className, 'ArgentumPostStatus' ) ) {
            return;
        }

            $fileParts = explode( '\\', $className );
            $fileName  = 'class-'.strtolower(preg_replace('/([a-z])([A-Z])/', '$1-$2',$fileParts[count($fileParts)-1]));
            include_once('classes/'.$fileName.'.php');
                  
    } 


}
Autoloader::_instance();
