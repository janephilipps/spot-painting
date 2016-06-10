var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = mongoose.Schema({
    email : {type: String},
    passwordHash : {type: String}
});

userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.isValidPassword = function (password) {
    return bcrypt.compareSync(password, this.passwordHash);
}

module.exports = mongoose.model('User', userSchema);