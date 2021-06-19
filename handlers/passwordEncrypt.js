
const crypto = require('crypto');
var uuidv1 = require('uuidv1');

exports.encryptPassword=(salt,password)=>{
    let _hashPassword = crypto.createHmac('sha1', salt)
        .update(password)
        .digest('hex');
    return _hashPassword;
}