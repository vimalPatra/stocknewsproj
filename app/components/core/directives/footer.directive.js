	

	//	start of footer.directive.js
console.log('-- footer.directive.js loaded');
	


	//code here
	
(function(){

	angular
	.module('core')
	.directive("appFooter",function(){
		return	{
			restrict: 'E',
			replace:true,
			scope: {
				tagline: '='
			},
			templateUrl: './dist/views/footer.view.html'
		}
	});



})();

	/*  end of footer.directive.js  */

