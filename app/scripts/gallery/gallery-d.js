'use strict';

/**
* @ngdoc directive
* @name numetal.directive:gallery
* @description
* # gallery
*/
angular.module('numetal')
    .directive('gallery', function ()
    {
        return {
            templateUrl: 'scripts/gallery/gallery-d.html',
            
            restrict: 'EA',
            
            link: function (scope, el, attrs)
            {

            },
            controller: function ($scope)
            {

            }
        };
    });