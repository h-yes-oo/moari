const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    id: {
        type: String,
        maxlength: 50
    },
    nickname: {
        type: String,
        maxlength: 50
    },
    email: { // 학교 이메일 
        type: String,
        trim: true, // space를 없애주는 역할
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    role: {
        type: Number,
        default: 0
    },
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

const User = mongoose.model('User', userSchema)

module.exports = {User}