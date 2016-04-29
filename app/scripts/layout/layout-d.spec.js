'use strict';

describe('Directive: layout', function ()
{

    // load the directive's module
    beforeEach(module('numetal'));

    var element,
        scope;

    beforeEach(inject(function ($rootScope)
    {
        scope = $rootScope.$new();
    }));

    it('should do something', inject(function ($compile)
    {
        element = $compile('<layout></layout>');
        expect(true).toBe(true);
    }));
});