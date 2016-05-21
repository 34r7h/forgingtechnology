/**
 * @ngdoc service
 * @name numetal.Ux
 * @description
 * # Ux
 * Factory in the numetal.
 */
angular.module('numetal')
    .factory('Ux', function ($window)
    {
        'use strict';

        // INITIALIZATION


        // ACTUAL DEFINITION
        var service = {
            xy: [$window.innerWidth,$window.innerHeight]
        };

        return service;
    });