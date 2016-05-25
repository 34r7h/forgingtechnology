/**
 * @ngdoc overview
 * @name numetal
 * @description
 * # numetal
 *
 * Main module of the application.
 */
'use strict';

angular.module('numetal', [
	'ngAnimate',
	'ngAria',
	'ngResource',
	'ngSanitize',
	'ngTouch',
	'ui.router',
	'ngFabForm',
	'firebase'
]);

/*
angular.module('numetal').run(function ($stateParams, $anchorScroll, $rootScope, $location) {
	$rootScope.$on('$stateChangeSuccess', function(event, toState){
		if($stateParams.scrollTo){
			// $location.hash($stateParams.scrollTo);
			// $anchorScroll();
		}
	});
});*/
