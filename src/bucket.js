'use strict';

const fs = require('fs');

class Bucket {
    constructor(bucket = '') {
        this.directory = bucket;
        this.migrations = [];
    }

    load() {
        try {
            const migrations = this.migrations

            fs.readdirSync(this.directory).forEach(function(file) {
                const migration = fs.readFileSync(file).toString();

                migrations.push(migration);
            });
            
            return migrations;
        } catch (err) {
            return err;
        } 
    }
}

module.exports = Bucket;
