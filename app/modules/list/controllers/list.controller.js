	

	//	start of list.controller.js
console.log('-- list.controller.js loaded');
	


	//code here
	
(function(){
	'use strict';
	//code here

	angular
	.module('listModule')
	.controller('listCtrl',[listController]);




					// extra required code below



		// listCtrl obj
	var listCtrl = {
		init: function(ctrl){
			var self = this;
			self.ctrl = ctrl;

			
			
		},
		events: function(){
			var self = this;
			var ctrl = self.ctrl;
		}
	};


		// listController func
	function listController(){
		var ctrl = this;
		listCtrl.init(ctrl);

		ctrl.eventsArray = [];
		console.log(ctrl.eventsArray);

		for(var i=0; i < 13; i++){

			var eventsArrayIndex = i;
			ctrl.eventsArray.push({
				date: 1 + (i * 2),
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

		}

		

	}
	
	

})();

	/*  end of list.controller.js  */

