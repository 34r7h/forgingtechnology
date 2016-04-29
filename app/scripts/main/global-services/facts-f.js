/**
 * @ngdoc service
 * @name numetal.Facts
 * @description
 * # Facts
 * Factory in the numetal.
 */
angular.module('numetal')
    .factory('Facts', function (Api, Data, State, Ux)
    {
        'use strict';

        // INITIALIZATION
        while(!Api || !Data || !State || !Ux){
            console.log('Awaiting DI');
        }


        // ACTUAL DEFINITION
        var facts = {
            api : Api,
            data : Data,
            state : State,
            ux : Ux
        };

        return facts;
    });