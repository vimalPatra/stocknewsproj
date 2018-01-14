	

	//	start of outerList.module.js
	
	console.log('-- outerList.filter.js loaded');


	//code here
(function(){
	'use strict';

	angular
		.module('listModule')
			.filter('outerListFilter', function(){
	         	return filterFunction;
	     	});


	// extra required code below

/*
	 filter: (list.filterBy=='trending' ? {trending: 1} : {ea_type: list.filterBy} ) | filter: list.searchBy  |
*/

	function filterFunction(datewiseEvents, filterBy, searchBy){

			console.log('!!!!!!!!!!!!!!!!!!!!!!!!!! outerListFilter ran');
			console.log('datewiseEvents');
			console.log(datewiseEvents);
			console.log('filterBy');
			console.log(filterBy);
			console.log('searchBy');
			console.log(searchBy);

			

			if (!datewiseEvents.length) {return [];}

			var _processed = []; // exposed collection		
			
			// apply filters on the provided array first  OR pass the orginal array to search

			if (filterBy == '' || !filterBy) {
				// console.log('no filterBy provided or there are no elements in the matched search');
				// console.log('-----------------------------END');
				_processed = datewiseEvents; // return the array if there is no items in the array or IOW there is no filter applied

			}else if (filterBy == 'trending'){

				_processed = filterThroughEvents(datewiseEvents,function(event){
					if (event.trending == 1) {
						return true;
					}else{
						// console.log('no trending event found');
					}
				}); // array to store the outer object

			}else{

				_processed = filterThroughEvents(datewiseEvents,function(event){
					if (event.ea_type == filterBy) {
						return true;
					}else{
						// console.log('no type found');
					}
				}); // array to store the outer object
	
			}

			/* =search */
			// search the processed list at the end

			var searched = [];
			var searchApplied = false;

			if (searchBy || $.trim(searchBy) != '') {
				searchApplied = true;

				var newProcessedData = filterThroughEvents(_processed,function(event){
					var regEx = new RegExp(searchBy,'gi');
					if( ( String(event.name).search(regEx) !=-1 ) || (String(event.description).search(regEx) !=-1) ){
						return true;
					}
				}); // array to store the outer object

				searched = newProcessedData;
			}


			//  if search is applied then change the processed array to the searched list
			if (searchApplied) {
				_processed = searched;
			}
			

			function filterThroughEvents(arr,func){
				var datewiseEvents = arr;
				var newDatewiseEvents = []; // array to store the outer object

				_.forEach(datewiseEvents, function(datewiseSingle) {
					var datewiseSingle = $.extend({},datewiseSingle);
					var eventsInside = datewiseSingle.events;
					
					var newInsideEvents = []; // array to store matched events

					_.forEach(eventsInside, function(event) {
						if( func(event) ){
							newInsideEvents.push(event);
						}
					});

					if (newInsideEvents.length) {
						// console.log('new events filtered length is pos+');
						// console.log(newInsideEvents);
						datewiseSingle.events = newInsideEvents;
						newDatewiseEvents.push(datewiseSingle);
					}
					// console.log('-----------new search iteration for each event-------------');
				});

				return newDatewiseEvents;
			}

			console.log('from outerListFilter: _processed');
			console.log(_processed);

           // console.log('_processed is returned if there some filter has been applied');
           /*console.log(_processed);*/ 
           // console.log('-----------------------------END');
           return _processed; // return the filtered array if not returned until now


	}



})();


	/*  end of outerList.filter.js  */

