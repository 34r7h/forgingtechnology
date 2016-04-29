/**
 * @ngdoc service
 * @name numetal.Api
 * @description
 * # Api
 * Factory in the numetal.
 */
angular.module('numetal')
    .factory('Api', function ($state)
    {
        'use strict';

        // INITIALIZATION


        // ACTUAL DEFINITIO
        var service = {
	          go: function (state, params) {
		          $state.go(state, params);
		          $state.reload(state);
	          },
            msg: function(msg){
                var timeStart = performance.now();
                console.log(performance.now() - timeStart, msg);
            },
            someMethod: function ()
            {

            }
        };

        return service;
    });