	

	//	start of header.controller.js
console.log('-- header.controller.js loaded');
	


	//code here
	
(function(){


	angular
	.module("coreModule")
		.controller('headerCtrl',[headerController]);



					// extra required code below


		// headerCtrl obj
	var headerCtrl = {
		init: function(ctrl){
			var self = this;
			self.ctrl = ctrl;

			// mapping the methods in headerCtrl obj to the headerController function
			ctrl.toggleMenu = self.toggleMenu;

			self.$body = $('#body');
			
			// grabbing the overlay--big element and setting click handler and pointing the this keywork back to the headerCtrl obj
			self.$overlayBig = self.$body.find('.overlay--big').click(self.toggleMenu.bind(self));


			
		},
		toggleMenu:function(obj){
			// setting the this as the headerCtrl object as it is set to the headerController when called through a dom event
			var self = headerCtrl;
		
			if (obj.bodyClass) {
				// getting the params from the passed object
				var elementId = obj.menuId;
				var bodyClass = obj.bodyClass;
				
				self.$body.toggleClass(bodyClass);

				// saving the list of classes that are added to the body
				self.$addedBodyClasses = obj.bodyClass;
			}else{
				self.$body.toggleClass(self.$addedBodyClasses);
			}
			
			
		}

	};

		// headerController func
	function headerController(){
		var ctrl = this;

		angular.element(document).ready(function(){
			headerCtrl.init(ctrl);
		});

	}

})();

	/*  end of header.controller.js  */

