const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

/**
 * 
 * Exercise
 * Projects page 
 *
 */



var app = express();

hbs.registerPartials(__dirname + '/views/partials')

app.set('view engine', 'hbs');

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', err => {
        if (err) {
            console.log('Unable to append to server.log')
        }
    })
    next();
})

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt', text => {
    return text.toUpperCase();
})


app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: "Home Page",
        welcomeMessage: 'run...DENENENE'
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page' 
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        message: 'Here are my projects',
        pageTitle: "My Projects"
    })
})

app.get('/bad', (req, res) => {
    res.send({
        results: [],
        errorMessage: "Unable to find the url"
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}` ); 
});