<?php

/*
Post Statuses Fixes (From Edit Flow)
 * Fixes multiple issues with the Wordpress Core related to custom post statuses
*/
namespace ArgentumPostStatus\Classes;
class PostStatusCoreFixes {

    var $published_statuses = array(
        'publish',
        'future',
        'private',
    );

   public function __construct($statuses) {

    $this->statuses = array();
    foreach ($statuses as $status)
    {
        $this->statuses[] = $status['slug'];
    }

    if ( is_admin() ) {

                          
         // Fix WP core bugs, copied from Edit Flow
          // These seven-ish methods are hacks for fixing bugs in WordPress core
        add_action( 'admin_init', array( $this, 'check_timestamp_on_publish' ) );
        add_filter( 'wp_insert_post_data', array( $this, 'fix_custom_status_timestamp' ), 10, 2 );
        add_filter( 'wp_insert_post_data', array( $this, 'maybe_keep_post_name_empty' ), 10, 2 );
        add_filter( 'pre_wp_unique_post_slug', array( $this, 'fix_unique_post_slug' ), 10, 6 );
        
        add_filter( 'preview_post_link', array( $this, 'fix_preview_link_part_one' ) );
        add_filter( 'post_link', array( $this, 'fix_preview_link_part_two' ), 99, 3 );
        add_filter( 'page_link', array( $this, 'fix_preview_link_part_two' ), 99, 3 );
        add_filter( 'post_type_link', array( $this, 'fix_preview_link_part_two' ), 99, 3 );
        add_filter( 'preview_post_link', array( $this, 'fix_preview_link_part_three' ), 11, 2 );
        add_filter( 'get_sample_permalink', array( $this, 'fix_get_sample_permalink' ), 10, 5 );
        add_filter( 'get_sample_permalink_html', array( $this, 'fix_get_sample_permalink_html' ), 10, 5);
        add_filter( 'post_row_actions', array( $this, 'fix_post_row_actions' ), 10, 2 );
        add_filter( 'page_row_actions', array( $this, 'fix_post_row_actions' ), 10, 2 );

        // Pagination for custom post statuses when previewing posts
		add_filter( 'wp_link_pages_link', array( $this, 'modify_preview_link_pagination_url' ), 10, 2 );

      
    }

     
   }

   	/**
	 * Get the proper preview link for a post
	 *
	 */
	private function get_preview_link( $post ) {

		if ( 'page' == $post->post_type ) {
			$args = array(
					'page_id'    => $post->ID,
				);
		} else if ( 'post' == $post->post_type ) {
			$args = array(
					'p'          => $post->ID,
					'preview'	 => 'true'
				);
		} else {
			$args = array(
					'p'          => $post->ID,
					'post_type'  => $post->post_type,
				);
		}

		$args['preview_id'] = $post->ID;
		return add_query_arg( $args, home_url('/') );
	}
   	/**
	 *
	 * When publishing a post with a custom status, set the status to 'pending' temporarily
	 * @see Works around this limitation: http://core.trac.wordpress.org/browser/tags/3.2.1/wp-includes/post.php#L2694
	 * @see Original thread: http://wordpress.org/support/topic/plugin-edit-flow-custom-statuses-create-timestamp-problem
	 * @see Core ticket: http://core.trac.wordpress.org/ticket/18362
	 */
	function check_timestamp_on_publish() {
		global $pagenow, $wpdb;

		// Handles the transition to 'publish' on edit.php
		if ( $pagenow == 'edit.php' && isset( $_REQUEST['bulk_edit'] ) ) {
			// For every post_id, set the post_status as 'pending' only when there's no timestamp set for $post_date_gmt
			if ( $_REQUEST['_status'] == 'publish' ) {
				$post_ids = array_map( 'intval', (array) $_REQUEST['post'] );
				foreach ( $post_ids as $post_id ) {
					$wpdb->update( $wpdb->posts, array( 'post_status' => 'pending' ), array( 'ID' => $post_id, 'post_date_gmt' => '0000-00-00 00:00:00' ) );
					clean_post_cache( $post_id );
				}
			}
		}

		// Handles the transition to 'publish' on post.php
		if ( $pagenow == 'post.php' && isset( $_POST['publish'] ) ) {
			// Set the post_status as 'pending' only when there's no timestamp set for $post_date_gmt
			if ( isset( $_POST['post_ID'] ) ) {
				$post_id = (int) $_POST['post_ID'];
				$ret = $wpdb->update( $wpdb->posts, array( 'post_status' => 'pending' ), array( 'ID' => $post_id, 'post_date_gmt' => '0000-00-00 00:00:00' ) );
				clean_post_cache( $post_id );
				foreach ( array('aa', 'mm', 'jj', 'hh', 'mn') as $timeunit ) {
					if ( !empty( $_POST['hidden_' . $timeunit] ) && $_POST['hidden_' . $timeunit] != $_POST[$timeunit] ) {
						$edit_date = '1';
						break;
					}
				}
				if ( $ret && empty( $edit_date ) ) {
					add_filter( 'pre_post_date', array( $this, 'helper_timestamp_hack' ) );
					add_filter( 'pre_post_date_gmt', array( $this, 'helper_timestamp_hack' ) );
				}
			}
		}

  }
  
     /**
	 * This helper is only used for the checkTimestampOnPublish method above
	 *
	 */
	public function helper_timestamp_hack() {
		return ( 'pre_post_date' == current_filter() ) ? current_time('mysql') : '';
   }


    /**
	 * Normalize post_date_gmt if it isn't set to the past or the future
	 * @see Works around this limitation: https://core.trac.wordpress.org/browser/tags/4.5.1/src/wp-includes/post.php#L3182
	 * @see Original thread: http://wordpress.org/support/topic/plugin-edit-flow-custom-statuses-create-timestamp-problem
	 * @see Core ticket: http://core.trac.wordpress.org/ticket/18362
	 */
	function fix_custom_status_timestamp( $data, $postarr ) {
		
        $status_slugs = $this->statuses;

		//Post is scheduled or published? Ignoring.
		if ( !in_array( $postarr['post_status'], $status_slugs ) ) {
			return $data;
		}

		//If empty, keep empty.
		if ( empty( $postarr['post_date_gmt'] ) 
		|| '0000-00-00 00:00:00' == $postarr['post_date_gmt'] ) {
			$data['post_date_gmt'] = '0000-00-00 00:00:00';
		}

		return $data;
  }
  
  /**
	 * A new hack! hack! hack! until core better supports custom statuses`
	 *
	 * @since 0.9.4
	 *
	 * If the post_name is set, set it, otherwise keep it empty
	 * 
	 * @see https://github.com/Automattic/Edit-Flow/issues/123
	 * @see http://core.trac.wordpress.org/browser/tags/3.4.2/wp-includes/post.php#L2530
	 * @see http://core.trac.wordpress.org/browser/tags/3.4.2/wp-includes/post.php#L2646
	 */
	public function maybe_keep_post_name_empty( $data, $postarr ) {
		$status_slugs = $this->statuses;

		// Ignore if it's not a post status and post type we support
		if ( ! in_array( $data['post_status'], $status_slugs )) {
				return $data;
		}

		// If the post_name was intentionally set, set the post_name
		if ( ! empty( $postarr['post_name'] ) ) {
			$data['post_name'] = $postarr['post_name'];
			return $data;
		}

		// Otherwise, keep the post_name empty
		$data['post_name'] = '';

		return $data;
   }

   /**
	 * A new hack! hack! hack! until core better supports custom statuses`
	 *
	 * @since 0.9.4
	 *
	 * `wp_unique_post_slug` is used to set the `post_name`. When a custom status is used, WordPress will try
	 * really hard to set `post_name`, and we leverage `wp_unique_post_slug` to prevent it being set
	 * 
	 * @see: https://github.com/WordPress/WordPress/blob/396647666faebb109d9cd4aada7bb0c7d0fb8aca/wp-includes/post.php#L3932
	 */
	public function fix_unique_post_slug( $override_slug, $slug, $post_ID, $post_status, $post_type, $post_parent ) {
		$status_slugs = $this->statuses;

		if ( ! in_array( $post_status, $status_slugs ) ) {
			return null;
		}

		$post = get_post( $post_ID );

		if ( empty( $post ) ) {
			return null;
		}

		if ( $post->post_name ) {
			return $slug;
		}

		return '';
	}
   


    /**
	 * The preview link for an unpublished post should always be ?p=
	 */
	public function fix_preview_link_part_one( $preview_link ) {
		global $pagenow;
        $post = get_post( get_the_ID() );

		// Only modify if we're using a pre-publish status on a supported custom post type
		$status_slugs = $this->statuses;
		if ( !$post
			|| !is_admin()
			|| 'post.php' != $pagenow
			|| !in_array( $post->post_status, $status_slugs )
			|| strpos( $preview_link, 'preview_id' ) !== false 
			|| $post->filter == 'sample' )
			return $preview_link;

		return $this->get_preview_link( $post );
    }
    
    /**
	 * The preview link for an unpublished post should always be ?p=
	 * The code used to trigger a post preview doesn't also apply the 'preview_post_link' filter
	 * So we can't do a targeted filter. Instead, we can even more hackily filter get_permalink
	 * @see http://core.trac.wordpress.org/ticket/19378
	 */
	public function fix_preview_link_part_two( $permalink, $post, $sample ) {
        global $pagenow;


		if ( is_int( $post ) )
			$post = get_post( $post );

		
		//Is this published?
		if( in_array( $post->post_status, $this->published_statuses ) )
			return $permalink;

		//Are we overriding the permalink? Don't do anything
		if( isset( $_POST['action'] ) && $_POST['action'] == 'sample-permalink' )
			return $permalink;

		//Are we previewing the post from the normal post screen?
		if( ( $pagenow == 'post.php' || $pagenow == 'post-new.php' )
			&& !isset( $_POST['wp-preview'] ) )
			return $permalink;

		//If it's a sample permalink, not a preview
		if ( $sample ) {
			return $permalink;
		}

		return $this->get_preview_link( $post );
    }

    /**
	 * Another hack! hack! hack! until core better supports custom statuses
	 *
	 * @since 0.9
	 *
	 * The preview link for a saved unpublished post with a custom status returns a 'preview_nonce'
	 * in it and needs to be removed when previewing it to return a viewable preview link.
	 * @see https://github.com/Automattic/Edit-Flow/issues/513
	 */
	public function fix_preview_link_part_three( $preview_link, $query_args ) {
		if ( $autosave = wp_get_post_autosave( $query_args->ID, $query_args->post_author ) ) {
		    foreach ( array_intersect( array_keys( _wp_post_revision_fields( $query_args ) ), array_keys( _wp_post_revision_fields( $autosave ) ) ) as $field ) {
		        if ( normalize_whitespace( $query_args->$field ) != normalize_whitespace( $autosave->$field ) ) {
		        	// Pass through, it's a personal preview.
		            return $preview_link;
		        }
		   }
		}
		return remove_query_arg( array( 'preview_nonce' ), $preview_link );
	}
    
    /** 
	 * Fix get_sample_permalink. Critical for cases like editing the sample permalink on
	 * hierarchical post types.
	 * @since 0.8.2
	 *
	 * @param string  $permalink Sample permalink
	 * @param int 	  $post_id 	 Post ID
	 * @param string  $title 	 Post title
	 * @param string  $name 	 Post name (slug)
	 * @param WP_Post $post 	 Post object
	 * @return string $link Direct link to complete the action
	 */
	public function fix_get_sample_permalink( $permalink, $post_id, $title, $name, $post ) {
      $status_slugs = $this->statuses;

		if ( ! in_array( $post->post_status, $status_slugs )) {
			return $permalink;
      }
      remove_filter( 'get_sample_permalink', array( $this, 'fix_get_sample_permalink' ), 10, 5 );

      $new_name  = ! is_null( $name ) ? $name : $post->post_name;
      $new_title = ! is_null( $title ) ? $title : $post->post_title;
      
      $post = get_post( $post_id );
      $status_before = $post->post_status;
      $post->post_status = 'draft';
      $permalink = get_sample_permalink( $post, $title, sanitize_title( $new_name ? $new_name : $new_title, $post->ID ) );
      $post->post_status = $status_before;
      add_filter( 'get_sample_permalink', array( $this, 'fix_get_sample_permalink' ), 10, 5 );
      return $permalink;
    }
    
    /**
	 * Hack to work around post status check in get_sample_permalink_html
	 * 
	 * 
	 * The get_sample_permalink_html checks the status of the post and if it's
	 * a draft generates a certain permalink structure.
	 * We need to do the same work it's doing for custom statuses in order
	 * to support this link
	 * @see https://core.trac.wordpress.org/browser/tags/4.5.2/src/wp-admin/includes/post.php#L1296
	 *
	 * @since 0.8.2
	 * 
	 * @param string  $return    Sample permalink HTML markup
	 * @param int 	  $post_id   Post ID
	 * @param string  $new_title New sample permalink title
	 * @param string  $new_slug  New sample permalink kslug
	 * @param WP_Post $post 	 Post object
	 */
	function fix_get_sample_permalink_html( $permalink, $post_id, $new_title, $new_slug, $post ) {
		$status_slugs = $this->statuses;
      if ( ! in_array( $post->post_status, $status_slugs ) ) {
			return $permalink;
      }
      remove_filter( 'get_sample_permalink_html', array( $this, 'fix_get_sample_permalink_html' ), 10, 5 );
      $post->post_status = 'draft';
		$sample_permalink_html = get_sample_permalink_html( $post, $new_title, $new_slug );
		add_filter( 'get_sample_permalink_html', array( $this, 'fix_get_sample_permalink_html' ), 10, 5 );
		return $sample_permalink_html;
	
    }

    /**
	 * Fixes a bug where post-pagination doesn't work when previewing a post with a custom status
	 * @link https://github.com/Automattic/Edit-Flow/issues/192
	 *
	 * This filter only modifies output if `is_preview()` is true
	 *
	 * Used by `wp_link_pages_link` filter
	 *
	 * @param $link
	 * @param $i
	 *
	 * @return string
	 */
	function modify_preview_link_pagination_url( $link, $i ) {

		// Use the original $link when not in preview mode
		if( ! is_preview() ) {
			return $link;
		}

		// Get an array of valid custom status slugs
		$custom_statuses = $this->statuses;

		// Apply original link filters from core `wp_link_pages()`
		$r = apply_filters( 'wp_link_pages_args', array(
				'link_before' => '',
				'link_after'  => '',
				'pagelink'    => '%',
			)
		);

		// _wp_link_page() && _ef_wp_link_page() produce an opening link tag ( <a href=".."> )
		// This is necessary to replicate core behavior:
		$link = $r['link_before'] . str_replace( '%', $i, $r['pagelink'] ) . $r['link_after'];
		$link = _argentum_wp_link_page( $i, $custom_statuses ) . $link . '</a>';


		return $link;
	}

    
    /**
	 * The preview link for an unpublished post should always be ?p=, even in the list table
	 * @see http://core.trac.wordpress.org/ticket/19378
	 */
	public function fix_post_row_actions( $actions, $post ) {
		global $pagenow;

		// Only modify if we're using a pre-publish status on a supported custom post type
		$status_slugs = $this->statuses;
		if ( 'edit.php' != $pagenow
			|| ! in_array( $post->post_status, $status_slugs ) )
			return $actions;

		// 'view' is only set if the user has permission to post
		if ( empty( $actions['view'] ) )
			return $actions;

		if ( 'page' == $post->post_type ) {
			$args = array(
					'page_id'    => $post->ID,
				);
		} else if ( 'post' == $post->post_type ) {
			$args = array(
					'p'          => $post->ID,
				);
		} else {
			$args = array(
					'p'          => $post->ID,
					'post_type'  => $post->post_type,
				);
		}
		$args['preview'] = 'true';
		$preview_link = add_query_arg( $args, home_url() );

		$actions['view'] = '<a href="' . esc_url( $preview_link ) . '" title="' . esc_attr( sprintf( __( 'Preview &#8220;%s&#8221;' ), $post->post_title ) ) . '" rel="permalink">' . __( 'Preview' ) . '</a>';
		return $actions;
    }

   function _argentum_wp_link_page( $i, $custom_statuses ) {
      global $wp_rewrite;
      $post = get_post();
      $query_args = array();

      if ( 1 == $i ) {
         $url = get_permalink();
      } else {
         // Check for all custom post statuses, not just draft & pending
         if ( '' == get_option('permalink_structure') || in_array($post->post_status, array_merge( $custom_statuses, array( 'pending' ) ) ) )
            $url = add_query_arg( 'page', $i, get_permalink() );
         elseif ( 'page' == get_option('show_on_front') && get_option('page_on_front') == $post->ID )
            $url = trailingslashit(get_permalink()) . user_trailingslashit("$wp_rewrite->pagination_base/" . $i, 'single_paged');
         else
            $url = trailingslashit(get_permalink()) . user_trailingslashit($i, 'single_paged');
      }

      if ( is_preview() ) {

         // Check for all custom post statuses, no just the draft
         if ( ( ! in_array($post->post_status, $custom_statuses ) ) && isset( $_GET['preview_id'], $_GET['preview_nonce'] ) ) {
            $query_args['preview_id'] = wp_unslash( $_GET['preview_id'] );
            $query_args['preview_nonce'] = wp_unslash( $_GET['preview_nonce'] );
         }

         $url = get_preview_post_link( $post, $query_args, $url );
      }

      return '<a href="' . esc_url( $url ) . '">';
   }
 
}



   
  