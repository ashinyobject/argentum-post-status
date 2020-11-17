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
/******/ 	return __webpack_require__(__webpack_require__.s = "./assets/blocks/src/blocks.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/blocks/src/block/blocks.js":
/*!*******************************************!*\
  !*** ./assets/blocks/src/block/blocks.js ***!
  \*******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./editor.scss */ "./assets/blocks/src/block/editor.scss");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_editor_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./assets/blocks/src/block/style.scss");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_scss__WEBPACK_IMPORTED_MODULE_1__);
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }



var __ = wp.i18n.__;
var PluginPostStatusInfo = wp.editPost.PluginPostStatusInfo;
var registerPlugin = wp.plugins.registerPlugin;
var _wp$data = wp.data,
    subscribe = _wp$data.subscribe,
    dispatch = _wp$data.dispatch,
    select = _wp$data.select,
    withSelect = _wp$data.withSelect,
    withDispatch = _wp$data.withDispatch;
var compose = wp.compose.compose;
var SelectControl = wp.components.SelectControl;
var statuses = window.argentumPostStatusBlockData['allStatuses'].map(function (s) {
  return {
    label: s.name,
    value: s.slug
  };
});
var defaultStatus = argentumPostStatusBlockData['defaultStatus'];
/**
 * Subscribe to changes so we can set a default status and update a button's text.
 */

var buttonTextObserver = null;
subscribe(function () {
  var postId = select('core/editor').getCurrentPostId();

  if (!postId) {
    // Post isn't ready yet so don't do anything.
    return;
  } // For new posts, we need to force the default custom status.


  var isCleanNewPost = select('core/editor').isCleanNewPost();

  if (isCleanNewPost) {
    dispatch('core/editor').editPost({
      status: defaultStatus
    });
  } // If the save button exists, let's update the text if needed.


  maybeUpdateButtonText(document.querySelector('.editor-post-save-draft')); // The post is being saved, so we need to set up an observer to update the button text when it's back.

  if (buttonTextObserver === null && window.MutationObserver && select('core/editor').isSavingPost()) {
    buttonTextObserver = createButtonObserver(document.querySelector('.edit-post-header__settings'));
  }
});
/**
 * Create a mutation observer that will update the
 * save button text right away when it's changed/re-added.
 *
 * Ideally there will be better ways to go about this in the future.
 * @see https://github.com/Automattic/Edit-Flow/issues/583
 */

function createButtonObserver(parentNode) {
  if (!parentNode) {
    return null;
  }

  var observer = new MutationObserver(function (mutationsList) {
    var _iterator = _createForOfIteratorHelper(mutationsList),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var mutation = _step.value;

        var _iterator2 = _createForOfIteratorHelper(mutation.addedNodes),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var node = _step2.value;
            maybeUpdateButtonText(node);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  });
  observer.observe(parentNode, {
    childList: true
  });
  return observer;
}

function maybeUpdateButtonText(saveButton) {
  if (saveButton && (saveButton.innerText === __('Save draft') || saveButton.innerText === __('Save as pending'))) {
    saveButton.innerText = __('Save');
  }
}
/**
 * Custom status component
 * @param object props
 */


var ArgentumPostStatuses = function ArgentumPostStatuses(_ref) {
  var onUpdate = _ref.onUpdate,
      status = _ref.status;
  return wp.element.createElement(PluginPostStatusInfo, {
    className: 'argentum-extended-post-status argentum-extended-post-status-${status}'
  }, wp.element.createElement("h4", null, status !== 'publish' ? 'Post Status' : 'Post Status Disabled.'), status !== 'publish' ? wp.element.createElement(SelectControl, {
    label: "",
    value: status,
    options: statuses,
    onChange: onUpdate
  }) : null, wp.element.createElement("small", {
    className: "argentum-extended-post-status-note"
  }, status !== 'publish' ? 'Note: this will override all status settings above' : 'To select a custom status, please unpublish the content first.'));
};

var mapSelectToProps = function mapSelectToProps(select) {
  return {
    status: select('core/editor').getEditedPostAttribute('status')
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onUpdate: function onUpdate(status) {
      dispatch('core/editor').editPost({
        status: status
      });
    }
  };
};

var plugin = compose(withSelect(mapSelectToProps), withDispatch(mapDispatchToProps))(ArgentumPostStatuses);
/**
 * Kick it off
 */

registerPlugin('argentum-custom-status', {
  render: plugin
});

/***/ }),

/***/ "./assets/blocks/src/block/editor.scss":
/*!*********************************************!*\
  !*** ./assets/blocks/src/block/editor.scss ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./assets/blocks/src/block/style.scss":
/*!********************************************!*\
  !*** ./assets/blocks/src/block/style.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./assets/blocks/src/blocks.js":
/*!*************************************!*\
  !*** ./assets/blocks/src/blocks.js ***!
  \*************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _block_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./block/blocks */ "./assets/blocks/src/block/blocks.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2Jsb2Nrcy9zcmMvYmxvY2svYmxvY2tzLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9ibG9ja3Mvc3JjL2Jsb2NrL2VkaXRvci5zY3NzIiwid2VicGFjazovLy8uL2Fzc2V0cy9ibG9ja3Mvc3JjL2Jsb2NrL3N0eWxlLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2Jsb2Nrcy9zcmMvYmxvY2tzLmpzIl0sIm5hbWVzIjpbIl9fIiwid3AiLCJpMThuIiwiUGx1Z2luUG9zdFN0YXR1c0luZm8iLCJlZGl0UG9zdCIsInJlZ2lzdGVyUGx1Z2luIiwicGx1Z2lucyIsImRhdGEiLCJzdWJzY3JpYmUiLCJkaXNwYXRjaCIsInNlbGVjdCIsIndpdGhTZWxlY3QiLCJ3aXRoRGlzcGF0Y2giLCJjb21wb3NlIiwiU2VsZWN0Q29udHJvbCIsImNvbXBvbmVudHMiLCJzdGF0dXNlcyIsIndpbmRvdyIsImFyZ2VudHVtUG9zdFN0YXR1c0Jsb2NrRGF0YSIsIm1hcCIsInMiLCJsYWJlbCIsIm5hbWUiLCJ2YWx1ZSIsInNsdWciLCJkZWZhdWx0U3RhdHVzIiwiYnV0dG9uVGV4dE9ic2VydmVyIiwicG9zdElkIiwiZ2V0Q3VycmVudFBvc3RJZCIsImlzQ2xlYW5OZXdQb3N0Iiwic3RhdHVzIiwibWF5YmVVcGRhdGVCdXR0b25UZXh0IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiTXV0YXRpb25PYnNlcnZlciIsImlzU2F2aW5nUG9zdCIsImNyZWF0ZUJ1dHRvbk9ic2VydmVyIiwicGFyZW50Tm9kZSIsIm9ic2VydmVyIiwibXV0YXRpb25zTGlzdCIsIm11dGF0aW9uIiwiYWRkZWROb2RlcyIsIm5vZGUiLCJvYnNlcnZlIiwiY2hpbGRMaXN0Iiwic2F2ZUJ1dHRvbiIsImlubmVyVGV4dCIsIkFyZ2VudHVtUG9zdFN0YXR1c2VzIiwib25VcGRhdGUiLCJtYXBTZWxlY3RUb1Byb3BzIiwiZ2V0RWRpdGVkUG9zdEF0dHJpYnV0ZSIsIm1hcERpc3BhdGNoVG9Qcm9wcyIsInBsdWdpbiIsInJlbmRlciJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7SUFFTUEsRSxHQUFPQyxFQUFFLENBQUNDLEksQ0FBVkYsRTtJQUNBRyxvQixHQUF5QkYsRUFBRSxDQUFDRyxRLENBQTVCRCxvQjtJQUNBRSxjLEdBQW1CSixFQUFFLENBQUNLLE8sQ0FBdEJELGM7ZUFDMERKLEVBQUUsQ0FBQ00sSTtJQUE3REMsUyxZQUFBQSxTO0lBQVdDLFEsWUFBQUEsUTtJQUFVQyxNLFlBQUFBLE07SUFBUUMsVSxZQUFBQSxVO0lBQVlDLFksWUFBQUEsWTtJQUN6Q0MsTyxHQUFZWixFQUFFLENBQUNZLE8sQ0FBZkEsTztJQUNBQyxhLEdBQWtCYixFQUFFLENBQUNjLFUsQ0FBckJELGE7QUFFTixJQUFJRSxRQUFRLEdBQUdDLE1B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LGFBQUQ7QUFDdkIsU0FBSyxFQUFDLEVBRGlCO0FBRXZCLFNBQUssRUFBR0EsTUFGZTtBQUd2QixXQUFPLEVBQUdkLFFBSGE7QUFJdkIsWUFBUSxFQUFHZ0M7QUFKWSxJQUF2QixHQUtHLElBVlAsRUFZRTtBQUFPLGFBQVMsRUFBQztBQUFqQixLQUNJbEIsTUFBTSxLQUFLLFNBQVgsR0FBdUIsb0RBQXZCLEdBQTZFLGdFQURqRixDQVpGLENBRHlCO0FBQUEsQ0FBM0I7O0FBbUJBLElBQU1tQixnQkFBZ0IsR0FBRyxTQUFuQkEsZ0JBQW1CLENBQUV2QyxNQUFGLEVBQWM7QUFDckMsU0FBTztBQUNMb0IsVUFBTSxFQUFFcEIsTUFBTSxDQUFDLGFBQUQsQ0FBTixDQUFzQndDLHNCQUF0QixDQUE2QyxRQUE3QztBQURILEdBQVA7QUFHRCxDQUpEOztBQU1BLElBQU1DLGtCQUFrQixHQUFHLFNBQXJCQSxrQkFBcUIsQ0FBRTFDLFFBQUYsRUFBZ0I7QUFDekMsU0FBTztBQUNMdUMsWUFESyxvQkFDS2xCLE1BREwsRUFDYztBQUNqQnJCLGNBQVEsQ0FBRSxhQUFGLENBQVIsQ0FBMEJMLFFBQTFCLENBQW9DO0FBQUUwQixjQUFNLEVBQU5BO0FBQUYsT0FBcEM7QUFDRDtBQUhJLEdBQVA7QUFLRCxDQU5EOztBQVFBLElBQUlzQixNQUFNLEdBQUd2QyxPQUFPLENBQ2xCRixVQUFVLENBQUVzQyxnQkFBRixDQURRLEVBRWxCckMsWUFBWSxDQUFFdUMsa0JBQUYsQ0FGTSxDQUFQLENBR1ZKLG9CQUhVLENBQWI7QUFLQTs7OztBQUdBMUMsY0FBYyxDQUFFLHdCQUFGLEVBQTRCO0FBQ3hDZ0QsUUFBTSxFQUFFRDtBQURnQyxDQUE1QixDQUFkLEM7Ozs7Ozs7Ozs7O0FDcEhBLHlDOzs7Ozs7Ozs7OztBQ0FBLHlDOzs7Ozs7Ozs7Ozs7QUNBQTtBQUFBIiwiZmlsZSI6ImFyZ2VudHVtLXBvc3Qtc3RhdHVzLWJsb2NrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9hc3NldHMvYmxvY2tzL3NyYy9ibG9ja3MuanNcIik7XG4iLCJpbXBvcnQgJy4vZWRpdG9yLnNjc3MnO1xuaW1wb3J0ICcuL3N0eWxlLnNjc3MnO1xuXG5sZXQgeyBfXyB9ID0gd3AuaTE4bjtcbmxldCB7IFBsdWdpblBvc3RTdGF0dXNJbmZvIH0gPSB3cC5lZGl0UG9zdDtcbmxldCB7IHJlZ2lzdGVyUGx1Z2luIH0gPSB3cC5wbHVnaW5zO1xubGV0IHsgc3Vic2NyaWJlLCBkaXNwYXRjaCwgc2VsZWN0LCB3aXRoU2VsZWN0LCB3aXRoRGlzcGF0Y2ggfSA9IHdwLmRhdGE7XG5sZXQgeyBjb21wb3NlIH0gPSB3cC5jb21wb3NlO1xubGV0IHsgU2VsZWN0Q29udHJvbCB9ID0gd3AuY29tcG9uZW50cztcblxubGV0IHN0YXR1c2VzID0gd2luZG93LmFyZ2VudHVtUG9zdFN0YXR1c0Jsb2NrRGF0YVsnYWxsU3RhdHVzZXMnXS5tYXAoIHMgPT4gKHsgbGFiZWw6IHMubmFtZSwgdmFsdWU6IHMuc2x1ZyB9KSApO1xubGV0IGRlZmF1bHRTdGF0dXMgPSBhcmdlbnR1bVBvc3RTdGF0dXNCbG9ja0RhdGFbJ2RlZmF1bHRTdGF0dXMnXTtcblxuLyoqXG4gKiBTdWJzY3JpYmUgdG8gY2hhbmdlcyBzbyB3ZSBjYW4gc2V0IGEgZGVmYXVsdCBzdGF0dXMgYW5kIHVwZGF0ZSBhIGJ1dHRvbidzIHRleHQuXG4gKi9cbmxldCBidXR0b25UZXh0T2JzZXJ2ZXIgPSBudWxsO1xuc3Vic2NyaWJlKCBmdW5jdGlvbiAoKSB7XG5cdGNvbnN0IHBvc3RJZCA9IHNlbGVjdCggJ2NvcmUvZWRpdG9yJyApLmdldEN1cnJlbnRQb3N0SWQoKTtcblx0aWYgKCAhIHBvc3RJZCApIHtcblx0XHQvLyBQb3N0IGlzbid0IHJlYWR5IHlldCBzbyBkb24ndCBkbyBhbnl0aGluZy5cblx0XHRyZXR1cm47XG5cdH1cblxuXHQvLyBGb3IgbmV3IHBvc3RzLCB3ZSBuZWVkIHRvIGZvcmNlIHRoZSBkZWZhdWx0IGN1c3RvbSBzdGF0dXMuXG5cdGNvbnN0IGlzQ2xlYW5OZXdQb3N0ID0gc2VsZWN0KCAnY29yZS9lZGl0b3InICkuaXNDbGVhbk5ld1Bvc3QoKTtcblx0aWYgKCBpc0NsZWFuTmV3UG9zdCApIHtcblx0XHRkaXNwYXRjaCggJ2NvcmUvZWRpdG9yJyApLmVkaXRQb3N0KCB7XG5cdFx0XHRzdGF0dXM6IGRlZmF1bHRTdGF0dXNcblx0XHR9ICk7XG5cdH1cblxuXHQvLyBJZiB0aGUgc2F2ZSBidXR0b24gZXhpc3RzLCBsZXQncyB1cGRhdGUgdGhlIHRleHQgaWYgbmVlZGVkLlxuXHRtYXliZVVwZGF0ZUJ1dHRvblRleHQoIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoICcuZWRpdG9yLXBvc3Qtc2F2ZS1kcmFmdCcgKSApO1xuXG5cdC8vIFRoZSBwb3N0IGlzIGJlaW5nIHNhdmVkLCBzbyB3ZSBuZWVkIHRvIHNldCB1cCBhbiBvYnNlcnZlciB0byB1cGRhdGUgdGhlIGJ1dHRvbiB0ZXh0IHdoZW4gaXQncyBiYWNrLlxuXHRpZiAoIGJ1dHRvblRleHRPYnNlcnZlciA9PT0gbnVsbCAmJiB3aW5kb3cuTXV0YXRpb25PYnNlcnZlciAmJiBzZWxlY3QoICdjb3JlL2VkaXRvcicgKS5pc1NhdmluZ1Bvc3QoKSApIHtcblx0XHRidXR0b25UZXh0T2JzZXJ2ZXIgPSBjcmVhdGVCdXR0b25PYnNlcnZlciggZG9jdW1lbnQucXVlcnlTZWxlY3RvciggJy5lZGl0LXBvc3QtaGVhZGVyX19zZXR0aW5ncycgKSApO1xuXHR9XG59ICk7XG5cbi8qKlxuICogQ3JlYXRlIGEgbXV0YXRpb24gb2JzZXJ2ZXIgdGhhdCB3aWxsIHVwZGF0ZSB0aGVcbiAqIHNhdmUgYnV0dG9uIHRleHQgcmlnaHQgYXdheSB3aGVuIGl0J3MgY2hhbmdlZC9yZS1hZGRlZC5cbiAqXG4gKiBJZGVhbGx5IHRoZXJlIHdpbGwgYmUgYmV0dGVyIHdheXMgdG8gZ28gYWJvdXQgdGhpcyBpbiB0aGUgZnV0dXJlLlxuICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vQXV0b21hdHRpYy9FZGl0LUZsb3cvaXNzdWVzLzU4M1xuICovXG5mdW5jdGlvbiBjcmVhdGVCdXR0b25PYnNlcnZlciggcGFyZW50Tm9kZSApIHtcblx0aWYgKCAhIHBhcmVudE5vZGUgKSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHRjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCAoIG11dGF0aW9uc0xpc3QgKSA9PiB7XG5cdFx0Zm9yICggY29uc3QgbXV0YXRpb24gb2YgbXV0YXRpb25zTGlzdCApIHtcblx0XHRcdGZvciAoIGNvbnN0IG5vZGUgb2YgbXV0YXRpb24uYWRkZWROb2RlcyApIHtcblx0XHRcdFx0bWF5YmVVcGRhdGVCdXR0b25UZXh0KCBub2RlICk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9ICk7XG5cblx0b2JzZXJ2ZXIub2JzZXJ2ZSggcGFyZW50Tm9kZSwgeyBjaGlsZExpc3Q6IHRydWUgfSApO1xuXHRyZXR1cm4gb2JzZXJ2ZXI7XG59XG5cbmZ1bmN0aW9uIG1heWJlVXBkYXRlQnV0dG9uVGV4dCggc2F2ZUJ1dHRvbiApIHtcblx0aWYgKCBzYXZlQnV0dG9uICYmICggc2F2ZUJ1dHRvbi5pbm5lclRleHQgPT09IF9fKCAnU2F2ZSBkcmFmdCcgKSB8fCBzYXZlQnV0dG9uLmlubmVyVGV4dCA9PT0gX18oICdTYXZlIGFzIHBlbmRpbmcnICkgKSApIHtcblx0XHRzYXZlQnV0dG9uLmlubmVyVGV4dCA9IF9fKCAnU2F2ZScgKTtcblx0fVxufVxuXG4vKipcbiAqIEN1c3RvbSBzdGF0dXMgY29tcG9uZW50XG4gKiBAcGFyYW0gb2JqZWN0IHByb3BzXG4gKi9cbmxldCBBcmdlbnR1bVBvc3RTdGF0dXNlcyA9ICggeyBvblVwZGF0ZSwgc3RhdHVzIH0gKSA9PiAoXG4gIDxQbHVnaW5Qb3N0U3RhdHVzSW5mb1xuICAgIGNsYXNzTmFtZT17ICdhcmdlbnR1bS1leHRlbmRlZC1wb3N0LXN0YXR1cyBhcmdlbnR1bS1leHRlbmRlZC1wb3N0LXN0YXR1cy0ke3N0YXR1c30nIH1cbiAgPlxuICAgIDxoND57IHN0YXR1cyAhPT0gJ3B1Ymxpc2gnID8gJ1Bvc3QgU3RhdHVzJzogJ1Bvc3QgU3RhdHVzIERpc2FibGVkLicgfTwvaDQ+XG5cbiAgICB7IHN0YXR1cyAhPT0gJ3B1Ymxpc2gnID8gPFNlbGVjdENvbnRyb2xcbiAgICAgIGxhYmVsPVwiXCJcbiAgICAgIHZhbHVlPXsgc3RhdHVzIH1cbiAgICAgIG9wdGlvbnM9eyBzdGF0dXNlcyB9XG4gICAgICBvbkNoYW5nZT17IG9uVXBkYXRlIH1cbiAgICAvPiA6IG51bGwgfVxuXG4gICAgPHNtYWxsIGNsYXNzTmFtZT1cImFyZ2VudHVtLWV4dGVuZGVkLXBvc3Qtc3RhdHVzLW5vdGVcIj5cbiAgICAgIHsgc3RhdHVzICE9PSAncHVibGlzaCcgPyAnTm90ZTogdGhpcyB3aWxsIG92ZXJyaWRlIGFsbCBzdGF0dXMgc2V0dGluZ3MgYWJvdmUnOiAnVG8gc2VsZWN0IGEgY3VzdG9tIHN0YXR1cywgcGxlYXNlIHVucHVibGlzaCB0aGUgY29udGVudCBmaXJzdC4nfVxuICAgIDwvc21hbGw+XG4gIDwvUGx1Z2luUG9zdFN0YXR1c0luZm8+XG4pO1xuXG5jb25zdCBtYXBTZWxlY3RUb1Byb3BzID0gKCBzZWxlY3QgKSA9PiB7XG4gIHJldHVybiB7XG4gICAgc3RhdHVzOiBzZWxlY3QoJ2NvcmUvZWRpdG9yJykuZ2V0RWRpdGVkUG9zdEF0dHJpYnV0ZSgnc3RhdHVzJyksXG4gIH07XG59O1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoIGRpc3BhdGNoICkgPT4ge1xuICByZXR1cm4ge1xuICAgIG9uVXBkYXRlKCBzdGF0dXMgKSB7XG4gICAgICBkaXNwYXRjaCggJ2NvcmUvZWRpdG9yJyApLmVkaXRQb3N0KCB7IHN0YXR1cyB9ICk7XG4gICAgfSxcbiAgfTtcbn07XG5cbmxldCBwbHVnaW4gPSBjb21wb3NlKFxuICB3aXRoU2VsZWN0KCBtYXBTZWxlY3RUb1Byb3BzICksXG4gIHdpdGhEaXNwYXRjaCggbWFwRGlzcGF0Y2hUb1Byb3BzIClcbikoIEFyZ2VudHVtUG9zdFN0YXR1c2VzICk7XG5cbi8qKlxuICogS2ljayBpdCBvZmZcbiAqL1xucmVnaXN0ZXJQbHVnaW4oICdhcmdlbnR1bS1jdXN0b20tc3RhdHVzJywge1xuICByZW5kZXI6IHBsdWdpblxufSApO1xuIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW4iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpbiIsImltcG9ydCAnLi9ibG9jay9ibG9ja3MnOyJdLCJzb3VyY2VSb290IjoiIn0=