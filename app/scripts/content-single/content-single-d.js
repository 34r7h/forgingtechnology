'use strict';

/**
* @ngdoc directive
* @name numetal.directive:contentSingle
* @description
* # contentSingle
*/
angular.module('numetal')
    .directive('contentSingle', function ($state)
    {
        return {
            templateUrl: 'scripts/content-single/content-single-d.html',
            restrict: 'EA',
            controller: function ($scope, $attrs) {
                $scope.$parent.metal.s.param = $attrs.type;
                $scope.$parent.metal.s.params = $state.params[$scope.$parent.metal.s.param];
            }
        };
    });