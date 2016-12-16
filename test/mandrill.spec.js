'use strict';

describe('Mandrill Driver', function() {
    describe('Contructor', () => {
        it('Constructor without api key must be return false', function (done) {
            const mandrill = require('../src/mandrill')();

            mandrill.should.be.an.instanceOf(Error).and.have.property('message');
            mandrill.message.should.be.equal('Invalid API Key');        
            done();
        });

        it('Constructor with any api key must be return mandrill client instance', function (done) {
            const mandrill = require('../src/mandrill')('fooo');

            mandrill.should.be.an.instanceOf(Object).and.have.property('templates');
            mandrill.should.be.an.instanceOf(Object).and.have.property('debug');
            
            done();
        });
    });
});
