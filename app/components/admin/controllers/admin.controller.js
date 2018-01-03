	

	//	start of admin.controller.js
console.log('-- admin.controller.js loaded');
	


	//code here
	
(function(){
	"use strict";

	angular
	.module("adminModule")
		.controller('adminCtrl',["$http",function($http){

			var self = this; 

			 // $(document).ready(function() {
    			
  		// 	});
			 angular.element(document).ready(function () {
        		$('select').material_select();
			});

			 $('#noOfOptionsSelected').on('change',function(){
			 	$('#appendedInputs').html(" ");
			 	var noOfOptionsSelectedVal = $(this).val();
			 	var i;
			 	for(i=1;i<=noOfOptionsSelectedVal;i++){
			 		$('#appendedInputs').append(
			 			"<input type='text' id='optionsToSelect"+i+"' ng-model='adc.optionsToSelect"+i+"'><label for='optionsToSelect"+i+"'>Option "+i+"</label>"
			 			);
			 	}
			 });

			$('.ae_datepicker').datepicker();
			var dateobj = $('.ae_datepicker').datepicker('getDate');
			var ddate = dateobj.getDate();
			var dmonth = dateobj.getMonth();
			var dyear = dateobj.getFullYear();
			
			 
			var monthNames = ['jan','feb','march','april','may','jun',
			'jul','aug','sep','oct','nov','dec']; // hardcoded months
				monthNames.forEach(function(month,i){	
					if(dmonth == i) {
						dmonth = month;
					}
				});

			dmonth = dmonth;

			console.log(ddate);
			console.log(dmonth);
			console.log(dyear);

			
			this.tab = 1;	// initial tab show
			
			self.setTab = function(val){ // func that sets the current Tab
				self.tab= val;
			};
			console.log("outside");
			var dbfilename;

	/* Thumbnail uploading here */

	/* Form Event data posting... */
		    self.adminEventForm = function(){

				console.log("inside");
				var name = self.ename;
				var desc = self.edesc;
				var date =	ddate;
				var month = dmonth;
				var year = dyear;
				// var rank = self.rank;
				// var thumb = dbfilename;
				var ear = self.ear;
				var trending = self.trending;

				var datad = {
					name : name,
					desc : desc,
					date : date,
					month : month,
					year : year,
					// rank : rank,
					// thumb : thumb,
					ear : ear, 
					trending : trending
				};
				
				// posting form data 
				$http({
                method: "POST",
                url: "controller/admin/php/services/adminFormPost.php",
                // dataType: 'json',
                data: datad,
                // headers: { "Content-Type": "application/json" }
            }).then(function(response){
       			var ar = response.data;
       			if(ar==1)
       			{
       				self.postStatus = "Success !";
       				console.log("ar");
            		console.log(ar);
       			}
       			else
       			{
       				self.postStatus = ar;
       				console.log("ar");
       				console.log(ar);
       			}
            });

				console.log(date+" .. "+month+" .. "+year+" .. "+" .. " + name+" .. " + ear+" .. " + trending);


				// checking thumb exists or not for stock
				$http({
                method: "POST",
                url: "controller/admin/php/services/adminFormPost.php",
                // dataType: 'json',
                data: datad,
                // headers: { "Content-Type": "application/json" }
            }).then(function(response){
       			var ar = response.data;
       			if(ar==1)
       			{
       				self.postStatus = "Success !";
       				console.log("ar");
            		console.log(ar);
       			}
       			else
       			{
       				self.postStatus = ar;
       				console.log("ar");
       				console.log(ar);
       			}
            });
            
			}; // adminEventForm function end


			/*************  News box add function ************/

			self.adminNewsForm = function(){
				console.log("News controller inside");
				var name = self.newsName;
				var date =	ddate;
				var month = dmonth;
				var year = dyear;
				// var rank = self.rank;
				// var thumb = dbfilename;
				var link = self.newsLink;
		
				var datad = {
					name : name,
					date : date,
					month : month,
					year : year,
					link : link
				};

				// posting form data 
				$http({
                method: "POST",
                url: "controller/admin/php/services/adminNewsPost.php",
                // dataType: 'json',
                data: datad,
                // headers: { "Content-Type": "application/json" }
            }).then(function(response){
       			var ar = response.data;
       			if(ar==1)
       			{
       				self.postStatus = "Success !";
       				console.log("ar");
            		console.log(ar);
       			}
       			else
       			{
       				self.postStatus = ar;
       				console.log("ar");
       				console.log(ar);
       			}
            });
			};

			self.adminPollForm = function(){
				console.log("********** inside poll **********");

				var question = self.question;
				var noOfOptionsSelected = self.noOfOptionsSelected;
				var option1 = $('#optionsToSelect1').val();
				var option2 = $('#optionsToSelect2').val();
				var option3 = $('#optionsToSelect3').val();
				var option4 = $('#optionsToSelect4').val();
				var option5 = $('#optionsToSelect5').val();
				var option6 = $('#optionsToSelect6').val();
				var option7 = $('#optionsToSelect7').val();
				var option8 = $('#optionsToSelect8').val();
				console.log(question);
				console.log(noOfOptionsSelected);
				console.log(option1);
				console.log(option2);
				console.log(option3);
				console.log(option4);
				console.log(option5);
				console.log(option6);
				console.log(option7);
				console.log(option8);

					var datad = {
					question : question,
					noOfOptionsSelected : noOfOptionsSelected,
					option1 : option1,
					option2 : option2,
					option3 : option3,
					option4 : option4,
					option5 : option5,
					option6 : option6,
					option7 : option7,
					option8 : option8
				};

				// posting form data 
				$http({
                method: "POST",
                url: "controller/admin/php/services/adminPollPost.php",
                // dataType: 'json',
                data: datad,
                // headers: { "Content-Type": "application/json" }
            }).then(function(response){
       			var ar = response.data;
       			console.log(ar);
       			if(ar==1)
       			{
       				self.postStatus = "Success !";
       				console.log("ar");
            		console.log(ar);
       			}
       			else
       			{
       				self.postStatus = ar;
       				console.log("ar");
       				console.log(ar);
       			}
            });

			};

		}]);
})();

	/*  end of admin.controller.js  */