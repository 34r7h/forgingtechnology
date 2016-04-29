'use strict';

describe('Factory: Facts', function () {
    // load the service's module
    beforeEach(module('numetal'));

    // instantiate service
    var Facts;
    beforeEach(inject(function (_Facts_) {
        Facts = _Facts_;
    }));

    it('should be defined', function () {
        expect(true).toBe(true);
    });

});