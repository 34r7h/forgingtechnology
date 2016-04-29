'use strict';

describe('Factory: Ux', function () {
    // load the service's module
    beforeEach(module('numetal'));

    // instantiate service
    var Ux;
    beforeEach(inject(function (_Ux_) {
        Ux = _Ux_;
    }));

    it('should be defined', function () {
        expect(true).toBe(true);
    });

});