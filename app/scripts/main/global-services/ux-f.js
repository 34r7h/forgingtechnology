/**
 * @ngdoc service
 * @name numetal.Ux
 * @description
 * # Ux
 * Factory in the numetal.
 */
angular.module('numetal')
    .factory('Ux', function ($window, $rootScope)
    {
        'use strict';

        // INITIALIZATION

        // ACTUAL DEFINITION
        var service = {
            xy: [$window.innerWidth,$window.innerHeight]
        };

        function adminUI(){
            service.xy = [$window.innerWidth,$window.innerHeight]
        }
        angular.element($window).bind('resize', function () {
            adminUI();
            $rootScope.$apply(service.xy);
        });
        return service;
    });