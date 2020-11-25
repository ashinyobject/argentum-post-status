<?php

/*
Main plugin file
*/

namespace ArgentumPostStatus;
define('ARGENTUM_POST_STATUS_VERSION','01.00.10');
define('ARGENTUM_POST_STATUS_URL' , plugins_url( '/', __FILE__ ) );

class ArgentumPostStatus
{
   private static $allStatuses;

   
    public function __construct()
    {
      $this->addMainOptionsPage();
      add_action( 'acf/init',  array($this, 'initializeModules') );
      add_action('acf/input/admin_head', array($this,'hideEmailLabel'));

    }

    

    public function initializeModules()
    {
      $postStatus = new Classes\PostStatus('custom-post-statuses');
      self::$allStatuses = $postStatus->getAllPostStatuses('array');
      self::$allStatuses['articleIndexChanged'] = 'Article Index Changed';
      $this->addEmailOptionsPage();
      $emailNotifier = new Classes\EmailNotifier(self::$allStatuses);

      

    }

    public function addMainOptionsPage()
    {

      $args = array(
         'public'   => true,
      );
      $postTypes = get_post_types($args,'objects');
      $postTypeChoices = array();
      foreach ($postTypes as $postType)
      {
         if (is_object(($postType)))
         {
            $postTypeChoices[$postType->name] = $postType->label;
         }
      }

      // Read from settings to get value of custom post statuses
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
                  'key' => 'field_5f84f3382d579',
                  'label' => 'Applicable Post Types',
                  'name' => 'customPostStatusApplicablePostTypes',
                  'type' => 'checkbox',
                  'instructions' => '',
                  'required' => 0,
                  'conditional_logic' => 0,
                  'wrapper' => array(
                     'width' => '',
                     'class' => '',
                     'id' => '',
                  ),
                  'choices' => $postTypeChoices,
                  'allow_custom' => 1,
                  'default_value' => array(
                  ),
                  'layout' => 'vertical',
                  'toggle' => 0,
                  'return_format' => 'value',
                  'save_custom' => 0,
               ),
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
                        'key' => 'field_5e5dbd6bf69e3',
                        'label' => 'Custom Status Slug',
                        'name' => 'custom_status_slug',
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
    public function addEmailOptionsPage()
    {
       $choices = self::$allStatuses;
       $choices['any'] = 'Any';
      // Read from settings to get value of custom post statuses
      if( function_exists('\acf_add_options_page') ) {
	
         acf_add_options_sub_page(array(
            'page_title' 	=> 'Email Notifications On Post Status Change',
            'menu_title'	=> 'Email Notifications',
            'menu_slug' 	=> 'email-notification-settings',
            'capability'	=> 'edit_posts',
            'parent_slug'  => 'custom-post-status-settings',
            'redirect'		=> false
         ));

         acf_add_local_field_group(array(
            'key' => 'group_5e70ff5a05fdc',
            'title' => 'Post Status Change Email Notifications',
            'fields' => array(
               array(
                  'key' => 'field_5e71002316774',
                  'label' => 'Notification Group',
                  'name' => 'post-status-change-notification-group',
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
                  'min' => 1,
                  'max' => 0,
                  'layout' => 'row',
                  'button_label' => 'Add More Notifiers',
                  'sub_fields' => array(
                     array(
                        'key' => 'field_5e71005016775',
                        'label' => 'Current Post Status',
                        'name' => 'argentum-post-status-current-status',
                        'type' => 'select',
                        'instructions' => '',
                        'required' => 0,
                        'conditional_logic' => 0,
                        'wrapper' => array(
                           'width' => '',
                           'class' => '',
                           'id' => '',
                        ),
                        'choices' => $choices,
                        'default_value' => array(
                        ),
                        'allow_null' => 0,
                        'multiple' => 0,
                        'ui' => 0,
                        'return_format' => 'value',
                        'ajax' => 0,
                        'placeholder' => '',
                     ),
                     array(
                        'key' => 'field_5e71014616776',
                        'label' => 'New Post Status',
                        'name' => 'argentum-post-status-new-status',
                        'type' => 'select',
                        'instructions' => '',
                        'required' => 0,
                        'conditional_logic' => 0,
                        'wrapper' => array(
                           'width' => '',
                           'class' => '',
                           'id' => '',
                        ),
                        'choices' => $choices,
                        'default_value' => array(
                        ),
                        'allow_null' => 0,
                        'multiple' => 0,
                        'ui' => 0,
                        'return_format' => 'value',
                        'ajax' => 0,
                        'placeholder' => '',
                     ),
                     array(
                        'key' => 'field_5e71016716777',
                        'label' => 'Emails To Notify',
                        'name' => 'argentum-post-status-emails-to-notify',
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
                        'min' => 1,
                        'max' => 0,
                        'layout' => 'table',
                        'button_label' => 'Add More Email Addresses',
                        'sub_fields' => array(
                           array(
                              'key' => 'field_5e71017f16778',
                              'label' => 'Email Address',
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
                              'placeholder' => '',
                              'prepend' => '',
                              'append' => '',
                           ),
                        ),
                     ),
                  ),
               ),
            ),
            'location' => array(
               array(
                  array(
                     'param' => 'options_page',
                     'operator' => '==',
                     'value' => 'email-notification-settings',
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

    public function hideEmailLabel() {
      ?>
      <style type="text/css">
   
         .acf-field-5e71016716777 > div > div > table > thead {display: none;}
   
      </style>
      <?php
   }
   

   
       

   

}
include_once "class-autoloader.php";
new ArgentumPostStatus();

