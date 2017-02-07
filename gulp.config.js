/**
 * Created by nmiriyal on 7/02/2017.
 */
module.exports = function () {
    var client = './src/client/';
    var config = {
        temp: './.tmp/',
        alljs: [
            './src/**/*.js',
            '/*.js'
        ],
        less: client + 'styles/styles.less'
    };
    return config;
}
