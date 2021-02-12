const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather',
		name: 'Gaurav Sharma' 
	})
})

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Me',
		name: 'Gaurav Sharma'
	})
})

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Need help?',
		name: 'Gaurav Sharma'
	})
})

app.get('/weather', (req, res) => {
	if(!req.query.address){
		return res.send({
			Error: 'Please provide an address.'
		})
	}
	geocode(req.query.address, (error, {latitude, longitude, location}= {}) => {
		if(error){
			return res.send({error})
		}
		forecast(latitude, longitude, (error, forecast) => {
			if(error){
				return res.send({error})
			}
			res.send({
				forecast: forecast,
				location: location
			})
		})
	})
})

app.get('/products', (req, res) => {
	if(Object.keys(req.query).length === 0){
		return res.send({
			Error: 'Please provide a search term.'
		})
	}
	res.send({
		products: []
	})
})

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Gaurav Sharma',
		errorMessage: 'Help article not found.'
	})
})

app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Gaurav Sharma',
		errorMessage: 'Page not found.'
	})
})

app.listen(9876, () => {
	console.log('server is up on port 9876')
})