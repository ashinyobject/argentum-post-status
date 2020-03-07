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