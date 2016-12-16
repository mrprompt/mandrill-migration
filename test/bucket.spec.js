'use strict';

const Bucket = require('../src/bucket.js');

describe('Migration Bucket', () => {
    describe('Constructor', () => {
        it('returns object when constructor not have directory', (done) => {
            const bucket = new Bucket();

            bucket.should.be.an.instanceOf(Object);
            bucket.should.have.property('directory').and.is.equal('');

            done();
        });

        it('return object when constructor have directory', function (done) {
            const bucket = new Bucket('../migrations');

            bucket.should.be.an.instanceOf(Object);
            bucket.should.have.property('directory').and.is.equal('../migrations');

            done();
        });
    });

    describe('Load', () => {
        it('Load with inexistent directory throws Error', (done) => {
            const bucket = new Bucket('/fooobarbrbar');
            const migrations = bucket.load();

            migrations.should.be.instanceOf(Error).and.have.property('message');

            done();
        });

        it('Load with existent directory return array', (done) => {
            const bucket = new Bucket(__dirname + '/../migrations');
            const migrations = bucket.load();

            migrations.should.be.instanceOf(Array);

            done();
        });
    });

    describe('Drafts', () => {
        // @todo how to test this?!?
        xit('list all templates', (done) => {
            const bucket = new Bucket('');
            
            bucket.drafts((err, result) => {
                console.log(err, result);

                result
                    .should.be.instanceOf(Error)
                    .and.have.property('message');

                done();
            });
        });
    });
});
