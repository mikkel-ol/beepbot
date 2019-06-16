const colors = require('../../common/colors');
const port = require('./app').port;

module.exports = {
    ready: colors.green + 'Ready: ' + colors.blue + 'Express server' + colors.default + ' on port ' + colors.purple + port
}