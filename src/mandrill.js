'use strict';

const mandrill = require('mandrill-api/mandrill');

module.exports = function(apiKey='') {
    if (apiKey == '') {
        return new Error('Invalid API Key');
    }

    return new mandrill.Mandrill(apiKey);
}
