jQuery(document).ready(function() {
   allStatuses = argentumPostStatusData['allStatuses'];
   defaultStatus = argentumPostStatusData['defaultStatus'];
   currentStatus  = argentumPostStatusData['currentStatus'];
   currentStatusName  = argentumPostStatusData['currentStatusName'];
   currentUserCanPublishPosts = argentumPostStatusData['currentUserCanPublishPosts'];
   currentUserCanEditPublishedPosts = argentumPostStatusData['currentUserCanEditPublishedPosts'];


	jQuery('label[for=post_status]').show();
	jQuery('#post-status-display').show();

	if ( jQuery('select[name="_status"]').length == 0 ) { // not on quick edit
		
		if ( currentUserCanPublishPosts || ( currentStatus == 'publish' && currentUserCanEditPublishPosts ) ) {
			// show publish button if allowed to publish
			jQuery('#publish').show();
		} else {
			// mimic default post status dropdown
			jQuery('<span>&nbsp;<a href="#post_status" class="edit-post-status" tabindex=\'4\'> Edit </a></span>' +
			' <div id="post-status-select">' +
			' <input type="hidden" name="hidden_post_status" id="hidden_post_status" value="in-progress" />' +
			' <select name=\'post_status\' id=\'post_status\' tabindex=\'4\'>' +
			' </select>' +
			'  <a href="#post_status" class="save-post-status button"> OK </a>' +
			'  <a href="#post_status" class="cancel-post-status"> Cancel </a>' +
			' </div>').insertAfter('#post-status-display');
		
			jQuery('.edit-post-status').click(function() {
				jQuery('#post-status-select').slideDown();
				jQuery('.edit-post-status').hide();
				return false;
			});
			jQuery('.cancel-post-status, .save-post-status').click(function() {
				jQuery('#post-status-select').slideUp();
				jQuery('.edit-post-status').show();
				return false;
			});
			jQuery('.save-post-status').click(function() {
				jQuery('#post-status-display').text(jQuery('select[name="post_status"] :selected').text());
				return false;
			});
		}
	}

	// 1. Add custom statuses to post.php Status dropdown
	// Or 2. Add custom statuses to quick-edit status dropdowns on edit.php
	// Or 3. Hide two inputs with the default workflow status to override 'Draft' as the default contributor status
	if ( jQuery('select[name="post_status"]').length > 0 ) {
		
		// Set the Save button to generic text by default
		argentumPostStatusUpdateSaveButton('Save');
		
		// Bind event when OK button is clicked
		jQuery('.save-post-status').bind('click', function() {	
			argentumPostStatusUpdateSaveButton();
		});
		
		// Add custom statuses to Status dropdown
		argentumPostStatusAppendToDropDown('select[name="post_status"]');
		
		// Make status dropdown visible on load if enabled
		jQuery('#post-status-select').show();
		jQuery('.edit-post-status').hide();
		
		// Hide status dropdown if not allowed to edit
		if ( !argentumPostStatusCanChangeStatus(currentStatus) ) {
			jQuery('#post-status-select').hide();
			jQuery('.edit-post-status').hide();
			
			// set the current status as the selected one
			var $option = jQuery('<option></option>').text(currentStatusName).attr('value', currentStatus).attr('selected', 'selected');

			$option.appendTo('select[name="post_status"]');
		}
		
		// If custom status set for post, then set is as #post-status-display
		jQuery('#post-status-display').text(argentumPostStatusGetStatusName(currentStatus));

	} else if ( jQuery('select[name="_status"]').length > 0 ) {
		argentumPostStatusAppendToDropDown('select[name="_status"]');
		// Refresh the custom status dropdowns everytime Quick Edit is loaded
		jQuery('#the-list a.editinline').bind( 'click', function() {
			argentumPostStatusAppendToDropDown('#the-list select[name="_status"]');
		} );
		// Clean up the bulk edit selector because it's non-standard
		jQuery( '#bulk-edit' ).find( 'select[name="_status"]' ).prepend( '<option value=""> No Change </option>' );
		jQuery( '#bulk-edit' ).find( 'select[name="_status"] option' ).removeAttr('selected');
		jQuery( '#bulk-edit' ).find( 'select[name="_status"] option[value="future"]').remove();
	} else {

		// Set the Save button to generic text by default
		argentumPostStatusUpdateSaveButton('Save');

		// If custom status set for post, then set is as #post-status-display
		jQuery('#post-status-display').text(argentumPostStatusGetStatusName(currentStatus));
		
	}
		
	if (jQuery('ul.subsubsub')) {
		argentumPostStatusAddTooltipsToFilterLinks('ul.subsubsub li a');
	}
	
	// Add custom statuses to Status dropdown
	function argentumPostStatusAppendToDropDown( id ) {
	
		// Empty dropdown except for 'future' because we need to persist that
		jQuery(id + ' option').not('[value="future"]').remove();
		
		// Add "Published" status to quick-edit for users that can publish
		if ( id=='select[name="_status"]' && currentUserCanPublishPosts ) {
			jQuery(id).append(jQuery('<option></option')
				.attr('value','publish')
				.text( 'Published' )
			);
		}
		
		// Add remaining statuses to dropdown. 'private' is always handled by a checkbox, and 'future' already exists if we need it
		jQuery.each( allStatuses, function() {
			if ( this.slug == 'private' || this.slug == 'future' )
				return;
			
			if ( currentStatus != 'publish' && this.slug == 'publish' )
				return;
				
			var $option = jQuery('<option></option>')
							.text(this.name)
							.attr('value', this.slug)
							.attr('title', (this.description) ? this.description : '')
							;
							
			if( currentStatus == this.slug ) $option.attr('selected','selected');
			
			$option.appendTo( jQuery(id) );
		});
	}
	
	function argentumPostStatusCanChangeStatus(slug) {
		var change = false;

		jQuery.each(allStatuses, function() {
			if(this.slug==slug) change = true;
		});
		if (slug == 'publish' && !currentUserCanPublishPosts) {
			change = false;
		}
		return change;
	}
	
	function argentumPostStatusAddTooltipsToFilterLinks(selector) {	
		jQuery.each(allStatuses, function() {
			jQuery(selector + ':contains("'+ this.name +'")')
				.attr('title', this.description)
		})
		
	}
	
	// Update "Save" button text
	function argentumPostStatusUpdateSaveButton( text ) {
		if(!text) text = 'Save As ' + jQuery('select[name="post_status"] :selected').text();
		jQuery(':input#save-post').attr('value', text);
	}
	
	// Returns the name of the status given a slug
	function argentumPostStatusGetStatusName (slug) {
		var name = '';
		jQuery.each(allStatuses, function() {
			if(this.slug==slug) name = this.name;
		});
		
		if (!name) {
			name = currentStatusName;
		}
		
		return name;
	}

	// If we're on the Manage Posts screen, remove the trailing dashes left behind once we hide the post-state span (the status).
	// We do this since we already add a custom column for post status on the screen since custom statuses are a core part of EF.
	if ( jQuery('.post-state').length > 0 ) {
		argentumPostStatusRemovePostTitleTrailingDashes();
	}

	// Remove the " - " in between a post title and the post-state span (separately hidden via CSS).
	// This will not affect the dash before post-state-format spans.
	function argentumPostStatusRemovePostTitleTrailingDashes() {
		jQuery('.post-title.column-title strong').each(function() {
			jQuery(this).html(jQuery(this).html().replace(/(.*) - (<span class="post-state".*<\/span>)$/g, "$1$2"));
		});
	}
	
});