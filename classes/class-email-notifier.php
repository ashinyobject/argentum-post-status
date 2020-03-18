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
            
            
         }
      }
      return($notifiers);


  }
   
   public function postStatusChangeEmailNotifier($newStatus, $oldStatus, $post)
   {
      //If a published post is updated, email users every time
      if ($newStatus != 'publish' && $newStatus == $oldStatus) 
      {
         return;
      }
      foreach ($this->notifiers as $notifier)
      {
         if ($notifier['oldStatus'] == $oldStatus || $notifier['oldStatus'] == 'any')
         {
            if ($notifier['newStatus'] == $newStatus || $notifier['newStatus'] == 'any')
            {
               $emailAddresses = $notifier['emailAddreses'];
               $this->sendEmail($newStatus, $oldStatus, $emailAddresses, $post);
            }
         }

      }
      return;
   }
   private function sendEmail($newStatus, $oldStatus, $emailAddresses, $post)
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
         $i = 0;
         $siteTitle = '[ '.get_bloginfo( 'name' ).' ] ';
         $subject = $siteTitle . 'Article Moved Into ' . $statuses[$newStatus] . ' State: "' . $post->post_title. '"';
         $body = '<p>Post Titled <strong>'. $post->post_title . '</strong> ID: ' . $post->ID . ' was moved to the <strong>'. $statuses[$newStatus] .  '</strong> State by '. $this->getTheModifiedAuthorByID($post->ID) . ' on '. get_post_modified_time('l jS F Y h:i:s A',false, $post->ID).". </p>";
         $body .= "<p> {$statuses[$oldStatus]} => {$statuses[$newStatus]} </p>";
         $body .= '<p> <strong>Post Details</strong> </p>';
         $body .= '<strong><em>Authors</em></strong> <br>';
         foreach ($authorNames as $authorname) 
         {
            $body .= $authorname.'<br>';
         }
         $body .= '<p>Edit Link: <a href = "' . get_edit_post_link($post->ID). '">'.get_edit_post_link($post->ID).'</a></p>';
         $body .= '<p>View Link: <a href = "' . get_permalink($post->ID). '">'.get_permalink($post->ID).'</a></p>';
        
         $to = array_merge($authorEmails, $emailAddresses);
         
         add_filter( 'wp_mail_content_type', array($this,'setMailContentType') );
         wp_mail($to, $subject, $body);
         remove_filter( 'wp_mail_content_type', array($this,'setMailContentType') );
     }
 


   public function setMailContentType()
   {
      return 'text/html';
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

}