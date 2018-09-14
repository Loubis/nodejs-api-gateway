'use strict';

const httpProxy = require('express-http-proxy');

let config = module.exports;

config.db = {
    user: 'db_user',
    password: 'db_password',
    name: 'db_name'
};

config.db.details = {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
};

config.keys = {
    secret: 'VerySecretKey'
};

config.server = {
    port: 8196,
    url: "url or ip where your gateway runs"
}

config.ps = {
    google: {
        clientID: '',
        clientSecret: '',
    },
    facebook: {
        clientID: '',
        clientSecret: ''
    }
};

config.proxy = {
    settings: [
        {
            endpointHook: "/sampleUnsecure",
            proxySetting: httpProxy('http://your.host.com'),
            secure: false
        },
        {
            endpointHook: "/sampleWithAdditionalPathToHost",
            proxySetting: httpProxy('http://your.host.com' ,{
                proxyReqPathResolver: function (req) {
                  let parts = req.url.split('?');
                  return "/samplePath" + parts[0] + (parts[1] ? '?' + parts[1] : '');
                }
            }),
            secure: false
        },
        {
            endpointHook: "/sampleSecurePath",
            proxySetting: httpProxy('http://api.recalot.com'),
            secure: true
        }
    ]
}