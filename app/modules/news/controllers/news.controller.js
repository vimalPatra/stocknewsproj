	

	//	start of news.controller.js
console.log('-- news.controller.js loaded');
	

(function(){
	'use strict';
	//code here

	angular
	.module('newsModule')
	.controller('newsCtrl',['_Pagination','$http',newsController]);


					// extra required code below



		// listCtrl obj
	var newsCtrl = {
		init: function($http){
			var self = this;

			// making args avail throughout the object
			self.$http = $http;
			
			// set defaults
			self.pageNumber = 1;
			self.dividePagesBy = 2;
			self.newsArray = [];

			// get the news data
			self.getData();
			
		},
		getData: function(){
			var self = this;
			var $http = self.$http;

			// set the news params object which is wrapped in json to be sent with the POST method
			var newsParams = {};
			newsParams.rowspp = self.dividePagesBy;
			newsParams.pageno = self.pageNumber;


			var dataSend = JSON.stringify(newsParams);
			
			$http({
                method: "POST",
                url: "controller/admin/php/services/newsPagination.php",
                // dataType: 'json',
                data: dataSend,
                // headers: { "Content-Type": "application/json" }
            }).then(function(response){
       			var dataReceived = response.data;
       			// console.log('============response.data from newsPagination.php');
       			// console.log(dataReceived);
       			self.newsArray = dataReceived;

            });
            // /milan

		},
		changeNewsPage: function(number){
			var self = this;
			
			self.pageNumber = number;
			self.getData();

		}

		
	};


		// listController func
	function newsController(_Pagination,$http){
		var self = $.extend(this,newsCtrl);
		self.init($http);

		
		// console.log(self.eventsArray);

		/*for(var i=0; i < 13; i++){

			if (i % 2) {
				responseNewsArray.push({

					date: String(1 + (i * 2)),
					month: 'jan',
					year: 2017,
					links: ['google.com', 'aljazeera.com', 'NBCNews.com','foxnews.com'],
					title: 'Trump attacks Pakistan "deceit" in first tweet of the year',
					desc: 'Trump attacks Pakistan "deceit" in first tweet of the year. Trump attacks Pakistan "deceit" in first tweet of the year .... !!!!!'
				});

			}else if(i % 3){
				responseNewsArray.push({

					date: String(1 + (i * 3)),
					month: 'jan',
					year: 2017,
					links: ['google.com', 'aljazeera.com', 'NBCNews.com','foxnews.com'],
					title: 'Iran protests: US brands Tehran\'s accusations \'nonsense\'',
					desc: 'Iran protests: US brands Tehran\'s accusations \'nonsense\', Iran protests: US brands Tehran\'s accusations \'nonsense\' .... !!!!!'
				});

			}else{
				responseNewsArray.push({

					date: String(1 + (i * 5)),
					month: 'jan',
					year: 2017,
					links: ['google.com', 'aljazeera.com', 'NBCNews.com','foxnews.com'],
					title: 'There\'s a new hottest cryptocurrency of 2018 so far: stellar',
					desc: 'There\'s a new hottest cryptocurrency of 2018 so far: stellar, There\'s a new hottest cryptocurrency of 2018 so far: stellar .... !!!!!'
				});

			}

			responseNewsArray[i].getFullDate = function(){
				return this.date + ' / ' + this.month + ' / ' + this.year;
			};

		}*/


		// use as: param 1 = full array, param 2 = items per page, param 3 = page number you want to display
		// ctrl.newsArray = _Pagination.paginate(responseNewsArray,ctrl.dividePagesBy,ctrl.pageNumber);
		// ctrl.pageCount = _Pagination.countPages(responseNewsArray,ctrl.dividePagesBy);

		// alert(ctrl.pageCount);


	}
	
	

})();

	/*  end of news.controller.js  */

