	

	//	start of poll.controller.js
console.log('-- poll.controller.js loaded');
	

(function(){
	'use strict';
	//code here

	angular
	.module('pollModule')
	.controller('pollCtrl',['$http',pollController]);


					// extra required code below



		// pollCtrl obj
	var pollCtrl = {
		init: function($http){
			var self = this;
			// making the services available everywhere
			self.$http = $http;

			// setting the defaults

			self.qData = {}; // question data
			self.aData = {}; // answer data

			self.showQA = 'q';

			self.getCurrentPollQuestion();
			self.DOM();

		},
		DOM: function(){
			var self = this;

			/*angular.element(document).ready(function(){
				alert();
			});*/
		},
		getCurrentPollQuestion: function(){
			var self = this;
			var $http = self.$http;


			$http({
	            method: "POST",
	            url: "controller/admin/php/services/PollGet.php",
	  
	        }).then(function(response){

	   			var dataReceived = response.data[0];
	   			var length = dataReceived.options.length;
	   			var deleteIndexes = [];

	   			// console.log('********************response.data from PollGet.php********************');
	   			// console.log(dataReceived);

	   			for (var i = 0; i < length; i++) {
	   				var options = dataReceived.options;
	   				var currentOption = dataReceived.options[i];
	   				if (String(currentOption) == 'null') {
	   					deleteIndexes.push(i);
	   				}
	   				
	   			}

	   			var negate = 0; // use negate as each time an element is removed the length changes and so does the index
	   			_.forEach(deleteIndexes,function(indexToRemove){
	   				// console.log(indexToRemove);
	   				dataReceived.options.splice(indexToRemove - negate, 1);
	   				negate++;
	   			});

	   			self.qData = dataReceived;

	        });// response returned then function

		},
		submitPollAnswer: function(){
			var self = this;
			var $http = self.$http;

			if (self.answer) {

				var pollParams = {};
				pollParams.poll_id = self.qData.pol_id;
				pollParams.answer = self.aData;


				var dataSend = JSON.stringify(pollParams);

				$http({
	                method: "POST",
	                url: "controller/admin/php/services/pollAnswerPost.php",
	                // dataType: 'json',
	                data: dataSend
	            }).then(function(response){
	       			var dataReceived = response.data;
	       			// console.log('============response.data from pollAnswerPost.php');
	       			// console.log(dataReceived);
	       			self.pollAnswerPostStatus = dataReceived;

	            });

			}else{
				alert('select an option please');
			}
		},
		getPollResults: function(){
			var self = this;
			var $http = self.$http;

			self.togglePollView();

			$http({
                method: "POST",
                url: "controller/admin/php/services/pollAnswerResult.php",
             
            }).then(function(response){
       			var dataReceived = response.data[0];
       			console.log('============response.data from pollAnswerResult.php');
       			console.log(dataReceived);

       			self.aData.answers = ['answer number one',
       						  'answer number two',
       						  'answer number three',
       						  'answer number four'];

       			// self.pollAnswerPostStatus = dataReceived;

       			/*_.forEach(deleteIndexes,function(indexToRemove){
	   				// console.log(indexToRemove);
	   				dataReceived.options.splice(indexToRemove - negate, 1);
	   				negate++;
	   			});*/



            });

		},
		togglePollView: function(){
			var self = this;

			if (self.showQA == 'q') {
				self.showQA = 'a';
				
			}else{
				self.showQA = 'q';	
			}



		}

		
	};


		// pollController func
	function pollController($http){
		var self = $.extend(this,pollCtrl);

		self.init($http);

		// console.log(ctrl.eventsArray);
/*
		ctrl.data = {
			date: String(1),
			month: 'jan',
			year: String(2017),
			question: 'What is the biggest risk to the stock market rally?',
			options: ['slowing growth in china', 'slowing profit growth', 'rising gas prices','political risk from Washington D.C.'],
			message: 'poll closing soon'
		};*/

	}
	
	

})();

	/*  end of news.controller.js  */

