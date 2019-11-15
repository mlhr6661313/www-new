webpackJsonp([1],{

/***/ 35:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

!function (a, b) {
  "use-strict";
  var c = function c(b) {
    var c = a(b).find(".tab-content > li");a.each(c, function () {
      d(this);
    });var f = a(a(".tab-legend .active").length ? ".tab-legend .active" : ".tab-legend > li:first-child");e(f);
  },
      d = function d(b, c) {
    a(b).hide().removeClass("active"), c && c();
  },
      e = function e(b) {
    var c = b.index();d(a(".tab-content .active")), a(".tab-legend .active").removeClass("active").addClass("inactive"), a(".tab-legend > li").eq(c).removeClass("inactive").addClass("active"), a(".tab-content > li").eq(c).show().addClass("active");
  },
      f = function f(b) {
    var c = a(b).find(".tab-legend li");a.each(c, function () {
      a(this).on("click", function () {
        var b = a(this);e(b);
      });
    });
  },
      g = function g() {
    var b = a(".tab");a.each(b, function () {
      c(this), f(this);
    });
  },
      h = { init: g }; true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (h),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? module.tabModule = h : b.tabModule = h;
}(jQuery, window);

/***/ }),

/***/ 40:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_presets_es2015_node_modules_vue_loader_lib_selector_type_script_index_0_calculator_popup_vue__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_presets_es2015_node_modules_vue_loader_lib_selector_type_script_index_0_calculator_popup_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_presets_es2015_node_modules_vue_loader_lib_selector_type_script_index_0_calculator_popup_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1f147c44_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_calculator_popup_vue__ = __webpack_require__(71);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(74)
}
var normalizeComponent = __webpack_require__(8)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_presets_es2015_node_modules_vue_loader_lib_selector_type_script_index_0_calculator_popup_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1f147c44_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_calculator_popup_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "frontend/vue-components/calculator-popup/calculator-popup.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] calculator-popup.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1f147c44", Component.options)
  } else {
    hotAPI.reload("data-v-1f147c44", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 41:
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.VueSelect=e():t.VueSelect=e()}(this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return t[r].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};return e.m=t,e.c=n,e.p="/",e(0)}([function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),e.mixins=e.VueSelect=void 0;var o=n(84),i=r(o),a=n(42),s=r(a);e.default=i.default,e.VueSelect=i.default,e.mixins=s.default},function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(t,e,n){t.exports=!n(9)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e,n){var r=n(11),o=n(33),i=n(25),a=Object.defineProperty;e.f=n(2)?Object.defineProperty:function(t,e,n){if(r(t),e=i(e,!0),r(n),o)try{return a(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},function(t,e,n){var r=n(59),o=n(16);t.exports=function(t){return r(o(t))}},function(t,e){var n=t.exports={version:"2.4.0"};"number"==typeof __e&&(__e=n)},function(t,e,n){var r=n(4),o=n(14);t.exports=n(2)?function(t,e,n){return r.f(t,e,o(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e,n){var r=n(23)("wks"),o=n(15),i=n(1).Symbol,a="function"==typeof i,s=t.exports=function(t){return r[t]||(r[t]=a&&i[t]||(a?i:o)("Symbol."+t))};s.store=r},function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,e,n){var r=n(38),o=n(17);t.exports=Object.keys||function(t){return r(t,o)}},function(t,e,n){var r=n(13);t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},function(t,e,n){var r=n(1),o=n(6),i=n(56),a=n(7),s="prototype",u=function(t,e,n){var l,c,f,p=t&u.F,d=t&u.G,h=t&u.S,b=t&u.P,v=t&u.B,y=t&u.W,g=d?o:o[e]||(o[e]={}),m=g[s],x=d?r:h?r[e]:(r[e]||{})[s];d&&(n=e);for(l in n)c=!p&&x&&void 0!==x[l],c&&l in g||(f=c?x[l]:n[l],g[l]=d&&"function"!=typeof x[l]?n[l]:v&&c?i(f,r):y&&x[l]==f?function(t){var e=function(e,n,r){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(e);case 2:return new t(e,n)}return new t(e,n,r)}return t.apply(this,arguments)};return e[s]=t[s],e}(f):b&&"function"==typeof f?i(Function.call,f):f,b&&((g.virtual||(g.virtual={}))[l]=f,t&u.R&&m&&!m[l]&&a(m,l,f)))};u.F=1,u.G=2,u.S=4,u.P=8,u.B=16,u.W=32,u.U=64,u.R=128,t.exports=u},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e){var n=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+r).toString(36))}},function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,e){t.exports={}},function(t,e){t.exports=!0},function(t,e){e.f={}.propertyIsEnumerable},function(t,e,n){var r=n(4).f,o=n(3),i=n(8)("toStringTag");t.exports=function(t,e,n){t&&!o(t=n?t:t.prototype,i)&&r(t,i,{configurable:!0,value:e})}},function(t,e,n){var r=n(23)("keys"),o=n(15);t.exports=function(t){return r[t]||(r[t]=o(t))}},function(t,e,n){var r=n(1),o="__core-js_shared__",i=r[o]||(r[o]={});t.exports=function(t){return i[t]||(i[t]={})}},function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:n)(t)}},function(t,e,n){var r=n(13);t.exports=function(t,e){if(!r(t))return t;var n,o;if(e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;if("function"==typeof(n=t.valueOf)&&!r(o=n.call(t)))return o;if(!e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},function(t,e,n){var r=n(1),o=n(6),i=n(19),a=n(27),s=n(4).f;t.exports=function(t){var e=o.Symbol||(o.Symbol=i?{}:r.Symbol||{});"_"==t.charAt(0)||t in e||s(e,t,{value:a.f(t)})}},function(t,e,n){e.f=n(8)},function(t,e){"use strict";t.exports={props:{loading:{type:Boolean,default:!1},onSearch:{type:Function,default:function(t,e){}}},data:function(){return{mutableLoading:!1}},watch:{search:function(){this.search.length>0&&(this.onSearch(this.search,this.toggleLoading),this.$emit("search",this.search,this.toggleLoading))},loading:function(t){this.mutableLoading=t}},methods:{toggleLoading:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return null==t?this.mutableLoading=!this.mutableLoading:this.mutableLoading=t}}}},function(t,e){"use strict";t.exports={watch:{typeAheadPointer:function(){this.maybeAdjustScroll()}},methods:{maybeAdjustScroll:function(){var t=this.pixelsToPointerTop(),e=this.pixelsToPointerBottom();return t<=this.viewport().top?this.scrollTo(t):e>=this.viewport().bottom?this.scrollTo(this.viewport().top+this.pointerHeight()):void 0},pixelsToPointerTop:function t(){var t=0;if(this.$refs.dropdownMenu)for(var e=0;e<this.typeAheadPointer;e++)t+=this.$refs.dropdownMenu.children[e].offsetHeight;return t},pixelsToPointerBottom:function(){return this.pixelsToPointerTop()+this.pointerHeight()},pointerHeight:function(){var t=!!this.$refs.dropdownMenu&&this.$refs.dropdownMenu.children[this.typeAheadPointer];return t?t.offsetHeight:0},viewport:function(){return{top:this.$refs.dropdownMenu?this.$refs.dropdownMenu.scrollTop:0,bottom:this.$refs.dropdownMenu?this.$refs.dropdownMenu.offsetHeight+this.$refs.dropdownMenu.scrollTop:0}},scrollTo:function(t){return this.$refs.dropdownMenu?this.$refs.dropdownMenu.scrollTop=t:null}}}},function(t,e){"use strict";t.exports={data:function(){return{typeAheadPointer:-1}},watch:{filteredOptions:function(){this.typeAheadPointer=0}},methods:{typeAheadUp:function(){this.typeAheadPointer>0&&(this.typeAheadPointer--,this.maybeAdjustScroll&&this.maybeAdjustScroll())},typeAheadDown:function(){this.typeAheadPointer<this.filteredOptions.length-1&&(this.typeAheadPointer++,this.maybeAdjustScroll&&this.maybeAdjustScroll())},typeAheadSelect:function(){this.filteredOptions[this.typeAheadPointer]?this.select(this.filteredOptions[this.typeAheadPointer]):this.taggable&&this.search.length&&this.select(this.search),this.clearSearchOnSelect&&(this.search="")}}}},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e,n){var r=n(13),o=n(1).document,i=r(o)&&r(o.createElement);t.exports=function(t){return i?o.createElement(t):{}}},function(t,e,n){t.exports=!n(2)&&!n(9)(function(){return 7!=Object.defineProperty(n(32)("div"),"a",{get:function(){return 7}}).a})},function(t,e,n){"use strict";var r=n(19),o=n(12),i=n(39),a=n(7),s=n(3),u=n(18),l=n(61),c=n(21),f=n(68),p=n(8)("iterator"),d=!([].keys&&"next"in[].keys()),h="@@iterator",b="keys",v="values",y=function(){return this};t.exports=function(t,e,n,g,m,x,w){l(n,e,g);var O,S,_,j=function(t){if(!d&&t in C)return C[t];switch(t){case b:return function(){return new n(this,t)};case v:return function(){return new n(this,t)}}return function(){return new n(this,t)}},k=e+" Iterator",P=m==v,A=!1,C=t.prototype,M=C[p]||C[h]||m&&C[m],E=M||j(m),T=m?P?j("entries"):E:void 0,V="Array"==e?C.entries||M:M;if(V&&(_=f(V.call(new t)),_!==Object.prototype&&(c(_,k,!0),r||s(_,p)||a(_,p,y))),P&&M&&M.name!==v&&(A=!0,E=function(){return M.call(this)}),r&&!w||!d&&!A&&C[p]||a(C,p,E),u[e]=E,u[k]=y,m)if(O={values:P?E:j(v),keys:x?E:j(b),entries:T},w)for(S in O)S in C||i(C,S,O[S]);else o(o.P+o.F*(d||A),e,O);return O}},function(t,e,n){var r=n(11),o=n(65),i=n(17),a=n(22)("IE_PROTO"),s=function(){},u="prototype",l=function(){var t,e=n(32)("iframe"),r=i.length,o="<",a=">";for(e.style.display="none",n(58).appendChild(e),e.src="javascript:",t=e.contentWindow.document,t.open(),t.write(o+"script"+a+"document.F=Object"+o+"/script"+a),t.close(),l=t.F;r--;)delete l[u][i[r]];return l()};t.exports=Object.create||function(t,e){var n;return null!==t?(s[u]=r(t),n=new s,s[u]=null,n[a]=t):n=l(),void 0===e?n:o(n,e)}},function(t,e,n){var r=n(38),o=n(17).concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return r(t,o)}},function(t,e){e.f=Object.getOwnPropertySymbols},function(t,e,n){var r=n(3),o=n(5),i=n(55)(!1),a=n(22)("IE_PROTO");t.exports=function(t,e){var n,s=o(t),u=0,l=[];for(n in s)n!=a&&r(s,n)&&l.push(n);for(;e.length>u;)r(s,n=e[u++])&&(~i(l,n)||l.push(n));return l}},function(t,e,n){t.exports=n(7)},function(t,e,n){var r=n(16);t.exports=function(t){return Object(r(t))}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(44),i=r(o),a=n(47),s=r(a),u=n(48),l=r(u),c=n(29),f=r(c),p=n(30),d=r(p),h=n(28),b=r(h);e.default={mixins:[f.default,d.default,b.default],props:{value:{default:null},options:{type:Array,default:function(){return[]}},maxHeight:{type:String,default:"400px"},searchable:{type:Boolean,default:!0},multiple:{type:Boolean,default:!1},placeholder:{type:String,default:""},transition:{type:String,default:"fade"},clearSearchOnSelect:{type:Boolean,default:!0},label:{type:String,default:"label"},getOptionLabel:{type:Function,default:function(t){return"object"===("undefined"==typeof t?"undefined":(0,l.default)(t))&&this.label&&t[this.label]?t[this.label]:t}},onChange:{type:Function,default:function(t){this.$emit("input",t)}},taggable:{type:Boolean,default:!1},pushTags:{type:Boolean,default:!1},createOption:{type:Function,default:function(t){return"object"===(0,l.default)(this.mutableOptions[0])&&(t=(0,s.default)({},this.label,t)),this.$emit("option:created",t),t}},resetOnOptionsChange:{type:Boolean,default:!1},noDrop:{type:Boolean,default:!1}},data:function(){return{search:"",open:!1,mutableValue:null,mutableOptions:[]}},watch:{value:function(t){this.mutableValue=t},mutableValue:function(t,e){this.multiple?this.onChange?this.onChange(t):null:this.onChange&&t!==e?this.onChange(t):null},options:function(t){this.mutableOptions=t},mutableOptions:function(){!this.taggable&&this.resetOnOptionsChange&&(this.mutableValue=this.multiple?[]:null)},multiple:function(t){this.mutableValue=t?[]:null}},created:function(){this.mutableValue=this.value,this.mutableOptions=this.options.slice(0),this.mutableLoading=this.loading,this.$on("option:created",this.maybePushTag)},methods:{select:function(t){this.isOptionSelected(t)?this.deselect(t):(this.taggable&&!this.optionExists(t)&&(t=this.createOption(t)),this.multiple&&!this.mutableValue?this.mutableValue=[t]:this.multiple?this.mutableValue.push(t):this.mutableValue=t),this.onAfterSelect(t)},deselect:function(t){var e=this;if(this.multiple){var n=-1;this.mutableValue.forEach(function(r){(r===t||"object"===("undefined"==typeof r?"undefined":(0,l.default)(r))&&r[e.label]===t[e.label])&&(n=r)});var r=this.mutableValue.indexOf(n);this.mutableValue.splice(r,1)}else this.mutableValue=null},onAfterSelect:function(t){this.multiple||(this.open=!this.open,this.$refs.search.blur()),this.clearSearchOnSelect&&(this.search="")},toggleDropdown:function(t){t.target!==this.$refs.openIndicator&&t.target!==this.$refs.search&&t.target!==this.$refs.toggle&&t.target!==this.$el||(this.open?this.$refs.search.blur():(this.open=!0,this.$refs.search.focus()))},isOptionSelected:function(t){var e=this;if(this.multiple&&this.mutableValue){var n=!1;return this.mutableValue.forEach(function(r){"object"===("undefined"==typeof r?"undefined":(0,l.default)(r))&&r[e.label]===t[e.label]?n=!0:"object"===("undefined"==typeof r?"undefined":(0,l.default)(r))&&r[e.label]===t?n=!0:r===t&&(n=!0)}),n}return this.mutableValue===t},onEscape:function(){this.search.length?this.search="":this.$refs.search.blur()},onSearchBlur:function(){this.open=!1,this.$emit("search:blur")},onSearchFocus:function(){this.open=!0,this.$emit("search:focus")},maybeDeleteValue:function(){if(!this.$refs.search.value.length&&this.mutableValue)return this.multiple?this.mutableValue.pop():this.mutableValue=null},optionExists:function(t){var e=this,n=!1;return this.mutableOptions.forEach(function(r){"object"===("undefined"==typeof r?"undefined":(0,l.default)(r))&&r[e.label]===t?n=!0:r===t&&(n=!0)}),n},maybePushTag:function(t){this.pushTags&&this.mutableOptions.push(t)}},computed:{dropdownClasses:function(){return{open:this.dropdownOpen,searchable:this.searchable,unsearchable:!this.searchable,loading:this.mutableLoading}},dropdownOpen:function(){return!this.noDrop&&(this.open&&!this.mutableLoading)},searchPlaceholder:function(){if(this.isValueEmpty&&this.placeholder)return this.placeholder},filteredOptions:function(){var t=this,e=this.mutableOptions.filter(function(e){return"object"===("undefined"==typeof e?"undefined":(0,l.default)(e))&&e.hasOwnProperty(t.label)?e[t.label].toLowerCase().indexOf(t.search.toLowerCase())>-1:"object"!==("undefined"==typeof e?"undefined":(0,l.default)(e))||e.hasOwnProperty(t.label)?e.toLowerCase().indexOf(t.search.toLowerCase())>-1:console.warn('[vue-select warn]: Label key "option.'+t.label+'" does not exist in options object.\nhttp://sagalbot.github.io/vue-select/#ex-labels')});return this.taggable&&this.search.length&&!this.optionExists(this.search)&&e.unshift(this.search),e},isValueEmpty:function(){return!this.mutableValue||("object"===(0,l.default)(this.mutableValue)?!(0,i.default)(this.mutableValue).length:!this.mutableValue.length)},valueAsArray:function(){return this.multiple?this.mutableValue:this.mutableValue?[this.mutableValue]:[]}}}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(28),i=r(o),a=n(30),s=r(a),u=n(29),l=r(u);e.default={ajax:i.default,pointer:s.default,pointerScroll:l.default}},function(t,e,n){t.exports={default:n(49),__esModule:!0}},function(t,e,n){t.exports={default:n(50),__esModule:!0}},function(t,e,n){t.exports={default:n(51),__esModule:!0}},function(t,e,n){t.exports={default:n(52),__esModule:!0}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}e.__esModule=!0;var o=n(43),i=r(o);e.default=function(t,e,n){return e in t?(0,i.default)(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}e.__esModule=!0;var o=n(46),i=r(o),a=n(45),s=r(a),u="function"==typeof s.default&&"symbol"==typeof i.default?function(t){return typeof t}:function(t){return t&&"function"==typeof s.default&&t.constructor===s.default&&t!==s.default.prototype?"symbol":typeof t};e.default="function"==typeof s.default&&"symbol"===u(i.default)?function(t){return"undefined"==typeof t?"undefined":u(t)}:function(t){return t&&"function"==typeof s.default&&t.constructor===s.default&&t!==s.default.prototype?"symbol":"undefined"==typeof t?"undefined":u(t)}},function(t,e,n){n(74);var r=n(6).Object;t.exports=function(t,e,n){return r.defineProperty(t,e,n)}},function(t,e,n){n(75),t.exports=n(6).Object.keys},function(t,e,n){n(78),n(76),n(79),n(80),t.exports=n(6).Symbol},function(t,e,n){n(77),n(81),t.exports=n(27).f("iterator")},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,e){t.exports=function(){}},function(t,e,n){var r=n(5),o=n(72),i=n(71);t.exports=function(t){return function(e,n,a){var s,u=r(e),l=o(u.length),c=i(a,l);if(t&&n!=n){for(;l>c;)if(s=u[c++],s!=s)return!0}else for(;l>c;c++)if((t||c in u)&&u[c]===n)return t||c||0;return!t&&-1}}},function(t,e,n){var r=n(53);t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,o){return t.call(e,n,r,o)}}return function(){return t.apply(e,arguments)}}},function(t,e,n){var r=n(10),o=n(37),i=n(20);t.exports=function(t){var e=r(t),n=o.f;if(n)for(var a,s=n(t),u=i.f,l=0;s.length>l;)u.call(t,a=s[l++])&&e.push(a);return e}},function(t,e,n){t.exports=n(1).document&&document.documentElement},function(t,e,n){var r=n(31);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},function(t,e,n){var r=n(31);t.exports=Array.isArray||function(t){return"Array"==r(t)}},function(t,e,n){"use strict";var r=n(35),o=n(14),i=n(21),a={};n(7)(a,n(8)("iterator"),function(){return this}),t.exports=function(t,e,n){t.prototype=r(a,{next:o(1,n)}),i(t,e+" Iterator")}},function(t,e){t.exports=function(t,e){return{value:e,done:!!t}}},function(t,e,n){var r=n(10),o=n(5);t.exports=function(t,e){for(var n,i=o(t),a=r(i),s=a.length,u=0;s>u;)if(i[n=a[u++]]===e)return n}},function(t,e,n){var r=n(15)("meta"),o=n(13),i=n(3),a=n(4).f,s=0,u=Object.isExtensible||function(){return!0},l=!n(9)(function(){return u(Object.preventExtensions({}))}),c=function(t){a(t,r,{value:{i:"O"+ ++s,w:{}}})},f=function(t,e){if(!o(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!i(t,r)){if(!u(t))return"F";if(!e)return"E";c(t)}return t[r].i},p=function(t,e){if(!i(t,r)){if(!u(t))return!0;if(!e)return!1;c(t)}return t[r].w},d=function(t){return l&&h.NEED&&u(t)&&!i(t,r)&&c(t),t},h=t.exports={KEY:r,NEED:!1,fastKey:f,getWeak:p,onFreeze:d}},function(t,e,n){var r=n(4),o=n(11),i=n(10);t.exports=n(2)?Object.defineProperties:function(t,e){o(t);for(var n,a=i(e),s=a.length,u=0;s>u;)r.f(t,n=a[u++],e[n]);return t}},function(t,e,n){var r=n(20),o=n(14),i=n(5),a=n(25),s=n(3),u=n(33),l=Object.getOwnPropertyDescriptor;e.f=n(2)?l:function(t,e){if(t=i(t),e=a(e,!0),u)try{return l(t,e)}catch(t){}if(s(t,e))return o(!r.f.call(t,e),t[e])}},function(t,e,n){var r=n(5),o=n(36).f,i={}.toString,a="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],s=function(t){try{return o(t)}catch(t){return a.slice()}};t.exports.f=function(t){return a&&"[object Window]"==i.call(t)?s(t):o(r(t))}},function(t,e,n){var r=n(3),o=n(40),i=n(22)("IE_PROTO"),a=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=o(t),r(t,i)?t[i]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?a:null}},function(t,e,n){var r=n(12),o=n(6),i=n(9);t.exports=function(t,e){var n=(o.Object||{})[t]||Object[t],a={};a[t]=e(n),r(r.S+r.F*i(function(){n(1)}),"Object",a)}},function(t,e,n){var r=n(24),o=n(16);t.exports=function(t){return function(e,n){var i,a,s=String(o(e)),u=r(n),l=s.length;return u<0||u>=l?t?"":void 0:(i=s.charCodeAt(u),i<55296||i>56319||u+1===l||(a=s.charCodeAt(u+1))<56320||a>57343?t?s.charAt(u):i:t?s.slice(u,u+2):(i-55296<<10)+(a-56320)+65536)}}},function(t,e,n){var r=n(24),o=Math.max,i=Math.min;t.exports=function(t,e){return t=r(t),t<0?o(t+e,0):i(t,e)}},function(t,e,n){var r=n(24),o=Math.min;t.exports=function(t){return t>0?o(r(t),9007199254740991):0}},function(t,e,n){"use strict";var r=n(54),o=n(62),i=n(18),a=n(5);t.exports=n(34)(Array,"Array",function(t,e){this._t=a(t),this._i=0,this._k=e},function(){var t=this._t,e=this._k,n=this._i++;return!t||n>=t.length?(this._t=void 0,o(1)):"keys"==e?o(0,n):"values"==e?o(0,t[n]):o(0,[n,t[n]])},"values"),i.Arguments=i.Array,r("keys"),r("values"),r("entries")},function(t,e,n){var r=n(12);r(r.S+r.F*!n(2),"Object",{defineProperty:n(4).f})},function(t,e,n){var r=n(40),o=n(10);n(69)("keys",function(){return function(t){return o(r(t))}})},function(t,e){},function(t,e,n){"use strict";var r=n(70)(!0);n(34)(String,"String",function(t){this._t=String(t),this._i=0},function(){var t,e=this._t,n=this._i;return n>=e.length?{value:void 0,done:!0}:(t=r(e,n),this._i+=t.length,{value:t,done:!1})})},function(t,e,n){"use strict";var r=n(1),o=n(3),i=n(2),a=n(12),s=n(39),u=n(64).KEY,l=n(9),c=n(23),f=n(21),p=n(15),d=n(8),h=n(27),b=n(26),v=n(63),y=n(57),g=n(60),m=n(11),x=n(5),w=n(25),O=n(14),S=n(35),_=n(67),j=n(66),k=n(4),P=n(10),A=j.f,C=k.f,M=_.f,E=r.Symbol,T=r.JSON,V=T&&T.stringify,L="prototype",$=d("_hidden"),F=d("toPrimitive"),N={}.propertyIsEnumerable,B=c("symbol-registry"),D=c("symbols"),I=c("op-symbols"),z=Object[L],R="function"==typeof E,H=r.QObject,U=!H||!H[L]||!H[L].findChild,W=i&&l(function(){return 7!=S(C({},"a",{get:function(){return C(this,"a",{value:7}).a}})).a})?function(t,e,n){var r=A(z,e);r&&delete z[e],C(t,e,n),r&&t!==z&&C(z,e,r)}:C,J=function(t){var e=D[t]=S(E[L]);return e._k=t,e},G=R&&"symbol"==typeof E.iterator?function(t){return"symbol"==typeof t}:function(t){return t instanceof E},K=function(t,e,n){return t===z&&K(I,e,n),m(t),e=w(e,!0),m(n),o(D,e)?(n.enumerable?(o(t,$)&&t[$][e]&&(t[$][e]=!1),n=S(n,{enumerable:O(0,!1)})):(o(t,$)||C(t,$,O(1,{})),t[$][e]=!0),W(t,e,n)):C(t,e,n)},Y=function(t,e){m(t);for(var n,r=y(e=x(e)),o=0,i=r.length;i>o;)K(t,n=r[o++],e[n]);return t},Q=function(t,e){return void 0===e?S(t):Y(S(t),e)},Z=function(t){var e=N.call(this,t=w(t,!0));return!(this===z&&o(D,t)&&!o(I,t))&&(!(e||!o(this,t)||!o(D,t)||o(this,$)&&this[$][t])||e)},q=function(t,e){if(t=x(t),e=w(e,!0),t!==z||!o(D,e)||o(I,e)){var n=A(t,e);return!n||!o(D,e)||o(t,$)&&t[$][e]||(n.enumerable=!0),n}},X=function(t){for(var e,n=M(x(t)),r=[],i=0;n.length>i;)o(D,e=n[i++])||e==$||e==u||r.push(e);return r},tt=function(t){for(var e,n=t===z,r=M(n?I:x(t)),i=[],a=0;r.length>a;)!o(D,e=r[a++])||n&&!o(z,e)||i.push(D[e]);return i};R||(E=function(){if(this instanceof E)throw TypeError("Symbol is not a constructor!");var t=p(arguments.length>0?arguments[0]:void 0),e=function(n){this===z&&e.call(I,n),o(this,$)&&o(this[$],t)&&(this[$][t]=!1),W(this,t,O(1,n))};return i&&U&&W(z,t,{configurable:!0,set:e}),J(t)},s(E[L],"toString",function(){return this._k}),j.f=q,k.f=K,n(36).f=_.f=X,n(20).f=Z,n(37).f=tt,i&&!n(19)&&s(z,"propertyIsEnumerable",Z,!0),h.f=function(t){return J(d(t))}),a(a.G+a.W+a.F*!R,{Symbol:E});for(var et="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),nt=0;et.length>nt;)d(et[nt++]);for(var et=P(d.store),nt=0;et.length>nt;)b(et[nt++]);a(a.S+a.F*!R,"Symbol",{for:function(t){return o(B,t+="")?B[t]:B[t]=E(t)},keyFor:function(t){if(G(t))return v(B,t);throw TypeError(t+" is not a symbol!")},useSetter:function(){U=!0},useSimple:function(){U=!1}}),a(a.S+a.F*!R,"Object",{create:Q,defineProperty:K,defineProperties:Y,getOwnPropertyDescriptor:q,getOwnPropertyNames:X,getOwnPropertySymbols:tt}),T&&a(a.S+a.F*(!R||l(function(){var t=E();return"[null]"!=V([t])||"{}"!=V({a:t})||"{}"!=V(Object(t))})),"JSON",{stringify:function(t){if(void 0!==t&&!G(t)){for(var e,n,r=[t],o=1;arguments.length>o;)r.push(arguments[o++]);return e=r[1],"function"==typeof e&&(n=e),!n&&g(e)||(e=function(t,e){if(n&&(e=n.call(this,t,e)),!G(e))return e}),r[1]=e,V.apply(T,r)}}}),E[L][F]||n(7)(E[L],F,E[L].valueOf),f(E,"Symbol"),f(Math,"Math",!0),f(r.JSON,"JSON",!0)},function(t,e,n){n(26)("asyncIterator")},function(t,e,n){n(26)("observable")},function(t,e,n){n(73);for(var r=n(1),o=n(7),i=n(18),a=n(8)("toStringTag"),s=["NodeList","DOMTokenList","MediaList","StyleSheetList","CSSRuleList"],u=0;u<5;u++){var l=s[u],c=r[l],f=c&&c.prototype;f&&!f[a]&&o(f,a,l),i[l]=i.Array}},function(t,e,n){e=t.exports=n(83)(),e.push([t.id,'.v-select{position:relative;font-family:sans-serif}.v-select,.v-select *{box-sizing:border-box}.v-select .open-indicator{position:absolute;bottom:6px;right:10px;display:inline-block;cursor:pointer;pointer-events:all;transition:all .15s cubic-bezier(1,-.115,.975,.855);transition-timing-function:cubic-bezier(1,-.115,.975,.855);opacity:1;transition:opacity .1s;height:20px;width:10px}.v-select .open-indicator:before{border-color:rgba(60,60,60,.5);border-style:solid;border-width:3px 3px 0 0;content:"";display:inline-block;height:10px;width:10px;vertical-align:top;transform:rotate(133deg);transition:all .15s cubic-bezier(1,-.115,.975,.855);transition-timing-function:cubic-bezier(1,-.115,.975,.855);box-sizing:inherit}.v-select.open .open-indicator:before{transform:rotate(315deg)}.v-select.loading .open-indicator{opacity:0}.v-select.open .open-indicator{bottom:1px}.v-select .dropdown-toggle{-webkit-appearance:none;-moz-appearance:none;appearance:none;display:block;padding:0;background:none;border-radius:4px;white-space:normal;transition:border-radius .25s} .v-select .dropdown-toggle:after{visibility:hidden;display:block;font-size:0;content:" ";clear:both;height:0}.v-select.searchable .dropdown-toggle{cursor:text}.v-select.unsearchable .dropdown-toggle{cursor:pointer}.v-select.open .dropdown-toggle{border-bottom-color:transparent;border-bottom-left-radius:0;border-bottom-right-radius:0}.v-select .dropdown-menu{display:block;position:absolute;top:100%;left:0;z-index:1000;min-width:160px;padding:5px 0;margin:0;width:100%;overflow-y:scroll;border:1px solid rgba(0,0,0,.26);box-shadow:0 3px 6px 0 rgba(0,0,0,.15);border-top:none;border-radius:0 0 4px 4px;text-align:left;list-style:none;background:#fff}.v-select .no-options{text-align:center}.v-select .selected-tag{color:#333;background-color:#f0f0f0;border:1px solid #ccc;border-radius:4px;height:26px;margin:4px 1px 0 3px;padding:1px .25em;float:left;line-height:24px}.v-select .selected-tag .close{float:none;margin-right:0;font-size:20px;appearance:none;padding:0;cursor:pointer;background:0 0;border:0;font-weight:700;line-height:1;color:#000;text-shadow:0 1px 0 #fff;filter:alpha(opacity=20);opacity:.2}.v-select input[type=search]::-webkit-search-cancel-button,.v-select input[type=search]::-webkit-search-decoration,.v-select input[type=search]::-webkit-search-results-button,.v-select input[type=search]::-webkit-search-results-decoration{display:none}.v-select input[type=search]::-ms-clear{display:none}.v-select input[type=search],.v-select input[type=search]:focus{appearance:none;-webkit-appearance:none;-moz-appearance:none;line-height:1.42857143;font-size:1em;height:34px;display:inline-block;border:none;outline:none;margin:0;padding:0 .5em;width:10em;max-width:100%;background:none;position:relative;box-shadow:none;float:left;clear:none}.v-select.unsearchable input[type=search]{max-width:1px}.v-select li{line-height:1.42857143}.v-select li>a{display:block;padding:3px 20px;clear:both;color:#333;white-space:nowrap}.v-select li:hover{cursor:pointer}.v-select .dropdown-menu .active>a{color:#333;background:rgba(50,50,50,.1)}.v-select .dropdown-menu>.highlight>a{background:#5897fb;color:#fff}.v-select .highlight:not(:last-child){margin-bottom:0}.v-select .spinner{opacity:0;position:absolute;top:5px;right:10px;font-size:5px;text-indent:-9999em;overflow:hidden;border-top:.9em solid hsla(0,0%,39%,.1);border-right:.9em solid hsla(0,0%,39%,.1);border-bottom:.9em solid hsla(0,0%,39%,.1);border-left:.9em solid rgba(60,60,60,.45);transform:translateZ(0);animation:vSelectSpinner 1.1s infinite linear;transition:opacity .1s}.v-select .spinner,.v-select .spinner:after{border-radius:50%;width:5em;height:5em}.v-select.loading .spinner{opacity:1}@-webkit-keyframes vSelectSpinner{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}@keyframes vSelectSpinner{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}.fade-enter-active,.fade-leave-active{transition:opacity .15s cubic-bezier(1,.5,.8,1)}.fade-enter,.fade-leave-to{opacity:0} #backToStart #back {margin-top: 1.5em;}',""])},function(t,e){t.exports=function(){var t=[];return t.toString=function(){for(var t=[],e=0;e<this.length;e++){var n=this[e];n[2]?t.push("@media "+n[2]+"{"+n[1]+"}"):t.push(n[1])}return t.join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var r={},o=0;o<this.length;o++){var i=this[o][0];"number"==typeof i&&(r[i]=!0)}for(o=0;o<e.length;o++){var a=e[o];"number"==typeof a[0]&&r[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),t.push(a))}},t}},function(t,e,n){n(88);var r=n(85)(n(41),n(86),null,null);t.exports=r.exports},function(t,e){t.exports=function(t,e,n,r){var o,i=t=t||{},a=typeof t.default;"object"!==a&&"function"!==a||(o=t,i=t.default);var s="function"==typeof i?i.options:i;if(e&&(s.render=e.render,s.staticRenderFns=e.staticRenderFns),n&&(s._scopeId=n),r){var u=s.computed||(s.computed={});Object.keys(r).forEach(function(t){var e=r[t];u[t]=function(){return e}})}return{esModule:o,exports:i,options:s}}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"dropdown v-select",class:t.dropdownClasses},[n("div",{ref:"toggle",staticClass:"dropdown-toggle",on:{mousedown:function(e){e.preventDefault(),t.toggleDropdown(e)}}},[t._l(t.valueAsArray,function(e){return n("span",{key:e.index,staticClass:"selected-tag"},[t._v("\n      "+t._s(t.getOptionLabel(e))+"\n      "),t.multiple?n("button",{staticClass:"close",attrs:{type:"button"},on:{click:function(n){t.deselect(e)}}},[n("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])]):t._e()])}),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.search,expression:"search"}],ref:"search",staticClass:"form-control",style:{width:t.isValueEmpty?"100%":"auto"},attrs:{type:"search",placeholder:t.searchPlaceholder,readonly:!t.searchable},domProps:{value:t.search},on:{keydown:[function(e){return t._k(e.keyCode,"delete",[8,46])?null:void t.maybeDeleteValue(e)},function(e){return t._k(e.keyCode,"up",38)?null:(e.preventDefault(),void t.typeAheadUp(e))},function(e){return t._k(e.keyCode,"down",40)?null:(e.preventDefault(),void t.typeAheadDown(e))}],keyup:[function(e){return t._k(e.keyCode,"esc",27)?null:void t.onEscape(e)},function(e){return t._k(e.keyCode,"enter",13)?null:(e.preventDefault(),void t.typeAheadSelect(e))}],blur:t.onSearchBlur,focus:t.onSearchFocus,input:function(e){e.target.composing||(t.search=e.target.value)}}}),t._v(" "),t.noDrop?t._e():n("i",{ref:"openIndicator",staticClass:"open-indicator",attrs:{role:"presentation"}}),t._v(" "),t._t("spinner",[n("div",{directives:[{name:"show",rawName:"v-show",value:t.mutableLoading,expression:"mutableLoading"}],staticClass:"spinner"},[t._v("Loading...")])])],2),t._v(" "),n("transition",{attrs:{name:t.transition}},[t.dropdownOpen?n("ul",{ref:"dropdownMenu",staticClass:"dropdown-menu",style:{"max-height":t.maxHeight}},[t._l(t.filteredOptions,function(e,r){return n("li",{key:r,class:{active:t.isOptionSelected(e),highlight:r===t.typeAheadPointer},on:{mouseover:function(e){t.typeAheadPointer=r}}},[n("a",{on:{mousedown:function(n){n.preventDefault(),t.select(e)}}},[t._v("\n          "+t._s(t.getOptionLabel(e))+"\n        ")])])}),t._v(" "),t.filteredOptions.length?t._e():n("li",{staticClass:"no-options"},[t._t("no-options",[t._v("Sorry, no matching options.")])],2)],2):t._e()])],1)},staticRenderFns:[]}},function(t,e,n){function r(t,e){for(var n=0;n<t.length;n++){var r=t[n],o=f[r.id];if(o){o.refs++;for(var i=0;i<o.parts.length;i++)o.parts[i](r.parts[i]);for(;i<r.parts.length;i++)o.parts.push(u(r.parts[i],e))}else{for(var a=[],i=0;i<r.parts.length;i++)a.push(u(r.parts[i],e));f[r.id]={id:r.id,refs:1,parts:a}}}}function o(t){for(var e=[],n={},r=0;r<t.length;r++){var o=t[r],i=o[0],a=o[1],s=o[2],u=o[3],l={css:a,media:s,sourceMap:u};n[i]?n[i].parts.push(l):e.push(n[i]={id:i,parts:[l]})}return e}function i(t,e){var n=h(),r=y[y.length-1];if("top"===t.insertAt)r?r.nextSibling?n.insertBefore(e,r.nextSibling):n.appendChild(e):n.insertBefore(e,n.firstChild),y.push(e);else{if("bottom"!==t.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");n.appendChild(e)}}function a(t){t.parentNode.removeChild(t);var e=y.indexOf(t);e>=0&&y.splice(e,1)}function s(t){var e=document.createElement("style");return e.type="text/css",i(t,e),e}function u(t,e){var n,r,o;if(e.singleton){var i=v++;n=b||(b=s(e)),r=l.bind(null,n,i,!1),o=l.bind(null,n,i,!0)}else n=s(e),r=c.bind(null,n),o=function(){a(n)};return r(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;
r(t=e)}else o()}}function l(t,e,n,r){var o=n?"":r.css;if(t.styleSheet)t.styleSheet.cssText=g(e,o);else{var i=document.createTextNode(o),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(i,a[e]):t.appendChild(i)}}function c(t,e){var n=e.css,r=e.media,o=e.sourceMap;if(r&&t.setAttribute("media",r),o&&(n+="\n/*# sourceURL="+o.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */"),t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}var f={},p=function(t){var e;return function(){return"undefined"==typeof e&&(e=t.apply(this,arguments)),e}},d=p(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),h=p(function(){return document.head||document.getElementsByTagName("head")[0]}),b=null,v=0,y=[];t.exports=function(t,e){e=e||{},"undefined"==typeof e.singleton&&(e.singleton=d()),"undefined"==typeof e.insertAt&&(e.insertAt="bottom");var n=o(t);return r(n,e),function(t){for(var i=[],a=0;a<n.length;a++){var s=n[a],u=f[s.id];u.refs--,i.push(u)}if(t){var l=o(t);r(l,e)}for(var a=0;a<i.length;a++){var u=i[a];if(0===u.refs){for(var c=0;c<u.parts.length;c++)u.parts[c]();delete f[u.id]}}}};var g=function(){var t=[];return function(e,n){return t[e]=n,t.filter(Boolean).join("\n")}}()},function(t,e,n){var r=n(82);"string"==typeof r&&(r=[[t.id,r,""]]);n(87)(r,{});r.locals&&(t.exports=r.locals)}])});
//# sourceMappingURL=vue-select.js.map

/***/ }),

/***/ 42:
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e():"function"==typeof define&&define.amd?define("vue-slider-component",[],e):"object"==typeof exports?exports["vue-slider-component"]=e():t["vue-slider-component"]=e()}(this,function(){return function(t){function e(s){if(i[s])return i[s].exports;var r=i[s]={i:s,l:!1,exports:{}};return t[s].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var i={};return e.m=t,e.c=i,e.i=function(t){return t},e.d=function(t,i,s){e.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:s})},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=2)}([function(t,e,i){i(7);var s=i(5)(i(1),i(6),"data-v-4f2807ae",null);t.exports=s.exports},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{flag:!1,size:0,currentValue:0,currentSlider:0}},props:{width:{type:[Number,String],default:"auto"},height:{type:[Number,String],default:6},data:{type:Array,default:null},dotSize:{type:Number,default:16},min:{type:Number,default:0},max:{type:Number,default:100},interval:{type:Number,default:1},show:{type:Boolean,default:!0},disabled:{type:Boolean,default:!1},piecewise:{type:Boolean,default:!1},tooltip:{type:[String,Boolean],default:"always"},eventType:{type:String,default:"auto"},direction:{type:String,default:"horizontal"},reverse:{type:Boolean,default:!1},lazy:{type:Boolean,default:!1},clickable:{type:Boolean,default:!0},speed:{type:Number,default:.5},realTime:{type:Boolean,default:!1},value:{type:[String,Number,Array],default:0},piecewiseLabel:{type:Boolean,default:!1},sliderStyle:[Array,Object],tooltipDir:[Array,String],formatter:[String,Function],piecewiseStyle:Object,piecewiseActiveStyle:Object,processStyle:Object,bgStyle:Object,tooltipStyle:[Array,Object],labelStyle:Object,labelActiveStyle:Object},computed:{flowDirection:function(){return"vue-slider-"+this.direction+(this.reverse?"-reverse":"")},tooltipDirection:function(){var t=this.tooltipDir||("vertical"===this.direction?"left":"top");return Array.isArray(t)?this.isRange?t:t[1]:this.isRange?[t,t]:t},tooltipStatus:function(){return"hover"===this.tooltip&&this.flag?"vue-slider-always":this.tooltip?"vue-slider-"+this.tooltip:""},tooltipClass:function(){return["vue-slider-tooltip-"+this.tooltipDirection,"vue-slider-tooltip"]},isMobile:function(){return"touch"===this.eventType||"mouse"!==this.eventType&&/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(navigator.userAgent||navigator.vendor||window.opera)},isDisabled:function(){return"none"===this.eventType||this.disabled},disabledClass:function(){return this.disabled?"vue-slider-disabled":""},isRange:function(){return Array.isArray(this.value)},slider:function(){return this.isRange?[this.$refs.dot0,this.$refs.dot1]:this.$refs.dot},minimum:function(){return this.data?0:this.min},val:{get:function(){return this.data?this.isRange?[this.data[this.currentValue[0]],this.data[this.currentValue[1]]]:this.data[this.currentValue]:this.currentValue},set:function(t){if(this.data)if(this.isRange){var e=this.data.indexOf(t[0]),i=this.data.indexOf(t[1]);e>-1&&i>-1&&(this.currentValue=[e,i])}else{var s=this.data.indexOf(t);s>-1&&(this.currentValue=s)}else this.currentValue=t}},currentIndex:function(){return this.isRange?this.data?this.currentValue:[(this.currentValue[0]-this.minimum)/this.spacing,(this.currentValue[1]-this.minimum)/this.spacing]:(this.currentValue-this.minimum)/this.spacing},indexRange:function(){return this.isRange?this.currentIndex:[0,this.currentIndex]},maximum:function(){return this.data?this.data.length-1:this.max},multiple:function(){var t=(""+this.interval).split(".")[1];return t?Math.pow(10,t.length):1},spacing:function(){return this.data?1:this.interval},total:function(){return this.data?this.data.length-1:(~~((this.maximum-this.minimum)*this.multiple)%(this.interval*this.multiple)!=0&&console.error("[Vue-slider warn]: Prop[interval] is illegal, Please make sure that the interval can be divisible"),(this.maximum-this.minimum)/this.interval)},gap:function(){return this.size/this.total},position:function(){return this.isRange?[(this.currentValue[0]-this.minimum)/this.spacing*this.gap,(this.currentValue[1]-this.minimum)/this.spacing*this.gap]:(this.currentValue-this.minimum)/this.spacing*this.gap},limit:function(){return this.isRange?[[0,this.position[1]],[this.position[0],this.size]]:[0,this.size]},valueLimit:function(){return this.isRange?[[this.minimum,this.currentValue[1]],[this.currentValue[0],this.maximum]]:[this.minimum,this.maximum]},wrapStyles:function(){return"vertical"===this.direction?{height:"number"==typeof this.height?this.height+"px":this.height,padding:this.dotSize/2+"px"}:{width:"number"==typeof this.width?this.width+"px":this.width,padding:this.dotSize/2+"px"}},sliderStyles:function(){return Array.isArray(this.sliderStyle)?this.isRange?this.sliderStyle:this.sliderStyle[1]:this.isRange?[this.sliderStyle,this.sliderStyle]:this.sliderStyle},tooltipStyles:function(){return Array.isArray(this.tooltipStyle)?this.isRange?this.tooltipStyle:this.tooltipStyle[1]:this.isRange?[this.tooltipStyle,this.tooltipStyle]:this.tooltipStyle},elemStyles:function(){return"vertical"===this.direction?{width:this.width+"px",height:"100%"}:{height:this.height+"px"}},dotStyles:function(){return"vertical"===this.direction?{width:this.dotSize+"px",height:this.dotSize+"px",left:-(this.dotSize-this.width)/2+"px"}:{width:this.dotSize+"px",height:this.dotSize+"px",top:-(this.dotSize-this.height)/2+"px"}},piecewiseDotStyle:function(){return"vertical"===this.direction?{width:this.width+"px",height:this.width+"px"}:{width:this.height+"px",height:this.height+"px"}},piecewiseDotWrap:function(){if(!this.piecewise&&!this.piecewiseLabel)return!1;for(var t=[],e=0;e<=this.total;e++){var i="vertical"===this.direction?{bottom:this.gap*e-this.width/2+"px",left:0}:{left:this.gap*e-this.height/2+"px",top:0},s=this.reverse?this.total-e:e,r=this.data?this.data[s]:this.spacing*s+this.min;t.push({style:i,label:this.formatter?this.formatting(r):r,inRange:s>=this.indexRange[0]&&s<=this.indexRange[1]})}return t}},watch:{value:function(t){this.flag||this.setValue(t,!0)},max:function(t){var e=this.limitValue(this.val);!1!==e&&this.setValue(e),this.refresh()},min:function(t){var e=this.limitValue(this.val);!1!==e&&this.setValue(e),this.refresh()},show:function(t){var e=this;t&&!this.size&&this.$nextTick(function(){e.refresh()})}},methods:{bindEvents:function(){this.isMobile?(this.$refs.wrap.addEventListener("touchmove",this.moving),this.$refs.wrap.addEventListener("touchend",this.moveEnd)):(document.addEventListener("mousemove",this.moving),document.addEventListener("mouseup",this.moveEnd),document.addEventListener("mouseleave",this.moveEnd))},unbindEvents:function(){window.removeEventListener("resize",this.refresh),this.isMobile?(this.$refs.wrap.removeEventListener("touchmove",this.moving),this.$refs.wrap.removeEventListener("touchend",this.moveEnd)):(document.removeEventListener("mousemove",this.moving),document.removeEventListener("mouseup",this.moveEnd),document.removeEventListener("mouseleave",this.moveEnd))},formatting:function(t){return"string"==typeof this.formatter?this.formatter.replace(/\{value\}/,t):this.formatter(t)},getPos:function(t){return this.realTime&&this.getStaticData(),"vertical"===this.direction?this.reverse?t.pageY-this.offset:this.size-(t.pageY-this.offset):this.reverse?this.size-(t.clientX-this.offset):t.clientX-this.offset},wrapClick:function(t){if(this.isDisabled||!this.clickable)return!1;var e=this.getPos(t);this.isRange&&(this.currentSlider=e>(this.position[1]-this.position[0])/2+this.position[0]?1:0),this.setValueOnPos(e)},moveStart:function(t){if(this.isDisabled)return!1;this.isRange&&(this.currentSlider=t),this.flag=!0,this.$emit("drag-start",this)},moving:function(t){if(!this.flag)return!1;t.preventDefault(),this.isMobile&&(t=t.targetTouches[0]),this.setValueOnPos(this.getPos(t),!0)},moveEnd:function(t){if(!this.flag)return!1;this.$emit("drag-end",this),this.lazy&&this.isDiff(this.val,this.value)&&this.syncValue(),this.flag=!1,this.setPosition()},setValueOnPos:function(t,e){var i=this.isRange?this.limit[this.currentSlider]:this.limit,s=this.isRange?this.valueLimit[this.currentSlider]:this.valueLimit;if(t>=i[0]&&t<=i[1]){this.setTransform(t);var r=(Math.round(t/this.gap)*(this.spacing*this.multiple)+this.minimum*this.multiple)/this.multiple;this.setCurrentValue(r,e)}else t<i[0]?(this.setTransform(i[0]),this.setCurrentValue(s[0]),1===this.currentSlider&&(this.currentSlider=0)):(this.setTransform(i[1]),this.setCurrentValue(s[1]),0===this.currentSlider&&(this.currentSlider=1))},isDiff:function(t,e){return Object.prototype.toString.call(t)!==Object.prototype.toString.call(e)||(Array.isArray(t)&&t.length===e.length?t.some(function(t,i){return t!==e[i]}):t!==e)},setCurrentValue:function(t,e){if(t<this.minimum||t>this.maximum)return!1;this.isRange?this.isDiff(this.currentValue[this.currentSlider],t)&&(this.currentValue.splice(this.currentSlider,1,t),this.lazy&&this.flag||this.syncValue()):this.isDiff(this.currentValue,t)&&(this.currentValue=t,this.lazy&&this.flag||this.syncValue()),e||this.setPosition()},setIndex:function(t){if(Array.isArray(t)&&this.isRange){var e=void 0;e=this.data?[this.data[t[0]],this.data[t[1]]]:[this.spacing*t[0]+this.minimum,this.spacing*t[1]+this.minimum],this.setValue(e)}else t=this.spacing*t+this.minimum,this.isRange&&(this.currentSlider=t>(this.currentValue[1]-this.currentValue[0])/2+this.currentValue[0]?1:0),this.setCurrentValue(t)},setValue:function(t,e,i){var s=this;if(this.isDiff(this.val,t)){var r=this.limitValue(t);this.val=!1!==r?this.isRange?r.concat():r:this.isRange?t.concat():t,this.syncValue(e)}this.$nextTick(function(){return s.setPosition(i)})},setPosition:function(t){this.flag||this.setTransitionTime(void 0===t?this.speed:t),this.isRange?(this.currentSlider=0,this.setTransform(this.position[this.currentSlider]),this.currentSlider=1,this.setTransform(this.position[this.currentSlider])):this.setTransform(this.position),this.flag||this.setTransitionTime(0)},setTransform:function(t){var e=("vertical"===this.direction?this.dotSize/2-t:t-this.dotSize/2)*(this.reverse?-1:1),i="vertical"===this.direction?"translateY("+e+"px)":"translateX("+e+"px)",s=(0===this.currentSlider?this.position[1]-t:t-this.position[0])+"px",r=(0===this.currentSlider?t:this.position[0])+"px";this.isRange?(this.slider[this.currentSlider].style.transform=i,this.slider[this.currentSlider].style.WebkitTransform=i,this.slider[this.currentSlider].style.msTransform=i,"vertical"===this.direction?(this.$refs.process.style.height=s,this.$refs.process.style[this.reverse?"top":"bottom"]=r):(this.$refs.process.style.width=s,this.$refs.process.style[this.reverse?"right":"left"]=r)):(this.slider.style.transform=i,this.slider.style.WebkitTransform=i,this.slider.style.msTransform=i,"vertical"===this.direction?(this.$refs.process.style.height=t+"px",this.$refs.process.style[this.reverse?"top":"bottom"]=0):(this.$refs.process.style.width=t+"px",this.$refs.process.style[this.reverse?"right":"left"]=0))},setTransitionTime:function(t){if(t||this.$refs.process.offsetWidth,this.isRange){for(var e=0;e<this.slider.length;e++)this.slider[e].style.transitionDuration=t+"s",this.slider[e].style.WebkitTransitionDuration=t+"s";this.$refs.process.style.transitionDuration=t+"s",this.$refs.process.style.WebkitTransitionDuration=t+"s"}else this.slider.style.transitionDuration=t+"s",this.slider.style.WebkitTransitionDuration=t+"s",this.$refs.process.style.transitionDuration=t+"s",this.$refs.process.style.WebkitTransitionDuration=t+"s"},limitValue:function(t){var e=this;if(this.data)return t;var i=!1;return this.isRange?t=t.map(function(t){return t<e.min?(i=!0,e.min):t>e.max?(i=!0,e.max):t}):t>this.max?(i=!0,t=this.max):t<this.min&&(i=!0,t=this.min),i&&t},syncValue:function(t){t||this.$emit("callback",this.val),this.$emit("input",this.isRange?this.val.concat():this.val)},getValue:function(){return this.val},getIndex:function(){return this.currentIndex},getStaticData:function(){this.$refs.elem&&(this.size="vertical"===this.direction?this.$refs.elem.offsetHeight:this.$refs.elem.offsetWidth,this.offset="vertical"===this.direction?this.$refs.elem.getBoundingClientRect().top+window.pageYOffset||document.documentElement.scrollTop:this.$refs.elem.getBoundingClientRect().left)},refresh:function(){this.$refs.elem&&(this.getStaticData(),this.setPosition())}},created:function(){window.addEventListener("resize",this.refresh)},mounted:function(){var t=this;this.$nextTick(function(){t.getStaticData(),t.setValue(t.value,!0,0),t.bindEvents()})},beforeDestroy:function(){this.unbindEvents()}}},function(t,e,i){"use strict";var s=i(0);t.exports=s},function(t,e,i){e=t.exports=i(4)(),e.push([t.i,'.vue-slider-wrap[data-v-4f2807ae]{position:relative;box-sizing:border-box;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.vue-slider-wrap.vue-slider-disabled[data-v-4f2807ae]{opacity:.5;cursor:not-allowed}.vue-slider-wrap.vue-slider-has-label[data-v-4f2807ae]{margin-bottom:15px}.vue-slider-wrap.vue-slider-disabled .vue-slider-dot[data-v-4f2807ae]{cursor:not-allowed}.vue-slider-wrap .vue-slider[data-v-4f2807ae]{position:relative;display:block;border-radius:15px;background-color:#ccc}.vue-slider-wrap .vue-slider[data-v-4f2807ae]:after{content:"";position:absolute;left:0;top:0;width:100%;height:100%;z-index:2}.vue-slider-process[data-v-4f2807ae]{position:absolute;border-radius:15px;background-color:#3498db;transition:all 0s;z-index:1}.vue-slider-horizontal .vue-slider-process[data-v-4f2807ae]{width:0;height:100%;top:0;left:0;will-change:width}.vue-slider-vertical .vue-slider-process[data-v-4f2807ae]{width:100%;height:0;bottom:0;left:0;will-change:height}.vue-slider-horizontal-reverse .vue-slider-process[data-v-4f2807ae]{width:0;height:100%;top:0;right:0}.vue-slider-vertical-reverse .vue-slider-process[data-v-4f2807ae]{width:100%;height:0;top:0;left:0}.vue-slider-dot[data-v-4f2807ae]{position:absolute;border-radius:50%;background-color:#fff;box-shadow:.5px .5px 2px 1px rgba(0,0,0,.32);transition:all 0s;will-change:transform;cursor:pointer;z-index:3}.vue-slider-horizontal .vue-slider-dot[data-v-4f2807ae]{left:0}.vue-slider-vertical .vue-slider-dot[data-v-4f2807ae]{bottom:0}.vue-slider-horizontal-reverse .vue-slider-dot[data-v-4f2807ae]{right:0}.vue-slider-vertical-reverse .vue-slider-dot[data-v-4f2807ae]{top:0}.vue-slider-tooltip-wrap[data-v-4f2807ae]{display:none;position:absolute;z-index:9}.vue-slider-tooltip[data-v-4f2807ae]{display:block;font-size:14px;white-space:nowrap;padding:2px 5px;min-width:20px;text-align:center;color:#fff;border-radius:5px;border:1px solid #3498db;background-color:#3498db}.vue-slider-tooltip-wrap.vue-slider-tooltip-top[data-v-4f2807ae]{top:-9px;left:50%;transform:translate(-50%,-100%)}.vue-slider-tooltip-wrap.vue-slider-tooltip-bottom[data-v-4f2807ae]{bottom:-9px;left:50%;transform:translate(-50%,100%)}.vue-slider-tooltip-wrap.vue-slider-tooltip-left[data-v-4f2807ae]{top:50%;left:-9px;transform:translate(-100%,-50%)}.vue-slider-tooltip-wrap.vue-slider-tooltip-right[data-v-4f2807ae]{top:50%;right:-9px;transform:translate(100%,-50%)}.vue-slider-tooltip-wrap.vue-slider-tooltip-top .vue-slider-tooltip[data-v-4f2807ae]:before{content:"";position:absolute;bottom:-10px;left:50%;width:0;height:0;border:5px solid transparent;border:6px solid transparent\\0;border-top-color:inherit;transform:translate(-50%)}.vue-slider-tooltip-wrap.vue-slider-tooltip-bottom .vue-slider-tooltip[data-v-4f2807ae]:before{content:"";position:absolute;top:-10px;left:50%;width:0;height:0;border:5px solid transparent;border:6px solid transparent\\0;border-bottom-color:inherit;transform:translate(-50%)}.vue-slider-tooltip-wrap.vue-slider-tooltip-left .vue-slider-tooltip[data-v-4f2807ae]:before{content:"";position:absolute;top:50%;right:-10px;width:0;height:0;border:5px solid transparent;border:6px solid transparent\\0;border-left-color:inherit;transform:translateY(-50%)}.vue-slider-tooltip-wrap.vue-slider-tooltip-right .vue-slider-tooltip[data-v-4f2807ae]:before{content:"";position:absolute;top:50%;left:-10px;width:0;height:0;border:5px solid transparent;border:6px solid transparent\\0;border-right-color:inherit;transform:translateY(-50%)}.vue-slider-dot.vue-slider-hover:hover .vue-slider-tooltip-wrap[data-v-4f2807ae]{display:block}.vue-slider-dot.vue-slider-always .vue-slider-tooltip-wrap[data-v-4f2807ae]{display:block!important}.vue-slider-piecewise[data-v-4f2807ae]{position:absolute;width:100%;padding:0;margin:0;left:0;top:0;height:100%;list-style:none}.vue-slider-piecewise li[data-v-4f2807ae]{position:absolute;width:8px;height:8px}.vue-slider-piecewise .vue-slider-piecewise-dot[data-v-4f2807ae]{position:absolute;left:50%;top:50%;width:100%;height:100%;display:inline-block;background-color:rgba(0,0,0,.16);border-radius:50%;transform:translate(-50%,-50%);z-index:2;transition:all .3s}.vue-slider-piecewise li:first-child .vue-slider-piecewise-dot[data-v-4f2807ae],.vue-slider-piecewise li:last-child .vue-slider-piecewise-dot[data-v-4f2807ae]{visibility:hidden}.vue-slider-horizontal-reverse .vue-slider-piecewise-label[data-v-4f2807ae],.vue-slider-horizontal .vue-slider-piecewise-label[data-v-4f2807ae]{position:absolute;display:inline-block;top:100%;left:50%;white-space:nowrap;font-size:12px;color:#333;transform:translate(-50%,8px);visibility:visible}.vue-slider-vertical-reverse .vue-slider-piecewise-label[data-v-4f2807ae],.vue-slider-vertical .vue-slider-piecewise-label[data-v-4f2807ae]{position:absolute;display:inline-block;top:50%;left:100%;white-space:nowrap;font-size:12px;color:#333;transform:translate(8px,-50%);visibility:visible}.vue-slider-sr-only[data-v-4f2807ae]{clip:rect(1px,1px,1px,1px);height:1px;width:1px;overflow:hidden;position:absolute!important} #backToStart #back {margin-top: 1.5em;}',""])},function(t,e){t.exports=function(){var t=[];return t.toString=function(){for(var t=[],e=0;e<this.length;e++){var i=this[e];i[2]?t.push("@media "+i[2]+"{"+i[1]+"}"):t.push(i[1])}return t.join("")},t.i=function(e,i){"string"==typeof e&&(e=[[null,e,""]]);for(var s={},r=0;r<this.length;r++){var o=this[r][0];"number"==typeof o&&(s[o]=!0)}for(r=0;r<e.length;r++){var n=e[r];"number"==typeof n[0]&&s[n[0]]||(i&&!n[2]?n[2]=i:i&&(n[2]="("+n[2]+") and ("+i+")"),t.push(n))}},t}},function(t,e){t.exports=function(t,e,i,s){var r,o=t=t||{},n=typeof t.default;"object"!==n&&"function"!==n||(r=t,o=t.default);var a="function"==typeof o?o.options:o;if(e&&(a.render=e.render,a.staticRenderFns=e.staticRenderFns),i&&(a._scopeId=i),s){var l=Object.create(a.computed||null);Object.keys(s).forEach(function(t){var e=s[t];l[t]=function(){return e}}),a.computed=l}return{esModule:r,exports:o,options:a}}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],ref:"wrap",class:["vue-slider-wrap",t.flowDirection,t.disabledClass,{"vue-slider-has-label":t.piecewiseLabel}],style:t.wrapStyles,on:{click:t.wrapClick}},[i("div",{ref:"elem",staticClass:"vue-slider",style:[t.elemStyles,t.bgStyle],attrs:{"aria-hidden":"true"}},[t.isMobile?[t.isRange?[i("div",{ref:"dot0",class:[t.tooltipStatus,"vue-slider-dot"],style:[t.sliderStyles[0],t.dotStyles],on:{touchstart:function(e){t.moveStart(0)}}},[i("span",{class:["vue-slider-tooltip-"+t.tooltipDirection[0],"vue-slider-tooltip-wrap"]},[t._t("tooltip",[i("span",{staticClass:"vue-slider-tooltip",style:t.tooltipStyles[0]},[t._v(t._s(t.formatter?t.formatting(t.val[0]):t.val[0]))])],{value:t.val[0],index:0})],2)]),t._v(" "),i("div",{ref:"dot1",class:[t.tooltipStatus,"vue-slider-dot"],style:[t.sliderStyles[1],t.dotStyles],on:{touchstart:function(e){t.moveStart(1)}}},[i("span",{class:["vue-slider-tooltip-"+t.tooltipDirection[1],"vue-slider-tooltip-wrap"]},[t._t("tooltip",[i("span",{staticClass:"vue-slider-tooltip",style:t.tooltipStyles[1]},[t._v(t._s(t.formatter?t.formatting(t.val[1]):t.val[1]))])],{value:t.val[1],index:1})],2)])]:[i("div",{ref:"dot",class:[t.tooltipStatus,"vue-slider-dot"],style:[t.sliderStyles,t.dotStyles],on:{touchstart:t.moveStart}},[i("span",{class:["vue-slider-tooltip-"+t.tooltipDirection,"vue-slider-tooltip-wrap"]},[t._t("tooltip",[t._v("\n\t\t\t\t\t\t\t"+t._s(t.formatter?t.formatting(t.val):t.val)+"\n\t\t\t\t\t\t")],{value:t.val})],2)])]]:[t.isRange?[i("div",{ref:"dot0",class:[t.tooltipStatus,"vue-slider-dot"],style:[t.sliderStyles[0],t.dotStyles],on:{mousedown:function(e){t.moveStart(0)}}},[i("span",{class:["vue-slider-tooltip-"+t.tooltipDirection[0],"vue-slider-tooltip-wrap"]},[t._t("tooltip",[i("span",{staticClass:"vue-slider-tooltip",style:t.tooltipStyles[0]},[t._v(t._s(t.formatter?t.formatting(t.val[0]):t.val[0]))])],{value:t.val[0],index:0})],2)]),t._v(" "),i("div",{ref:"dot1",class:[t.tooltipStatus,"vue-slider-dot"],style:[t.sliderStyles[1],t.dotStyles],on:{mousedown:function(e){t.moveStart(1)}}},[i("span",{class:["vue-slider-tooltip-"+t.tooltipDirection[1],"vue-slider-tooltip-wrap"]},[t._t("tooltip",[i("span",{staticClass:"vue-slider-tooltip",style:t.tooltipStyles[1]},[t._v(t._s(t.formatter?t.formatting(t.val[1]):t.val[1]))])],{value:t.val[1],index:1})],2)])]:[i("div",{ref:"dot",class:[t.tooltipStatus,"vue-slider-dot"],style:[t.sliderStyles,t.dotStyles],on:{mousedown:t.moveStart}},[i("span",{class:["vue-slider-tooltip-"+t.tooltipDirection,"vue-slider-tooltip-wrap"]},[t._t("tooltip",[i("span",{staticClass:"vue-slider-tooltip",style:t.tooltipStyles},[t._v(t._s(t.formatter?t.formatting(t.val):t.val))])],{value:t.val})],2)])]],t._v(" "),[i("ul",{staticClass:"vue-slider-piecewise"},t._l(t.piecewiseDotWrap,function(e,s){return i("li",{style:[t.piecewiseDotStyle,e.style]},[t._t("piecewiseL",[t.piecewise?i("span",{staticClass:"vue-slider-piecewise-dot",style:[t.piecewiseStyle,e.inRange?t.piecewiseActiveStyle:null]}):t._e()],{label:e.label,index:s,first:0===s,last:s===t.piecewiseDotWrap.length-1}),t._v(" "),t._t("label",[t.piecewiseLabel?i("span",{staticClass:"vue-slider-piecewise-label",style:[t.labelStyle,e.inRange?t.labelActiveStyle:null]},[t._v("\n\t\t\t\t\t\t\t"+t._s(e.label)+"\n\t\t\t\t\t\t")]):t._e()],{label:e.label,index:s,first:0===s,last:s===t.piecewiseDotWrap.length-1})],2)}))],t._v(" "),i("div",{ref:"process",staticClass:"vue-slider-process",style:t.processStyle})],2),t._v(" "),t.isRange||t.data?t._e():i("input",{directives:[{name:"model",rawName:"v-model",value:t.val,expression:"val"}],staticClass:"vue-slider-sr-only",attrs:{type:"range",min:t.min,max:t.max},domProps:{value:t.val},on:{__r:function(e){t.val=e.target.value}}})])},staticRenderFns:[]}},function(t,e,i){var s=i(3);"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);i(8)("3e13c911",s,!0)},function(t,e,i){function s(t){for(var e=0;e<t.length;e++){var i=t[e],s=d[i.id];if(s){s.refs++;for(var r=0;r<s.parts.length;r++)s.parts[r](i.parts[r]);for(;r<i.parts.length;r++)s.parts.push(o(i.parts[r]));s.parts.length>i.parts.length&&(s.parts.length=i.parts.length)}else{for(var n=[],r=0;r<i.parts.length;r++)n.push(o(i.parts[r]));d[i.id]={id:i.id,refs:1,parts:n}}}}function r(){var t=document.createElement("style");return t.type="text/css",h.appendChild(t),t}function o(t){var e,i,s=document.querySelector('style[data-vue-ssr-id~="'+t.id+'"]');if(s){if(f)return v;s.parentNode.removeChild(s)}if(m){var o=c++;s=p||(p=r()),e=n.bind(null,s,o,!1),i=n.bind(null,s,o,!0)}else s=r(),e=a.bind(null,s),i=function(){s.parentNode.removeChild(s)};return e(t),function(s){if(s){if(s.css===t.css&&s.media===t.media&&s.sourceMap===t.sourceMap)return;e(t=s)}else i()}}function n(t,e,i,s){var r=i?"":s.css;if(t.styleSheet)t.styleSheet.cssText=g(e,r);else{var o=document.createTextNode(r),n=t.childNodes;n[e]&&t.removeChild(n[e]),n.length?t.insertBefore(o,n[e]):t.appendChild(o)}}function a(t,e){var i=e.css,s=e.media,r=e.sourceMap;if(s&&t.setAttribute("media",s),r&&(i+="\n/*# sourceURL="+r.sources[0]+" */",i+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */"),t.styleSheet)t.styleSheet.cssText=i;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(i))}}var l="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!l)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var u=i(9),d={},h=l&&(document.head||document.getElementsByTagName("head")[0]),p=null,c=0,f=!1,v=function(){},m="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());t.exports=function(t,e,i){f=i;var r=u(t,e);return s(r),function(e){for(var i=[],o=0;o<r.length;o++){var n=r[o],a=d[n.id];a.refs--,i.push(a)}e?(r=u(t,e),s(r)):r=[];for(var o=0;o<i.length;o++){var a=i[o];if(0===a.refs){for(var l=0;l<a.parts.length;l++)a.parts[l]();delete d[a.id]}}}};var g=function(){var t=[];return function(e,i){return t[e]=i,t.filter(Boolean).join("\n")}}()},function(t,e){t.exports=function(t,e){for(var i=[],s={},r=0;r<e.length;r++){var o=e[r],n=o[0],a=o[1],l=o[2],u=o[3],d={id:t+":"+r,css:a,media:l,sourceMap:u};s[n]?s[n].parts.push(d):i.push(s[n]={id:n,parts:[d]})}return i}}])});

/***/ }),

/***/ 43:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_pollyfills__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_pollyfills___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__modules_pollyfills__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_helper_function__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vue_select__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vue_select___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_vue_select__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vue_slider_component__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vue_slider_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_vue_slider_component__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__vendors_smarty_tabs__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__vendors_tabModule_min__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__vendors_tabModule_min___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__vendors_tabModule_min__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_vueComponents_calculator_popup_calculator_popup_vue__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_jquery__);











function getData(json) {
  return JSON.parse(json);
}

function initCalc() {
  var calculatorTabs = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__vendors_smarty_tabs__["a" /* default */])('.calculate-tabs', {
    tabSlide: false
  });

  var calculatorReceptionsTabs = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__vendors_smarty_tabs__["a" /* default */])('.calculate-tabs_receptions', {
    tabSlide: false
  });

  __WEBPACK_IMPORTED_MODULE_6__vendors_tabModule_min___default.a.init();

  calcConstruct1();
  calcConstructOther();
  
  var calculators = document.querySelectorAll('.calculator');
  if (calculators.length > 0) {
    calculators.forEach(function (item) {
      var calcId = '#' + item.id;
      if (item.dataset.samples) {
        var samples = getData(item.dataset.samples);
        var id = item.dataset.tab;
        calcConstruct(calcId, samples, id);
      }
    });
  }
}

function calcConstruct1(){
    var calculator1 = new __WEBPACK_IMPORTED_MODULE_2_vue___default.a({
      el: '#calculator1',
      data: {
            name: '',
            selected: '',
            selected1: '',
            selected2: '',
            pledge: '',
            condition: '',
            set: '',
            isActiveError: false,
            manufacturersList: [],
            typeOfEquipmentList: [
            {name: 'Телефон', list: [  
              {name: 'bosh',
              models: [
                { name: 'a12'},
                {name: 'b11'},
                {name:'c11'}
              ],},
              {name: 'siemens',
              models: [
              { name: 'dd12'},
              {name: 'ee11'},
              {name:'ff11'}
              ],},
            ],
            },
            {name: 'Планшет', list: [  
              {
              name: 'samsung',
              models: [
              { name: 'gg12'},
              {name: 'hh11'},
              {name:'kk11'}],
              },
              {
              name: 'apple',
              models: [{ name: 'ipad1'},
              {name: 'ipad2'},
              {name:'ipad3'}],
              },],
            },
            {name: 'ТВ', list: [  
              {
              name: 'TLC',
              models: [{ name: '32'},
              {name: '42'},
              {name:'55'}],
              },
              {
              name: 'LG',
              models: [
              { name: '37'},
              {name: '49'},
              {name:'65'}
            ],
              },],
            },
            ],
            modelList: [],
         counter: 0,
        //calc
        chosenField: {
          samples: false,
          tariff: false,
          discount: false,
          term: false,
          orderBtn: false
        },
        sum: '',
        //calc
        isVisible: true,
         navArray: [
          '.first',
          '.second',
          '.third',
          '.final'
        ], 
        arr: {
          "Client_ID": "ceaa304c-ef21-11e9-a2fa-0050569bbc88",
          "SortOrder": "from_new_to_old",
          "Page_Number": 0,
          "Number_Of_Result_Per_Page": 10
        },
      }, 
      methods: {
        mouseover: function mouseover(event) {
          event.target.style.opacity = "0.6";
         },
        mouseleave: function mouseleave(event) {
          event.target.style.opacity = "1";
        },
        choseClick: function choseClick(par = "mobile") {
          $('.start-window').attr('Style', "display: none");
          if(par === "mobile"){ 
            $('.mobile_form_window').fadeIn("slow");
          } else {
            $('.other_form_window').fadeIn("slow");
          }
          $('#backToStart').fadeIn("slow");
          $('#back').attr('Style', "display: none");
          
        },
        backToStartStep: function backToStartStep(){
          $('.start-window').fadeIn("slow");
          $('.mobile_form_window').attr('Style', "display: none");  
          $('.other_form_window').attr('Style', "display: none");
          this.counter = 0; 
        },
        backStep: function backStep(){
              $(this.navArray[this.counter]).attr('Style', "display: none");
              this.counter--;
              $(this.navArray[this.counter]).fadeIn("slow");
        },
        nextStep: function nextStep(){
          if(this.selected2 == "" || this.selected2 == null){
            this.isActiveError = true;
          }
          else{
            $(this.navArray[this.counter]).attr('Style', "display: none");
            this.counter++;
            $(this.navArray[this.counter]).fadeIn("slow");
          }    
         
        },
        takeManu: function takeManu(){
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://top.lombard1.com.ua/l1_TOP/hs/ocredit/clienthistory/getClientHistory",
            "method": "POST",
            "headers": {

              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
              "Access-Control-Allow-Headers": "Content-Type",
              "Access-Control-Allow-Credentials": true,

              "Content-Type": "application/json",
              "Authorization": "Basic aHR0cHNydnVzcjpMZGY7bHNMZGY0",
              "Accept": "*/*",
              "Cache-Control": "no-cache",
              "cache-control": "no-cache"
            },
            "processData": false,
            "data": "{\r\n          \"Client_ID\": \"ceaa304c-ef21-11e9-a2fa-0050569bbc88\",\r\n          \"SortOrder\": \"from_new_to_old\",\r\n          \"Page_Number\": 0,\r\n          \"Number_Of_Result_Per_Page\": 10\r\n        }"
          }
          
          $.ajax(settings).done(function (response) {
            console.log(response);
          });
        },
        calculateSuccess: function calculateSuccess(success) {
          if (success) {
            var successData = getData(success);
            if (successData.price) {
              this.sum = ((successData.price * this.condition) + (successData.price * this.set))  * 1.2;
              this.isCalculated = true;
            }
          } else {
            console.error('error');
          }
        },
        calculateMethod: function calculateMethod(data) {
          var formData = {
            action: 'calcAction1',
            data: data
          };
          __WEBPACK_IMPORTED_MODULE_1__modules_helper_function__["b" /* baseObj */].ajaxAction(formData, this.calculateSuccess);
        },
        calculateAction: function calculateAction(event) {
          this.condition = $("input:radio[name='exampleRadios']:checked").val();
          this.set = $("input:radio[name='exampleRadios1']:checked").val();
          var formElements = event.target.elements;
          var postData = {};
          for (var i = 0; i < formElements.length; i++) {
            postData[formElements[i].name] = formElements[i].value;
          }
          this.calculateMethod(postData);
          this.nextStep();
        },
        calculateCredit: function calculateCredit() {
          var el = this.$el.querySelector('[data-js-calculatorGraphics]');
          el.classList.remove('disabled');
          __WEBPACK_IMPORTED_MODULE_8_jquery___default()(".calc-section").animate({ scrollTop: __WEBPACK_IMPORTED_MODULE_8_jquery___default()('.calculator__calculate-btn').offset().top + __WEBPACK_IMPORTED_MODULE_8_jquery___default()(".calc-section").scrollTop() }, 800);
        },
        checkRequiredInput: function checkRequiredInput(){
          if(this.selected2 == "" || this.selected2 == null){
            this.isActiveError = true;
          }
          else{
            this.isActiveError = false;
          }  
        },
        ActivateError: function ActivateError(){
          console.log("ActivateError");
          console.log(this.isActiveError);
          return {
          'show-error': this.isActiveError,
          'hide-error': !this.isActiveError,
          }
        },
        calculateSuccess1: function calculateSuccess(success) {
          if (success) {
            var successData = getData(success);
            if (successData.price) {
              this.sum = ((successData.price * this.condition) + (successData.price * this.set))  * 1.2;
              this.isCalculated = true;
            }
          } else {
            console.error('error');
          }
        },
        calculateMethod1: function calculateMethod(data) {
          var formData = {
            action: 'calcAction1',
            data: data
          };
          __WEBPACK_IMPORTED_MODULE_1__modules_helper_function__["b" /* baseObj */].ajaxAction(formData, this.calculateSuccess);
        },
        calculateAction1: function calculateAction(event) {
          this.condition = $("input:radio[name='exampleRadios']:checked").val();
          this.set = $("input:radio[name='exampleRadios1']:checked").val();
          var formElements = event.target.elements;
          var postData = {};
          for (var i = 0; i < formElements.length; i++) {
            postData[formElements[i].name] = formElements[i].value;
          }
          this.calculateMethod(postData);
          this.nextStep();
        },  
      },
      watch:{
        counter: function(){
          if(this.counter == 0){
            $('#back').attr('Style', "display: none");
            $("#backToStart").fadeIn("slow"); 
          }
          else{
            $("#back").fadeIn("slow"); 
            $('#backToStart').attr('Style', "display: none ");
          if(this.counter == 3){
             $('#calculate_summ').attr('Style', "display: none");
            }
          else if(this.counter == 2){
            $('#nextStep').attr('Style', "display: none");
            $("#calculate_summ").fadeIn("slow");
          }
            else{
            $("#nextStep").fadeIn("slow");
            $('#calculate_summ').attr('Style', "display: none");
            }
          }
          $('.dropzoneSendForm').fadeIn("slow");
        },
        selected: function(event){
          this.manufacturersList = event.list;
          this.selected1 = "";
          this.selected2 = "";
          //$("#nextStep").attr("disabled", 'disabled');
         },
        selected1: function(event){
          this.modelList = event.models;
          this.selected2 = "";
        },
        selected2: function(){
          this.pledge = this.selected.name + " " + this.selected1.name + " " + this.selected2.name;
          $("#pledge").attr("disabled", 'disabled');
          this.checkRequiredInput();
        }
       },
        computed: {
          setPercent: function setPercent() {
            return this.sum !== '' && this.percent !== '' ? this.percent / this.sum * 100 : 0;
          },
        },
        components: {
          vSelect: __WEBPACK_IMPORTED_MODULE_3_vue_select___default.a,
          vueSlider: __WEBPACK_IMPORTED_MODULE_4_vue_slider_component___default.a,
          calculatorPopup: __WEBPACK_IMPORTED_MODULE_7_vueComponents_calculator_popup_calculator_popup_vue__["a" /* default */]
        },
        delimiters: ['${', '}'],
    });
}
function calcConstructOther(){
  var calculator2 = new __WEBPACK_IMPORTED_MODULE_2_vue___default.a({
    el: '#calculatorOther',
    data: {
    }, 
    methods: {
      backToStartStep: function backToStartStep(){
        $('.start-window').fadeIn("slow");
        $('.mobile_form_window').attr('Style', "display: none");  
        $('.other_form_window').attr('Style', "display: none");
      },
    },
    mounted: function mounted(){
      $('#backToStartTeth').fadeIn("slow"); 
    },
    components: {
        calculatorPopup: __WEBPACK_IMPORTED_MODULE_7_vueComponents_calculator_popup_calculator_popup_vue__["a" /* default */]
      },
      delimiters: ['${', '}'],
  });
}  
function calcConstruct(root, samples, currentId) {
  var calcSamples = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__modules_helper_function__["a" /* toArray */])(samples);
  if (calcSamples.length > 0) {
    var calculator = new __WEBPACK_IMPORTED_MODULE_2_vue___default.a({
      el: root,
      data: {
        currentId: currentId,
        calcSamples: calcSamples,
        weightValue: '',
        samplesValue: '',
        selectSamples: [],
        tariffValue: '',
        tariffInfo: '',
        tariffs: [],
        discountInfo: '',
        discountValue: '',
        discountOptions: [],
        sum: '',
        percent: '',
        chosenField: {
          samples: false,
          tariff: false,
          discount: false,
          term: false,
          orderBtn: false
        },
        sliderOptions: {
          value: 14,
          min: 1,
          max: 30
        },
        isCalculated: false,
        validateRegExp: /\d+\.?\d{0,2}/
      },

      watch: {
        weightValue: function weightValue(value) {
          if (this.isCalculated) {
            var formElements = this.$el.querySelector('.calculator-form').elements;
            var postData = {};
            for (var i = 0; i < formElements.length; i++) {
              postData[formElements[i].name] = formElements[i].value;
            }
            this.calculateMethod(postData);

            if (value === '') {
              this.chosenField.orderBtn = false;
            } else {
              this.chosenField.orderBtn = true;
            }
            return;
          }
          if (value !== '') {
            this.chosenField.samples = true;
            this.selectSamples = this.calcSamples;
            this.discountOptions = [];
          } else {
            this.chosenField.samples = false;
            this.chosenField.tariff = false;
            this.chosenField.discount = false;
            this.chosenField.term = false;
            this.selectSamples = [];
            this.tariffValue = null;
            this.discountValue = null;
            this.discountOptions = [];
            this.disableForm();
            this.isCalculated = false;
            this.sum = '';
            this.percent = '';
          }
        },
        samplesValue: function samplesValue(value) {
          this.tariffValue = null;
          this.tariffs = [];
          this.sum = '';
          this.percent = '';
          if (value) {
            var formData = {
              action: 'getTariff',
              data: {
                'samples': value,
                'pledge': this.currentId
              }
            };
            __WEBPACK_IMPORTED_MODULE_1__modules_helper_function__["b" /* baseObj */].ajaxAction(formData, this.tariffSuccess);
          }
          this.discountValue = null;
          this.discountOptions = [];
          this.chosenField.tariff = !!value;
        },
        tariffValue: function tariffValue(value) {
          this.tariffInfo = '';
          this.sum = '';
          this.percent = '';
          this.discountOptions = [];
          if (value) {
            if (value.info) {
              this.tariffInfo = value.info;
            }
            if (value.discounts) {
              this.discountValue = null;
              this.discountOptions = value.discounts;
            } else {
              this.discountValue = null;
              this.discountOptions = [];
            }
          }
          this.chosenField.discount = !!value;
        },
        discountValue: function discountValue(value) {
          this.sum = '';
          this.percent = '';
          this.discountInfo = '';
          if (value) {
            if (value.info) {
              this.discountInfo = value.info;
            }
            if (value.min && value.max && value.val) {
              this.sliderOptions.min = value.min;
              this.sliderOptions.max = value.max;
              this.sliderOptions.value = value.val;
              if (this.$refs.slider) {
                this.$refs.slider.refresh();
              }
            }
          }
          this.chosenField.term = !!value;
          this.chosenField.orderBtn = this.chosenField.term;
        }
      },

      computed: {
        setPercent: function setPercent() {
          return this.sum !== '' && this.percent !== '' ? this.percent / this.sum * 100 : 0;
        },
        setSamplesValue: function setSamplesValue() {
          if (this.samplesValue) {
            return this.samplesValue;
          } else {
            return '';
          }
        },
        setTariffValue: function setTariffValue() {
          if (this.tariffValue) {
            return this.tariffValue.value;
          } else {
            return '';
          }
        },
        setDiscountValue: function setDiscountValue() {
          if (this.discountValue) {
            return this.discountValue.value;
          } else {
            return '';
          }
        },
        setTermValue: function setTermValue() {
          return this.$refs.slider ? this.$refs.slider.getValue() : this.sliderOptions.value;
        }
      },

      methods: {
        fillWithContent: function fillWithContent() {
          var _this = this;

          var getSelector = function getSelector(selector) {
            return _this.$el.querySelector(selector);
          };

          getSelector('.order-weight').innerHTML = this.weightValue;
          getSelector('[name=\'order-weight\']').value = this.weightValue;

          getSelector('[name=\'type\']').value = document.querySelector('.smarty-controller__item--active').innerText;

          getSelector('.order-sample').innerHTML = this.samplesValue;
          getSelector('[name=\'order-sample\']').value = this.samplesValue;

          getSelector('.order-tariff').innerHTML = this.tariffValue.label;
          getSelector('[name=\'order-tariff\']').value = this.tariffValue.label;

          getSelector('.order-discount').innerHTML = this.discountValue.label;
          getSelector('[name=\'order-discount\']').value = this.discountValue.label;

          var days = this.$refs.slider ? this.$refs.slider.getValue() : this.sliderOptions.value;
          getSelector('.order-days').innerHTML = days;
          getSelector('[name=\'order-days\']').value = days;

          var servicesBlock = document.getElementById('ajax_params');
          var stonesVal = getSelector('[name=\'stones\']').checked ? servicesBlock.getAttribute('data-yes') : servicesBlock.getAttribute('data-no');

          getSelector('.order-stones').innerHTML = stonesVal;
          getSelector('[name=\'order-stones\']').value = stonesVal;

          getSelector('.order-sum').innerHTML = this.sum;
          getSelector('[name=\'order-sum\']').value = this.sum;

          getSelector('.order-percent').innerHTML = this.percent;
          getSelector('[name=\'order-percent\']').value = this.percent;
        },
        calculateSuccess: function calculateSuccess(success) {
          if (success) {
            var successData = getData(success);
            if (successData.sum && successData.percent) {
              this.sum = successData.sum;
              this.percent = successData.percent;
              this.isCalculated = true;
            }
          } else {
            console.error('error');
          }
        },
        calculateMethod: function calculateMethod(data) {
          var formData = {
            action: 'calcAction',
            data: data
          };
          __WEBPACK_IMPORTED_MODULE_1__modules_helper_function__["b" /* baseObj */].ajaxAction(formData, this.calculateSuccess);
        },
        calculateAction: function calculateAction(event) {
          var formElements = event.target.elements;
          var postData = {};
          for (var i = 0; i < formElements.length; i++) {
            postData[formElements[i].name] = formElements[i].value;
            console.log(formElements[i].name + formElements[i].value);
            console.log(event);
            
          }
          this.calculateMethod(postData);
        },
        calculateCredit: function calculateCredit() {
          var el = this.$el.querySelector('[data-js-calculatorGraphics]');
          el.classList.remove('disabled');
          __WEBPACK_IMPORTED_MODULE_8_jquery___default()(".calc-section").animate({ scrollTop: __WEBPACK_IMPORTED_MODULE_8_jquery___default()('.calculator__calculate-btn').offset().top + __WEBPACK_IMPORTED_MODULE_8_jquery___default()(".calc-section").scrollTop() }, 800);
        },
        disableForm: function disableForm() {
          var el = this.$el.querySelector('[data-js-calculatorGraphics]');
          el.classList.add('disabled');
        },
        onInputValidate: function onInputValidate() {
          var matched = this.weightValue.match(this.validateRegExp);
          this.weightValue = matched ? matched[0] : '';
        },
        setLetter: function setLetter(event) {
          var el = event.target;
          var letter = el.getAttribute('data-letter');
          if (event.type === 'focus') {
            this.weightValue = this.weightValue.replace(' ' + letter, '');
          }
          if (event.type === 'blur' && this.weightValue !== '') {
            this.weightValue = this.weightValue + ' ' + letter;
          }
        },
        changeInput: function changeInput(event) {
          var el = event.target.parentElement.getElementsByTagName('input')[0];
          if (el.checked) {
            el.checked = false;
          } else {
            el.checked = true;
          }
        },
        sliderOptionsValueUpdate: function sliderOptionsValueUpdate(value) {
          this.$refs.slider.setValue(value);
        },
        tooltipAction: function tooltipAction(event) {
          var tooltip = event.target.nextElementSibling;

          if (event.type === 'mouseover') {
            tooltip.style.opacity = 1;
            tooltip.style.visibility = 'visible';
          }
          if (event.type === 'mouseleave') {
            tooltip.style.opacity = 0;
            tooltip.style.visibility = 'hidden';
          }
        },
        tariffSuccess: function tariffSuccess(success) {
          if (success) {
            var calcTariffs = getData(success);
            this.tariffs = calcTariffs.map(function (data) {
              return {
                label: data.post_title,
                value: data.ID,
                info: data.post_content,
                min: parseInt(data.min, 10),
                max: parseInt(data.max, 10),
                val: parseInt(data.val, 10),
                discounts: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__modules_helper_function__["a" /* toArray */])(data.discounts).map(function (dat) {
                  return {
                    label: dat.post_title,
                    info: dat.post_content,
                    value: dat.post_id,
                    min: parseInt(dat.min, 10),
                    max: parseInt(dat.max, 10),
                    val: parseInt(dat.val, 10)
                  };
                })
              };
            });
          } else {
            console.error('error');
          }
        }
      },
      components: {
        vSelect: __WEBPACK_IMPORTED_MODULE_3_vue_select___default.a,
        vueSlider: __WEBPACK_IMPORTED_MODULE_4_vue_slider_component___default.a,
        calculatorPopup: __WEBPACK_IMPORTED_MODULE_7_vueComponents_calculator_popup_calculator_popup_vue__["a" /* default */]
      },
      delimiters: ['${', '}']
    });
  }
}

document.addEventListener('DOMContentLoaded', initCalc);

/***/ }),

/***/ 47:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//


/***/ }),

/***/ 51:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 71:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "calculator-popup order-popup"
  }, [_vm._t("default")], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-1f147c44", esExports)
  }
}

/***/ }),

/***/ 74:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(51);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(9)("54ac684e", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1f147c44\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/sass-loader/lib/loader.js!./calculator-popup.scss", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1f147c44\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/sass-loader/lib/loader.js!./calculator-popup.scss");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ })

},[43]);
//# sourceMappingURL=../calc.js.map