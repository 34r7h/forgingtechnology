'use strict';

/**
* @ngdoc directive
* @name numetal.directive:postsSingle
* @description
* # postsSingle
*/
angular.module('numetal')
    .directive('postsSingle', function ()
    {
        return {
            templateUrl: 'scripts/posts-single/posts-single-d.html',
            restrict: 'EA'
        };
    });