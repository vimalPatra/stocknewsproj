	

	//	start of calendarEventsList.controller.js
console.log('-- calendarEventsList.controller.js loaded');
	


	
	
(function(){
	'use strict';
	
	//code here

	angular
	.module('calendarEventsListModule')
	.controller('calendarEventsListCtrl',['$scope','_DateSelection','$http',calendarEventsListController]);




					// extra required code below


		// evUpCtrl obj
	var ceCtrl = {

		init: function($scope,_DateSelection,$http){
			var self = this;
			self.$scope = $scope;
			self.$http = $http;
			self._DateSelection = _DateSelection;

				// set all the object props

			// getting the current year, month and date
			self.defaultDates = self.defaultDate();
			self.currentYear = self.defaultDates.year;
			self.currentMonth = self.defaultDates.month;
			self.currentDate = self.defaultDates.date;


			self.allSelectedDates = {
				year: [],
				month: [],
				date: []
			};
			
			// setting the dataReceived as empty
			self.dataReceived = {};

					// setting options object which we pass to sliderOptions inside the calendarCtrl controller
			
			var o = self.options;
			//  stating the first decisives (primary)
			o.allMonthsSelected = false;
			o.allDatesSelected = true;
			o.defaultMonthSelected = !o.allMonthsSelected; // current month is selected by default
			o.noMonthSelected = (o.allMonthsSelected || o.defaultMonthSelected) ? false : true;

			// get data preferences
			o.getDataDateWise = false;
			o.getDataMonthWise = true;
			o.getDataYearWise = true;


			angular.element(document).ready(function(){
				self.DOM();
			});

			self.prevSelectedDatesToBeSent = self.getCalendarSelection();

			
			console.log('prevSelectedDatesToBeSent');
			console.log(self.prevSelectedDatesToBeSent);

			// console.log(' ----- initial selected dates');
			// console.log(selectedDatesToBeSent);

			if (self.prevSelectedDatesToBeSent.year.length) {
				if (o.allMonthsSelected) {
					// self.getData();
				}else if (self.prevSelectedDatesToBeSent.month.length) {
					if (o.defaultMonthSelected) {
						// self.getData();
					}
				}

			}
			
			
			self.updateSelectionAndGetData();

			
		},
		DOM:function(){
			var self = this;

			if (!window.$body) {
				window.$body = $('#body');
			}
			
			var openCalendarSelectionsBtn = $body.find('.openCalendarSelectionsBtn');
			

			openCalendarSelectionsBtn.dropdown({
				  inDuration: 300,
				  outDuration: 225,
				  constrainWidth: true, // Does not change width of dropdown to that of the activator
				  hover: true, // Activate on hover
				  gutter: 0, // Spacing from edge
				  belowOrigin: false, // Displays dropdown below the button
				  alignment: 'left', // Displays dropdown with edge aligned to the left of button
				  stopPropagation: false // Stops event propagation
				}
			);
		
		},
		options: {

		},
		defaultDate: function(){
			var self = this;
			var date = new Date();
			this.currentYear = date.getFullYear();
			this.currentDate = date.getDate();
			this.currentMonth = date.getMonth();
			return {
				year : self.currentYear,
				month : self.currentMonth,
				date : self.currentDate
			}
		},
		
		getCalendarSelection: function(){
			var self = this;
			var $scope = self.$scope;
			var _DateSelection = self._DateSelection;

	
			// console.log('_DateSelection.get() manually');
			self.selectedYears = _DateSelection.get().years;
			self.selectedMonths = self.getAlphaMonths(_DateSelection.get().months);
			self.selectedDates = _DateSelection.get().dates;

			return self.allSelectedDates = {
				year: self.selectedYears,
				month: self.selectedMonths,
				date: self.selectedDates
			}

		},
		getData: function(){
			var self = this;
			var $scope = self.$scope;
			var $http = self.$http;
	
			var dataSend = JSON.stringify(self.allSelectedDates);
			
			// console.log(')(*&^&*()(*&^%&*()*&^%&*()*&^(*)&^^(&^%^&*(');
			// console.log(self.allSelectedDates);
			// console.log('___');

			// console.log('self.allSelectedDates=====================');
			// console.log(self.allSelectedDates);
			// console.log('dataSend');
			// console.log(dataSend);

			// posting form data 
			$http({
                method: "POST",
                url: "controller/admin/php/services/EventsGet.php",
                // dataType: 'json',
                data: dataSend
                // headers: { "Content-Type": "application/json" }
            }).then(function(response){
       			var dataReceived = response.data;
       			console.log('=====  response data from getData() in ceCtrl ');
       			console.log(dataReceived);
       			self.dataReceived = dataReceived;
       			
            });
            // /milan

		},
		updateSelectionAndGetData: function(){
			var self = this;
			var $scope = self.$scope;
			var o = self.options;

			var debounceTime = 300;
			var maxWait = 2000;


			$(window).on('dateSelected', _.debounce(update,debounceTime,{'maxWait': maxWait }));

		    function update(){
		    	$scope.$apply(function(){

        			var selectedDatesToBeSent = self.getCalendarSelection();
        			// console.log('calendar selections after update');
        			// console.log(selectedDatesToBeSent);
	        		
	        		if (selectedDatesToBeSent.year.length) {
						/*if (o.allMonthsSelected) {
							self.getData();
						}else if (selectedDatesToBeSent.month.length) {
							self.getData();
						}*/
						console.log('previous');
						console.log(self.prevSelectedDatesToBeSent);


						if (o.getDataDateWise) {
							if(selectedDatesToBeSent.date.length){
								// console.log(selectedDatesToBeSent.date);
								console.log('new');
								console.log(selectedDatesToBeSent);
								self.getData();
							}
						}else if(o.getDataMonthWise){
							
							if(selectedDatesToBeSent.date.length && 
							   !_.isEqual(self.prevSelectedDatesToBeSent.month, selectedDatesToBeSent.month)){
								
								self.allSelectedDates.date = [];
							console.log('new');
								console.log(selectedDatesToBeSent);
								self.getData();
							}

						}else if(o.getDataYearWise){
							if(!_.isEqual(self.prevSelectedDatesToBeSent.year, selectedDatesToBeSent.year)){
								
								self.allSelectedDates.date = [];
								self.allSelectedDates.month = [];
								console.log('new');
								console.log(selectedDatesToBeSent);
								self.getData();
							}
						}

						// getDataDateWise

						self.prevSelectedDatesToBeSent.date = selectedDatesToBeSent.date.slice(0);
						self.prevSelectedDatesToBeSent.month = selectedDatesToBeSent.month.slice(0);
						self.prevSelectedDatesToBeSent.year = selectedDatesToBeSent.year.slice(0);

					}
				});
		    } // end of `update` function

		},
		getAlphaMonths: function(monthsArr){
			var _alphaMonthsArr = [];

			var _hardcodedMonths = ['jan','feb','mar',
								   'apr','may','jun',
								   'jul','aug','sep',
								   'oct','nov','dec']; // hardcoded months

			if (monthsArr && monthsArr.length) {
	            _.forEach(monthsArr,function(element,i){
	            	var indexedMonth = element;
	            	_.forEach(_hardcodedMonths,function(element,i){
	            		var alphaMonth = element;
		            	if (indexedMonth == i) {
		            		_alphaMonthsArr.push(alphaMonth);
		            	}
					}); // second loop over the hardcoded alphaMonths
				});// first loop over the monthsArr provided 

			}

	        return _alphaMonthsArr;



		}
	};


		// eventUpdatesController func
	function calendarEventsListController($scope,_DateSelection,$http){
		var self = $.extend(this,ceCtrl);

		self.init($scope,_DateSelection,$http);

	}
	
	


})();

	/*  end of calendarEventsList.controller.js  */


	



