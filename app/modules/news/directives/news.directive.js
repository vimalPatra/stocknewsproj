	

	//	start of news.directive.js
console.log('-- news.directive.js loaded');
	


	//code here
	
(function(){
	'use strict';

	angular
	.module('newsModule')
	.directive('news',function(){
		return	{
			restrict: 'E',
			replace:true,
			templateUrl: './dist/views/news.view.html',
			controller: 'newsCtrl',
			controllerAs: 'news'
		}
	});



})();

	/*  end of news.directive.js  */

