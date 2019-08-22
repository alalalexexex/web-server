const express = require('express'); 
const path = require('path'); 
const hbs = require('hbs'); 
const {geocode} = require('../utils/geocode'); 
const {forecast} = require('../utils/forecast')

// remember that nodejs projects are wrapped in a function
// right now the hbs files have to be in the root of the project, and have to be stored in the directory called 'views'

// Get absolute paths
const partialsPath = path.join(__dirname, '../templates/partials');  
const viewsPath = path.join(__dirname, '../templates/views'); 

/*************************
 * Setup handlebars config for express to find
 * 'view engine' -> set to handlebars
 * 'views' -> customize the directory name to templates
 */
const app = express(); 
const port = process.env.PORT || 8081;  

app.set('view engine', 'hbs'); 
app.set('views', viewsPath); 
hbs.registerPartials(partialsPath); 

// setupe path to static directory to serve. 
app.use(express.static(path.join(__dirname, '../public'))); 

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App', 
        name: 'Alex Trainham'
    }); 
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me...', 
        name: 'Alex Trainham'
    }); 
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Need Help?',
        name: 'Alex Trainham', 
        body: 'This is where you will get it :)'
    })
})

app.get('/weather', (req, res) => {
    // send the json object to client
    if(!req.query.address){
        return res.send({
            error: 'No address Provided.'
        }); 
    }

    // first geocode the query address, then get the forecast for that address.
    // destructuring object that's undefined needs a default parameter
    // NOTE That if there is not an object provided in the parameter, then set to empty object, and then can make a parameter default value
    geocode(req.query.address, (err, {latitude, longitude, location} = {}) => {
        // send the error that was sent back by the callback 
        if(err) return res.send({err}); 
        forecast(latitude, longitude, (err, weatherRes) => {
            // send the error that was sent back by the callback 
            if(err) return res.send({err}); 
            res.send({
                address: req.query.address, 
                location, 
                forecast: weatherRes
            }); 
        })
    })
}); 

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'Missing search query'
        }); 
    }
    res.send({
        products: [] 
    }); 
})

// matches anything after /help/* and is more specific 
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 not found', 
        errorMessage: 'Help page wasn\'t found', 
        name: 'Alex Trainham'
    })
}); 

// this specifically needs to be last because express 
// looks the project linearly, from the top. 
// wildcard matches anything. 
app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Not found', 
        errorMessage: 'Page wasn\'t found', 
        name: 'Alex Trainham'
    }); 
})

// app.com 
// app.com/help
// app.com/about

app.listen(port, () => {
    console.log('App is listening on 8081...'); 
})
