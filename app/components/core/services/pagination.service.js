

	/*	start of pagination.service.js  */
	console.log('-- pagination.service.js loaded');

(function(){

	// setup angular service to the module coreModule 

	angular.
	  module('coreModule').
		factory('_Pagination', [function() {
			
			var _paginatedData, _pageCount;

			return {

				paginate: function(data,itemsPerPage,iteration){
					var startItem, endItem;

					if(!_.isArray(data) || !data.length){
						return;
					}

					
					startItem = itemsPerPage * (iteration - 1); // result will include start item
					endItem = itemsPerPage * iteration; // result will exclude end item;

					_paginatedData = data.slice(startItem, endItem);

					return _paginatedData;
				},
				countPages: function(data,itemsPerPage){
					var dataLength, divisibleNumberOfPages, remainderPages;

					if(!_.isArray(data) || !data.length){
						return;
					}

					dataLength = data.length; // storing the total length
					divisibleNumberOfPages = Math.floor(dataLength / itemsPerPage); // getting the number of pages divisible by number of itemsPerPage 
					remainderNumberOfPages = dataLength % itemsPerPage; // getting the remaining items which were not divided completely by itemsPerPage

					_pageCount = remainderNumberOfPages ? (divisibleNumberOfPages + 1) : divisibleNumberOfPages;

					return _pageCount;

				},
				all: function(){
					
					this.paginate();
					this.countPages();

					return {
						paginatedData: _paginatedData,
						pageCount: _pageCount
					}

				}			

				
				
			}; 

		}]);



})();



	/* end of pagination.service.js */


