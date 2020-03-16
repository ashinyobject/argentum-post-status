<?php

/*
Main plugin file
*/

namespace ArgentumPostStatus;
define('ARGENTUM_POST_STATUS_VERSION','01.00.01');
define('ARGENTUM_POST_STATUS_URL' , plugins_url( '/', __FILE__ ) );

class ArgentumPostStatus
{
   public static $statuses;
   
    public function __construct()
    {
      $this->addOptionsPage();
      add_action( 'init',  array($this, 'initializeModules'), 0 );

     
        
        

      
    }
    public function initializeModules()
    {
      new Classes\PostStatus('custom-post-statuses');
      

    }

    public function addOptionsPage()
    {
      if( function_exists('\acf_add_options_page') ) {
	
         acf_add_options_page(array(
            'page_title' 	=> 'Custom Post Status',
            'menu_title'	=> 'Custom Post Status',
            'menu_slug' 	=> 'custom-post-status-settings',
            'capability'	=> 'edit_posts',
            'parent_slug'  => 'options-general.php',
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

      acf_add_local_field_group(array(
         'key' => 'group_5e6eac46e6a61',
         'title' => 'Email Notifications For Custom Post Status',
         'fields' => array(
            array(
               'key' => 'field_5e6eac5a704d2',
               'label' => 'Emails To Notify',
               'name' => 'argentum-post-status-email-address',
               'type' => 'repeater',
               'instructions' => 'Enter Email Addresses of everyone that needs to be notified when a post status changes. These emails will be notified for every post.',
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
               'button_label' => 'Add Another Email',
               'sub_fields' => array(
                  array(
                     'key' => 'field_5e6ead14704d4',
                     'label' => 'Email Addresses To Notify',
                     'name' => 'argentum-post-status-email-address',
                     'type' => 'email',
                     'instructions' => '',
                     'required' => 0,
                     'conditional_logic' => 0,
                     'wrapper' => array(
                        'width' => '',
                        'class' => '',
                        'id' => '',
                     ),
                     'default_value' => '',
                     'placeholder' => 'yourname@silverscreen.in',
                     'prepend' => '',
                     'append' => '',
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
         'hide_on_screen' => '',
         'active' => true,
         'description' => '',
      ));
         
    }

   
       

   

}
include_once "class-autoloader.php";
new ArgentumPostStatus();

