'use strict';

const fs = require('fs');
const _ = require('underscore');
const async = require('async');
const mandrill = require('./mandrill')(process.env.MANDRILL_API_KEY);

class Bucket {
    constructor(bucket = '') {
        this.directory = bucket;
        this.migrations = [];
    }

    load() {
        try {
            let migrations = this.migrations;
            const directory = this.directory;

            fs.readdirSync(directory).forEach((file) => {
                const migration = fs.readFileSync(`${directory}/${file}`);
                const jsonObj = JSON.parse(migration.toString());

                migrations = _.union(migrations, jsonObj);
            });
            
            return migrations;
        } catch (err) {
            return err;
        } 
    }

    templates(callback) {
        mandrill.templates.list({}, (result) => {
            callback(null, result);
        }, (error) => {
            callback(error);
        });
    }

    cleanup(templates) {
        const result = [];

        templates.forEach((row) => {
            const template = {
                slug: row.slug,
                name: row.name,
                updated_at: row.updated_at,
                created_at: row.created_at,
                published_at: row.published_at
            };

            result.push(template);
        });
        
        return result;
    }

    drafts(callback) {
        const vm = this;

        async.waterfall([
            function(done) {
                vm.templates(done);
            },
            function (templates, done) {
                const rows = vm.cleanup(templates);
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
                vm.templates(done);
            },
            function (templates, done) {
                const rows = vm.cleanup(templates);

                done(null, rows);
            }
        ], callback);
    }
}

module.exports = Bucket;
