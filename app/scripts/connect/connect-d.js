'use strict';

/**
* @ngdoc directive
* @name numetal.directive:connect
* @description
* # connect
*/
angular.module('numetal')
    .directive('connect', function ()
    {
        return {
            templateUrl: 'scripts/connect/connect-d.html',
            
            restrict: 'EA',
            link: function (scope, el, attrs)
            {

            },
            controller: function ($scope)
            {

            }
        };
    });