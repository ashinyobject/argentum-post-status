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
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = mutationsList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var mutation = _step.value;
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = mutation.addedNodes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var node = _step2.value;
            maybeUpdateButtonText(node);
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  });
  observer.observe(parentNode, {
    childList: true
  });
  return observer;
}

function maybeUpdateButtonText(saveButton) {
  if (saveButton && (saveButton.innerText === 'Save Draft' || saveButton.innerText === 'Save as Pending')) {
    saveButton.innerText = 'Save';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2Jsb2Nrcy9zcmMvYmxvY2svYmxvY2tzLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9ibG9ja3Mvc3JjL2Jsb2NrL2VkaXRvci5zY3NzIiwid2VicGFjazovLy8uL2Fzc2V0cy9ibG9ja3Mvc3JjL2Jsb2NrL3N0eWxlLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2Jsb2Nrcy9zcmMvYmxvY2tzLmpzIl0sIm5hbWVzIjpbIlBsdWdpblBvc3RTdGF0dXNJbmZvIiwid3AiLCJlZGl0UG9zdCIsInJlZ2lzdGVyUGx1Z2luIiwicGx1Z2lucyIsImRhdGEiLCJzdWJzY3JpYmUiLCJkaXNwYXRjaCIsInNlbGVjdCIsIndpdGhTZWxlY3QiLCJ3aXRoRGlzcGF0Y2giLCJjb21wb3NlIiwiU2VsZWN0Q29udHJvbCIsImNvbXBvbmVudHMiLCJzdGF0dXNlcyIsIndpbmRvdyIsImFyZ2VudHVtUG9zdFN0YXR1c0Jsb2NrRGF0YSIsIm1hcCIsInMiLCJsYWJlbCIsIm5hbWUiLCJ2YWx1ZSIsInNsdWciLCJkZWZhdWx0U3RhdHVzIiwiYnV0dG9uVGV4dE9ic2VydmVyIiwicG9zdElkIiwiZ2V0Q3VycmVudFBvc3RJZCIsImlzQ2xlYW5OZXdQb3N0Iiwic3RhdHVzIiwibWF5YmVVcGRhdGVCdXR0b25UZXh0IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiTXV0YXRpb25PYnNlcnZlciIsImlzU2F2aW5nUG9zdCIsImNyZWF0ZUJ1dHRvbk9ic2VydmVyIiwicGFyZW50Tm9kZSIsIm9ic2VydmVyIiwibXV0YXRpb25zTGlzdCIsIm11dGF0aW9uIiwiYWRkZWROb2RlcyIsIm5vZGUiLCJvYnNlcnZlIiwiY2hpbGRMaXN0Iiwic2F2ZUJ1dHRvbiIsImlubmVyVGV4dCIsIkFyZ2VudHVtUG9zdFN0YXR1c2VzIiwib25VcGRhdGUiLCJtYXBTZWxlY3RUb1Byb3BzIiwiZ2V0RWRpdGVk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WCxHQUF1Qix5QkFBQyxhQUFEO0FBQ3ZCLFNBQUssRUFBQyxFQURpQjtBQUV2QixTQUFLLEVBQUdBLE1BRmU7QUFHdkIsV0FBTyxFQUFHZCxRQUhhO0FBSXZCLFlBQVEsRUFBR2dDO0FBSlksSUFBdkIsR0FLRyxJQVZQLEVBWUU7QUFBTyxhQUFTLEVBQUM7QUFBakIsS0FDSWxCLE1BQU0sS0FBSyxTQUFYLEdBQXVCLG9EQUF2QixHQUE2RSxnRUFEakYsQ0FaRixDQUR5QjtBQUFBLENBQTNCOztBQW1CQSxJQUFNbUIsZ0JBQWdCLEdBQUcsU0FBbkJBLGdCQUFtQixDQUFFdkMsTUFBRixFQUFjO0FBQ3JDLFNBQU87QUFDTG9CLFVBQU0sRUFBRXBCLE1BQU0sQ0FBQyxhQUFELENBQU4sQ0FBc0J3QyxzQkFBdEIsQ0FBNkMsUUFBN0M7QUFESCxHQUFQO0FBR0QsQ0FKRDs7QUFNQSxJQUFNQyxrQkFBa0IsR0FBRyxTQUFyQkEsa0JBQXFCLENBQUUxQyxRQUFGLEVBQWdCO0FBQ3pDLFNBQU87QUFDTHVDLFlBREssb0JBQ0tsQixNQURMLEVBQ2M7QUFDakJyQixjQUFRLENBQUUsYUFBRixDQUFSLENBQTBCTCxRQUExQixDQUFvQztBQUFFMEIsY0FBTSxFQUFOQTtBQUFGLE9BQXBDO0FBQ0Q7QUFISSxHQUFQO0FBS0QsQ0FORDs7QUFRQSxJQUFJc0IsTUFBTSxHQUFHdkMsT0FBTyxDQUNsQkYsVUFBVSxDQUFFc0MsZ0JBQUYsQ0FEUSxFQUVsQnJDLFlBQVksQ0FBRXVDLGtCQUFGLENBRk0sQ0FBUCxDQUdWSixvQkFIVSxDQUFiO0FBS0E7Ozs7QUFHQTFDLGNBQWMsQ0FBRSx3QkFBRixFQUE0QjtBQUN4Q2dELFFBQU0sRUFBRUQ7QUFEZ0MsQ0FBNUIsQ0FBZCxDOzs7Ozs7Ozs7OztBQ25IQSx5Qzs7Ozs7Ozs7Ozs7QUNBQSx5Qzs7Ozs7Ozs7Ozs7O0FDQUE7QUFBQSIsImZpbGUiOiJhcmdlbnR1bS1wb3N0LXN0YXR1cy1ibG9jay5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vYXNzZXRzL2Jsb2Nrcy9zcmMvYmxvY2tzLmpzXCIpO1xuIiwiaW1wb3J0ICcuL2VkaXRvci5zY3NzJztcbmltcG9ydCAnLi9zdHlsZS5zY3NzJztcblxubGV0IHsgUGx1Z2luUG9zdFN0YXR1c0luZm8gfSA9IHdwLmVkaXRQb3N0O1xubGV0IHsgcmVnaXN0ZXJQbHVnaW4gfSA9IHdwLnBsdWdpbnM7XG5sZXQgeyBzdWJzY3JpYmUsIGRpc3BhdGNoLCBzZWxlY3QsIHdpdGhTZWxlY3QsIHdpdGhEaXNwYXRjaCB9ID0gd3AuZGF0YTtcbmxldCB7IGNvbXBvc2UgfSA9IHdwLmNvbXBvc2U7XG5sZXQgeyBTZWxlY3RDb250cm9sIH0gPSB3cC5jb21wb25lbnRzO1xuXG5sZXQgc3RhdHVzZXMgPSB3aW5kb3cuYXJnZW50dW1Qb3N0U3RhdHVzQmxvY2tEYXRhWydhbGxTdGF0dXNlcyddLm1hcCggcyA9PiAoeyBsYWJlbDogcy5uYW1lLCB2YWx1ZTogcy5zbHVnIH0pICk7XG5sZXQgZGVmYXVsdFN0YXR1cyA9IGFyZ2VudHVtUG9zdFN0YXR1c0Jsb2NrRGF0YVsnZGVmYXVsdFN0YXR1cyddO1xuXG4vKipcbiAqIFN1YnNjcmliZSB0byBjaGFuZ2VzIHNvIHdlIGNhbiBzZXQgYSBkZWZhdWx0IHN0YXR1cyBhbmQgdXBkYXRlIGEgYnV0dG9uJ3MgdGV4dC5cbiAqL1xubGV0IGJ1dHRvblRleHRPYnNlcnZlciA9IG51bGw7XG5zdWJzY3JpYmUoIGZ1bmN0aW9uICgpIHtcblx0Y29uc3QgcG9zdElkID0gc2VsZWN0KCAnY29yZS9lZGl0b3InICkuZ2V0Q3VycmVudFBvc3RJZCgpO1xuXHRpZiAoICEgcG9zdElkICkge1xuXHRcdC8vIFBvc3QgaXNuJ3QgcmVhZHkgeWV0IHNvIGRvbid0IGRvIGFueXRoaW5nLlxuXHRcdHJldHVybjtcblx0fVxuXG5cdC8vIEZvciBuZXcgcG9zdHMsIHdlIG5lZWQgdG8gZm9yY2UgdGhlIGRlZmF1bHQgY3VzdG9tIHN0YXR1cy5cblx0Y29uc3QgaXNDbGVhbk5ld1Bvc3QgPSBzZWxlY3QoICdjb3JlL2VkaXRvcicgKS5pc0NsZWFuTmV3UG9zdCgpO1xuXHRpZiAoIGlzQ2xlYW5OZXdQb3N0ICkge1xuXHRcdGRpc3BhdGNoKCAnY29yZS9lZGl0b3InICkuZWRpdFBvc3QoIHtcblx0XHRcdHN0YXR1czogZGVmYXVsdFN0YXR1c1xuXHRcdH0gKTtcblx0fVxuXG5cdC8vIElmIHRoZSBzYXZlIGJ1dHRvbiBleGlzdHMsIGxldCdzIHVwZGF0ZSB0aGUgdGV4dCBpZiBuZWVkZWQuXG5cdG1heWJlVXBkYXRlQnV0dG9uVGV4dCggZG9jdW1lbnQucXVlcnlTZWxlY3RvciggJy5lZGl0b3ItcG9zdC1zYXZlLWRyYWZ0JyApICk7XG5cblx0Ly8gVGhlIHBvc3QgaXMgYmVpbmcgc2F2ZWQsIHNvIHdlIG5lZWQgdG8gc2V0IHVwIGFuIG9ic2VydmVyIHRvIHVwZGF0ZSB0aGUgYnV0dG9uIHRleHQgd2hlbiBpdCdzIGJhY2suXG5cdGlmICggYnV0dG9uVGV4dE9ic2VydmVyID09PSBudWxsICYmIHdpbmRvdy5NdXRhdGlvbk9ic2VydmVyICYmIHNlbGVjdCggJ2NvcmUvZWRpdG9yJyApLmlzU2F2aW5nUG9zdCgpICkge1xuXHRcdGJ1dHRvblRleHRPYnNlcnZlciA9IGNyZWF0ZUJ1dHRvbk9ic2VydmVyKCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCAnLmVkaXQtcG9zdC1oZWFkZXJfX3NldHRpbmdzJyApICk7XG5cdH1cbn0gKTtcblxuLyoqXG4gKiBDcmVhdGUgYSBtdXRhdGlvbiBvYnNlcnZlciB0aGF0IHdpbGwgdXBkYXRlIHRoZVxuICogc2F2ZSBidXR0b24gdGV4dCByaWdodCBhd2F5IHdoZW4gaXQncyBjaGFuZ2VkL3JlLWFkZGVkLlxuICpcbiAqIElkZWFsbHkgdGhlcmUgd2lsbCBiZSBiZXR0ZXIgd2F5cyB0byBnbyBhYm91dCB0aGlzIGluIHRoZSBmdXR1cmUuXG4gKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9BdXRvbWF0dGljL0VkaXQtRmxvdy9pc3N1ZXMvNTgzXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUJ1dHRvbk9ic2VydmVyKCBwYXJlbnROb2RlICkge1xuXHRpZiAoICEgcGFyZW50Tm9kZSApIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoICggbXV0YXRpb25zTGlzdCApID0+IHtcblx0XHRmb3IgKCBjb25zdCBtdXRhdGlvbiBvZiBtdXRhdGlvbnNMaXN0ICkge1xuXHRcdFx0Zm9yICggY29uc3Qgbm9kZSBvZiBtdXRhdGlvbi5hZGRlZE5vZGVzICkge1xuXHRcdFx0XHRtYXliZVVwZGF0ZUJ1dHRvblRleHQoIG5vZGUgKTtcblx0XHRcdH1cblx0XHR9XG5cdH0gKTtcblxuXHRvYnNlcnZlci5vYnNlcnZlKCBwYXJlbnROb2RlLCB7IGNoaWxkTGlzdDogdHJ1ZSB9ICk7XG5cdHJldHVybiBvYnNlcnZlcjtcbn1cblxuZnVuY3Rpb24gbWF5YmVVcGRhdGVCdXR0b25UZXh0KCBzYXZlQnV0dG9uICkge1xuXHRpZiAoIHNhdmVCdXR0b24gJiYgKCBzYXZlQnV0dG9uLmlubmVyVGV4dCA9PT0gJ1NhdmUgRHJhZnQnIHx8IHNhdmVCdXR0b24uaW5uZXJUZXh0ID09PSAnU2F2ZSBhcyBQZW5kaW5nJyApICkge1xuXHRcdHNhdmVCdXR0b24uaW5uZXJUZXh0ID0gJ1NhdmUnO1xuXHR9XG59XG5cbi8qKlxuICogQ3VzdG9tIHN0YXR1cyBjb21wb25lbnRcbiAqIEBwYXJhbSBvYmplY3QgcHJvcHNcbiAqL1xubGV0IEFyZ2VudHVtUG9zdFN0YXR1c2VzID0gKCB7IG9uVXBkYXRlLCBzdGF0dXMgfSApID0+IChcbiAgPFBsdWdpblBvc3RTdGF0dXNJbmZvXG4gICAgY2xhc3NOYW1lPXsgJ2FyZ2VudHVtLWV4dGVuZGVkLXBvc3Qtc3RhdHVzIGFyZ2VudHVtLWV4dGVuZGVkLXBvc3Qtc3RhdHVzLSR7c3RhdHVzfScgfVxuICA+XG4gICAgPGg0Pnsgc3RhdHVzICE9PSAncHVibGlzaCcgPyAnUG9zdCBTdGF0dXMnOiAnUG9zdCBTdGF0dXMgRGlzYWJsZWQuJyB9PC9oND5cblxuICAgIHsgc3RhdHVzICE9PSAncHVibGlzaCcgPyA8U2VsZWN0Q29udHJvbFxuICAgICAgbGFiZWw9XCJcIlxuICAgICAgdmFsdWU9eyBzdGF0dXMgfVxuICAgICAgb3B0aW9ucz17IHN0YXR1c2VzIH1cbiAgICAgIG9uQ2hhbmdlPXsgb25VcGRhdGUgfVxuICAgIC8+IDogbnVsbCB9XG5cbiAgICA8c21hbGwgY2xhc3NOYW1lPVwiYXJnZW50dW0tZXh0ZW5kZWQtcG9zdC1zdGF0dXMtbm90ZVwiPlxuICAgICAgeyBzdGF0dXMgIT09ICdwdWJsaXNoJyA/ICdOb3RlOiB0aGlzIHdpbGwgb3ZlcnJpZGUgYWxsIHN0YXR1cyBzZXR0aW5ncyBhYm92ZSc6ICdUbyBzZWxlY3QgYSBjdXN0b20gc3RhdHVzLCBwbGVhc2UgdW5wdWJsaXNoIHRoZSBjb250ZW50IGZpcnN0Lid9XG4gICAgPC9zbWFsbD5cbiAgPC9QbHVnaW5Qb3N0U3RhdHVzSW5mbz5cbik7XG5cbmNvbnN0IG1hcFNlbGVjdFRvUHJvcHMgPSAoIHNlbGVjdCApID0+IHtcbiAgcmV0dXJuIHtcbiAgICBzdGF0dXM6IHNlbGVjdCgnY29yZS9lZGl0b3InKS5nZXRFZGl0ZWRQb3N0QXR0cmlidXRlKCdzdGF0dXMnKSxcbiAgfTtcbn07XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9ICggZGlzcGF0Y2ggKSA9PiB7XG4gIHJldHVybiB7XG4gICAgb25VcGRhdGUoIHN0YXR1cyApIHtcbiAgICAgIGRpc3BhdGNoKCAnY29yZS9lZGl0b3InICkuZWRpdFBvc3QoIHsgc3RhdHVzIH0gKTtcbiAgICB9LFxuICB9O1xufTtcblxubGV0IHBsdWdpbiA9IGNvbXBvc2UoXG4gIHdpdGhTZWxlY3QoIG1hcFNlbGVjdFRvUHJvcHMgKSxcbiAgd2l0aERpc3BhdGNoKCBtYXBEaXNwYXRjaFRvUHJvcHMgKVxuKSggQXJnZW50dW1Qb3N0U3RhdHVzZXMgKTtcblxuLyoqXG4gKiBLaWNrIGl0IG9mZlxuICovXG5yZWdpc3RlclBsdWdpbiggJ2FyZ2VudHVtLWN1c3RvbS1zdGF0dXMnLCB7XG4gIHJlbmRlcjogcGx1Z2luXG59ICk7XG4iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpbiIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luIiwiaW1wb3J0ICcuL2Jsb2NrL2Jsb2Nrcyc7Il0sInNvdXJjZVJvb3QiOiIifQ==