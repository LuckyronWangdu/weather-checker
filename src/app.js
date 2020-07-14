const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
// paths for express config

const pathtopublicdir = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../templates/views')
const partialspath = path.join(__dirname, '../templates/partials')


//setup handlebars engine and views engine
app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialspath)

//setup static directory to serve
app.use(express.static(pathtopublicdir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Mr Robot'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me!',
        name: 'Mr Robot'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This will help you in case you get stuck !!',
        title: 'Help page',
        name: 'Mr Robot'

    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error: 'Please provide a search address!!' })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        } forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({ Error: 'Please provide with a search term!' })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})




app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help not found!!',
        name: 'Mr Robot',
        errmessage: 'help document not found'
    })
})
//404 handling 
app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Mr Robot',
        errmessage: 'Page not found !'
    })
})


//for server starting at port 3000
app.listen(3000, () => {
    console.log('Server up and running at port 3000')
})

