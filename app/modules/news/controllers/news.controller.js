	

	//	start of news.controller.js
console.log('-- news.controller.js loaded');
	

(function(){
	'use strict';
	//code here

	angular
	.module('newsModule')
	.controller('newsCtrl',['_Pagination',newsController]);


					// extra required code below



		// listCtrl obj
	var newsCtrl = {
		init: function(ctrl){
			var self = this;
			self.ctrl = ctrl;

			// alert('running');			
			
		}
		
	};


		// listController func
	function newsController(_Pagination){
		var ctrl = this;
		newsCtrl.init(ctrl,_Pagination);

		ctrl.pageNumber = 1;
		ctrl.dividePagesBy = 2;

		var responseNewsArray = [];
		// console.log(ctrl.eventsArray);

		for(var i=0; i < 13; i++){

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

		}

		// use as: param 1 = full array, param 2 = items per page, param 3 = page number you want to display
		ctrl.newsArray = _Pagination.paginate(responseNewsArray,ctrl.dividePagesBy,ctrl.pageNumber);
		ctrl.pageCount = _Pagination.countPages(responseNewsArray,ctrl.dividePagesBy);

		// alert(ctrl.pageCount);


	}
	
	

})();

	/*  end of news.controller.js  */

