'use strict';

/**
* @ngdoc directive
* @name numetal.directive:content
* @description
* # content
*/
angular.module('numetal')
    .directive('content', function (State)
    {
        return {
            templateUrl: 'scripts/content/content-d.html',
            restrict: 'EA',
            controller: function ($scope, $attrs) {
                State.type = $attrs.type;
            }
        };
    });