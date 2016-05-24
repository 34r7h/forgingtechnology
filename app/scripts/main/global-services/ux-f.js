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
            xy: [$window.innerWidth,$window.innerHeight],
            share: [{name:'facebook', color:'#3b5998'}, {name:'google', color:'#f15b44'}, {name: 'twitter', color:'#00aced'}, {name: 'pinterest', color:'#c92228'}]
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