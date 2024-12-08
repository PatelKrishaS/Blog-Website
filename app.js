const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes')


//Express app
const app = express();

//Connect to MongoDB
const dbURI = 'mongodb+srv://net-ninja:demo%40123@net-ninja-cluster.h2tcdyx.mongodb.net/node-tuts?retryWrites=true&w=majority&appName=net-ninja-cluster';

// mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connect(dbURI)
.then((result) => app.listen(3000))
.catch((err) => console.log(err))
  

//register view engine
app.set('view engine', 'ejs');
// app.set('views', 'myviews')           In order to let EJS and express know that views are found in'myviews' and not 'views'   



//Middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'))

//routes
app.get('/', (req, res) => {
    res.redirect('/blogs')
})

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'})
})

// blog routes
app.use( '/blogs',blogRoutes);

//404 page
app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
})