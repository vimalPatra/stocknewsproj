

	/*	start of DateSelection.service.js  */
	console.log('-- DateSelection.service.js loaded');

(function(){

	// setup angular service to the module coreModule 

	angular.
	  module('coreModule').
		factory('_DateSelection', [function() {
			var _selection = {};
			return {
				get: function () {
					return _selection;
				},
				set: function (passedValue) {
					_selection = passedValue;
				}
			}; 
		}]);



})();



	/* end of DateSelection.service.js */


