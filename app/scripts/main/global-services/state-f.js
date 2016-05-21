/**
 * @ngdoc service
 * @name numetal.State
 * @description
 * # State
 * Factory in the numetal.
 */
angular.module('numetal')
    .factory('State', function ($state)
    {
        'use strict';

        // INITIALIZATION


        // ACTUAL DEFINITION
        var state = {
            state: $state,
            params: $state.params,
            current: $state.current,
            data: {},
            show:{}
        };

        return state;
    });