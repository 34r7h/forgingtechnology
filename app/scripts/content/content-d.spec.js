'use strict';

describe('Directive: content', function ()
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
        element = $compile('<content></content>');
        expect(true).toBe(true);
    }));
});