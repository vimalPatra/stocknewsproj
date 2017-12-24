	

	//	start of header.directive.js
console.log('-- eventUpdates.directive.js loaded');
	


	//code here
	
(function(){


	angular
	.module('eventUpdatesModule')
	.directive("eventUpdates",function(){
		return	{
			restrict: 'E',
			replace:true,
			scope: {
				tagline: '='
			},
			templateUrl: './dist/views/eventUpdates.view.html',
			controller: 'eventUpdatesCtrl',
			controllerAs: 'evUpCtrl'
		}
	});



})();

	/*  end of eventUpdates.directive.js  */

