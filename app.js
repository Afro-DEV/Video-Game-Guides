const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const guideRoutes = require('./routes/guideRoutes');

//express app
const app = express();

//connect to mongodb
const dbURI = 'mongodb+srv://<username>:<password>@nodeintro.skwpf.mongodb.net/node-intro?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }) //used to stop deprication error
.then(result => app.listen(3000))
.catch(err => console.log(err));


//register view engine
app.set('view engine', 'ejs');

// middleware and static files
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log('new request made:');
    console.log('host: ', req.hostname);
    console.log('path: ', req.path);
    console.log('method: ', req.method);
    //use the next function to tell the middleware to continue to the next middleware below
    next(); 
});


//looks for request using a ''
app.get('/', (req, res) => {
    
    res.redirect('/guides')
});

app.get('/about', (req, res) => {
    

    //sets root to current directory instead of the computer aboslute directory
    res.render('about', { title: 'About'});
});


//blog routes
app.use('/guides', guideRoutes); // '/guides' in front of all the guide Routes

//404 error page 
//function fires for every request if there is no URL match
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
  })