'use strict';

const mockery = require('mockery')
const should = require('should');

let Mandrill = {};

describe('Mandrill Driver', function() {
    before(function() {
        mockery.enable({
            warnOnUnregistered: false,
            warnOnReplace: false
        });

        class MandrillMock {
            constructor(apiKey) {
                this.key = apiKey;
            }

            get templates() {
                return {
                    list: (a, b, c) => {
                        b([]);
                    },
                    publish: (a, b) => {
                        b([]);
                    }
                }
            }
        }

        mockery.registerMock('mandrill-api/mandrill', { Mandrill: MandrillMock });

        Mandrill = require('../src/mandrill');
    });

    after(function() {
        mockery.disable()
    });

    describe('Constructor', () => {
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

    describe('templates()', () => {
        it('must be return Array instance', (done) => {
            const mandrill = new Mandrill(process.env.MANDRILL_API_KEY);

            mandrill.templates((err, templates) => {
                should(err).be.null();
                should(templates).be.an.instanceOf(Array);

                done();
            });
        });
    });

    describe('cleanup()', () => {
        it('must be return cleaned array', (done) => {
            const mandrill = new Mandrill(process.env.MANDRILL_API_KEY);

            const templates = [
                {
                    slug: 'foo',
                    name: 'Foo',
                    created_at: new Date(),
                    updated_at: new Date(),
                    published_at: undefined,
                    code: '<html></html>',
                    sent_name: 'Foo Bar bar'
                }
            ];

            const result = mandrill.cleanup(templates);

            result.should.be.an.instanceOf(Array);

            const element = result[0];

            element.should.have.property('slug');
            element.should.have.property('name');
            element.should.have.property('created_at');
            element.should.have.property('updated_at');
            element.should.have.property('published_at');
            element.should.not.have.property('code');
            element.should.not.have.property('sent_name');

            done();
        });
    });

    describe('publish()', () => {
        it('must be return published template', (done) => {
            const mandrill = new Mandrill(process.env.MANDRILL_API_KEY);

            const template = {
                slug: 'foo',
                name: 'Foo',
                created_at: new Date(),
                updated_at: new Date(),
                published_at: undefined
            };

            mandrill.publish(template.name, (err, result) => {
                should(err).be.null();

                result.should.be.an.instanceOf(Object);

                done();
            });
        });
    });
});
