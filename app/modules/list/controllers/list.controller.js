	

	//	start of list.controller.js
console.log('-- list.controller.js loaded');
	


	//code here
	
(function(){
	'use strict';
	//code here

	angular
	.module('listModule')
	.controller('listCtrl',['$scope','$filter','_Pagination',listController]);




					// extra required code below



		// listCtrl obj
	var listCtrl = {
		init: function($scope,$filter,_Pagination){
			var self = this;
			
			self.$scope = $scope;
			self.$filter = $filter;
			self._Pagination = _Pagination;

			console.log('self.$filter');
			console.log(self.$filter);
			console.log(this);

			// setting defaults
			self.eventsData = {};
			self.datewiseEvents = [];
			self.rankStart = 1;
			self.showPagesMax = 4;
			self.rankEnd = 200;
			self.filterBy = '';
			self.eventsPerPage = 3;
			self.outerSortBy = 'date';
			self.outerSortByReverse = false;
			self.innerSortBy = '';
			self.innerSortByReverse = false;

			// events data received by ceCtrl.dataReceived on calendar selection
			self.eventsData = $scope.$parent.ceCtrl.dataReceived;
			
		
			// watch the dataReceived prop on the ceCtrl controller
			$scope.$watch(function(scope){ return scope.$parent.ceCtrl.dataReceived; }, self.onDataReceived.bind(self),true);
			
			// manipulate dom
			angular.element(document).ready(function(){
				self.DOM();
			});
			
		},
		DOM: function(){
			var self = this;

			if (!window.$body) {
				window.$body = $('#body');
			}
			var filterSortSelects = $body.find('.filter__sort__selects');

			filterSortSelects.material_select();

			// range slider from materialize
			self.rankSlider();
		},
		rankSlider: function(){
			var self = this;
			var $scope = self.$scope;

			var slider = document.getElementById('ceListRankRange');
			  noUiSlider.create(slider, {
			   start: [1, 200],
			   connect: true,
			   step: 1,
			   orientation: 'horizontal', // 'horizontal' or 'vertical'
			   range: {
			     'min': 0,
			     'max': 200
			   },
			   format: wNumb({
			     decimals: 0
			   })
			  });

			slider.noUiSlider.on('change', function(){
				var values = slider.noUiSlider.get();

				self.rankStart = values[0];
				self.rankEnd = values[1];

				$scope.$apply();
			});			   
		},
		onDataReceived: function(newData,oldData){
			var self = this;
			var $scope = self.$scope;
	
			self.lengthsOfRenderedEvents = [];
			self.renderedEvents = [];

			self.eventsData = newData;

			// list events to be collected separately for each date
			self.datewiseEvents = [];
			// ctrl.allDatewiseEvents = [];
			
			var numberOfEvents = 0;

			console.log('newData');
			console.log(newData);


			_.forEach(newData, function(yearObj, yearKey) {
				_.forEach(yearObj, function(monthObj, monthKey) {
					_.forEach(monthObj, function(dateObj, dateKey) {
						// console.log('dateObj');
						// console.log(dateObj);
						if (dateObj.events.length) {
							// self.allDatewiseEvents.push(dateObj);
							self.datewiseEvents.push($.extend({},dateObj));
							numberOfEvents += dateObj.events.length;
						}

						return;
						
					});
				});
			});

			// console.log('ctrl.datewiseEvents');
			// console.log(ctrl.datewiseEvents);

			// console.log('$scope');
			// console.log($scope);

			self.totalEventsCount = numberOfEvents;

			if (self.totalEventsCount) {
				self.manageData();
			}

		},
		manageData: function(){
			var self = this;
			var datewiseEvents = self.datewiseEvents;

			self.datewiseArrangedEvents = self.manageOuterList(datewiseEvents);
			// returning a list which is sorted from the inside after 
			// being filtered & sorted from the outside by the above line
			self.datewiseArrangedEvents = self.manageInnerList();

			

			if (self.datewiseArrangedEvents.length) {
				self.paginateEventsInit();
			}
			// console.log('==============----------------self.datewiseArrangedEvents');
			// console.log(self.datewiseArrangedEvents);

		},
		manageOuterList: function(datewiseEvents){
			var self = this;
			var $filter = self.$filter;

			var filteredList, sortedList, _sendList;

			// filter and search the outer datewise collection of events 
			filteredList = $filter('outerListFilter')(datewiseEvents,self.filterBy,self.searchBy);
			// sort the filtered + searched list
			sortedList = $filter('outerListSort')(filteredList,self.outerSortBy,self.outerSortByReverse);

			console.log('-----------------_sendList');
			console.log(sortedList);

			_sendList = sortedList;
			return _sendList;

		},
		manageInnerList: function(){
			var self = this;
			var $filter = self.$filter;

			var innerSortedList, _sendList; // store the inner list sorted accordingly

			// sort the input list (datewiseArrangedEvents)
			innerSortedList = $filter('innerListSort')(self.datewiseArrangedEvents,
													  self.innerSortBy,
													  self.innerSortByReverse);

			console.log('-----------------_sendList');
			console.log(innerSortedList);

			_sendList = innerSortedList;
			return _sendList;
		},
		setInnerListSort: function(sortBy){
			var self = this;

			if (self.innerSortBy == sortBy ) {
				self.innerSortByReverse = !self.innerSortByReverse;	
			}else{
				self.innerSortBy = sortBy;
				self.innerSortByReverse = false;
			}
			
			// run manageInnerList again to sort them
			self.datewiseArrangedEvents = self.manageInnerList();
			// then run paginate again to populate paged data
			if (self.datewiseArrangedEvents.length) {
				self.paginateEventsInit();
			}

		},
		paginateEventsInit: function(){
			var self = this;
			
			console.log('from paginateEventsInit');
			
			if (!self.datewiseArrangedEvents.length) {return;}

			 _.forEach(self.datewiseArrangedEvents,function(singleDatewiseEvent){
			 	singleDatewiseEvent.activePage = 1; // reset the active page every time on filter
			 	self.populatePagedData(singleDatewiseEvent);
			 });
		 
		},
		populatePagedData: function(singleDatewiseEvent){
			var self = this;
			var _Pagination = self._Pagination;

			console.log('=passed activepage');
			console.log(singleDatewiseEvent.activePage);
		 	// if activePage is not set then set it to 1
		 	if (!singleDatewiseEvent.activePage) {
		 		singleDatewiseEvent.activePage = 1;
		 	}
		 	
		 	singleDatewiseEvent.pagedEvents = 
		 		_Pagination.paginate(singleDatewiseEvent.events,self.eventsPerPage,singleDatewiseEvent.activePage);
		 	singleDatewiseEvent.pageCount = 
		 		_Pagination.countPages(singleDatewiseEvent.events,self.eventsPerPage);

		 	

		},
		createPagination: function(total, active){
			var self = this;

			var ret = [];
			var start, total, end, checkStart, checkEnd;
			
			/* total is the total number of pages received from 
			the model of the events array at that iteration */
			
	        start = 0; // making the starting number equal to 0 in case end is passed and start is passed
			end = total; // making the ending number equal to total in case end is passed and start is passed
			
			// if total number of pages are more than the maximum allowed then calculate which page numbers to show
			if (total > self.showPagesMax) {
				checkStart = (active - Math.abs(Math.floor(self.showPagesMax/2)-1)) - 1;
				checkEnd = active + Math.ceil(self.showPagesMax/2);

				start  = checkStart < 0 ? 0 : checkStart;
				end = checkEnd > total ? total : checkEnd;
			}

	        for (var i = start; i < end; i++) {
	            ret.push(i);
	        }

	        return ret;
		},

		setActivePage: function(dateEvents, clickedNumber,$event){
			var e = $event;
			var self = this;
			e.preventDefault();

			// set the active page to the clicked page number
			dateEvents.activePage = clickedNumber;

			// change the pagedDate inside the dateEvents object
			self.populatePagedData(dateEvents);
			
		},
		toggleOuterSortByReverse: function(){
			var self = this; 
			
			if (!self.outerSortByReverse) {
				self.outerSortByReverse = true;
			}else{
				self.outerSortByReverse = false;
			}

			// alert(ctrl.outerSortByReverse);

		},
		
		tryOut:function($index){
			// alert($index);
		}
	};


		// listController func
	function listController($scope,$filter,_Pagination){
		var self = $.extend(this,listCtrl);
	
		self.init($scope,$filter,_Pagination);


		


		/*for(var i=0; i < 13; i++){

			var eventsArrayIndex = i;
			ctrl.eventsArray.push({
				date: String(1 + (i * 2)) + ' / jun / 2017',
				month: 'jan',
				year: 2017,
				list: []
			});
			

			for(var j=0; j < 10; j++){
				if (j % 2) {
					ctrl.eventsArray[eventsArrayIndex].list.push({
						rank: 1,
						stock: 'vodafone',
						eventTitle: 'launching zoooo',
						trending: false
					});
				}else{
					ctrl.eventsArray[eventsArrayIndex].list.push({
						rank: 12,
						stock: 'airtel',
						eventTitle: 'launching rocket',
						trending: true
					});
				}
				
			}

		}*/

	}
	
	

})();

	/*  end of list.controller.js  */

