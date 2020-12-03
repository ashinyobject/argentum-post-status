<?php

/*
Post Statuses for the Argentum Theme
*/
namespace ArgentumPostStatus\Classes;

class EmailNotifier {
   private $notifiers;
   private $allPostStatuses;
      
  public function __construct($allPostStatuses) {
      $this->allPostStatuses = $allPostStatuses;
      $this->notifiers = $this->extractEmailNotifiers();
      add_action( 'transition_post_status', array( $this, 'postStatusChangeEmailNotifier' ), 10, 3 );
      //add_action('updateSilverscreenArticleIndex', array( $this, 'articleIndexChangeEmailNotifier' ), 10, 3 );
      add_action('added_post_meta', array( $this, 'articleIndexChangeEmailNotifier' ), 10, 4 );
      add_action('updated_post_meta', array( $this, 'articleIndexChangeEmailNotifier' ), 10, 4 );


   }
  private function extractEmailNotifiers()
  {
   
    $notifiers = array();
    
    
     $i = 0;
     if ( have_rows('post-status-change-notification-group','option') )
     {

         while(have_rows('post-status-change-notification-group','option') )
         {
            the_row();
            $oldStatus = get_sub_field('argentum-post-status-current-status','option');
            $destinationStatus = get_sub_field('argentum-post-status-new-status','option');
            if (have_rows('argentum-post-status-emails-to-notify','option') )
            {
               while (have_rows('argentum-post-status-emails-to-notify','option') )
               {
                  the_row();
                  $emailsArray[] = get_sub_field('argentum-post-status-email-address','option');

               }
            }
           
            
            $notifiers[$i++] = array('oldStatus' => $oldStatus, 'newStatus' => $destinationStatus, 'emailAddreses' => $emailsArray);
            $emailsArray = array();
            
         }
      }
      return($notifiers);


  }

   public function setEmailContentType()
   {
      return 'text/html';
   }
   
   public function postStatusChangeEmailNotifier($newStatus, $oldStatus, $post)
   {
      $postID = $post->ID;
      if ( $parentID = wp_is_post_revision( $postID ) ) {
        $postID = $parentID;
        $post = get_post($postID);
      }
     

      $postTypes = get_field('customPostStatusApplicablePostTypes','option');
      if (!in_array($post->post_type,$postTypes))
      {
         return;
      }
      if (!in_array($newStatus, array_keys($this->allPostStatuses)))
      {
         return;
      }
      //If a published post is updated, email users every time, otherwise return
      $articleIndex = get_post_meta( $post->ID, 'silverscreenArticleIndex', true );
      if ($newStatus == $oldStatus) 
      {
         if ($newStatus != 'publish')
            return;
      }
      $articleIndex = $articleIndex.'#';
      $emailAddresses = array();

      foreach ($this->notifiers as $notifier)
      {
         if ($notifier['oldStatus'] == $oldStatus || $notifier['oldStatus'] == 'any')
         {
            if ($notifier['newStatus'] == $newStatus || $notifier['newStatus'] == 'any')
            {
               $emailAddresses = array_merge($emailAddresses, $notifier['emailAddreses']);
              
            }
         }

      }
      $emailAddresses = array_unique($emailAddresses);
      $this->sendEmail($newStatus, $oldStatus, $emailAddresses, $post, $articleIndex);
      return;
   }

   public function articleIndexChangeEmailNotifier($metaID, $postID, $metaKey, $articleIndex)
   {
      
      if ( $parentID = wp_is_post_revision( $postID ) ) {
        $postID = $parentID;
      }

      if ($metaKey != 'silverscreenArticleIndex') {
         return;
      }
      
      $postTypes = get_field('customPostStatusApplicablePostTypes','option');
      $post = get_post($postID);

      if (!in_array($post->post_type,$postTypes))
      {
         return;
      }
    
      if (!preg_match('#^[A-Za-z]\d+$#',$articleIndex)) {
         return;
       }
         
      $newStatus = 'articleIndexChanged';
      $oldStatus = $post->post_status;

      
      $postDate = $this->getPostCreatedDate($postID);
      $articleIndex = $articleIndex.'$'.$postDate.'#';
     

      $emailAddresses = array();

      foreach ($this->notifiers as $notifier)
      {
         if ($notifier['oldStatus'] == $oldStatus || $notifier['oldStatus'] == 'any')
         {
            if ($notifier['newStatus'] == $newStatus || $notifier['newStatus'] == 'any')
            {
               $emailAddresses = array_merge($emailAddresses, $notifier['emailAddreses']);
              
            }
         }

      }
      $emailAddresses = array_unique($emailAddresses);
      $this->sendEmail($newStatus, $oldStatus, $emailAddresses, $post, $articleIndex);
      return;
   }
   
   private function sendEmail($newStatus, $oldStatus, $emailAddresses, $post, $articleIndex)
   {      
      $statuses = $this->allPostStatuses;
      // Get emails of authors
      $coauthors =  get_coauthors( $post->ID );
      $authorEmails = array();
      $authorNames = array();
      $i = 0;
      foreach ($coauthors as $coauthor) 
      {
         $authorid = $coauthor->ID;
         $authorEmails[$i] = get_the_author_meta('user_email',$authorid);
         $authorNames[$i] = get_the_author_meta('display_name',$authorid);
         $i++;
      }
      $newStatusString = $statuses[$newStatus];
      $oldStatusString = $statuses[$oldStatus];
      if ($newStatus == $oldStatus) {
         if ($newStatus == 'publish') {
            $newStatusString = 'Revision After Publication';
         }
        
      }
      
         $i = 0;
         $siteTitle = '[ '.get_bloginfo( 'name' ).' ] ';
         $subject = $siteTitle . 'Article Moved Into [' . $newStatusString . '] State: "' . $post->post_title. '"';
         $body = '<p>Post Titled <strong>'. $post->post_title . '</strong> ID: ' . $post->ID . ' was moved to the <strong>'. $newStatusString .  '</strong> State by '. $this->getTheModifiedAuthorByID($post->ID) . ' on '. get_post_modified_time('l jS F Y h:i:s A',false, $post->ID).". </p>";
         $body .= "<p> {$oldStatusString} => {$newStatusString} </p>";
         $body .= '<p> <strong>Post Details</strong> </p>';
         $body .= '<p>PostId:'.$articleIndex.'</p>';
         $body .= '<strong><em>Authors</em></strong> <br>';
         foreach ($authorNames as $authorname) 
         {
            $body .= $authorname.'<br>';
         }
         $body .= '<p>Edit Link: <a href = "' . get_edit_post_link($post->ID). '">'.get_edit_post_link($post->ID).'</a></p>';
         if ($newStatus == 'publish') {
            $body .= '<p>Published Link: <a href = "' . get_permalink($post->ID). '">'.get_permalink($post->ID).'</a></p>';
         }
         else {
            $body .= '<p>View Link: <a href = "' . get_permalink($post->ID). '">'.get_permalink($post->ID).'</a></p>';
         }
     
         $to = array_merge($authorEmails, $emailAddresses);

         add_filter( 'wp_mail_content_type', array($this,'setEmailContentType') );
         wp_mail($to, $subject, $body);
         remove_filter( 'wp_mail_content_type', array($this,'setEmailContentType') );
     }
 

   public function getTheModifiedAuthorByID($ID) {
      $last_id = get_post_meta( $ID, '_edit_last', true );
   
      if ( $last_id ) {
          $last_user = get_userdata( $last_id );
   
          /**
           * Filters the display name of the author who last edited the current post.
           *
           * @since 2.8.0
           *
           * @param string $last_user->display_name The author's display name.
           */
          return apply_filters( 'the_modified_author', $last_user->display_name );
      }
  }

  private function getPostCreatedDate($postID) {
     //Get All Revisions
     $args = array(
      'order'         => 'ASC',
      'orderby'       => 'date ID',
      'check_enabled' => true,
      'posts_per_page' => 1,
      'no_found_rows'  => true,

  );
     $revision = wp_get_post_revisions($postID,$args);
     if(is_array($revision)) {
        $postID = array_values($revision)[0]->ID;
     }
     
 
    
   
     return get_the_time('F j, Y H:i',$postID); 


  }

}
