const express = require('express');
const app = express();
//const port = process.env.PORT || 5000;
const port = 5000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path'); 
const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./config/key');
const { User } = require("./models/User");
const { Club } = require("./models/Club");
const { auth } = require("./middleware/auth");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());

const accountsRoute = require('./routes/accounts');
const clubsRoute = require('./routes/clubs');
// const clubsImageRoute = require('./routes/uploads/clubs');

app.use('/accounts', accountsRoute);
app.use('/clubs', clubsRoute);

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:false
}).then(() => console.log('MongoDB connected...')).catch(err => console.log(err))


app.get('/', (req, res) => res.send('Hello World'));

app.post('/signup',(req,res)=>{
    const user = new User(req.body);
    user.save((err,userInfo) => {
        if(err) return res.json({ success: false, err })
        return res.status(200).json({
            success: true
        })
    })
})

app.post('/login',(req,res) => {
    //요청에서 입력된 이메일이 데이터베이스에 있는지 확인
    User.findOne({id: req.body.id},(err,user)=>{
        if(!user){
            return res.json({
                loginSuccess: false,
                message: "아이디에 해당하는 유저가 없습니다."
            })
        }
        //이메일이 데이터베이스에 있는 경우, 비밀번호가 사용자가 입력한 비밀번호와 일치하는지 확인
        user.comparePassword(req.body.password, (err,isMatch) => {
            if(!isMatch){
                return res.json({
                    loginSucces: false,
                    message: "비밀번호가 틀렸습니다"
                })
            }
            //비밀번호가 맞다면 토큰을 생성
            user.generateToken((err,user) => {
                if(err) return res.status(400).send(err);
                //x_auth 라는 이름으로 쿠키에 토큰을 저장함
                res.cookie("x_auth",user.token).status(200).json({loginSuccess:true,userId:user._id});
            })
        })
    })
})

app.get('/auth', auth, (req,res) => {
    //미들웨어를 통과하여 이 콜백함수에 도달했다는 것은 Authentication이 True라는 의미이다.
    res.status(200).json({
        _id: req.user._id,
        isAuth: true,
        email: req.user.email,
        name: req.user.name
    })
})

app.get('/logout', auth, (req,res)=>{
    //미들웨어를 통과하여 이 콜백함수에 왔다는 것은 Authentication이 True라는 의미
    //req에 담긴 user와 _id가 같은 user를 찾아서 token을 지워준다.
    User.findOneAndUpdate({_id: req.user._id},
        { token: ""},
        (err, user) =>{
            if(err) return res.json({success:false, err})
            return res.status(200).send({
                success:true
            })
        })
})

app.route('/register/club')
    .get(function(req, res) {
        console.log(req);
        res.send('Get a random book');
    })
    .post(function(req, res) {
        res.send('Add a book');
})

app.get('/search/:keyword', (req, res) => {
    console.log("searching...");
    Club.find({ name: req.params.keyword }, (err, club) => {
        if (err) return res.status(500).json({ error: err });
        if (!club) return res.status(404).json({ error: "찾는 동아리가 없습니다." });
        res.json(club);
    });
});

app.listen(port,() => console.log(`Moari Server listening on port ${port}!`))