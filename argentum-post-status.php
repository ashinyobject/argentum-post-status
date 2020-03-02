<?php

/*
Plugin Name: Argentum PostStatus Plugins
Plugin URI: https://labs.silverscreen.in/plugins
Description: Core plugins for the Argentum Theme, creating custom taxonomies and post types
Version: 1.0.0
Author: Karthik Narasimhan, Silverscreen Media Inc.
Author URI: https://silverscreen.in/
Text Domain: argentum-permalink
@package Wordpress
@subpackage ArgentumPostStatus
@since ArgentumPostStatus 0.1.0
*/
namespace ArgentumPostStatus;

class ArgentumPostStatus
{

    public function __construct()
    {
        new Classes\PostStatus();
        new Classes\PostStatusCoreFixes();

      
    }
    private function addOptionsPage()
    {
      if( function_exists('acf_add_options_page') ) {
	
         acf_add_options_page(array(
            'page_title' 	=> 'Post Status Settings',
            'menu_title'	=> 'Post Status Settings',
            'menu_slug' 	=> 'post-status-settings',
            'capability'	=> 'edit_posts',
            'redirect'		=> false
         ));
      }
         
    }


       

   

}
include_once "class-autoloader.php";
new ArgentumPostStatus();

