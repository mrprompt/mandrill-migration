#!/usr/bin/env node
'use strict';

const Bucket = require('./src/bucket');
const program = require('commander');
const pkg = require('./package.json');

program
  .version(pkg.version);

program
    .command('list <dir>')
    .description('list available migrations')
    .action((dir) => {
        const bucket = new Bucket(dir);
        const migrations = bucket.load();

        migrations.forEach((migration) => {
            console.log(migration.slug);
        });
    });

program
    .command('drafts')
    .description('list available drafts on Mandrill')
    .action(() => {
        const bucket = new Bucket('');
        
        bucket.drafts((error, drafts) => {
            if (error) {
                return console.log(error.message);
            }

            console.log(drafts);
        });
    });

program
  .parse(process.argv);

if (!program.args.length) {
    program.help();
}
