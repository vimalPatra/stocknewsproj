	

	//	start of calendar.controller.js
console.log('-- calendar.controller.js loaded');
	
(function(){
	"use strict";

		// code here

	
	

	angular
	.module('calendarModule')
		.controller('calendarCtrl',[calendarController]);


					// extra required code below



	var calendarSliders = {
		init: function(setDatesTo){
			var self = this;
			var $body = $('body');

			self.yearIndex = setDatesTo.yearIndex;
			self.monthIndex = setDatesTo.monthIndex;
			self.dateIndex = setDatesTo.dateIndex;
			
				// year swiper
			// year swiper container
			self.$yearSwiperContainer = $body.find('.container--year__selector.swiper-container');	
			// year swiper navigation buttons
			self.$nextYearSlide = $body.find('.next__year.swiper-button-next');
			self.$prevYearSlide = $body.find('.prev__year.swiper-button-prev');

				// month swiper
			// month swiper container
			self.$monthSwiperContainer = $body.find('.container--month__selector.swiper-container');	
			// month swiper navigation buttons
			self.$nextMonthSlide = $body.find('.next__month.swiper-button-next');
			self.$prevMonthSlide = $body.find('.prev__month.swiper-button-prev');
			// month swiper pagination
			self.$monthPagination = $body.find('.swiper-pagination.month__pagination');

				// date swiper
			// month swiper container
			self.$dateSwiperContainer = $body.find('.container--date__selector.swiper-container');	
			// month swiper navigation buttons
			self.$nextDateSlide = $body.find('.next__date.swiper-button-next');
			self.$prevDateSlide = $body.find('.prev__date.swiper-button-prev');
			// month swiper pagination
			self.$datePagination = $body.find('.swiper-pagination.date__pagination');
			
			self.swiperInit(); // init swiper slider
			
		},
		swiperInit: function(){
			var self = this;
			var slideYearTo = self.yearIndex;
			var slideMonthTo = self.monthIndex;
			var slideDateTo = self.dateIndex;


			// init year swiper
			var yearSwiper = new Swiper(self.$yearSwiperContainer, {	  
		    	direction: 'vertical',
				on:{
					init: function(){
						var swiper = this;
						swiper.slideTo(slideYearTo,0); // slide to the current month's slide		
						
					}
				}

		    });

			self.$monthSwiperContainer.each(function(i,monthSwiperContainer){
				var monthSwiper = new Swiper(monthSwiperContainer, {
					spaceBetween: 0,
					slidesPerView: 6,
					freeMode: true,
					navigation: {
						nextEl: self.$nextMonthSlide[i],
						prevEl: self.$prevMonthSlide[i]
					},
					pagination:{
						el: self.$monthPagination[i],
						dynamicBullets: true,
						clickable: true,
				        renderBullet: function (index, className) {
				        	var swiper = this;
					    	return '<div class="' + className + '">'  + (index+1)  + '</div>';
						    			    
					    }
					},
					on: {
						init: function () {
							var swiper = this;
							console.log('month swiper init');
							// params: index, speed, callback
							swiper.slideTo(slideMonthTo,0); // slide to the current month's slide
						}
					}
			    });
			});


			self.$dateSwiperContainer.each(function(i,dateSwiperContainer){
				var dateSwiper = new Swiper(dateSwiperContainer, {
					spaceBetween: 0,
					slidesPerView: 10,
					freeMode: true,
					navigation: {
						nextEl: self.$nextMonthSlide[i],
						prevEl: self.$prevMonthSlide[i]
					},
					pagination:{
						el: self.$monthPagination[i],
						dynamicBullets: true,
						clickable: true,
				        renderBullet: function (index, className) {
				        	var swiper = this;
					    	return '<div class="' + className + '">'  + (index+1)  + '</div>';
						    			    
					    }
					},
					on: {
						init: function () {
							var swiper = this;
							console.log('date swiper init');
							// params: index, speed, callback
							// alert(slideDateTo);
							swiper.slideTo(slideDateTo,0); // slide to the current month's slide
						}
					}
			    });
			});


		}
	}

		// calendar obj
	var calendar = {
		init: function(){
			// hardcode variables
			this.startingYear = 2015;
			this.generateNumberOfYears = 5;
			
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
		getDatesInMonth: function(year, month) {
			var dates = [];

			// get the date objects for the year and month passed 
			// (a date object with each day in the month is returned by the function)
	         var dateObjs = this.getDateObjsInMonth(year, month);
	         dateObjs.forEach(function(element,index){
	         	dates.push(element.getDate()); // populate the dates
	         });

	         return dates;
	    },
	    getDateObjsInMonth: function(year, month){
	    	// Since no month has fewer than 28 days
	         var date = new Date(year, month, 1);
	         var days = [];
	         // console.log('month', month, 'date.getMonth()', date.getMonth());
	         while (date.getMonth() === month) {
	            days.push(new Date(date));
	            date.setDate(date.getDate() + 1);
	         }
	         return days;
	    }
	}

		// calendarCtrl obj
	var calendarCtrl = {
		init: function(ctrl){
			var self = this;
			self.ctrl = ctrl;

			// initialize calendar obj
			calendar.init();
				// declaring/defining properties

			// declaring the vars for years, months and dates
			ctrl.years = [];
			ctrl.months = [];
			// ctrl.dates = [];

			// getting the current year, month and date
			ctrl.defaultDates = calendar.defaultDate();
			ctrl.currentYear = ctrl.defaultDates.year;
			ctrl.currentMonth = ctrl.defaultDates.month;
			ctrl.currentDate = ctrl.defaultDates.date;

			// dates in current month. Use as: pass the year , month to get all the dates in the month
			ctrl.datesInCurrentMonth = calendar.getDatesInMonth(ctrl.currentYear,ctrl.currentMonth);

			// setting the years, months and date
			for (var i = 0 ; i < calendar.generateNumberOfYears; i++) {
				ctrl.years.push(calendar.startingYear + i); // setting the years from the startingYear
			}
			ctrl.months = ['jan','feb','march','april','may','jun',
			'jul','aug','sep','oct','nov','dec']; // hardcoded months
			
			self.initCalendarSliders();
			self.events();
			
		},
		initCalendarSliders: function(){
			var self = this;
			var ctrl = self.ctrl;
			// loop over the years array (which contains all the years)
			ctrl.years.forEach(function(year,i){

				// check when it matches to the current year	
				if (year == ctrl.currentYear) {
					var yearIndex = i;

					// loop over the months array (which contains all the months)
					ctrl.months.forEach(function(month,i){	

						// check when it matches to the current month's index
						if (i == ctrl.currentMonth) {
							var monthIndex = i;

							// loop over the dates in current month' array (which contains all the dates in the current month)
							ctrl.datesInCurrentMonth.forEach(function(date,i){
								var dateIndex = i;
								// check when it matches to the current date	
								if (date == ctrl.currentDate) {
									/*alert(year + ' ' + month + '/' + monthIndex + ' ' + date);*/
									// angular's provided document ready function
									angular.element(document).ready(function(){
										calendarSliders.init({ // init calendarSliders and slide to current year and month with all the current dates and indexes
											year: year,
											yearIndex: yearIndex,
											month: month,
											monthIndex: monthIndex,
											date: date,
											dateIndex: dateIndex
										}); 
									});
								}
							});
						}
					});
					
				}
			});
		},
		events: function(){
			var self = this;
			var ctrl = self.ctrl;
		}
	};


		// calendarControl func
	function calendarController(){
		var ctrl = this;
		calendarCtrl.init(ctrl);

	}
	
	

	





})();

	/*  end of home.controller.js  */

