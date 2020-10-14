/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./assets/legacy/legacy.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/legacy/legacy.js":
/*!*********************************!*\
  !*** ./assets/legacy/legacy.js ***!
  \*********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_post_status_legacy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/post-status-legacy */ "./assets/legacy/src/post-status-legacy.js");
/* harmony import */ var _src_post_status_legacy__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_src_post_status_legacy__WEBPACK_IMPORTED_MODULE_0__);
 //import './src/post-status-inline-edit';

/***/ }),

/***/ "./assets/legacy/src/post-status-legacy.js":
/*!*************************************************!*\
  !*** ./assets/legacy/src/post-status-legacy.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

jQuery(document).ready(function () {
  allStatuses = argentumPostStatusData['allStatuses'];
  defaultStatus = argentumPostStatusData['defaultStatus'];
  currentStatus = argentumPostStatusData['currentStatus'];
  currentStatusName = argentumPostStatusData['currentStatusName'];
  currentUserCanPublishPosts = argentumPostStatusData['currentUserCanPublishPosts'];
  currentUserCanEditPublishedPosts = argentumPostStatusData['currentUserCanEditPublishedPosts'];
  jQuery('label[for=post_status]').show();
  jQuery('#post-status-display').show();

  if (jQuery('select[name="_status"]').length == 0) {
    // not on quick edit
    if (currentUserCanPublishPosts || currentStatus == 'publish' && currentUserCanEditPublishPosts) {
      // show publish button if allowed to publish
      jQuery('#publish').show();
    } else {
      // mimic default post status dropdown
      jQuery('<span>&nbsp;<a href="#post_status" class="edit-post-status" tabindex=\'4\'> Edit </a></span>' + ' <div id="post-status-select">' + ' <input type="hidden" name="hidden_post_status" id="hidden_post_status" value="in-progress" />' + ' <select name=\'post_status\' id=\'post_status\' tabindex=\'4\'>' + ' </select>' + '  <a href="#post_status" class="save-post-status button"> OK </a>' + '  <a href="#post_status" class="cancel-post-status"> Cancel </a>' + ' </div>').insertAfter('#post-status-display');
      jQuery('.edit-post-status').click(function () {
        jQuery('#post-status-select').slideDown();
        jQuery('.edit-post-status').hide();
        return false;
      });
      jQuery('.cancel-post-status, .save-post-status').click(function () {
        jQuery('#post-status-select').slideUp();
        jQuery('.edit-post-status').show();
        return false;
      });
      jQuery('.save-post-status').click(function () {
        jQuery('#post-status-display').text(jQuery('select[name="post_status"] :selected').text());
        return false;
      });
    }
  } // 1. Add custom statuses to post.php Status dropdown
  // Or 2. Add custom statuses to quick-edit status dropdowns on edit.php
  // Or 3. Hide two inputs with the default workflow status to override 'Draft' as the default contributor status


  if (jQuery('select[name="post_status"]').length > 0) {
    // Set the Save button to generic text by default
    argentumPostStatusUpdateSaveButton('Save'); // Bind event when OK button is clicked

    jQuery('.save-post-status').bind('click', function () {
      argentumPostStatusUpdateSaveButton();
    }); // Add custom statuses to Status dropdown

    argentumPostStatusAppendToDropDown('select[name="post_status"]'); // Make status dropdown visible on load if enabled

    jQuery('#post-status-select').show();
    jQuery('.edit-post-status').hide(); // Hide status dropdown if not allowed to edit

    if (!argentumPostStatusCanChangeStatus(currentStatus)) {
      jQuery('#post-status-select').hide();
      jQuery('.edit-post-status').hide(); // set the current status as the selected one

      var $option = jQuery('<option></option>').text(currentStatusName).attr('value', currentStatus).attr('selected', 'selected');
      $option.appendTo('select[name="post_status"]');
    } // If custom status set for post, then set is as #post-status-display


    jQuery('#post-status-display').text(argentumPostStatusGetStatusName(currentStatus));
  } else if (jQuery('select[name="_status"]').length > 0) {
    argentumPostStatusAppendToDropDown('select[name="_status"]'); // Refresh the custom status dropdowns everytime Quick Edit is loaded

    jQuery('#the-list a.editinline').bind('click', function () {
      argentumPostStatusAppendToDropDown('#the-list select[name="_status"]');
    }); // Clean up the bulk edit selector because it's non-standard

    jQuery('#bulk-edit').find('select[name="_status"]').prepend('<option value=""> No Change </option>');
    jQuery('#bulk-edit').find('select[name="_status"] option').removeAttr('selected');
    jQuery('#bulk-edit').find('select[name="_status"] option[value="future"]').remove();
  } else {
    // Set the Save button to generic text by default
    argentumPostStatusUpdateSaveButton('Save'); // If custom status set for post, then set is as #post-status-display

    jQuery('#post-status-display').text(argentumPostStatusGetStatusName(currentStatus));
  }

  if (jQuery('ul.subsubsub')) {
    argentumPostStatusAddTooltipsToFilterLinks('ul.subsubsub li a');
  } // Add custom statuses to Status dropdown


  function argentumPostStatusAppendToDropDown(id) {
    // Empty dropdown except for 'future' because we need to persist that
    jQuery(id + ' option').not('[value="future"]').remove(); // Add "Published" status to quick-edit for users that can publish

    if (id == 'select[name="_status"]' && currentUserCanPublishPosts) {
      jQuery(id).append(jQuery('<option></option').attr('value', 'publish').text('Published'));
    } // Add remaining statuses to dropdown. 'private' is always handled by a checkbox, and 'future' already exists if we need it


    jQuery.each(allStatuses, function () {
      if (this.slug == 'private' || this.slug == 'future') return;
      if (currentStatus != 'publish' && this.slug == 'publish') return;
      var $option = jQuery('<option></option>').text(this.name).attr('value', this.slug).attr('title', this.description ? this.description : '');
      if (currentStatus == this.slug) $option.attr('selected', 'selected');
      $option.appendTo(jQuery(id));
    });
  }

  function argentumPostStatusCanChangeStatus(slug) {
    var change = false;
    jQuery.each(allStatuses, function () {
      if (this.slug == slug) change = true;
    });

    if (slug == 'publish' && !currentUserCanPublishPosts) {
      change = false;
    }

    return change;
  }

  function argentumPostStatusAddTooltipsToFilterLinks(selector) {
    jQuery.each(allStatuses, function () {
      jQuery(selector + ':contains("' + this.name + '")').attr('title', this.description);
    });
  } // Update "Save" button text


  function argentumPostStatusUpdateSaveButton(text) {
    if (!text) text = 'Save As ' + jQuery('select[name="post_status"] :selected').text();
    jQuery(':input#save-post').attr('value', text);
  } // Returns the name of the status given a slug


  function argentumPostStatusGetStatusName(slug) {
    var name = '';
    jQuery.each(allStatuses, function () {
      if (this.slug == slug) name = this.name;
    });

    if (!name) {
      name = currentStatusName;
    }

    return name;
  } // If we're on the Manage Posts screen, remove the trailing dashes left behind once we hide the post-state span (the status).
  // We do this since we already add a custom column for post status on the screen since custom statuses are a core part of EF.


  if (jQuery('.post-state').length > 0) {
    argentumPostStatusRemovePostTitleTrailingDashes();
  } // Remove the " - " in between a post title and the post-state span (separately hidden via CSS).
  // This will not affect the dash before post-state-format spans.


  function argentumPostStatusRemovePostTitleTrailingDashes() {
    jQuery('.post-title.column-title strong').each(function () {
      jQuery(this).html(jQuery(this).html().replace(/(.*) - (<span class="post-state".*<\/span>)$/g, "$1$2"));
    });
  }
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2xlZ2FjeS9sZWdhY3kuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2xlZ2FjeS9zcmMvcG9zdC1zdGF0dXMtbGVnYWN5LmpzIl0sIm5hbWVzIjpbImpRdWVyeSIsImRvY3VtZW50IiwicmVhZHkiLCJhbGxTdGF0dXNlcyIsImFyZ2VudHVtUG9zdFN0YXR1c0RhdGEiLCJkZWZhdWx0U3RhdHVzIiwiY3VycmVudFN0YXR1cyIsImN1cnJlbnRTdGF0dXNOYW1lIiwiY3VycmVudFVzZXJDYW5QdWJsaXNoUG9zdHMiLCJjdXJyZW50VXNlckNhbkVkaXRQdWJsaXNoZWRQb3N0cyIsInNob3ciLCJsZW5ndGgiLCJjdXJyZW50VXNlckNhbkVkaXRQdWJsaXNoUG9zdHMiLCJpbnNlcnRBZnRlciIsImNsaWNrIiwic2xpZGVEb3duIiwiaGlkZSIsInNsaWRlVXAiLCJ0ZXh0IiwiYXJnZW50dW1Qb3N0U3RhdHVzVXBkYXRlU2F2ZUJ1dHRvbiIsImJpbmQiLCJhcmdlbnR1bVBvc3RTdGF0dXNBcHBlbmRUb0Ryb3BEb3duIiwiYXJnZW50dW1Qb3N0U3RhdHVzQ2FuQ2hhbmdlU3RhdHVzIiwiJG9wdGlvbiIsImF0dHIiLCJhcHBlbmRUbyIsImFyZ2VudHVtUG9zdFN0YXR1c0dldFN0YXR1c05hbWUiLCJmaW5kIiwicHJlcGVuZCIsInJlbW92ZUF0dHIiLCJyZW1vdmUiLCJhcmdlbnR1bVBvc3RTdGF0dXNBZGRUb29sdGlwc1RvRmlsdGVyTGlua3MiLCJpZCIsIm5vdCIsImFwcGVuZCIsImVhY2giLCJzbHVnIiwibmFtZSIsImRlc2NyaXB0aW9uIiwiY2hhbmdlIiwic2VsZWN0b3IiLCJhcmdlbnR1bVBvc3RTdGF0dXNSZW1vdmVQb3N0VGl0bGVUcmFpbGluZ0Rhc2hlcyIsImh0bWwiLCJyZXBsYWNlIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7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InNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vYXNzZXRzL2xlZ2FjeS9sZWdhY3kuanNcIik7XG4iLCJpbXBvcnQgJy4vc3JjL3Bvc3Qtc3RhdHVzLWxlZ2FjeSc7XG4vL2ltcG9ydCAnLi9zcmMvcG9zdC1zdGF0dXMtaW5saW5lLWVkaXQnOyIsImpRdWVyeShkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gICBhbGxTdGF0dXNlcyA9IGFyZ2VudHVtUG9zdFN0YXR1c0RhdGFbJ2FsbFN0YXR1c2VzJ107XG4gICBkZWZhdWx0U3RhdHVzID0gYXJnZW50dW1Qb3N0U3RhdHVzRGF0YVsnZGVmYXVsdFN0YXR1cyddO1xuICAgY3VycmVudFN0YXR1cyAgPSBhcmdlbnR1bVBvc3RTdGF0dXNEYXRhWydjdXJyZW50U3RhdHVzJ107XG4gICBjdXJyZW50U3RhdHVzTmFtZSAgPSBhcmdlbnR1bVBvc3RTdGF0dXNEYXRhWydjdXJyZW50U3RhdHVzTmFtZSddO1xuICAgY3VycmVudFVzZXJDYW5QdWJsaXNoUG9zdHMgPSBhcmdlbnR1bVBvc3RTdGF0dXNEYXRhWydjdXJyZW50VXNlckNhblB1Ymxpc2hQb3N0cyddO1xuICAgY3VycmVudFVzZXJDYW5FZGl0UHVibGlzaGVkUG9zdHMgPSBhcmdlbnR1bVBvc3RTdGF0dXNEYXRhWydjdXJyZW50VXNlckNhbkVkaXRQdWJsaXNoZWRQb3N0cyddO1xuXG5cblx0alF1ZXJ5KCdsYWJlbFtmb3I9cG9zdF9zdGF0dXNdJykuc2hvdygpO1xuXHRqUXVlcnkoJyNwb3N0LXN0YXR1cy1kaXNwbGF5Jykuc2hvdygpO1xuXG5cdGlmICggalF1ZXJ5KCdzZWxlY3RbbmFtZT1cIl9zdGF0dXNcIl0nKS5sZW5ndGggPT0gMCApIHsgLy8gbm90IG9uIHF1aWNrIGVkaXRcblx0XHRcblx0XHRpZiAoIGN1cnJlbnRVc2VyQ2FuUHVibGlzaFBvc3RzIHx8ICggY3VycmVudFN0YXR1cyA9PSAncHVibGlzaCcgJiYgY3VycmVudFVzZXJDYW5FZGl0UHVibGlzaFBvc3RzICkgKSB7XG5cdFx0XHQvLyBzaG93IHB1Ymxpc2ggYnV0dG9uIGlmIGFsbG93ZWQgdG8gcHVibGlzaFxuXHRcdFx0alF1ZXJ5KCcjcHVibGlzaCcpLnNob3coKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gbWltaWMgZGVmYXVsdCBwb3N0IHN0YXR1cyBkcm9wZG93blxuXHRcdFx0alF1ZXJ5KCc8c3Bhbj4mbmJzcDs8YSBocmVmPVwiI3Bvc3Rfc3RhdHVzXCIgY2xhc3M9XCJlZGl0LXBvc3Qtc3RhdHVzXCIgdGFiaW5kZXg9XFwnNFxcJz4gRWRpdCA8L2E+PC9zcGFuPicgK1xuXHRcdFx0JyA8ZGl2IGlkPVwicG9zdC1zdGF0dXMtc2VsZWN0XCI+JyArXG5cdFx0XHQnIDxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgbmFtZT1cImhpZGRlbl9wb3N0X3N0YXR1c1wiIGlkPVwiaGlkZGVuX3Bvc3Rfc3RhdHVzXCIgdmFsdWU9XCJpbi1wcm9ncmVzc1wiIC8+JyArXG5cdFx0XHQnIDxzZWxlY3QgbmFtZT1cXCdwb3N0X3N0YXR1c1xcJyBpZD1cXCdwb3N0X3N0YXR1c1xcJyB0YWJpbmRleD1cXCc0XFwnPicgK1xuXHRcdFx0JyA8L3NlbGVjdD4nICtcblx0XHRcdCcgIDxhIGhyZWY9XCIjcG9zdF9zdGF0dXNcIiBjbGFzcz1cInNhdmUtcG9zdC1zdGF0dXMgYnV0dG9uXCI+IE9LIDwvYT4nICtcblx0XHRcdCcgIDxhIGhyZWY9XCIjcG9zdF9zdGF0dXNcIiBjbGFzcz1cImNhbmNlbC1wb3N0LXN0YXR1c1wiPiBDYW5jZWwgPC9hPicgK1xuXHRcdFx0JyA8L2Rpdj4nKS5pbnNlcnRBZnRlcignI3Bvc3Qtc3RhdHVzLWRpc3BsYXknKTtcblx0XHRcblx0XHRcdGpRdWVyeSgnLmVkaXQtcG9zdC1zdGF0dXMnKS5jbGljayhmdW5jdGlvbigpIHtcblx0XHRcdFx0alF1ZXJ5KCcjcG9zdC1zdGF0dXMtc2VsZWN0Jykuc2xpZGVEb3duKCk7XG5cdFx0XHRcdGpRdWVyeSgnLmVkaXQtcG9zdC1zdGF0dXMnKS5oaWRlKCk7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH0pO1xuXHRcdFx0alF1ZXJ5KCcuY2FuY2VsLXBvc3Qtc3RhdHVzLCAuc2F2ZS1wb3N0LXN0YXR1cycpLmNsaWNrKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRqUXVlcnkoJyNwb3N0LXN0YXR1cy1zZWxlY3QnKS5zbGlkZVVwKCk7XG5cdFx0XHRcdGpRdWVyeSgnLmVkaXQtcG9zdC1zdGF0dXMnKS5zaG93KCk7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH0pO1xuXHRcdFx0alF1ZXJ5KCcuc2F2ZS1wb3N0LXN0YXR1cycpLmNsaWNrKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRqUXVlcnkoJyNwb3N0LXN0YXR1cy1kaXNwbGF5JykudGV4dChqUXVlcnkoJ3NlbGVjdFtuYW1lPVwicG9zdF9zdGF0dXNcIl0gOnNlbGVjdGVkJykudGV4dCgpKTtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gMS4gQWRkIGN1c3RvbSBzdGF0dXNlcyB0byBwb3N0LnBocCBTdGF0dXMgZHJvcGRvd25cblx0Ly8gT3IgMi4gQWRkIGN1c3RvbSBzdGF0dXNlcyB0byBxdWljay1lZGl0IHN0YXR1cyBkcm9wZG93bnMgb24gZWRpdC5waHBcblx0Ly8gT3IgMy4gSGlkZSB0d28gaW5wdXRzIHdpdGggdGhlIGRlZmF1bHQgd29ya2Zsb3cgc3RhdHVzIHRvIG92ZXJyaWRlICdEcmFmdCcgYXMgdGhlIGRlZmF1bHQgY29udHJpYnV0b3Igc3RhdHVzXG5cdGlmICggalF1ZXJ5KCdzZWxlY3RbbmFtZT1cInBvc3Rfc3RhdHVzXCJdJykubGVuZ3RoID4gMCApIHtcblx0XHRcblx0XHQvLyBTZXQgdGhlIFNhdmUgYnV0dG9uIHRvIGdlbmVyaWMgdGV4dCBieSBkZWZhdWx0XG5cdFx0YXJnZW50dW1Qb3N0U3RhdHVzVXBkYXRlU2F2ZUJ1dHRvbignU2F2ZScpO1xuXHRcdFxuXHRcdC8vIEJpbmQgZXZlbnQgd2hlbiBPSyBidXR0b24gaXMgY2xpY2tlZFxuXHRcdGpRdWVyeSgnLnNhdmUtcG9zdC1zdGF0dXMnKS5iaW5kKCdjbGljaycsIGZ1bmN0aW9uKCkge1x0XG5cdFx0XHRhcmdlbnR1bVBvc3RTdGF0dXNVcGRhdGVTYXZlQnV0dG9uKCk7XG5cdFx0fSk7XG5cdFx0XG5cdFx0Ly8gQWRkIGN1c3RvbSBzdGF0dXNlcyB0byBTdGF0dXMgZHJvcGRvd25cblx0XHRhcmdlbnR1bVBvc3RTdGF0dXNBcHBlbmRUb0Ryb3BEb3duKCdzZWxlY3RbbmFtZT1cInBvc3Rfc3RhdHVzXCJdJyk7XG5cdFx0XG5cdFx0Ly8gTWFrZSBzdGF0dXMgZHJvcGRvd24gdmlzaWJsZSBvbiBsb2FkIGlmIGVuYWJsZWRcblx0XHRqUXVlcnkoJyNwb3N0LXN0YXR1cy1zZWxlY3QnKS5zaG93KCk7XG5cdFx0alF1ZXJ5KCcuZWRpdC1wb3N0LXN0YXR1cycpLmhpZGUoKTtcblx0XHRcblx0XHQvLyBIaWRlIHN0YXR1cyBkcm9wZG93biBpZiBub3QgYWxsb3dlZCB0byBlZGl0XG5cdFx0aWYgKCAhYXJnZW50dW1Qb3N0U3RhdHVzQ2FuQ2hhbmdlU3RhdHVzKGN1cnJlbnRTdGF0dXMpICkge1xuXHRcdFx0alF1ZXJ5KCcjcG9zdC1zdGF0dXMtc2VsZWN0JykuaGlkZSgpO1xuXHRcdFx0alF1ZXJ5KCcuZWRpdC1wb3N0LXN0YXR1cycpLmhpZGUoKTtcblx0XHRcdFxuXHRcdFx0Ly8gc2V0IHRoZSBjdXJyZW50IHN0YXR1cyBhcyB0aGUgc2VsZWN0ZWQgb25lXG5cdFx0XHR2YXIgJG9wdGlvbiA9IGpRdWVyeSgnPG9wdGlvbj48L29wdGlvbj4nKS50ZXh0KGN1cnJlbnRTdGF0dXNOYW1lKS5hdHRyKCd2YWx1ZScsIGN1cnJlbnRTdGF0dXMpLmF0dHIoJ3NlbGVjdGVkJywgJ3NlbGVjdGVkJyk7XG5cblx0XHRcdCRvcHRpb24uYXBwZW5kVG8oJ3NlbGVjdFtuYW1lPVwicG9zdF9zdGF0dXNcIl0nKTtcblx0XHR9XG5cdFx0XG5cdFx0Ly8gSWYgY3VzdG9tIHN0YXR1cyBzZXQgZm9yIHBvc3QsIHRoZW4gc2V0IGlzIGFzICNwb3N0LXN0YXR1cy1kaXNwbGF5XG5cdFx0alF1ZXJ5KCcjcG9zdC1zdGF0dXMtZGlzcGxheScpLnRleHQoYXJnZW50dW1Qb3N0U3RhdHVzR2V0U3RhdHVzTmFtZShjdXJyZW50U3RhdHVzKSk7XG5cblx0fSBlbHNlIGlmICggalF1ZXJ5KCdzZWxlY3RbbmFtZT1cIl9zdGF0dXNcIl0nKS5sZW5ndGggPiAwICkge1xuXHRcdGFyZ2VudHVtUG9zdFN0YXR1c0FwcGVuZFRvRHJvcERvd24oJ3NlbGVjdFtuYW1lPVwiX3N0YXR1c1wiXScpO1xuXHRcdC8vIFJlZnJlc2ggdGhlIGN1c3RvbSBzdGF0dXMgZHJvcGRvd25zIGV2ZXJ5dGltZSBRdWljayBFZGl0IGlzIGxvYWRlZFxuXHRcdGpRdWVyeSgnI3RoZS1saXN0IGEuZWRpdGlubGluZScpLmJpbmQoICdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHRcdFx0YXJnZW50dW1Qb3N0U3RhdHVzQXBwZW5kVG9Ecm9wRG93bignI3RoZS1saXN0IHNlbGVjdFtuYW1lPVwiX3N0YXR1c1wiXScpO1xuXHRcdH0gKTtcblx0XHQvLyBDbGVhbiB1cCB0aGUgYnVsayBlZGl0IHNlbGVjdG9yIGJlY2F1c2UgaXQncyBub24tc3RhbmRhcmRcblx0XHRqUXVlcnkoICcjYnVsay1lZGl0JyApLmZpbmQoICdzZWxlY3RbbmFtZT1cIl9zdGF0dXNcIl0nICkucHJlcGVuZCggJzxvcHRpb24gdmFsdWU9XCJcIj4gTm8gQ2hhbmdlIDwvb3B0aW9uPicgKTtcblx0XHRqUXVlcnkoICcjYnVsay1lZGl0JyApLmZpbmQoICdzZWxlY3RbbmFtZT1cIl9zdGF0dXNcIl0gb3B0aW9uJyApLnJlbW92ZUF0dHIoJ3NlbGVjdGVkJyk7XG5cdFx0alF1ZXJ5KCAnI2J1bGstZWRpdCcgKS5maW5kKCAnc2VsZWN0W25hbWU9XCJfc3RhdHVzXCJdIG9wdGlvblt2YWx1ZT1cImZ1dHVyZVwiXScpLnJlbW92ZSgpO1xuXHR9IGVsc2Uge1xuXG5cdFx0Ly8gU2V0IHRoZSBTYXZlIGJ1dHRvbiB0byBnZW5lcmljIHRleHQgYnkgZGVmYXVsdFxuXHRcdGFyZ2VudHVtUG9zdFN0YXR1c1VwZGF0ZVNhdmVCdXR0b24oJ1NhdmUnKTtcblxuXHRcdC8vIElmIGN1c3RvbSBzdGF0dXMgc2V0IGZvciBwb3N0LCB0aGVuIHNldCBpcyBhcyAjcG9zdC1zdGF0dXMtZGlzcGxheVxuXHRcdGpRdWVyeSgnI3Bvc3Qtc3RhdHVzLWRpc3BsYXknKS50ZXh0KGFyZ2VudHVtUG9zdFN0YXR1c0dldFN0YXR1c05hbWUoY3VycmVudFN0YXR1cykpO1xuXHRcdFxuXHR9XG5cdFx0XG5cdGlmIChqUXVlcnkoJ3VsLnN1YnN1YnN1YicpKSB7XG5cdFx0YXJnZW50dW1Qb3N0U3RhdHVzQWRkVG9vbHRpcHNUb0ZpbHRlckxpbmtzKCd1bC5zdWJzdWJzdWIgbGkgYScpO1xuXHR9XG5cdFxuXHQvLyBBZGQgY3VzdG9tIHN0YXR1c2VzIHRvIFN0YXR1cyBkcm9wZG93blxuXHRmdW5jdGlvbiBhcmdlbnR1bVBvc3RTdGF0dXNBcHBlbmRUb0Ryb3BEb3duKCBpZCApIHtcblx0XG5cdFx0Ly8gRW1wdHkgZHJvcGRvd24gZXhjZXB0IGZvciAnZnV0dXJlJyBiZWNhdXNlIHdlIG5lZWQgdG8gcGVyc2lzdCB0aGF0XG5cdFx0alF1ZXJ5KGlkICsgJyBvcHRpb24nKS5ub3QoJ1t2YWx1ZT1cImZ1dHVyZVwiXScpLnJlbW92ZSgpO1xuXHRcdFxuXHRcdC8vIEFkZCBcIlB1Ymxpc2hlZFwiIHN0YXR1cyB0byBxdWljay1lZGl0IGZvciB1c2VycyB0aGF0IGNhbiBwdWJsaXNoXG5cdFx0aWYgKCBpZD09J3NlbGVjdFtuYW1lPVwiX3N0YXR1c1wiXScgJiYgY3VycmVudFVzZXJDYW5QdWJsaXNoUG9zdHMgKSB7XG5cdFx0XHRqUXVlcnkoaWQpLmFwcGVuZChqUXVlcnkoJzxvcHRpb24+PC9vcHRpb24nKVxuXHRcdFx0XHQuYXR0cigndmFsdWUnLCdwdWJsaXNoJylcblx0XHRcdFx0LnRleHQoICdQdWJsaXNoZWQnIClcblx0XHRcdCk7XG5cdFx0fVxuXHRcdFxuXHRcdC8vIEFkZCByZW1haW5pbmcgc3RhdHVzZXMgdG8gZHJvcGRvd24uICdwcml2YXRlJyBpcyBhbHdheXMgaGFuZGxlZCBieSBhIGNoZWNrYm94LCBhbmQgJ2Z1dHVyZScgYWxyZWFkeSBleGlzdHMgaWYgd2UgbmVlZCBpdFxuXHRcdGpRdWVyeS5lYWNoKCBhbGxTdGF0dXNlcywgZnVuY3Rpb24oKSB7XG5cdFx0XHRpZiAoIHRoaXMuc2x1ZyA9PSAncHJpdmF0ZScgfHwgdGhpcy5zbHVnID09ICdmdXR1cmUnIClcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XG5cdFx0XHRpZiAoIGN1cnJlbnRTdGF0dXMgIT0gJ3B1Ymxpc2gnICYmIHRoaXMuc2x1ZyA9PSAncHVibGlzaCcgKVxuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFxuXHRcdFx0dmFyICRvcHRpb24gPSBqUXVlcnkoJzxvcHRpb24+PC9vcHRpb24+Jylcblx0XHRcdFx0XHRcdFx0LnRleHQodGhpcy5uYW1lKVxuXHRcdFx0XHRcdFx0XHQuYXR0cigndmFsdWUnLCB0aGlzLnNsdWcpXG5cdFx0XHRcdFx0XHRcdC5hdHRyKCd0aXRsZScsICh0aGlzLmRlc2NyaXB0aW9uKSA/IHRoaXMuZGVzY3JpcHRpb24gOiAnJylcblx0XHRcdFx0XHRcdFx0O1xuXHRcdFx0XHRcdFx0XHRcblx0XHRcdGlmKCBjdXJyZW50U3RhdHVzID09IHRoaXMuc2x1ZyApICRvcHRpb24uYXR0cignc2VsZWN0ZWQnLCdzZWxlY3RlZCcpO1xuXHRcdFx0XG5cdFx0XHQkb3B0aW9uLmFwcGVuZFRvKCBqUXVlcnkoaWQpICk7XG5cdFx0fSk7XG5cdH1cblx0XG5cdGZ1bmN0aW9uIGFyZ2VudHVtUG9zdFN0YXR1c0NhbkNoYW5nZVN0YXR1cyhzbHVnKSB7XG5cdFx0dmFyIGNoYW5nZSA9IGZhbHNlO1xuXG5cdFx0alF1ZXJ5LmVhY2goYWxsU3RhdHVzZXMsIGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYodGhpcy5zbHVnPT1zbHVnKSBjaGFuZ2UgPSB0cnVlO1xuXHRcdH0pO1xuXHRcdGlmIChzbHVnID09ICdwdWJsaXNoJyAmJiAhY3VycmVudFVzZXJDYW5QdWJsaXNoUG9zdHMpIHtcblx0XHRcdGNoYW5nZSA9IGZhbHNlO1xuXHRcdH1cblx0XHRyZXR1cm4gY2hhbmdlO1xuXHR9XG5cdFxuXHRmdW5jdGlvbiBhcmdlbnR1bVBvc3RTdGF0dXNBZGRUb29sdGlwc1RvRmlsdGVyTGlua3Moc2VsZWN0b3IpIHtcdFxuXHRcdGpRdWVyeS5lYWNoKGFsbFN0YXR1c2VzLCBmdW5jdGlvbigpIHtcblx0XHRcdGpRdWVyeShzZWxlY3RvciArICc6Y29udGFpbnMoXCInKyB0aGlzLm5hbWUgKydcIiknKVxuXHRcdFx0XHQuYXR0cigndGl0bGUnLCB0aGlzLmRlc2NyaXB0aW9uKVxuXHRcdH0pXG5cdFx0XG5cdH1cblx0XG5cdC8vIFVwZGF0ZSBcIlNhdmVcIiBidXR0b24gdGV4dFxuXHRmdW5jdGlvbiBhcmdlbnR1bVBvc3RTdGF0dXNVcGRhdGVTYXZlQnV0dG9uKCB0ZXh0ICkge1xuXHRcdGlmKCF0ZXh0KSB0ZXh0ID0gJ1NhdmUgQXMgJyArIGpRdWVyeSgnc2VsZWN0W25hbWU9XCJwb3N0X3N0YXR1c1wiXSA6c2VsZWN0ZWQnKS50ZXh0KCk7XG5cdFx0alF1ZXJ5KCc6aW5wdXQjc2F2ZS1wb3N0JykuYXR0cigndmFsdWUnLCB0ZXh0KTtcblx0fVxuXHRcblx0Ly8gUmV0dXJucyB0aGUgbmFtZSBvZiB0aGUgc3RhdHVzIGdpdmVuIGEgc2x1Z1xuXHRmdW5jdGlvbiBhcmdlbnR1bVBvc3RTdGF0dXNHZXRTdGF0dXNOYW1lIChzbHVnKSB7XG5cdFx0dmFyIG5hbWUgPSAnJztcblx0XHRqUXVlcnkuZWFjaChhbGxTdGF0dXNlcywgZnVuY3Rpb24oKSB7XG5cdFx0XHRpZih0aGlzLnNsdWc9PXNsdWcpIG5hbWUgPSB0aGlzLm5hbWU7XG5cdFx0fSk7XG5cdFx0XG5cdFx0aWYgKCFuYW1lKSB7XG5cdFx0XHRuYW1lID0gY3VycmVudFN0YXR1c05hbWU7XG5cdFx0fVxuXHRcdFxuXHRcdHJldHVybiBuYW1lO1xuXHR9XG5cblx0Ly8gSWYgd2UncmUgb24gdGhlIE1hbmFnZSBQb3N0cyBzY3JlZW4sIHJlbW92ZSB0aGUgdHJhaWxpbmcgZGFzaGVzIGxlZnQgYmVoaW5kIG9uY2Ugd2UgaGlkZSB0aGUgcG9zdC1zdGF0ZSBzcGFuICh0aGUgc3RhdHVzKS5cblx0Ly8gV2UgZG8gdGhpcyBzaW5jZSB3ZSBhbHJlYWR5IGFkZCBhIGN1c3RvbSBjb2x1bW4gZm9yIHBvc3Qgc3RhdHVzIG9uIHRoZSBzY3JlZW4gc2luY2UgY3VzdG9tIHN0YXR1c2VzIGFyZSBhIGNvcmUgcGFydCBvZiBFRi5cblx0aWYgKCBqUXVlcnkoJy5wb3N0LXN0YXRlJykubGVuZ3RoID4gMCApIHtcblx0XHRhcmdlbnR1bVBvc3RTdGF0dXNSZW1vdmVQb3N0VGl0bGVUcmFpbGluZ0Rhc2hlcygpO1xuXHR9XG5cblx0Ly8gUmVtb3ZlIHRoZSBcIiAtIFwiIGluIGJldHdlZW4gYSBwb3N0IHRpdGxlIGFuZCB0aGUgcG9zdC1zdGF0ZSBzcGFuIChzZXBhcmF0ZWx5IGhpZGRlbiB2aWEgQ1NTKS5cblx0Ly8gVGhpcyB3aWxsIG5vdCBhZmZlY3QgdGhlIGRhc2ggYmVmb3JlIHBvc3Qtc3RhdGUtZm9ybWF0IHNwYW5zLlxuXHRmdW5jdGlvbiBhcmdlbnR1bVBvc3RTdGF0dXNSZW1vdmVQb3N0VGl0bGVUcmFpbGluZ0Rhc2hlcygpIHtcblx0XHRqUXVlcnkoJy5wb3N0LXRpdGxlLmNvbHVtbi10aXRsZSBzdHJvbmcnKS5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0alF1ZXJ5KHRoaXMpLmh0bWwoalF1ZXJ5KHRoaXMpLmh0bWwoKS5yZXBsYWNlKC8oLiopIC0gKDxzcGFuIGNsYXNzPVwicG9zdC1zdGF0ZVwiLio8XFwvc3Bhbj4pJC9nLCBcIiQxJDJcIikpO1xuXHRcdH0pO1xuXHR9XG5cdFxufSk7Il0sInNvdXJjZVJvb3QiOiIifQ==