const request = require('request')

const forecast = (latitude, longitude, callback) => {
	const url = `http://api.weatherstack.com/current?access_key=b34f2b70cf918f82dc7eb7eb916e9462&query=${latitude},${longitude}`

	request({url, json: true}, (error, {body}) => {
		if(error){
			callback(`Unable to connect to weather services.`, undefined)
		}
		else if (body.error){
			callback(`Unable to find location.`, undefined)
		}
		else{
			callback(undefined, {
				weather_description: body.current.weather_descriptions[0],
				temperature: body.current.temperature,
				feels_like: body.current.feelslike
			})
		}
	})
}

module.exports = forecast