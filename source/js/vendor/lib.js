
window.$ = global.jQuery = require('jquery');
var angular = require('angular');
var angularRoute = require('@uirouter/angularjs');
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