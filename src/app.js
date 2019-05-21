const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()

// DEFINE PATHS FOR Express CONFIG :
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// SETUP HANDLEBARS ENGINE AND VIEWS LOCATION: 
app.set('view engine','hbs')    // TO USE HANDLEBARS FOR Express
app.set('views', viewsPath)     // TO CUSTOMIZE THE VIEWS DIRECTORY WHILE USING HANDLEBARS.
hbs.registerPartials(partialsPath)

// SETUP STATIC DIRECTORY TO SERVE.
app.use(express.static(publicDirectoryPath))

app.get('',(req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Omkar Vaidya'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Omkar Vaidya'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Omkar Vaidya'
    })
})

// OLD HANDLERS :

// app.get('', (req, res) => {
//     res.send('<h1>Hello Express!</h1>')
// })

// app.get('/help',(req, res) => {
//     res.send([{
//         name: 'Omkar',
//         age:21
//     },{
//         name:'Raj'
//     }])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>This is the about page</h1>')
// })

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please provide an address.'
        })
    }else{
        geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if (error){
                return res.send({error})    // Use of shorthand error instead of error : error
            }
        
            forecast(latitude, longitude, (error, forecastData) => {
                if (error){
                    return res.send({error})
                }
        
                // console.log(location)
                // console.log(forecastData)

                res.send({
                    forecast: forecastData,
                    location: location,     // We can use shorthand here also. (location)
                    address: req.query.address
                })
            })
        })
    }
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term.'
        })
    }
    console.log(req.query.search)  
    res.send({
        products: []
    })
})

// app.com
// app.com/help
// app.com/about

// SETTING UP SPECIFIC ERROR PAGE
app.get('/help/*', (req, res) => {
    // res.send('Help article not found.')
    res.render('404',{
        title: '404',
        name: 'Omkar Vaidya',
        errorMessage: 'Help article not found'
    })
})


// SETTING UP GENERAL ERROR: 404 PAGE
app.get('*', (req, res) => {
    // res.send('My 404 Page')
    res.render('404',{
        title: '404',
        name: 'Omkar Vaidya',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})