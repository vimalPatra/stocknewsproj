	

	//	start of eventUpdates.controller.js
console.log('-- eventUpdates.controller.js loaded');
	


	
	
(function(){
	'use strict';
	
	//code here

	angular
	.module('eventUpdatesModule')
	.controller('eventUpdatesCtrl',[eventUpdatesController]);




					// extra required code below



		// evUpCtrl obj
	var evUpCtrl = {
		init: function(ctrl){
			var self = this;
			self.ctrl = ctrl;

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

				// map the methods to the controller
			ctrl.selectDate = self.selectDate;
			ctrl.selectMonthYear = self.selectMonthYear;
			ctrl.populateEvents = self.populateEvents;
		},
		
		selectMonthYear: function(obj){
			var self = this;
			var ctrl = self.ctrl;

			var year = obj.year;
			var month = obj.month;
			alert(year);
			alert(month);
		},
		selectDate: function(date){
			var self = this;
			var ctrl = self.ctrl;
			
			alert(date);

		},
		populateEvents: function(){

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
		}
	};


		// eventUpdatesController func
	function eventUpdatesController(){
		var ctrl = this;
		evUpCtrl.init(ctrl);
		

	}
	
	


})();

	/*  end of eventUpdates.controller.js  */


	



