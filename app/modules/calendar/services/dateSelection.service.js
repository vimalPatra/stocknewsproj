

	/*	start of dateSelection.service.js  */
	console.log('-- dateSelection.service.js loaded');

(function(){

	// setup angular service to the module coreModule 

	angular.
	  module('calendarModule').
		factory('_DateSelection', [function() {
			var _selection = {
				years: [],
				months: [],
				dates: []
			};
			
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



	/* end of dateSelection.service.js */


