const { User } = require("../../models/User");

let auth = (req, res, next) => {
    //인증 처리를 하는 곳
    // 클라이언트 쿠키에서 토큰을 가져온다. (cookie-parser 이용)
    let token = req.cookies.x_auth;
    // 토큰을 복호화 한 후 유저를 찾는다.
    User.findByToken(token, (err,user) => {
        if(err) throw err;
        if(!user) return res.json({isAuth: false, error: true})
        //토큰과 유저를 request에 넣어주어서 index.js에서 토큰, 유저를 사용할 수 있게됨
        req.token = token;
        req.user = user;
        //next가 없으면 middleware에 갇히게 됨
        next();
    })
}

module.exports = { auth };