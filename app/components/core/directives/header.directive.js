	

	//	start of header.directive.js
console.log('-- header.directive.js loaded');
	


	//code here
	
(function(){


	angular
	.module('core')
	.directive("appHeader",function(){
		return	{
			restrict: 'E',
			replace:true,
			scope: {
				tagline: '='
			},
			templateUrl: './dist/views/header.view.html'
		}
	});



})();

	/*  end of header.directive.js  */

