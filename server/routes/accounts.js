const express = require('express');
const router = express.Router();
const { User } = require("../models/User");

const { auth } = require("../middleware/auth");

router.get('/auth', auth, (req,res) => {
  //미들웨어를 통과하여 이 콜백함수에 도달했다는 것은 Authentication이 True라는 의미이다.
  res.status(200).json({
      _id: req.user._id,
      id: req.user.id,
      isAuth: true,
      email: req.user.email,
      name: req.user.name,
      image: req.user.image,
      likedClubs: req.user.likedClubs,
  });
});

router.post('/signup',(req,res)=>{
  const user = new User(req.body);
  user.save((err,userInfo) => {
      if(err) return res.json({ success: false, err })
      return res.status(200).json({
          success: true
      });
  });
});

router.post('/login',(req,res) => {
  //요청에서 입력된 이메일이 데이터베이스에 있는지 확인
  User.findOne({id: req.body.id},(err,user)=>{
      if(!user){
          return res.json({
              loginSuccess: false,
              message: "아이디에 해당하는 유저가 없습니다."
          });
      }
      //이메일이 데이터베이스에 있는 경우, 비밀번호가 사용자가 입력한 비밀번호와 일치하는지 확인
      user.comparePassword(req.body.password, (err,isMatch) => {
          if(!isMatch){
              return res.json({
                  loginSucces: false,
                  message: "비밀번호가 틀렸습니다"
              });
          }
          //비밀번호가 맞다면 토큰을 생성
          user.generateToken((err,user) => {
              if(err) return res.status(400).send(err);
              //x_auth 라는 이름으로 쿠키에 토큰을 저장함
              res.cookie("x_authExp", user.tokenExp);
              res.cookie("x_auth",user.token).status(200).json({
                  loginSuccess: true,
                  userId: user._id,
                  loginId: user.id
                });
          });
      });
  });
});

router.get('/logout', auth, (req,res)=>{
  //미들웨어를 통과하여 이 콜백함수에 왔다는 것은 Authentication이 True라는 의미
  //req에 담긴 user와 _id가 같은 user를 찾아서 token을 지워준다.
  User.findOneAndUpdate({_id: req.user._id},
      { token: "", tokenExp: "" },
      (err, user) =>{
          if(err) return res.json({success:false, err})
          return res.status(200).send({
              success:true
          });
      });
});

router.get('/:userId', (req, res) => {
    User.findById(req.params.userId, (err, user) => {
        if (user) res.json(user)
        else if (err) res.json({ message: err });
    })
}) 

module.exports = router;