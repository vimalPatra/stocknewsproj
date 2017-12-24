	

	//	start of list.directive.js
console.log('-- list.directive.js loaded');
	


	//code here
	
(function(){


	angular
	.module('listModule')
	.directive("list",function(){
		return	{
			restrict: 'E',
			replace:true,
			scope: {
				tagline: '='
			},
			templateUrl: './dist/views/list.view.html',
			controller: 'listCtrl',
			controllerAs: 'list'
		}
	});



})();

	/*  end of list.directive.js  */

