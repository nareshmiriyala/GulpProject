/**
 * Created by nmiriyal on 7/02/2017.
 */
module.exports = function () {
    var config = {
        temp: './.tmp',
        alljs: [
            './src/**/*.js',
            '/*.js'
        ],
        less : './src/client/styles/styles.less'
    };
    return config;
}
