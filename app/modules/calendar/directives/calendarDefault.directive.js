	

	//	start of header.directive.js
console.log('-- calendarDefault.directive.js loaded');

	//code here
	
(function(){
	'use strict';

	angular
	.module('calendarModule')
	.directive("calendar",function(){
		return	{
			restrict: 'E',
			replace: true,
			/*scope:{
				options: '='
			},*/
			templateUrl: './dist/views/calendarDefault.view.html',
			controller: 'calendarCtrl',
			controllerAs: 'calendar'/*,
			bindToController: true*/
		}
	});



})();

	/*  end of calendarDefault.directive.js  */

