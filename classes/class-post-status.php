<?php

/*
Post Statuses for the Argentum Theme
*/
namespace ArgentumPostStatus\Classes;
class PostStatus {
   private $customPostStatusesAssociative;
   private $customPostStatuses;
   private $allPostStatuses;
   private $allPostStatusesAssociative;
   private $optionName;
   private $defaultStatus = 'draft';
   private $localizeJavascriptData = array();

   
  public function __construct($optionName) {
     $this->optionName = $optionName;
     $this->customPostStatusesAssociative = $this->extractCustomPostStatusesFromSettings($this->optionName);
     $this->registerCustomPostStatuses($this->customPostStatusesAssociative);
     $this->setAllPostStatuses();
     new PostStatusCoreFixes($this->customPostStatusesAssociative);
     add_action( 'admin_enqueue_scripts', array( $this, 'adminEnqueueScripts' ) );


   }
   public function adminEnqueueScripts($hook)
   {
      $this->localizeJavascript();
      if (in_array( $hook, array( 'post.php', 'edit.php', 'post-new.php', 'page.php', 'edit-pages.php', 'page-new.php' )))
      {
         wp_enqueue_script( 'argentum-post-status-legacy-script', ARGENTUM_POST_STATUS_URL . 'assets/dist/argentum-post-status-legacy.js',array( 'jquery','post' ), false, 1);
         wp_localize_script( 'argentum-post-status-legacy-script', 'argentumPostStatusData', $this->localizeJavascriptData);

         
      }
      if ( $this->is_block_editor() ) 
      {
         wp_enqueue_style(
            'argetum-post-status-block-style',
            ARGENTUM_POST_STATUS_URL.'/assets/dist/blocks.editor.build.css',
            array(),
            ARGENTUM_POST_STATUS_VERSION
         );
         wp_enqueue_script(
			   'argentum-post-status-block-script',
			   ARGENTUM_POST_STATUS_URL.'/assets/dist/argentum-post-status-block.js',
			   array( 'wp-blocks', 'wp-element', 'wp-edit-post', 'wp-plugins', 'wp-components' ),
		      ARGENTUM_POST_STATUS_VERSION
         );
         wp_localize_script( 'argentum-post-status-block-script', 'argentumPostStatusBlockData', $this->localizeJavascriptData);
      }

      

   }

   
 
   public function registerCustomPostStatuses($statuses) {
      foreach ($statuses as $status )
      {
         $this->customPostStatuses[$status['slug']] = $status['name'];
   
         $args = array(
            'label'                     => _x( $status['name'], 'Status General Name', 'argentum-theme' ),
            'label_count'               => _n_noop( $status['name'].' (%s)',  $status['plural'].' (%s)', 'argentum-theme' ), 
            'protected'                 => true,
            '_builtin'                  => false,
            
         );
         register_post_status( $status['slug'], $args );
         
         
      }
  }
  private function extractCustomPostStatusesFromSettings($optionName)
  {
   
    $statuses = array();
    
     $i = 0;
     if( have_rows($optionName,'option') )
     {

         while(have_rows($optionName,'option') )
         {
            the_row();
            
            $name = get_sub_field('custom_status_name','option');
            $plural = get_sub_field('custom_status_name_plural','option');
            $slug = get_sub_field('custom_status_slug','option');
            if (empty($slug)) {
               $slug = \sanitize_title($name);
            }
            $statuses[$i++] = array('slug' => $slug, 'name' => $name, 'plural'=>$plural);
            
            
         }
      }
      return($statuses);


  }

   /**
	 * Helper function to determine whether we're running WP 5.0.
	 *
	 * @return boolean
	 */
	private function is_at_least_wp_50() {
		return version_compare( get_bloginfo( 'version' ), '5.0', '>=' );
	}

	/**
	 * Whether or not we are in the block editor.
	 *
	 * @return boolean
	 */
	public function is_block_editor() {
		if ( self::is_at_least_wp_50() && function_exists( 'get_current_screen' ) ) {
			return get_current_screen()->is_block_editor();
		}

		return false;
   }
   private function setAllPostStatuses()
   {
      $builtinPostStatuses = get_post_statuses();
      //unset($builtinPostStatuses['publish']);
      $customPostStatuses = $this->customPostStatuses;
      
      if (!empty($customPostStatuses)) {
         $this->allPostStatuses = array_merge($builtinPostStatuses, $customPostStatuses);
      }
      else
      {
         $this->allPostStatuses = $builtinPostStatuses;
      }
      $slugs = array_keys($this->allPostStatuses);
      $names = array_values($this->allPostStatuses);

      $i = 0;
      foreach($slugs as $slug)
      {
         $this->allPostStatusesAssociative[] = array(
            'name' => $names[$i++],
				'slug' => $slug
         );
      }
   }
   public function getAllPostStatuses($type)
   {
      if ($type == 'array')
      {
         return $this->allPostStatuses;
      }
      elseif ($type == 'associative')
      {
         return $this->allPostStatusesAssociative;
      }
   }
   public function getCustomPostStatuses($type)
   {
      if ($type == 'array')
      {
         return $this->customPostStatuses;
      }
      elseif ($type == 'associative')
      {
         return $this->customPostStatusesAssociative;
      }
   }

   private function localizeJavascript()
   {
      wp_get_current_user() ;
      global $post, $current_user, $pagenow;
      $allStatuses = $this->getAllPostStatuses('associative');
      


      $selected = '';
      $selectedName = '';
      if( ! empty( $post ) ) {
         // Get the status of the current post
         if ( $post->ID == 0 || $post->post_status == 'auto-draft' || $pagenow == 'edit.php' ) {
            $selected = $this->defaultStatus;

         } else {
            $selected = $post->post_status;
         }

         // Get the label of current status
         
         foreach ( $allStatuses as $status ) {
            if ( $status['slug'] == $selected ) {
               $selectedName = $status['name'];
            }
         }
      }
      $localizeJavascriptData = array();
      $localizeJavascriptData['allStatuses'] = $allStatuses;
      $localizeJavascriptData['defaultStatus'] = $this->defaultStatus;
      $localizeJavascriptData['currentStatus'] = $selected;
      $localizeJavascriptData['currentStatusName'] = $selectedName;
      $localizeJavascriptData['currentUserCanPublishPosts'] = current_user_can('publish_posts' ) ? 1 : 0;
      $localizeJavascriptData['currentUserCanEditPublishedPosts'] = current_user_can('edit_others_posts' ) ? 1 : 0;
     $this->localizeJavascriptData = $localizeJavascriptData;
  }

}