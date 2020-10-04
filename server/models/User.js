const mongoose = require('mongoose');
//비밀번호 해싱을 위해 만들어진 모듈
const bcrypt = require('bcrypt');
const saltRounds = 10;
//JSON web token 생성 및 검증을 위한 모듈
const jwt = require('jsonwebtoken');

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
    /*
    //본인이 구성원으로 속한 동아리
    belonging: {
        type: String,
        maxlength: 50
    },
    //본인이 운영자 계정인 동아리
    own: {
        type: Number,
        default: 0
    },
    // 랜덤 아이콘 할당 ?? 고민중
    image: String,
    */
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

//유저 모델에 유저 정보를 저장하기 전에 아래 callback ftn이 실행됨
userSchema.pre('save',function(next){
    var user = this;
    //비밀번호가 변경된 직후 한번만 암호화 진행
    if(user.isModified('password')){
        //비밀번호 암호화
        bcrypt.genSalt(saltRounds,function(err,salt){
            if(err) return next(err);
            bcrypt.hash(user.password,salt,function(err,hash){
                if(err) return next(err);
                user.password = hash;
                next();
            })
        })
    } else{
        next();
    }
})

//비밀번호를 확인하는 comparePassword 메소드 생성
userSchema.methods.comparePassword = function(plainPassword, cb){
    //bcrypt 이용하여 비밀번호 확인
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err)
        cb(null, isMatch)
    })
}

//토큰을 생성하는 generateToken 메소드 생성
userSchema.methods.generateToken = function(cb) {
    var user = this;
    //jwt.sign 의 첫 인자는 payload, 두번째 인자는 비밀키 값
    //유저 아이디로 'secretToken'이라는 토큰 생성
    var token = jwt.sign(user._id.toHexString(),'secretToken');
    user.token = token;
    user.save(function(err,user){
        if(err) return cd(err);
        cb(null,user);
    })
}

//토큰을 이용하여 유저를 찾는 스태틱 메소드 findByToken 생성
//statics 와 methods의 차이는 무엇일까 ???
userSchema.statics.findByToken = function(token,cb){
    var user = this;
    //토큰을 decode하는 jwt.verify
    jwt.verify(token, 'secretToken',function(err,decoded){
        //유저 아이디를 이용하여 유저를 찾고, 클라이언트에서 가져온 토큰과 데이터베이스에 보관된 토큰이 일치하는지 확인
        user.findOne({"_id":decoded, "token":token},function(err,user){
            if(err) return cb(err);
            cb(null,user)
        })
    })
}


const User = mongoose.model('User', userSchema)

module.exports = {User}