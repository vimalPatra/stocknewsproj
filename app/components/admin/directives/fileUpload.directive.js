	

	//	start of fileUpload.directive.js
console.log('-- fileUpload.directive.js loaded');
	


	//code here
	
(function(){

	angular
	.module('adminModule')
	.directive('fileModel', ['$parse', function ($parse) {
    return {
	    restrict: 'A',
	    link: function(scope, element, attrs) {
	        var model = $parse(attrs.fileModel);
	        var modelSetter = model.assign;

	        element.bind('change', function(){
	            scope.$apply(function(){
	                modelSetter(scope, element[0].files[0]);
	            });
	        });
	    }
	};
 }]);
	})();

	/*  end of fileUpload.directive.js  */