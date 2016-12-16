#!/usr/bin/env node
'use strict';

const Bucket = require('./src/bucket');
const program = require('commander');
const pkg = require('./package.json');
const apiKey = process.env.MANDRILL_API_KEY || '';

program
  .version(pkg.version);

program
    .command('list <dir>')
    .description('list available migrations')
    .action((dir) => {
        const bucket = new Bucket(dir, apiKey);
        const migrations = bucket.load();

        migrations.forEach((migration) => {
            console.log(migration.slug);
        });
    });

program
    .command('drafts')
    .description('list available drafts on Mandrill')
    .action(() => {
        const bucket = new Bucket('', apiKey);
        
        bucket.drafts((error, drafts) => {
            if (error) {
                return console.log(error.message);
            }

            console.log(drafts);
        });
    });

program
    .command('templates')
    .description('list available templates on Mandrill')
    .action(() => {
        const bucket = new Bucket('', apiKey);
        
        bucket.all((error, templates) => {
            if (error) {
                return console.log(error.message);
            }

            console.log(templates);
        });
    });

program
    .command('generate <dir>')
    .description('generate a new migration file from availables drafts on Mandrill')
    .action((dir) => {
        const bucket = new Bucket(dir, apiKey);
        
        bucket.generate((error, templates) => {
            if (error) {
                return console.log(error.message);
            }

            console.log(templates);
        });
    });

program
  .parse(process.argv);

if (!program.args.length) {
    program.help();
}
