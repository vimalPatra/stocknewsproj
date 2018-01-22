	

	//	start of innerListSort.module.js
	
	console.log('-- innerListSort.filter.js loaded');


	//code here
(function(){
	'use strict';

	angular
		.module('listModule')
			.filter('innerListSort',['$filter', function($filter){
				
	         	return 	function filterFunction(array, filterBy, reverse){
							var eventsContainerObjArr = [];
							var checkFirstLetters = 2;

							if (filterBy == '' || !array.length) {
								return array;
							}
							
							
							// looping over each eventsContainerObj
							_.forEach(array,function(eventsContainerObj){
								var _sortedList;

								_sortedList = $filter('orderBy')(eventsContainerObj.events,function(event){
									if (filterBy=='rank' || filterBy == 'trending') {
										return Number(event[filterBy]);
									}else{
										return String(event[filterBy]).substring(0, checkFirstLetters);
									}
								},reverse);

								// convert the inside object to sorted inside events-object
								eventsContainerObj.events = _sortedList;

								// push each modified object to the new array
								eventsContainerObjArr.push(eventsContainerObj);
							});
							// return the sorted array with contained objects which have sorted events array
							return eventsContainerObjArr;

						}; // filterFunction Ends
	     	}]);


	// extra required code below

/*
	 filter: (list.filterBy=='trending' ? {trending: 1} : {ea_type: list.filterBy} ) | filter: list.searchBy  |
*/





})();


	/*  end of innerListSort.filter.js  */

