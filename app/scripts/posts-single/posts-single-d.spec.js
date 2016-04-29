'use strict';

describe('Directive: postsSingle', function ()
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
        element = $compile('<posts-single></posts-single>');
        expect(true).toBe(true);
    }));
});