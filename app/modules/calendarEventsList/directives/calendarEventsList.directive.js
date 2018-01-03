	

	//	start of calendarEventsList.directive.js
console.log('-- calendarEventsList.directive.js loaded');
	


	//code here
	
(function(){
	'use strict';

	angular
	.module('calendarEventsListModule')
	.directive("calendarEventsList",function(){
		return	{
			restrict: 'E',
			replace: true,
			scope: {
				tagline: '='
			},
			templateUrl: './dist/views/ceList.view.html',
			controller: 'calendarEventsListCtrl',
			controllerAs: 'ceCtrl'
		}
	});



})();

	/*  end of calendarEventsList.directive.js  */

