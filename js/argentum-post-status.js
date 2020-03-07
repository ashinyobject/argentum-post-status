jQuery(document).ready(function($) {
   statusText = $('#post_status option:selected').text(); 
   $('#post-status-display').text(statusText);
   $('#save-post').val("Save "+statusText);
  
   $('#post-status-select a[href="#post_status"]').bind("click", function()
   {
      status = $('#post-status-display').text();
      $('#save-post').val("Save "+status);
   }); 
});
import './editor.scss';
import './style.scss';

let { PluginPostStatusInfo } = wp.editPost;
let { registerPlugin } = wp.plugins;
let { subscribe, dispatch, select, withSelect, withDispatch } = wp.data;
let { compose } = wp.compose;
let { SelectControl } = wp.components;

/**
 * Map Custom Statuses as options for SelectControl
 */
let statuses = window.ArgentumPostStatuses.map( s => ({ label: s.name, value: s.slug }) );

/**
 * Subscribe to changes so we can set a default status and update a button's text.
 */
let buttonTextObserver = null;
subscribe( function () {
	const postId = select( 'core/editor' ).getCurrentPostId();
	if ( ! postId ) {
		// Post isn't ready yet so don't do anything.
		return;
	}

	// For new posts, we need to force the default custom status.
	const isCleanNewPost = select( 'core/editor' ).isCleanNewPost();
	if ( isCleanNewPost ) {
		dispatch( 'core/editor' ).editPost( {
			status: ef_default_custom_status
		} );
	}

	// If the save button exists, let's update the text if needed.
	maybeUpdateButtonText( document.querySelector( '.editor-post-save-draft' ) );

	// The post is being saved, so we need to set up an observer to update the button text when it's back.
	if ( buttonTextObserver === null && window.MutationObserver && select( 'core/editor' ).isSavingPost() ) {
		buttonTextObserver = createButtonObserver( document.querySelector( '.edit-post-header__settings' ) );
	}
} );

/**
 * Create a mutation observer that will update the
 * save button text right away when it's changed/re-added.
 *
 * Ideally there will be better ways to go about this in the future.
 * @see https://github.com/Automattic/Edit-Flow/issues/583
 */
function createButtonObserver( parentNode ) {
	if ( ! parentNode ) {
		return null;
	}

	const observer = new MutationObserver( ( mutationsList ) => {
		for ( const mutation of mutationsList ) {
			for ( const node of mutation.addedNodes ) {
				maybeUpdateButtonText( node );
			}
		}
	} );

	observer.observe( parentNode, { childList: true } );
	return observer;
}

function maybeUpdateButtonText( saveButton ) {
	if ( saveButton && ( saveButton.innerText === 'Save Draft' || saveButton.innerText === 'Save as Pending' ) ) {
		saveButton.innerText = 'Save';
	}
}

/**
 * Custom status component
 * @param object props
 */
let ArgentumPostStatuses = ( { onUpdate, status } ) => (
  <PluginPostStatusInfo
    className={ `argentum-extended-post-status argentum-extended-post-status-${status}` }
  >
    <h4>{ status !== 'publish' ? 'Extended Post Status': 'Extended Post Status Disabled.' }</h4>

    { status !== 'publish' ? <SelectControl
      label=""
      value={ status }
      options={ statuses }
      onChange={ onUpdate }
    /> : null }

    <small className="argentum-extended-post-status-note">
      { status !== 'publish' ? `Note: this will override all status settings above.`: 'To select a custom status, please unpublish the content first.'}
    </small>
  </PluginPostStatusInfo>
);

const mapSelectToProps = ( select ) => {
  return {
    status: select('core/editor').getEditedPostAttribute('status'),
  };
};

const mapDispatchToProps = ( dispatch ) => {
  return {
    onUpdate( status ) {
      dispatch( 'core/editor' ).editPost( { status } );
    },
  };
};

let plugin = compose(
  withSelect( mapSelectToProps ),
  withDispatch( mapDispatchToProps )
)( ArgentumPostStatuses );

/**
 * Kick it off
 */
registerPlugin( 'argentum-post-status', {
  icon: 'argentum-post-status',
  render: plugin
} );