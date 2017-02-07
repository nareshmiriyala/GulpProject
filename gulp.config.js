/**
 * Created by nmiriyal on 7/02/2017.
 */
module.exports = function () {
    var client = './src/client/';
    var clientApp = client + 'app/';
    var server = './src/server/';
    var config = {
        temp: './.tmp/',
        alljs: [
            './src/**/*.js',
            '/*.js'
        ],
        client: client,
        less: client + 'styles/styles.less',
        index: client + 'index.html',
        jsdir: [
            clientApp + '**/*.module.js',
            clientApp + '**/*.js',
            '!' + clientApp + '**/*.spec.js'
        ],
        bower:{
            json: require('./bower.json'),
            directory: './bower_components',
            ignorePath : '../..'
        },
        /**
         * Node Settings
         */
        defaultPort : 7203,
        nodeServer : './src/server/app.js',
        server : server
    };

    config.wiredepDefaultOptions = function () {
        var options = {
            bowerJson: config.bower.json,
            directroy: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };
        return options;
    };
    return config;
}
