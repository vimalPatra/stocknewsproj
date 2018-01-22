
window.$ = global.jQuery = require('jquery');
var angular = require('angular');
var angularRoute = require('@uirouter/angularjs');

// Load the core build for lodash 
window._ = require('lodash/core');
// lodash throttle method package
window._.throttle = require('lodash.throttle');
// lodash debounce method package
window._.debounce = require('lodash.debounce');

jQuery.datePicker = require('@fengyuanchen/datepicker');

console.log('lib dependencies loaded, jQuery changed');

/*
(function(){
	function getDate(){
		return 23;
	}
	$.fn.extend({
		getDate : function(){
			return getDate();
		}
	});

})();

*/