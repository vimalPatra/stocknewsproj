	

	//	start of adminPanelForm.controller.js
console.log('-- adminPanelForm.controller.js loaded');
	


	//code here
	
(function(){
	angular
	.module("adminModule")
		.controller('adminPanelFormCtrl',function($http){
			var self = this;

			self.submitForm = function(){
				var stockName = self.stockName;
				var date = self.date;
				var desc = self.desc;
				var enatype = self.ena;
				var rlink = self.rlink;
				console.log(stockName + date + desc + enatype + rlink );
				
				var postdata = {stockName : stockName, date : date, desc : desc, enatype : enatype, rlink : rlink};
				 $http({
		          method  : 'POST',
		          url     : 'app/components/admin/php/services/adminFormpost.php',
		          data    : stockName,
		          headers : { 'Content-Type': 'application/x-www-form-urlencoded' } 
		         })
		          // .then(function(data) {
		          // 	console.log("php data ");
		          //   console.log(data);
		          // });

			};
		});



})();

	/*  end of adminPanelForm.controller.js  */

