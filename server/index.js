const express = require('express');
const app = express();
//const path = require('path'); 
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

const accountsRoute = require('./routes/accounts');
const clubsRoute = require('./routes/clubs');
const searchRoute = require('./routes/search');
<<<<<<< HEAD
const commentRoute = require('./routes/comment');
=======
const storyRoute = require('./routes/story');
>>>>>>> temporary error resolving
// const clubsImageRoute = require('./routes/uploads/clubs');

app.use('/api/users', accountsRoute);
app.use('/api/clubs', clubsRoute);
app.use('/api/search', searchRoute);
<<<<<<< HEAD
app.use('/api/comment', commentRoute);
=======
app.use('/api/story', storyRoute);

>>>>>>> temporary error resolving

app.route('/register/club')
    .get(function(req, res) {
        console.log(req);
        res.send('Get a random book');
    })
    .post(function(req, res) {
        res.send('Add a book');
})

//const port = process.env.PORT || 5000;
const port = 5000;

app.set('trust proxy', true);

app.listen(port, () => console.log(`Moari Server listening on port ${port}!`))