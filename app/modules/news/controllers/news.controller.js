	

	//	start of news.controller.js
console.log('-- news.controller.js loaded');
	

(function(){
	'use strict';
	//code here

	angular
	.module('newsModule')
	.controller('newsCtrl',[newsController]);


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
	function newsController(){
		var ctrl = this;
		newsCtrl.init(ctrl);

		ctrl.newsArray = [];
		// console.log(ctrl.eventsArray);

		for(var i=0; i < 13; i++){

			if (i % 2) {
				ctrl.newsArray.push({

					date: String(1 + (i * 2)),
					month: 'jan',
					year: 2017,
					links: ['google.com', 'aljazeera.com', 'NBCNews.com','foxnews.com'],
					title: 'Trump attacks Pakistan "deceit" in first tweet of the year',
					desc: 'Trump attacks Pakistan "deceit" in first tweet of the year. Trump attacks Pakistan "deceit" in first tweet of the year .... !!!!!'
				});

			}else if(i % 3){
				ctrl.newsArray.push({

					date: String(1 + (i * 3)),
					month: 'jan',
					year: 2017,
					links: ['google.com', 'aljazeera.com', 'NBCNews.com','foxnews.com'],
					title: 'Iran protests: US brands Tehran\'s accusations \'nonsense\'',
					desc: 'Iran protests: US brands Tehran\'s accusations \'nonsense\', Iran protests: US brands Tehran\'s accusations \'nonsense\' .... !!!!!'
				});

			}else{
				ctrl.newsArray.push({

					date: String(1 + (i * 5)),
					month: 'jan',
					year: 2017,
					links: ['google.com', 'aljazeera.com', 'NBCNews.com','foxnews.com'],
					title: 'There\'s a new hottest cryptocurrency of 2018 so far: stellar',
					desc: 'There\'s a new hottest cryptocurrency of 2018 so far: stellar, There\'s a new hottest cryptocurrency of 2018 so far: stellar .... !!!!!'
				});

			}

			ctrl.newsArray[i].getFullDate = function(){
				return this.date + ' / ' + this.month + ' / ' + this.year;
			};
			


		}

	}
	
	

})();

	/*  end of news.controller.js  */

