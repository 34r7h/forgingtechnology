'use strict';

/**
* @ngdoc directive
* @name numetal.directive:layout
* @description
* # layout
*/
angular.module('numetal')
    .directive('layout', function ()
    {
        return {
            templateUrl: 'scripts/layout/layout-d.html',
            restrict: 'EA'
        };
    });