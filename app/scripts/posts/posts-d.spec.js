'use strict';

describe('Directive: posts', function ()
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
        element = $compile('<posts></posts>');
        expect(true).toBe(true);
    }));
});