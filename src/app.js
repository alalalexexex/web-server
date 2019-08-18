const express = require('express'); 
const path = require('path'); 

// remember that nodejs projects are wrapped in a function

const app = express(); 
// cover what this is doing in detail soon

app.set('view engine', 'hbs'); 
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
        body: 'This is where you will get it :)'
    })
})

app.get('/weather', (req, res) => {
    res.send({
        location: 'Richmond', 
        forecast: 'The weather looking mad nice'
    }); 
}); 

// app.com 
// app.com/help
// app.com/about

app.listen(8081, () => {
    console.log('App is listening on 8081...'); 
})
