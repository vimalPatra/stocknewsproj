	

	//	start of calendar.controller.js
console.log('-- calendar.controller.js loaded');
	
(function(){
	"use strict";

		// code here

	angular
	.module('calendarModule')
		.controller('calendarCtrl',['$scope','_DateSelection',calendarController]);


					// extra required code below


		// calendarSliders obj
	var calendarSliders = {
		init: function(object){
			var self = this;

			self.$scope = object.$scope;
			self.object = object;

			self.yearIndex = object.yearIndex;
			self.monthIndex = object.monthIndex;

			
			self.defaultActiveMonthIndex  = object.monthIndex;
			self.defaultActiveDateIndex  = object.controller.currentDate-1;
			
			var s = self;
			s.$body = $('body');

				// year swiper
			// year swiper container
			self.$yearSwiperContainer = s.$body.find('.container--year__selector.swiper-container');	
			
			// year swiper navigation buttons
			self.$nextYearSlide = s.$body.find('.next__year.swiper-button-next');
			self.$prevYearSlide = s.$body.find('.prev__year.swiper-button-prev');

				// month swiper
			// month swiper container
			self.$monthSwiperContainer = s.$body.find('.container--month__selector.swiper-container');	
			// month swiper navigation buttons
			self.$nextMonthSlide = s.$body.find('.next__month.swiper-button-next');
			self.$prevMonthSlide = s.$body.find('.prev__month.swiper-button-prev');
			// month swiper pagination
			self.$monthPagination = s.$body.find('.swiper-pagination.month__pagination');

				
			
			self.swiperInit(); // init swiper slider

			self.$scope.$apply(function(){
				self.sliderInfo(); // call slider info	
			});

		},
		sliderOptions: {

		},
		swiperInit: function(){
			var self = this;
			var obj = self.object;
			var ctrl = obj.controller;
			var scopeOptions = self.$scope.ceCtrl.options;

			var o = self.sliderOptions;

					/* setting sliderOptions object */
			
			//  stating the primary decisives (inherited from the outer controller scope of ceCtrl)
			o.allMonthsSelected = scopeOptions.allMonthsSelected;
			o.defaultMonthSelected = scopeOptions.defaultMonthSelected; // current month is selected by default
			o.noMonthSelected = scopeOptions.noMonthSelected;
			o.allDatesSelected = scopeOptions.allDatesSelected;
			
			// settings for  rendering dates for a month selcted
			
			o.defaultDateSelected = !o.allDatesSelected;

			// other preferences (for admin)
			o.highlightDefaultDate = true;
			o.highlightDefaultMonth = true;
			o.toggleMonth = true;
			o.toggleDate = true;

			// dev preferences 
			o.defaultClasses = "default";
			o.selectedClasses = "selected";

			// variable preferences 
			o.multipleMonthsSelected = false; // includes the decision for all or more than 1 month selected
			o.dontRenderDatesType = 'disabled';
			o.dontRenderDatesMessage = undefined;

			// settings for multiple or no months are selected 
			o.dontRenderDates = (o.multipleMonthsSelected || o.noMonthSelected);

			// declare empty arrays to store selected months and date;
			self.monthsSelectedArr = [];
			self.datesSelectedArr = [];
			self.whatsSelectedArr = [];

			// month select / deselect  events
			$(window).on('dateToggled', self.customEvents.dateToggled.bind(self) );
			$(window).on('allDatesDeleted', self.customEvents.allDatesDeleted.bind(self) );
			$(window).on('monthToggled', self.customEvents.monthToggled.bind(self) );
			$(window).on('allMonthsDeleted', self.customEvents.allMonthsDeleted.bind(self) );
			


			// set values of slideYearTo to the yearIndex to use them later to slide to them 
			self.slideYearTo = self.yearIndex;
			self.slideMonthTo = self.monthIndex;

			/* note: order is important of creating the instance like, date swiper -> month swiper as it is initialized from withing month swiper
			   and alsp these methods only creates an instance doesn't initializes them  */
			
			// create new date swiper
			self.createDateSwiperInstance(); // we call it multiple times as month changes (we destroy and recall this mehtod)

			// create new year swiper instance
			self.createYearSwiperInstance();

			// create new month swiper instance
			self.createMonthSwiperInstance();
		    
			
		},
		sliderInfo: function(){
			var self = this;
			var ctrl = self.object.controller;

			// vars for year swiper
			var yearSwiper = self.yearSwiper;
			var currentlyActiveYear = self.object.year;
			var changeInActiveYearIndex = 0;
			
			// setting the slider info for displaying to calendar
			ctrl.nextYear = (currentlyActiveYear + 1) + changeInActiveYearIndex;
			ctrl.prevYear = (currentlyActiveYear - 1) + changeInActiveYearIndex;

		},
		createDateSwiperInstance: function(){
			var self = this;
			// console.log('date swiper working');

				// date swiper
			(function(){
				return function(self){
					// date swiper container
					self.$dateSwiperContainer = self.$body.find('.container--date__selector.swiper-container');	
					// date swiper navigation buttons
					self.$nextDateSlide = self.$body.find('.next__date.swiper-button-next');
					self.$prevDateSlide = self.$body.find('.prev__date.swiper-button-prev');
					// date swiper pagination
					self.$datePagination = self.$body.find('.swiper-pagination.date__pagination');


					// dateSwiper
				
					self.dateSwiper = new Swiper(self.$dateSwiperContainer, {
						init: false,
						spaceBetween: 0,
						slidesPerView: 10,
						freeMode: true,
						navigation: {
							nextEl: self.$nextDateSlide,
							prevEl: self.$prevDateSlide
						},
						/*pagination:{
							el: self.$monthPagination,
							dynamicBullets: true,
							clickable: true,
					        renderBullet: function (index, className) {
					        	var swiper = this;
						    	return '<div class="' + className + '">'  + (index+1)  + '</div>';
							    			    
						    }
						},*/
						on: {
							init: function () {
								var swiper = this;
								// call init handler
								self.events.dateInit.call(self,swiper,self.slideDateTo);
							},
							tap: function (e) {
								var swiper = this;
								// call event handler
								self.events.dateTap.call(self,e,swiper);
							}
						}
				    });
				};
			})()(this);

		},
		createMonthSwiperInstance: function(){
			var self = this;

			// monthSwiper
			self.monthSwiperArr = [];
			self.$monthSwiperContainer.each(function(i,monthSwiperContainer){

				self.monthSwiper = new Swiper(monthSwiperContainer, {
					init:false,
					spaceBetween: 0,
					slidesPerView: 6,
					freeMode: true,
					navigation: {
						nextEl: self.$nextMonthSlide[i],
						prevEl: self.$prevMonthSlide[i]
					},
					/*pagination:{
						el: self.$monthPagination[i],
						dynamicBullets: true,
						clickable: true,
				        renderBullet: function (index, className) {
				        	var swiper = this;
					    	return '<div class="' + className + '">'  + (index+1)  + '</div>';
						    			    
					    }
					},*/
					on: {
						init: function () {
							var swiper = self.monthSwiperArr[self.slideYearTo];
							var currentSwiperInst = this;
							// call init handler
							self.events.monthInit.call(self,swiper,self.slideMonthTo,currentSwiperInst);
						},
						tap: function (e) {
							var swiper = this;
							// call event handler
							self.events.monthTap.call(self,e,swiper);
						}
					}
			    });
			    // put it into the array of motnh swipers 'monthSwiperArr'
			    self.monthSwiperArr.push(self.monthSwiper);
				// init the month swiper in iteration
				self.monthSwiper.init();
			});

		},
		createYearSwiperInstance: function(){
			var self = this;

			// init year swiper
			self.yearSwiper = new Swiper(self.$yearSwiperContainer, {
		    	direction: 'vertical',
		    	spaceBetween: 0,
		    	navigation: {
		    		nextEl: self.$nextYearSlide,
		    		prevEl: self.$prevYearSlide
		    	},
				on:{
					init: function(){
						var swiper = this;
						// call init handler
						self.events.yearInit.call(self,swiper,self.slideYearTo);
					},
					slideChangeTransitionEnd:function(){
						var swiper = this;
						// call event handler
						self.events.yearSwipe.call(self,swiper);
					}
				}

		    });
		},
		events: {
			dateInit: function(swiper,slideDateTo){
				/* Note swiper is already set from the params*/
				var self = this;
				var o = self.sliderOptions;
				var obj = self.object;
				// var defaultMonthIndex = 

				// console.log(swiper);
				// console.log(slideDateTo);

				if ( !(slideDateTo == -1) ) {
					// params: index, speed, callback
					swiper.slideTo(slideDateTo,0); // slide to the current month's slide
				}else{
					// params: index, speed, callback
					swiper.slideTo(0,0); // slide to the current month's slide
				}

							
				// select all dates on month selection
				if(o.allDatesSelected) {
					console.log(self.datesSelectedArr);
					$(window).trigger('dateToggled',[obj.controller.datesInCurrentMonth]);
					console.log(self.datesSelectedArr);
					// add selected class to all months
					$(swiper.slides).addClass(o.selectedClasses);
				
				}else{
					$(window).trigger('allDatesDeleted');
					
					$(swiper.slides).removeClass(o.selectedClasses);		
					
				}

				// remove the default class everytime
				$(swiper.slides[self.defaultActiveDateIndex]).removeClass(o.defaultClasses);
					
				// if only one month is selected and it is equal to the default month
				if (self.monthsSelectedArr.length==1 && self.monthsSelectedArr[0] == self.defaultActiveMonthIndex) {
					
					if (o.highlightDefaultDate) {
						// add default class to current date
						$(swiper.slides[self.defaultActiveDateIndex]).addClass(o.defaultClasses);
					}
					
					// selections scenarios
					if (o.defaultDateSelected && !self.dateDefaultRun) {
						self.dateDefaultRun = true;
						// add selected class to the current date
						$(swiper.slides[self.defaultActiveDateIndex]).addClass(o.selectedClasses);
						$(window).trigger('dateToggled',[self.defaultActiveDateIndex + 1]);	
					}

				}

				

			},
			monthInit: function(swiper,slideMonthTo,currentSwiperInst){
				/* Note: swiper is already set from the params */
				var self = this;
				var o = self.sliderOptions;

				// match the current swiper instance with the swiper that matches the slideYearTo indexed instance (current year's)
				if (swiper == currentSwiperInst) {
					// saving the current year's month swiper as the previousYearSlide to use later
					self.prevYrMonthSlides = swiper.slides;

					// params: index, speed, callback
					swiper.slideTo(slideMonthTo,0); // slide to the current month's slide

					if (o.highlightDefaultMonth) {
						// add default class to current month
						$(swiper.slides[slideMonthTo]).addClass(o.defaultClasses);	
					}

					if (o.defaultMonthSelected) {
						var currentMonth = swiper.slides[slideMonthTo];

						// add selected and default class to the current month
						$(currentMonth).addClass(o.selectedClasses);

						$(window).trigger('monthToggled',[slideMonthTo]);

					}else if (o.allMonthsSelected) {
						var allMonthsIndexArr = [];
						var allMonths = swiper.slides;

						// add selected class to all months
						$(allMonths).addClass(o.selectedClasses);

						for (var i = 0; i < 12; i++) {
							allMonthsIndexArr.push(i);
						}

						$(window).trigger('monthToggled',[allMonthsIndexArr]);

					}
				}
			},
			yearInit:function(swiper,slideYearTo){
				var self = this;
				var o = self.sliderOptions;

				/* Note swiper is already set from the params*/
				swiper.slideTo(slideYearTo,0); // slide to the current month's slide
				// setting some variables fetched from the swiper
				self.yearSlidesLength = swiper.slides.length;
			},
			dateTap: function(e,swiper){
				var self = this;
				var o = self.sliderOptions;
				
				var dateSelected = $(e.target).closest('.date');
				var dateIndex = dateSelected.index() + 1;

				dateSelected.toggleClass(o.selectedClasses);

				$(window).trigger('dateToggled',[dateIndex]);
			
			},
			monthTap: function(e,swiper){
				var self = this;
				var o, toggleMonth, monthTapped, otherMonths,monthTappedIndex;

				o = self.sliderOptions;

				monthTapped = $(e.target).closest('.month');
				otherMonths = monthTapped.siblings('.month');

				monthTapped.toggleClass(o.selectedClasses);
				monthTappedIndex = monthTapped.index();

				// if preferences are set to select only one month at a time
				if (o.toggleMonth) {		
					otherMonths.removeClass(o.selectedClasses);
					toggleMonth = true; // toggle month set to true
					
				}

				$(window).trigger('monthToggled',[monthTappedIndex,toggleMonth]);

			},
			yearSwipe: function(swiper){
				var self = this, o = self.sliderOptions, obj = self.object;
				var ctrl = obj.controller, $scope = obj.$scope;
				
				var currentlyActiveYear, defaultActiveYearIndex;

				currentlyActiveYear = obj.year;
				defaultActiveYearIndex = obj.yearIndex;

				// getting the index of the active slide
				var activeIndex = swiper.activeIndex;
				// saving the change in the index of active slide from the index of active slide in default state
				var changeInActiveYearIndex = activeIndex - defaultActiveYearIndex;
				
				(function changeInformationText(){
					// changing the info  on slideChangeTransitionEnd to update the values for displaying to calendar
					if (activeIndex + 1 == self.yearSlidesLength) {
						ctrl.prevYear = (currentlyActiveYear - 1) + changeInActiveYearIndex;
						ctrl.nextYear = undefined;
					}else if (activeIndex == 0) {
						ctrl.nextYear = (currentlyActiveYear + 1) + changeInActiveYearIndex;
						ctrl.prevYear = undefined;
					}else{
						ctrl.nextYear = (currentlyActiveYear + 1) + changeInActiveYearIndex;
						ctrl.prevYear = (currentlyActiveYear - 1) + changeInActiveYearIndex;
					}
					ctrl.currentYear = [currentlyActiveYear + changeInActiveYearIndex] ;

					// apply the $scope to the view after the event ends
					$scope.$apply();
				})();

				/* logic for clearing selected months in the previous year*/

				if (self.yearSwipedOnce) {
					// remove selected class on year change
					self.prevYrMonthSlides.removeClass('selected');
					// storing the current year's month slides again to remove the next time
					self.prevYrMonthSlides = self.monthSwiperArr[activeIndex].slides;

					// on year swipe empty the dates and the months
					$(window).trigger('monthToggled',[self.monthsSelectedArr]);
					$(window).trigger('dateToggled',[self.datesSelectedArr]);

				}else{
					self.yearSwipedOnce = true;
				}	


			}
			
		},
		customEvents: {
			monthToggled: function(e,monthIndex,toggleMonth){
				var self = this;
				var obj = self.object;
				var ctrl = self.object.controller;
				var $scope = self.$scope;
				var o = self.sliderOptions;

				if(_.isArray(monthIndex) && !monthIndex.length){
					return;
				}

				if (monthIndex != -1 && monthIndex != undefined) {

					// add or remove months depending if it exists already or not
					self.manipulateMonthsSelected(monthIndex,toggleMonth);

					// set the current month to the array
					ctrl.currentMonth = self.monthsSelectedArr;

					// check the different states when month is more than or less than or equal to 1
					// and change the options accordingly
					self.countMonthsSelected();

					// clear all dates in every type of month toggle
					$(window).trigger('allDatesDeleted');

					// if multiple or 0 months are selected then dont render dates
					if (o.multipleMonthsSelected || o.noMonthSelected) {
						// console.log('add class ' + o.dontRenderDatesType);
						self.$dateSwiperContainer.addClass(o.dontRenderDatesType);
						self.$dateSwiperContainer.find('.message').text(o.dontRenderDatesMessage);

						/* set the selection when everything is done inside monthToggle -- no or mutliple months selected */
						self.setDatesSelection();

					}else{
						
						self.$dateSwiperContainer.removeClass('disappear disabled');

						// dates in current month. Use as: pass the year , month to get all the dates in the month
						ctrl.datesInCurrentMonth = calendar.getDatesInMonth(ctrl.currentYear[0],ctrl.currentMonth[0]);

						if (!self.monthChangedOnce) {

							self.monthChangedOnce = true;

							self.slideDateTo = ctrl.currentDate - 1;

							self.dateSwiper.init();

							/* set the selection when everything is done inside monthToggle -- first date init*/
							self.setDatesSelection();

						}else{

							if (ctrl.currentMonth[0] == obj.monthIndex) {
								self.slideDateTo = ctrl.currentDate - 1;
							}else{
								self.slideDateTo = -1;
							}
							
							/* alternative of update: destroy the swiper*/
							self.dateSwiper.destroy();
							self.dateSwiper = {};
							self.createDateSwiperInstance();

							setTimeout(function(){
								self.dateSwiper.init();
								/* set the selection when everything is done inside monthToggle -- following date inits*/
								self.setDatesSelection();
							},50);

						}/* else for: (!self.monthChangedOnce) */
					}/* else for: (o.multipleMonthsSelected || o.noMonthSelected) */


					
					
				}
					
			},
			dateToggled: function(e,dateIndex){
				var self = this;
				var obj = self.object;
				var ctrl = self.object.controller;
				var $scope = self.$scope;
				var o = self.sliderOptions;

				if(_.isArray(dateIndex) && !dateIndex.length){
					return;
				}

				// add or remove dates depending if it exists already or not
				self.manipulateDatesSelected(dateIndex);

				if (dateIndex > 0) { // dateIndex can be 0 or -1 when controls are clicked
					
					self.setDatesSelection();					
					
				}

			},
			allMonthsDeleted: function(e){
				var self = this;
				
				self.monthsSelectedArr = [];
				// console.log('all months cleared' );
				// console.log(self.monthsSelectedArr);

			},
			allDatesDeleted: function(){
				var self = this;

				self.datesSelectedArr = [];
				// console.log('all dates cleared' );
				// console.log(self.datesSelectedArr);
			}
		},
		setDatesSelection:function(){
			var self = this;
			var obj = self.object;
			var ctrl = self.object.controller;
			var $scope = self.$scope;
			var o = self.sliderOptions;

			var datesSelectedArr = self.datesSelectedArr;
			var monthsSelectedArr = self.monthsSelectedArr;

			var setDatesArr, setMonthsArr;

			if (datesSelectedArr.length) {
				setDatesArr = datesSelectedArr;
			}else{
				setDatesArr = [];
				// console.log('datesSelectedArr else');
				// console.log(datesSelectedArr);
			}

			if (monthsSelectedArr.length) {
				setMonthsArr = self.monthsSelectedArr;
			}else{
				setMonthsArr = [];
				// console.log('monthsSelectedArr else');
				// console.log(monthsSelectedArr);
			}


			// clear the previous timeout if fired too frequently OR <300ms
			if (window.setCalSelTimeout) {
				window.clearTimeout(window.setCalSelTimeout);
				window.setCalSelTimeout = undefined;
			}	

			window.setCalSelTimeout = window.setTimeout(function(){
				updateSelection();
			},300);

			
			function updateSelection(){
				ctrl.setSelection({
					years: ctrl.currentYear,
					months: setMonthsArr,
					dates: setDatesArr
				});
			}

		},
		manipulateMonthsSelected: function(monthIndex,toggleMonth){
			var self = this;

			if (monthIndex == undefined) {	return;}// if undefined is passed then return 

			// console.log('self.monthsSelectedArr before manipulation');
			// console.log(self.monthsSelectedArr);

			if ( !(_.isArray(monthIndex)) ) {
				if (!(monthIndex == -1)) {
					addRemFromMonthsSelectedArr(monthIndex);
				}		
			}else{
				if(!monthIndex.length){ return;}
				_.forEach(monthIndex,function(element,i){

					if (!(monthIndex == -1)) {
						addRemFromMonthsSelectedArr(element);
					}

				});
			}

			// console.log('self.monthsSelectedArr after manipulation');
			// console.log(self.monthsSelectedArr);


			function addRemFromMonthsSelectedArr(monthIndex){
				var indexOfItem = _.indexOf(self.monthsSelectedArr, monthIndex);
				
				if(indexOfItem < 0){
					// console.log('monthIndex added');
					// console.log(monthIndex);
					if (toggleMonth) {
						$(window).trigger('allMonthsDeleted');
					}
					self.monthsSelectedArr.push(monthIndex);
					
				}else{
					// console.log('monthIndex removed');
					// console.log(monthIndex);
					self.monthsSelectedArr.splice(indexOfItem,1);

					// if (toggleMonth) {
					// 	self.monthsSelectedArr = [];
					// }

				}
			}
		},
		manipulateDatesSelected: function(dateIndex){
			var self = this;

			if ( !(_.isArray(dateIndex)) ) {
				if (dateIndex > 0) {
					addRemFromDatesSelectedArr(dateIndex);
				}		
			}else{
				if (!dateIndex.length) {return;}
				_.forEach(dateIndex,function(elem,i){
					if (elem > 0) {
						addRemFromDatesSelectedArr(elem);
					}

				});
			}

			function addRemFromDatesSelectedArr(dateIndex){
				var indexOfItem = _.indexOf(self.datesSelectedArr, dateIndex);
				
				if(indexOfItem < 0){
					// console.log('dateIndex added');
					// console.log(dateIndex);
					self.datesSelectedArr.push(dateIndex);
					
				}else{
					// console.log('dateIndex removed');
					// console.log(dateIndex);
					self.datesSelectedArr.splice(indexOfItem,1);
				}
			}
		},
		countMonthsSelected: function(){
			var self  = this;
			var obj = self.object;
			var o = self.sliderOptions;

			
			// console.log('length of months');
			// console.log(self.monthsSelectedArr.length);

			if (self.monthsSelectedArr.length > 1) {
				o.multipleMonthsSelected = true;
				o.dontRenderDatesType = 'disabled';
				o.dontRenderDatesMessage = 'all dates from the months have been selected'

			}else if(self.monthsSelectedArr.length < 1){
				// alert('less');
				o.noMonthSelected = true;
				o.dontRenderDatesType = 'disappear';
				o.dontRenderDatesMessage = 'please select a month to proceed';
			}else{
				// if= when exactly one month is selected
				o.multipleMonthsSelected = false;
				o.noMonthSelected = false;
			}

			// console.log('ooooooooooooooo -------- Count');
			// console.log(o.noMonthSelected);
		},
		toggleAllDatesSelected: function(){
			var self  = calendarSliders;
			var obj = self.object;
			var o = self.sliderOptions;
			var ctrl = obj.controller;

			if (o.allDatesSelected) {
				alert('all dates true');
					// $(window).trigger('dateToggled',[self.datesSelectedArr]);

			}else{
				alert('all dates false');
			}
		}

	};

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
	};

		// calendarCtrl obj
	var calendarCtrl = {
		init: function($scope,_DateSelection){
			// mapping self, ctrl and $scope to the controller instance
			var self = this;
			self.$scope = $scope;
			self._DateSelection = _DateSelection;
			
			// initialize calendar obj
			calendar.init();
				// declaring/defining properties

			// declaring the vars for years, months and dates
			self.years = [];
			self.months = [];
			// ctrl.dates = [];

			// getting the current year, month and date
			self.defaultDates = calendar.defaultDate();
			self.currentYear = [self.defaultDates.year];
			self.currentMonth = [self.defaultDates.month];
			self.currentDate = self.defaultDates.date;

			// dates in current month. Use as: pass the year , month to get all the dates in the month
			self.datesInCurrentMonth = calendar.getDatesInMonth(self.currentYear[0],self.currentMonth[0]);
					
			// setting the years, months and date
			for (var i = 0 ; i < calendar.generateNumberOfYears; i++) {
				self.years.push(calendar.startingYear + i); // setting the years from the startingYear
			}
			self.months = ['jan','feb','march','april','may','jun',
			'jul','aug','sep','oct','nov','dec']; // hardcoded months
			
			self.initCalendarSliders();

			// only map this functions after running init calendar sliders
			/*ctrl.highlightMonth =  calendarSliders.highlightMonth;
			ctrl.highlightDate =  calendarSliders.highlightDate;*/
			
		},
		initCalendarSliders: function(){
			var self = this;
			var $scope = self.$scope;

			// loop over the years array (which contains all the years)
			self.years.forEach(function(year,i){

				// check when it matches to the current year	
				if (year == self.currentYear[0]) {
					var yearIndex = i;

					// loop over the months array (which contains all the months)
					self.months.forEach(function(month,i){	

						// check when it matches to the current month's index
						if (i == self.currentMonth[0]) {
							var monthIndex = i;
	
							// angular's provided document ready function
							angular.element(document).ready(function(){

								calendarSliders.init({ // init calendarSliders and slide to current year and month with all the current dates and indexes
									year: year,
									yearIndex: yearIndex,
									month: month,
									monthIndex: monthIndex,
									controller: self,
									$scope: $scope
								}); 

							});
							
						}
					});
					
				}
			});
		},
		setSelection: function(obj){
			var self = this;
			var _DateSelection = self._DateSelection;
			// var o = self.sliderOptions;
			console.log('dates setting to: ');
			console.log(obj);

			// copy the passed object
			var _selection = $.extend({},obj);
			
			// return;

			_DateSelection.set(_selection);	
			$(window).trigger('dateSelected'); // publish event to let every subscriber know

			// console.log('_DateSelection after setting');	
			// console.log(_DateSelection.get());	
		}
	};


		// calendarController func
	function calendarController($scope,_DateSelection){
		var self = $.extend(this,calendarCtrl);
		self.init($scope,_DateSelection);
	}
	
	

	





})();

	/*  end of home.controller.js  */

