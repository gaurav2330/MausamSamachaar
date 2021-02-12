const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
	e.preventDefault()

	const location = search.value
	search.value = ''
	messageOne.textContent = `Loading...`
	messageTwo.textContent = ``
	fetch(`http://localhost:9876/weather?address=${location}`).then((response) => {
	response.json().then((data) => {
		messageOne.textContent = ``
		if(data.error){
			messageOne.textContent = data.error
		}
		else{
			messageOne.textContent = data.location
			messageTwo.innerHTML = `Temperature: ${data.forecast.temperature} ºC <br/>
				Weather: ${data.forecast.weather_description}`
		}	
	})
})
})