	

	//	start of poll.controller.js
console.log('-- poll.controller.js loaded');
	

(function(){
	'use strict';
	//code here

	angular
	.module('pollModule')
	.controller('pollCtrl',[pollController]);


					// extra required code below



		// pollCtrl obj
	var pollCtrl = {
		init: function(ctrl){
			var self = this;
			self.ctrl = ctrl;

			// alert('running poll');			
			
		}
		
	};


		// pollController func
	function pollController(){
		var ctrl = this;
		pollCtrl.init(ctrl);

		ctrl.data = {};
		// console.log(ctrl.eventsArray);

		ctrl.data = {
			date: String(1),
			month: 'jan',
			year: String(2017),
			question: 'What is the biggest risk to the stock market rally?',
			options: ['slowing growth in china', 'slowing profit growth', 'rising gas prices','political risk from Washington D.C.'],
			message: 'poll closing soon'
		};


		ctrl.data.getFullDate = function(){
			return this.date + ' / ' + this.month + ' / ' + this.year;
		};
			


	}
	
	

})();

	/*  end of news.controller.js  */

