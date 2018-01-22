	

	//	start of admin.controller.js
console.log('-- admin.controller.js loaded');
	


	//code here
	
(function(){
	"use strict";

	angular
	.module("adminModule")
		.controller('adminCtrl',["$http",'fileUpload',function($http,fileUpload){

			var self = this; 

			 angular.element(document).ready(function () {
        		$('select').material_select();
			});

			 $('#noOfOptionsSelected').on('change',function(){
			 	$('#appendedInputs').html(" ");
			 	var noOfOptionsSelectedVal = $(this).val();
			 	var i;
			 	for(i=1;i<=noOfOptionsSelectedVal;i++)
			 	{
			 		$('#appendedInputs').append(
			 			"<input type='text' id='optionsToSelect"+i+"' ng-model='adc.optionsToSelect"+i+"'><label for='optionsToSelect"+i+"'>Option "+i+"</label>"
			 			);
			 	}
			 });


			var adminAddEventDP = $('#ae_datepicker1');
			var adminEditEventDP = $('#ae_datepicker2');
			var adminAddNewsDP = $('#datepickerNewsAdd');
			var adminEditNewsDP = $('#datepickerNewsEdit');
			var adminAddShoutDP = $('#datepickerShoutAdd');	

				adminAddEventDP.datepicker();
				adminEditEventDP.datepicker();
				adminAddNewsDP.datepicker();
				adminEditNewsDP.datepicker();
				adminAddShoutDP.datepicker();

			
			/* Main Tab management */

			this.tab = 1;	// initial tab show
			
			self.setTab = function(val){ // func that sets the current Tab
				self.tab= val;
				self.postStatus = "Status";
			};


			/* inside Manage Events, Tab management */

			this.tab = 1;	// initial tab show
			
			self.setTabInEvents = function(val){ // func that sets the current Tab
				self.InEventsTab= val;
			};

			

			console.log("outside");
			var dbfilename;

	

			/*************  Events add function ************/

		    self.adminEventForm = function(){

		    var dateobj = adminAddEventDP.datepicker('getDate');
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


				console.log("inside");
				var name = self.ename;
				var title = self.etitle;
				var desc = self.edesc;
				var sources = self.eventSources;
				var date =	ddate;
				var month = dmonth;
				var year = dyear;
				console.log(ddate);
				console.log(dmonth);
				console.log(dyear);
				var ear = self.ear;
				var trending = self.trending;

				var datad = {
					name : name,
					title : title,
					desc : desc,
					sources : sources,
					date : date,
					month : month,
					year : year,
					ear : ear, 
					trending : trending
				};
				
				// posting form data 
				$http({
                method: "POST",
                url: "controller/admin/php/services/adminEventPost.php",
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

			}; // adminEventForm function end


			/*************  News box add function ************/

			self.adminNewsForm = function(){
			
			var dateobj = adminAddNewsDP.datepicker('getDate');
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


				console.log("News controller inside");
				var title = self.newsTitle;
				var desc = self.newsDesc;
				var newsSourceType = self.newssource;
				var date =	ddate;
				var month = dmonth;
				var year = dyear;
				var link = self.newsLink;
		
				var datad = {
					title : title,
					description : desc,
					newsSourceType : newsSourceType,
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

			/*************  Poll box add function ************/

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

			var rows;

			/*************  Events View function ************/

			self.showEventsInView = function(){
				console.log("inside view");

				$http({
                method: "GET",
                url: "controller/admin/php/services/EventsView.php",
                // dataType: 'json',
                // headers: { "Content-Type": "application/json" }
            }).then(function(response){
       			rows = response.data;
       			self.eventRows = rows;
            });
			};

			self.popupShowHide = 0;
			var edit_event_id;
			
			/*************  Events edit function (set the prev values) ************/

			self.editEvents = function(event_id)
			{
				edit_event_id = event_id;
				_.forEach(rows, function(o){ 
					if(o.event_id == event_id){
						self.particularRow = o;
					} 
				});


				var setMonth = self.particularRow.month;
				console.log("?????????????????  ????????????");
				console.log(setMonth);
				console.log("?????????????????  ????????????");

				var setMonthIndexed;

				var monthNames2 = ['jan','feb','march','april','may','jun',
			'jul','aug','sep','oct','nov','dec']; // hardcoded months
				monthNames2.forEach(function(month,i){
					console.log("month in iteration: " + month + " " + i + " setMonth is: " + setMonth);

					if(setMonth == month) {
						setMonthIndexed = i + 1;
						
					}else{
						// console.log('else ' + setMonth + " " + month);
					}
				});
				console.log("!!!!!!!!!!!?  ????????????");
				console.log(setMonthIndexed);
				console.log("?????????????????  ????????????");

				self.uear=self.particularRow.ea_type;
				self.uename=self.particularRow.name;
				self.uetitle = self.particularRow.title;
				self.uedesc=self.particularRow.description;
				self.uedate = setMonth+"/"+self.particularRow.date+"/"+self.particularRow.year;
				self.ueventSources = self.particularRow.sources;

				if(self.particularRow.trending==1){
					console.log("checked");
					self.utrending=true;
				}

				self.uear = 'eve';
				// self.uear = 'ann';
				console.log("==============");
				console.log('ear');
				// self.utrending=self.particularRow.trending;

			self.popupShowHide=1;
		};

			/*************  Events edit function (get the new values) ************/

		self.editEventsSubmit = function()
		{
			console.log("inside edit and save ");
			
			var dateobj = adminEditEventDP.datepicker('getDate');
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

				var title = self.uetitle;
				var desc = self.uedesc;
				var date =	ddate;
				var month = dmonth;
				var year = dyear;
				var ear = self.uear;
				var trending = self.utrending;
				var sources = self.ueventSources;

				
				var datad = {
					event_id : edit_event_id,
					title:title,
					desc : desc,
					sources : sources,
					date : date,
					month : month,
					year : year,
					ear : ear, 
					trending : trending
				};

				
				// posting form data 
				$http({
                method: "POST",
                url: "controller/admin/php/services/adminEventEdit.php",
                // dataType: 'json',
                data: datad,
                // headers: { "Content-Type": "application/json" }
            }).then(function(response){
       			var ar = response.data;
       			if(ar==1)
       			{
       				self.postStatus = "Successfully Modified and Saved !";
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
			};

			/*************  Events delete function ************/

			self.deleteEvents = function(event_id)
			{	
				if(confirm(" Press OK to confirm deletion !")){
					var datad = {
						event_id : event_id,
					};

					
					// posting form data 
					$http({
	                method: "POST",
	                url: "controller/admin/php/services/adminEventDelete.php",
	                // dataType: 'json',
	                data: datad,
	                // headers: { "Content-Type": "application/json" }
	            }).then(function(response){
	       			var ar = response.data;
	       			if(ar==1)
	       			{
	       				self.postStatus = "Successfully Deleted !";
	       				alert("Successfully Deleted !");
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
				}
				else{
					alert("Nothing deleted !");
				}

					
			};

			/*************  News View function ************/

			self.showNewsInView = function()
			{
				console.log("inside news view");

				$http({
                method: "GET",
                url: "controller/admin/php/services/NewsView.php",
                // dataType: 'json',
                // headers: { "Content-Type": "application/json" }
            }).then(function(response){
       			rows = response.data;
       			self.newsRows = rows;
            });
			};

			self.popupShowHide = 0;
			var edit_news_id;
			
			/*************  News edit function (set the prev values) ************/

			self.editNews = function(news_id)
			{
				edit_news_id = news_id;

				_.forEach(rows, function(o){ 
					if(o.news_id == news_id){
						self.particularRow = o;
					} 
				});


				var setMonth = self.particularRow.month;
				console.log("?????????????????  ????????????");
				console.log(setMonth);
				console.log("?????????????????  ????????????");

				var setMonthIndexed;

				var monthNames2 = ['jan','feb','march','april','may','jun',
			'jul','aug','sep','oct','nov','dec']; // hardcoded months
				monthNames2.forEach(function(month,i){
					console.log("month in iteration: " + month + " " + i + " setMonth is: " + setMonth);

					if(setMonth == month) {
						setMonthIndexed = i + 1;
						
					}else{
						// console.log('else ' + setMonth + " " + month);
					}
				});
				console.log("!!!!!!!!!!!?  ????????????");
				console.log(setMonthIndexed);
				console.log("?????????????????  ????????????");

				
				self.eTitle=self.particularRow.title;
				self.eDesc = self.particularRow.description;
				self.enewsLink = self.particularRow.sources;
				self.enewssource=self.particularRow.srctype;
				self.eNewsLink=self.particularRow.sources;
				self.eNewsDate = setMonth+"/"+self.particularRow.date+"/"+self.particularRow.year;

			
			self.popupShowHide=1;
		};

			/*************  News edit function (get the new values) ************/

		self.editNewsSubmit = function()
		{
			console.log("inside news edit and save ");
			
			var dateobj = adminEditNewsDP.datepicker('getDate');
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

				var title = self.eTitle;
				var description = self.eDesc;
				var newsSourceType = self.enewssource;
				var link = self.enewsLink;
				var date =	ddate;
				var month = dmonth;
				var year = dyear;

				
				var datad = {
					news_id : edit_news_id,
					title : title,
					description : description,
					sourceType : newsSourceType,
					link : link,
					date : date,
					month : month,
					year : year,
				};

				
				// posting form data 
				$http({
                method: "POST",
                url: "controller/admin/php/services/adminNewsEdit.php",
                // dataType: 'json',
                data: datad,
                // headers: { "Content-Type": "application/json" }
            }).then(function(response){
       			var ar = response.data;
       			if(ar==1)
       			{
       				self.postStatus = "Successfully Modified and Saved News !";
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
			};

			/*************  News delete function ************/

			self.deleteNews = function(news_id)
			{	
				if(confirm(" Press OK to confirm deletion !")){
					var datad = {
						news_id : news_id,
					};
					
					// posting form data 
					$http({
	                method: "POST",
	                url: "controller/admin/php/services/adminNewsDelete.php",
	                // dataType: 'json',
	                data: datad,
	                // headers: { "Content-Type": "application/json" }
	            }).then(function(response){
	       			var ar = response.data;
	       			if(ar==1)
	       			{
	       				self.postStatus = "Successfully Deleted !";
	       				alert("Successfully Deleted !");
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
				}
				else{
					alert("Nothing deleted !");
				}		
			};

			/*************  Stock View function ************/
			var stockrows;

			self.showStockInView = function()
			{
				console.log("inside stock view");

				$http({
                method: "GET",
                url: "controller/admin/php/services/StocksGet.php",
                // dataType: 'json',
                // headers: { "Content-Type": "application/json" }
            }).then(function(response){
       			stockrows = response.data;
       			console.log(stockrows);
       			self.stockRows = stockrows;

            });
			};


			/*************  Stock edit function (set the prev values) ************/
			var edit_stock_id ;

			self.editStock = function(stock_id)
			{
				edit_stock_id = stock_id;
				
				_.forEach(stockrows, function(o)
				{ 
					if(o.stock_id == stock_id)
					{
						self.particularRow = o;
					} 
				});

				self.eStockName=self.particularRow.name;
				console.log("************* "+self.eStockName+"***********");
				self.popupShowHide=1;
			};

			/*************  Stock edit function (get the new values) ************/

		self.editStockSubmit = function()
		{
			console.log("inside news edit and save ");
			
			
				var name = self.eStockName;
				
				var datad = 
				{
					stock_id : edit_stock_id,
					name : name
				};

				
				// posting form data 
				$http({
                method: "POST",
                url: "controller/admin/php/services/adminStockEdit.php",
                // dataType: 'json',
                data: datad,
                // headers: { "Content-Type": "application/json" }
            }).then(function(response){
       			var ar = response.data;
       			if(ar==1)
       			{
       				self.postStatus = "Successfully Modified and Saved News !";
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


			/*************  Stock delete function ************/

			self.deleteStock = function(stock_id)
			{	
				if(confirm("Deleting Stock will delete Events related to that Stock also. Press OK to confirm deletion !")){
					var datad = {
						stock_id : stock_id
					};
					
					// posting form data 
					$http({
	                method: "POST",
	                url: "controller/admin/php/services/adminStockDelete.php",
	                // dataType: 'json',
	                data: datad,
	                // headers: { "Content-Type": "application/json" }
	            }).then(function(response){
	       			var ar = response.data;
	       			if(ar==1)
	       			{
	       				self.postStatus = "Successfully Deleted !";
	       				alert("Successfully Deleted !");
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
				}
				else{
					alert("Nothing deleted !");
				}		
			};

						/*************  Shout add function ************/

			self.adminShoutForm = function()
			{

			var dateobj = adminAddNewsDP.datepicker('getDate');
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


				console.log("Shout controller inside");
				var title = self.shoutTitle;
				var desc = self.shoutDesc;
				var date =	ddate;
				var month = dmonth;
				var year = dyear;
				var link = self.shoutLink;
		
				var datad = {
					title : title,
					description : desc,
					date : date,
					month : month,
					year : year,
					link : link
				};

				// posting form data 
				$http({
                method: "POST",
                url: "controller/admin/php/services/adminShoutPost.php",
                // dataType: 'json',
                data: datad,
                // headers: { "Content-Type": "application/json" }
            }).then(function(response)
            {
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

			/*************  Thumb Upload function in Stock Manage ************/

			self.uploadFile = function(stock_id)
			{
		 		var file = self.myFile;
		 		var text= stock_id;
		 		console.log("******** stock id : *********");
		 		console.log(text);
		        console.log('file is : ');
		        console.log(file);
		        console.log("********** dir ************");
		        console.dir(file);

		        var uploadUrl = "controller/admin/php/services/thumbUpload.php";
		        fileUpload.uploadFileToUrl(file, uploadUrl, text);
			};


			/*************  Stock add function ************/

			self.AddStockSubmit = function()
			{
				var stockName = self.addStockName;

				var file = self.myAddFile;
				console.log('Add stock file is : ');
		        console.log(file);
		        console.log("Stock name : "+stockName);
				var uploadUrl = "controller/admin/php/services/adminStockPost.php";
				fileUpload.uploadFileToUrl(file, uploadUrl, stockName);
			};

//add functions above this
		}]);
})();

	/*  end of admin.controller.js  */