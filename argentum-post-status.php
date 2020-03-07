<?php

/*
Plugin Name: Argentum PostStatus Plugins
Plugin URI: https://labs.silverscreen.in/plugins
Description: Create new post statuses
Version: 1.0.0
Author: Karthik Narasimhan, Silverscreen Media Inc.
Author URI: https://silverscreen.in/
Text Domain: argentum-post-status
@package Wordpress
@subpackage ArgentumPostStatus
@since ArgentumPostStatus 0.1.0
*/

namespace ArgentumPostStatus;
define('ARGENTUM_POST_STATUS_VERSION','01.00.01');
define('ARGENTUM_POST_STATUS_URL' , plugins_url( '/', __FILE__ ) );

class ArgentumPostStatus
{
   public static $statuses;
   
    public function __construct()
    {
      
        self::addOptionsPage();

        new Classes\PostStatus('custom-post-statuses');
        new Classes\PostStatusCoreFixes(ArgentumPostStatus::$statuses);
        

      
    }
    private function addOptionsPage()
    {
      if( function_exists('\acf_add_options_page') ) {
	
         acf_add_options_page(array(
            'page_title' 	=> 'Custom Post Status',
            'menu_title'	=> 'Custom Post Status',
            'menu_slug' 	=> 'custom-post-status-settings',
            'capability'	=> 'edit_posts',
            'redirect'		=> false
         ));

         acf_add_local_field_group(array(
            'key' => 'group_5e5dbc434f4bd',
            'title' => 'Custom Post Statuses',
            'fields' => array(
               array(
                  'key' => 'field_5e5dbc5502ec1',
                  'label' => 'Post Statuses',
                  'name' => 'custom-post-statuses',
                  'type' => 'repeater',
                  'instructions' => '',
                  'required' => 0,
                  'conditional_logic' => 0,
                  'wrapper' => array(
                     'width' => '',
                     'class' => '',
                     'id' => '',
                  ),
                  'collapsed' => '',
                  'min' => 0,
                  'max' => 0,
                  'layout' => 'table',
                  'button_label' => '',
                  'sub_fields' => array(
                     array(
                        'key' => 'field_5e5dbd6b969f9',
                        'label' => 'Custom Status Name',
                        'name' => 'custom_status_name',
                        'type' => 'text',
                        'instructions' => '',
                        'required' => 0,
                        'conditional_logic' => 0,
                        'wrapper' => array(
                           'width' => '',
                           'class' => '',
                           'id' => '',
                        ),
                        'default_value' => '',
                        'placeholder' => '',
                        'prepend' => '',
                        'append' => '',
                        'maxlength' => '',
                     ),
                     array(
                        'key' => 'field_5e5e5e9f63b47',
                        'label' => 'Custom Status Name Plural',
                        'name' => 'custom_status_name_plural',
                        'type' => 'text',
                        'instructions' => '',
                        'required' => 0,
                        'conditional_logic' => 0,
                        'wrapper' => array(
                           'width' => '',
                           'class' => '',
                           'id' => '',
                        ),
                        'default_value' => '',
                        'placeholder' => '',
                        'prepend' => '',
                        'append' => '',
                        'maxlength' => '',
                     ),
                  ),
               ),
            ),
            'location' => array(
               array(
                  array(
                     'param' => 'options_page',
                     'operator' => '==',
                     'value' => 'custom-post-status-settings',
                  ),
               ),
            ),
            'menu_order' => 0,
            'position' => 'normal',
            'style' => 'default',
            'label_placement' => 'top',
            'instruction_placement' => 'label',
            'hide_on_screen' => array(
               0 => 'permalink',
               1 => 'the_content',
               2 => 'excerpt',
               3 => 'discussion',
               4 => 'comments',
               5 => 'revisions',
               6 => 'slug',
               7 => 'author',
               8 => 'format',
               9 => 'page_attributes',
               10 => 'featured_image',
               11 => 'categories',
               12 => 'tags',
               13 => 'send-trackbacks',
            ),
            'active' => true,
            'description' => '',
         ));
      }
         
    }

   
       

   

}
include_once "class-autoloader.php";
new ArgentumPostStatus();

