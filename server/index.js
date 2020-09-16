const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/key');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const accountsRoute = require('./routes/accounts');
const clubsRoute = require('./routes/clubs');

app.use('/accounts', accountsRoute);
app.use('/clubs', clubsRoute);

const { Club } = require("./models/Club");

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:false
}).then(() => console.log('MongoDB connected...')).catch(err => console.log(err))


app.get('/', (req, res) => res.send('Hello World'));

// app.post('/register/club', (req, res)=>{
//     const club = new Club(req.body);
//     club.save((err, clubInto) => {
//         if(err) return res.json({ success: false, err })
//         return res.status(200).json({
//             success: true
//         }) 
//     })
// });

app.route('/register/club')
    .get(function(req, res) {
        console.log(req);
        res.send('Get a random book');
    })
    .post(function(req, res) {
        res.send('Add a book');
    })


app.listen(port,() => console.log(`Moari Server listening on port ${port}!`))