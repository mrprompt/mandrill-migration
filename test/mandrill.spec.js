'use strict';

const Mandrill = require('../src/mandrill');

describe('Mandrill Driver', function() {
    describe('Contructor', () => {
        it('without api key', function (done) {
            const mandrill = new Mandrill();

            mandrill.should.be.an.instanceOf(Object);

            done();
        });

        it('with any api key', function (done) {
            const mandrill = new Mandrill('fooo');

            mandrill.should.be.an.instanceOf(Object);
            
            done();
        });
    });
});
