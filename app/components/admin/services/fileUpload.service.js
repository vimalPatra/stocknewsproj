

	/*	start of fileUpload.service.js  */
	console.log('-- fileUpload.service.js loaded');

(function(){

	// setup angular service to the module adminModule 

	angular.
	  module('adminModule').
		service('fileUpload', ['$http', function ($http) {
            this.uploadFileToUrl = function(file, uploadUrl, name){
                 var fd = new FormData();
                 fd.append('file', file);
                 fd.append('name', name);
                 $http.post(uploadUrl, fd, {
                     transformRequest: angular.identity,
                     headers: {'Content-Type': undefined,'Process-Data': false}
                 })
                 .then(function(response){
                    console.log("Success");
                    console.log(response.data);
                    self.postStatus = "Success !";
                 },
                 function(reject){
                    console.log("error");
                 });
             }

        }]);



})();



	/* end of DateSelection.service.js */


