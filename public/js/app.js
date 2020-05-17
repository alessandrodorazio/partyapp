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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/app.js":
/*!*****************************!*\
  !*** ./resources/js/app.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
__webpack_require__(/*! ./components/App */ "./resources/js/components/App.js");

/***/ }),

/***/ "./resources/js/components/App.js":
/*!****************************************!*\
  !*** ./resources/js/components/App.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/babel-loader/lib/index.js):\nSyntaxError: C:\\Users\\formi\\Desktop\\Università\\Progetti\\agile\\partyapp\\resources\\js\\components\\App.js: Unexpected token (39:62)\n\n\u001b[0m \u001b[90m 37 | \u001b[39m                            \u001b[33mNews\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 38 | \u001b[39m                        \u001b[33m<\u001b[39m\u001b[33m/\u001b[39m\u001b[33mTypography\u001b[39m\u001b[33m>\u001b[39m\u001b[0m\n\u001b[0m\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 39 | \u001b[39m                        \u001b[33m<\u001b[39m\u001b[33mButton\u001b[39m color\u001b[33m=\u001b[39m\u001b[32m\"inherit\"\u001b[39m\u001b[33m>\u001b[39m\u001b[33mLogin\u001b[39m\u001b[33m<\u001b[39m\u001b[33m/\u001b[39m\u001b[33mButton\u001b[39m\u001b[33m>\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m    | \u001b[39m                                                              \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\u001b[0m\n    at Object._raise (C:\\Users\\formi\\Desktop\\Università\\Progetti\\agile\\partyapp\\node_modules\\@babel\\parser\\lib\\index.js:742:17)\n    at Object.raiseWithData (C:\\Users\\formi\\Desktop\\Università\\Progetti\\agile\\partyapp\\node_modules\\@babel\\parser\\lib\\index.js:735:17)\n    at Object.raise (C:\\Users\\formi\\Desktop\\Università\\Progetti\\agile\\partyapp\\node_modules\\@babel\\parser\\lib\\index.js:729:17)\n    at Object.unexpected (C:\\Users\\formi\\Desktop\\Università\\Progetti\\agile\\partyapp\\node_modules\\@babel\\parser\\lib\\index.js:8779:16)\n    at Object.jsxParseElementAt (C:\\Users\\formi\\Desktop\\Università\\Progetti\\agile\\partyapp\\node_modules\\@babel\\parser\\lib\\index.js:4578:24)\n    at Object.jsxParseElementAt (C:\\Users\\formi\\Desktop\\Università\\Progetti\\agile\\partyapp\\node_modules\\@babel\\parser\\lib\\index.js:4556:32)\n    at Object.jsxParseElementAt (C:\\Users\\formi\\Desktop\\Università\\Progetti\\agile\\partyapp\\node_modules\\@babel\\parser\\lib\\index.js:4556:32)\n    at Object.jsxParseElementAt (C:\\Users\\formi\\Desktop\\Università\\Progetti\\agile\\partyapp\\node_modules\\@babel\\parser\\lib\\index.js:4556:32)\n    at Object.jsxParseElement (C:\\Users\\formi\\Desktop\\Università\\Progetti\\agile\\partyapp\\node_modules\\@babel\\parser\\lib\\index.js:4614:17)\n    at Object.parseExprAtom (C:\\Users\\formi\\Desktop\\Università\\Progetti\\agile\\partyapp\\node_modules\\@babel\\parser\\lib\\index.js:4621:19)\n    at Object.parseExprSubscripts (C:\\Users\\formi\\Desktop\\Università\\Progetti\\agile\\partyapp\\node_modules\\@babel\\parser\\lib\\index.js:9624:23)\n    at Object.parseMaybeUnary (C:\\Users\\formi\\Desktop\\Università\\Progetti\\agile\\partyapp\\node_modules\\@babel\\parser\\lib\\index.js:9604:21)\n    at Object.parseExprOps (C:\\Users\\formi\\Desktop\\Università\\Progetti\\agile\\partyapp\\node_modules\\@babel\\parser\\lib\\index.js:9474:23)\n    at Object.parseMaybeConditional (C:\\Users\\formi\\Desktop\\Università\\Progetti\\agile\\partyapp\\node_modules\\@babel\\parser\\lib\\index.js:9447:23)\n    at Object.parseMaybeAssign (C:\\Users\\formi\\Desktop\\Università\\Progetti\\agile\\partyapp\\node_modules\\@babel\\parser\\lib\\index.js:9402:21)\n    at Object.parseParenAndDistinguishExpression (C:\\Users\\formi\\Desktop\\Università\\Progetti\\agile\\partyapp\\node_modules\\@babel\\parser\\lib\\index.js:10215:28)\n    at Object.parseExprAtom (C:\\Users\\formi\\Desktop\\Università\\Progetti\\agile\\partyapp\\node_modules\\@babel\\parser\\lib\\index.js:9969:21)\n    at Object.parseExprAtom (C:\\Users\\formi\\Desktop\\Università\\Progetti\\agile\\partyapp\\node_modules\\@babel\\parser\\lib\\index.js:4626:20)\n    at Object.parseExprSubscripts (C:\\Users\\formi\\Desktop\\Università\\Progetti\\agile\\partyapp\\node_modules\\@babel\\parser\\lib\\index.js:9624:23)\n    at Object.parseMaybeUnary (C:\\Users\\formi\\Desktop\\Università\\Progetti\\agile\\partyapp\\node_modules\\@babel\\parser\\lib\\index.js:9604:21)\n    at Object.parseExprOps (C:\\Users\\formi\\Desktop\\Università\\Progetti\\agile\\partyapp\\node_modules\\@babel\\parser\\lib\\index.js:9474:23)\n    at Object.parseMaybeConditional (C:\\Users\\formi\\Desktop\\Università\\Progetti\\agile\\partyapp\\node_modules\\@babel\\parser\\lib\\index.js:9447:23)\n    at Object.parseMaybeAssign (C:\\Users\\formi\\Desktop\\Università\\Progetti\\agile\\partyapp\\node_modules\\@babel\\parser\\lib\\index.js:9402:21)\n    at Object.parseExpression (C:\\Users\\formi\\Desktop\\Università\\Progetti\\agile\\partyapp\\node_modules\\@babel\\parser\\lib\\index.js:9354:23)\n    at Object.parseReturnStatement (C:\\Users\\formi\\Desktop\\Università\\Progetti\\agile\\partyapp\\node_modules\\@babel\\parser\\lib\\index.js:11471:28)\n    at Object.parseStatementContent (C:\\Users\\formi\\Desktop\\Università\\Progetti\\agile\\partyapp\\node_modules\\@babel\\parser\\lib\\index.js:11152:21)\n    at Object.parseStatement (C:\\Users\\formi\\Desktop\\Università\\Progetti\\agile\\partyapp\\node_modules\\@babel\\parser\\lib\\index.js:11104:17)\n    at Object.parseBlockOrModuleBlockBody (C:\\Users\\formi\\Desktop\\Università\\Progetti\\agile\\partyapp\\node_modules\\@babel\\parser\\lib\\index.js:11679:25)\n    at Object.parseBlockBody (C:\\Users\\formi\\Desktop\\Università\\Progetti\\agile\\partyapp\\node_modules\\@babel\\parser\\lib\\index.js:11665:10)\n    at Object.parseBlock (C:\\Users\\formi\\Desktop\\Università\\Progetti\\agile\\partyapp\\node_modules\\@babel\\parser\\lib\\index.js:11649:10)\n    at Object.parseFunctionBody (C:\\Users\\formi\\Desktop\\Università\\Progetti\\agile\\partyapp\\node_modules\\@babel\\parser\\lib\\index.js:10656:24)\n    at Object.parseFunctionBodyAndFinish (C:\\Users\\formi\\Desktop\\Università\\Progetti\\agile\\partyapp\\node_modules\\@babel\\parser\\lib\\index.js:10639:10)\n    at C:\\Users\\formi\\Desktop\\Università\\Progetti\\agile\\partyapp\\node_modules\\@babel\\parser\\lib\\index.js:11819:12\n    at Object.withTopicForbiddingContext (C:\\Users\\formi\\Desktop\\Università\\Progetti\\agile\\partyapp\\node_modules\\@babel\\parser\\lib\\index.js:10979:14)\n    at Object.parseFunction (C:\\Users\\formi\\Desktop\\Università\\Progetti\\agile\\partyapp\\node_modules\\@babel\\parser\\lib\\index.js:11818:10)\n    at Object.parseFunctionStatement (C:\\Users\\formi\\Desktop\\Università\\Progetti\\agile\\partyapp\\node_modules\\@babel\\parser\\lib\\index.js:11450:17)");

/***/ }),

/***/ "./resources/sass/app.scss":
/*!*********************************!*\
  !*** ./resources/sass/app.scss ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!*************************************************************!*\
  !*** multi ./resources/js/app.js ./resources/sass/app.scss ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! C:\Users\formi\Desktop\Università\Progetti\agile\partyapp\resources\js\app.js */"./resources/js/app.js");
module.exports = __webpack_require__(/*! C:\Users\formi\Desktop\Università\Progetti\agile\partyapp\resources\sass\app.scss */"./resources/sass/app.scss");


/***/ })

/******/ });