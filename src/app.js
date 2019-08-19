const express = require('express'); 
const path = require('path'); 
const hbs = require('hbs'); 

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
    res.send({
        location: 'Richmond', 
        forecast: 'The weather looking mad nice'
    }); 
}); 

app.get('/products', (req, res) => {
    res.send({
        products: [] 
    })
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

app.listen(8081, () => {
    console.log('App is listening on 8081...'); 
})
