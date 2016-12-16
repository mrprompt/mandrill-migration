'use strict';

const mandrill = require('mandrill-api/mandrill');

class Mandrill {
    constructor(apiKey) {
        this.client = new mandrill.Mandrill(apiKey);
    }

    templates(callback) {
        this.client.templates.list({}, (result) => {
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
}

module.exports = Mandrill;
