const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//Define paths for Express config (http://expressjs.com/)
const publicDirectoryPath = path.join(__dirname , '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Set up handlebars engine and views location 
app.set('view engine','hbs');//The default engine extension to use when omitted.
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

//Set up static directory to serve
app.use(express.static(publicDirectoryPath));

//root page
app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Sivan'
    });
});

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About',
        name: 'Sivan'
    });
});

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help page',
        name: 'Sivan',
        helpText: 'Some help text'
    });
});

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide address term'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({error});
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error});
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            }); 
        })
    });
});

app.get('/products',(req,res)=>{
    if(!req.query.search){
        res.send({
            error: 'You must provide search term'
        })
    }
    else{
        res.send({
            products: []
        });
    }
});

//Help 404 Page
app.get('/help/*' , (req,res)=> {
    res.render('404',{
        title: '404',
        name: 'Sivan',
        errorMessage: 'Help article not found'
    });
});

//General 404 Page
app.get('*' , (req,res)=> {
    res.render('404',{
        title: '404',
        name: 'Sivan',
        errorMessage: 'Page not found'
    });
});

app.listen(port , ()=>{
    console.log('Server is up on port ' + port);
});