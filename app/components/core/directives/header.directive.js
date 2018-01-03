	

	//	start of header.directive.js
console.log('-- header.directive.js loaded');
	


	//code here
	
(function(){


	angular
	.module('coreModule')
	.directive("appHeader",function(){
		return	{
			restrict: 'E',
			replace:true,
			scope: {
				tagline: '='
			},
			templateUrl: './dist/views/header.view.html',
			controller: 'headerCtrl',
			controllerAs: 'hCtrl'
		}
	});



})();

	/*  end of header.directive.js  */

