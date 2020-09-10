const express = require('express');
const app = express();
const port = 5000;

app.get('/',(req,res)=>res.send('Hello World'))

app.listen(port,()=>console.log(`Example app listening on port ${port}!`))

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://hyesoo:1003@boilerplate.a5yew.mongodb.net/boilerplate?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:false
}).then(() => console.log('MongoDB connected...')).catch(err => console.log(err))