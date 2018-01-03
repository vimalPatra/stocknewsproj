	

	//	start of calendarEventsList.controller.js
console.log('-- calendarEventsList.controller.js loaded');
	


	
	
(function(){
	'use strict';
	
	//code here

	angular
	.module('calendarEventsListModule')
	.controller('calendarEventsListCtrl',['$scope','_DateSelection',calendarEventsListController]);




					// extra required code below


		// evUpCtrl obj
	var ceCtrl = {

		init: function(ctrl,$scope,_DateSelection){
			var self = this;
			self.ctrl = ctrl;
			self.$scope = $scope;
			self._DateSelection = _DateSelection;

				// set all the object props

			// getting the current year, month and date
			self.defaultDates = self.defaultDate();
			self.currentYear = self.defaultDates.year;
			self.currentMonth = self.defaultDates.month;
			self.currentDate = self.defaultDates.date;

			self.months = ['jan','feb','march','april','may','jun',
			'jul','aug','sep','oct','nov','dec']; // hardcoded months
			
				// trigger all methods needed to run before controller methods
			self.events();

			var o = self.options;


					// setting options object which we pass to sliderOptions inside the calendarCtrl controller

			//  stating the first decisives (primary)
			o.allMonthsSelected = false;
			o.defaultMonthSelected = !o.allMonthsSelected; // current month is selected by default
			o.noMonthSelected = (o.allMonthsSelected || o.defaultMonthSelected) ? false : true;


				// map the props / methods to the controller
			ctrl.options = o;
			// ctrl.selectDate = self.selectDate;
			// ctrl.selectMonthYear = self.selectMonthYear;
			// ctrl.populateEvents = self.populateEvents;


			self.getCalendarSelection();
			
		},
		options: {

		},
		
		selectMonthYear: function(obj){
			var self = this;
			var ctrl = self.ctrl;

			var year = obj.year;
			var month = obj.month;

			alert(""+year+" "+ month);
			
		},
		selectDate: function(){
			var self = this;
			var ctrl = self.ctrl;
			
			alert('date');

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
		events: function(){
			var self = this;
			var ctrl = self.ctrl;
		},

		populateEvents: function(){

		},
		getCalendarSelection: function(){
			var self = this;
			var ctrl = self.ctrl;
			var $scope = self.$scope;
			var _DateSelection = self._DateSelection;

			
			// console.log('_DateSelection.get() manually');
			ctrl.selectedYears = _DateSelection.get().years;
			ctrl.selectedMonths = _DateSelection.get().months;
			ctrl.selectedDates = _DateSelection.get().years;

			getDataOnUpdate();

			function getDataOnUpdate(){

				$scope.$watch(function () {

					return _DateSelection.get(); 

				}, function (newValue, oldValue) {
					// alert();
			        if (newValue != null) {
			        	ctrl.selectedYears = newValue.years;
						ctrl.selectedMonths = newValue.months;
						ctrl.selectedDates = newValue.dates;
			            //update Controller2's xxx value
			           	
			        }

			    }, true);

			}

			


		}
	};


		// eventUpdatesController func
	function calendarEventsListController($scope,_DateSelection){
		var ctrl = this;

		ceCtrl.init(ctrl,$scope,_DateSelection);

	}
	
	


})();

	/*  end of calendarEventsList.controller.js  */


	



