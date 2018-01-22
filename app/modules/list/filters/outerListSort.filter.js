	

	//	start of outerListSort.module.js
	
	console.log('-- outerListSort.filter.js loaded');


	//code here
(function(){
	'use strict';

	angular
		.module('listModule')
			.filter('outerListSort',['$filter', function($filter){
				
	         	return 	function filterFunction(array, filterBy, reverse){
							var _sortedList;

							/*console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!outerListSort ran');
							console.log($filter);
							console.log(array);
							console.log(filterBy);
							console.log(reverse);*/

							if (filterBy == 'date') {
								_sortedList = $filter('orderBy')(array,function(events){
										return Number(events[filterBy]);
								},reverse);
							}

							// console.log('--------------_sortedList');
							// console.log(_sortedList);

							return _sortedList;
						};
	     	}]);


	// extra required code below

/*
	 filter: (list.filterBy=='trending' ? {trending: 1} : {ea_type: list.filterBy} ) | filter: list.searchBy  |
*/





})();


	/*  end of outerList.filter.js  */

