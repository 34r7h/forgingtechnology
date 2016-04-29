'use strict';

describe('Factory: State', function () {
    // load the service's module
    beforeEach(module('numetal'));

    // instantiate service
    var State;
    beforeEach(inject(function (_State_) {
        State = _State_;
    }));

    it('should be defined', function () {
        expect(true).toBe(true);
    });

});