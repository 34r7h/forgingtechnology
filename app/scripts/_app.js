/**
 * @ngdoc overview
 * @name numetal
 * @description
 * # numetal
 *
 * Main module of the application.
 */
'use strict';

var app = angular.module('numetal', [
	'ngAnimate',
	'ngAria',
	'ngResource',
	'ngSanitize',
	'ngTouch',
	'ui.router',
	'ngFabForm',
	'firebase'
]);

app.run(function ($stateParams, $anchorScroll, $rootScope, $location) {
	$rootScope.$on('$stateChangeSuccess', function(event, toState){
		if($stateParams.scrollTo){
			$location.hash($stateParams.scrollTo);
			$anchorScroll();
		}
	});
});