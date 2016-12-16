'use strict';

const mockery = require('mockery');
const should = require('should');

let Bucket = {};

describe('Migration Bucket', () => {
    before(function() {
        mockery.enable({
            warnOnUnregistered: false,
            warnOnReplace: false
        });

        class Mandrill {
            constructor(apiKey) {
                this.key = apiKey;
            }

            get templates() {
                return (callback) => {
                    callback(null, []);
                }
            }

            get cleanup() {
                return (templates) => {
                    return [];
                }
            }
        }

        mockery.registerMock('./mandrill', Mandrill);

        Bucket = require('../src/bucket');
    });

    after(function() {
        mockery.disable()
    });

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
        it('list all drafts templates', (done) => {
            const bucket = new Bucket('');
            
            bucket.drafts((err, result) => {
                should(err).be.null();

                result.should.be.instanceOf(Array)

                done();
            });
        });
    });

    describe('All', () => {
        it('list all templates', (done) => {
            const bucket = new Bucket('');
            
            bucket.all((err, result) => {
                should(err).be.null();

                result.should.be.instanceOf(Array)

                done();
            });
        });
    });

    describe('Generate', () => {
        it('create a file with all drafts templates', (done) => {
            const bucket = new Bucket('/tmp');
            
            bucket.generate((err, result) => {
                should(err).be.null();

                result.should.be.instanceOf(Array)

                done();
            });
        });
    });

    describe('Migrate', () => {
        it('read all files on bucket and publish', (done) => {
            const bucket = new Bucket('/tmp');
            
            bucket.migrate((err, result) => {
                should(err).be.null();

                result.should.be.instanceOf(Array)

                done();
            });
        });
    });
});
