'use strict';

/**
* @ngdoc directive
* @name numetal.directive:content
* @description
* # content
*/
angular.module('numetal')
    .directive('content', function ()
    {
        return {
            templateUrl: 'scripts/content/content-d.html',
            
            restrict: 'EA',
            controller: function ($scope, $attrs) {
                $scope.$parent.metal.s.param = $attrs.type;
            }
        };
    });