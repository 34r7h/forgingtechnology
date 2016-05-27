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
	'firebase',
	'ngMeta'
]);
angular.module('numetal').run(function(ngMeta) {
		ngMeta.init();
	});
