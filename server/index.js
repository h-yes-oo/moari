const express = require('express');
const app = express();
const path = require('path'); 
const cors = require('cors');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const config = require('./config/key');

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology:true, 
    useCreateIndex:true, useFindAndModify:false
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

app.use(cors({
    origin: true,
    credentials: true
}));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());

const { Club } = require("./models/Club");

const accountsRoute = require('./routes/accounts');
const clubsRoute = require('./routes/clubs');
// const clubsImageRoute = require('./routes/uploads/clubs');

app.use('/api/users', accountsRoute);
app.use('/clubs', clubsRoute);

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
    Club.find({ name: { $regex: req.params.keyword, $options: 'i' } }, (err, club) => {
        if (err) return res.status(500).json({ error: err });
        if (!club) return res.status(404).json({ error: "찾는 동아리가 없습니다." });
        res.json(club);
    });
});

//const port = process.env.PORT || 5000;
const port = 5000;

app.listen(port,() => console.log(`Moari Server listening on port ${port}!`))