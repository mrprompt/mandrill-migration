'use strict';

const fs = require('fs');
const _ = require('underscore');

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
}

module.exports = Bucket;
