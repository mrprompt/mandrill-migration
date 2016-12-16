'use strict';

const fs = require('fs');
const _ = require('underscore');
const async = require('async');
const mandrill = require('./mandrill');
const md5 = require('js-md5');

class Bucket {
    constructor(bucket = '', mandrill_key='') {
        this.directory = bucket;
        this.mandrill = new mandrill(mandrill_key);
    }

    load() {
        try {
            let migrations = [];
            const directory = this.directory;

            let result = fs.readdirSync(directory).forEach((file) => {
                const migration = fs.readFileSync(`${directory}/${file}`);
                const jsonObj = JSON.parse(migration.toString());

                migrations = _.union(migrations, jsonObj);
            });
            
            return migrations;
        } catch (err) {
            return err;
        } 
    }

    drafts(callback) {
        const vm = this;

        async.waterfall([
            function(done) {
                vm.mandrill.templates(done);
            },
            function (templates, done) {
                const rows = vm.mandrill.cleanup(templates);
                const drafts = [];

                rows.forEach((row) => {
                    if (typeof row.published_at !== 'undefined' && 
                        row.updated_at.substring(0, 16) === row.published_at.substring(0, 16)) {

                        return;
                    }

                    drafts.push(row);
                });

                done(null, drafts);
            }
        ], callback);
    }

    all(callback) {
        const vm = this;

        async.waterfall([
            function(done) {
                vm.mandrill.templates(done);
            },
            function (templates, done) {
                const rows = vm.mandrill.cleanup(templates);

                done(null, rows);
            }
        ], callback);
    }

    generate(callback) {
        const vm = this;

        async.waterfall([
            function(done) {
                vm.drafts(done);
            },
            function (templates, done) {
                const file = md5(templates);
                const json = JSON.stringify(templates);
                const dest = `${vm.directory}/${file}.json`;

                fs.writeFile(dest, json, (err) => {
                    done(err, templates);
                });
            }
        ], callback);
    }

    migrate(callback) {
        const vm = this;

        async.waterfall([
            function(done) {
                const migrations = vm.load();

                done(null, migrations);
            },
            function(templates, done) {
                const migrated = [];

                if (!templates.length) {
                    return done(null, migrated);
                }

                templates.forEach((migration) => {
                    vm.mandrill.publish(migration.name, (err, result) => {
                        console.log(migration.name);
                    });
                });

                done(null, migrated);
            }
        ], callback);
    }
}

module.exports = Bucket;
