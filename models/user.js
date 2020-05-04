const mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username can't be empty"],
        minlength: [5, 'Username length must be minimum 5 characters!'],
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9]+$/.test(v);
            },
            message: props => `${props.value} is not a valid username. Username must contain only characters and numbers!`
        },
        unique: true
    },
    password: String

/**With passport-local-mongoose the validation of password is optional parameter is not possible we to use mongoose Scheme validation */
    // password: {
    //     type: String,
    //     minlength: [8, 'Password length must be minimum 8 characters!'],
    //     validate: {
    //         validator: function (v) {
    //             return /^[a-zA-Z0-9]+$/.test(v);
    //         },
    //         message: props => `${props.value} is not a valid password. Password must contain only characters and numbers!`
    //     },
    //     required: true
    // }
})

/**This is the wright way to validate password in passport-local-mongoose */
const passwordValidator = function (password, error) {
    if (password.length < 8) {
        return error({
            message: 'Password length must be minimum 8 characters!'
        })
    } else if (!/^[a-zA-Z0-9]+$/.test(password)) {
        return error({
            message: `${password} is not a valid password. Password must contain only characters and numbers!`
        })
    }

    // return an empty cb() on success
    return error()
}

userSchema.plugin(passportLocalMongoose, {
    passwordValidator: passwordValidator
});

module.exports = mongoose.model('Users', userSchema);