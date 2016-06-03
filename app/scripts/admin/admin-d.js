'use strict';

/**
* @ngdoc directive
* @name numetal.directive:admin
* @description
* # admin
*/
angular.module('numetal')
    .directive('admin', function ()
    {
        return {
            templateUrl: 'scripts/admin/admin-d.html',
            restrict: 'EA'
        };
    });