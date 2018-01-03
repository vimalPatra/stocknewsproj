	

	//	start of poll.directive.js
console.log('-- poll.directive.js loaded');
	


	//code here
	
(function(){
	'use strict';

	angular
	.module('pollModule')
	.directive('poll',function(){
		return	{
			restrict: 'E',
			replace: true,
			templateUrl: './dist/views/poll.view.html',
			controller: 'pollCtrl',
			controllerAs: 'poll'
		}
	});



})();

	/*  end of poll.directive.js  */

