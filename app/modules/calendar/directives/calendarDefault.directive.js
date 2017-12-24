	

	//	start of header.directive.js
console.log('-- calendarDefault.directive.js loaded');
	


	//code here
	
(function(){
	"use strict";

	angular
	.module('calendarModule')
	.directive("calendar",function(){
		return	{
			restrict: 'E',
			replace: true,
			templateUrl: './dist/views/calendarDefault.view.html',
			controller: 'calendarCtrl',
			controllerAs: 'calendar'
		}
	});



})();

	/*  end of calendarDefault.directive.js  */

