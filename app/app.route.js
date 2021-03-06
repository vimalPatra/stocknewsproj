

    /*  start of app.route.js   */

console.log('-- app.route.js loaded');


(function(){
    "use strict";
// code here

    angular
    .module('app')
        .config(['$locationProvider','$stateProvider', '$urlRouterProvider',
            function($locationProvider,$stateProvider, $urlRouterProvider) {
            
            $locationProvider.hashPrefix('');

            $urlRouterProvider.otherwise("/");

            $stateProvider
                .state('home', {//State demonstrating Nested views
                    url: "/",
                    templateUrl: './dist/views/home.view.html'/*,
                    controller: 'homeCtrl'*/
                })
                .state('admin', {//State demonstrating Nested views
                    url: "/admin",
                    templateUrl: './dist/views/admin.view.html',
                    controller: 'adminCtrl',
                    controllerAs : 'adc'
                });
                /*.when('admin', {
                    templateUrl: './dist/views/admin.view.html',
                    controller: 'adminCtrl'
                })

                .when('/profile', {
                    templateUrl: 'angular-route-template-2.jsp',
                    controller: 'RouteController'
                })
                .otherwise({
                    redirectTo: '/',
                    templateUrl: './dist/views/home.view.html',
                    controller: 'homeCtrl'
                })*/


        }]);


})();


    /* end of app.route.js */


