'use strict';

/**
* @ngdoc directive
* @name numetal.directive:posts
* @description
* # posts
*/
angular.module('numetal')
    .directive('posts', function ()
    {
        return {
            templateUrl: 'scripts/posts/posts-d.html',
            restrict: 'EA'
        };
    });