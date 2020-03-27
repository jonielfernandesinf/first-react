const crytpo = require('crypto');

module.exports = function generateUniqueId(){
    return crytpo.randomBytes(4).toString('HEX');
}