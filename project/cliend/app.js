const condition = document.getElementById('condition')
const city = document.getElementById('city')
const country = document.getElementById('country')
const pressure = document.getElementById('pressure')
const humidity = document.getElementById('humidity')
const description = document.getElementById('description')
const cityInput = document.getElementById('city-input')
const history = document.getElementById('history')
const masterHistory = document.getElementById('master-history')
const main = document.getElementById('main')
const temp = document.getElementById('temp')

const API_KEY = 'fdb63152df28efbd72b8210b2a1a32a7'
const BASE_URL = `http://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}`
const ICON_URL = 'http://openweathermap.org/img/wn/'
const DEFAULT_CITY = 'rangpur, bd'

window.onload = function(){
  navigator.geolocation.getCurrentPosition(s =>{
    getWeatherData(null, s.coords)
  }, e =>{
    getWeatherData(DEFAULT_CITY )
  })

  cityInput.addEventListener('keypress', function(e){
    if(e.key==='Enter'){
      if(e.target.value){
        getWeatherData(e.target.value)
        e.target.value = ''
      }else{
        alert('Please Provide a Valid City Name')
      }
    }
  })
}


function getWeatherData( city=DEFAULT_CITY, coords){
  let url = BASE_URL

  city === null ?
    url = `${url}&lat=${coords.latitude}&lon=${coords.longitude}`:
    url = `${url}&q=${city}`

  axios.get(url)
    .then(({data}) =>{
      
      let weather = {
        icon: data.weather[0].icon,
        name: data.name,
        country:data.sys.country,
        main:data.weather[0].main,
        description:data.weather[0].description,
        temp:data.main.temp,
        pressure:data.main.pressure,
        humidity:data.main.humidity
      }
      setWeather(weather)
    })
    .catch(e=>{
      alert('City Not Found')
      console.log(e)
    })
    
}


function setWeather(weather){
  condition.src = `${ICON_URL}${weather.icon}.png`
  city.innerHTML = weather.name
  country.innerHTML = weather.country
  main.innerHTML = weather.main
  description.innerHTML = weather.description
  temp.innerHTML = weather.temp
  pressure.innerHTML= weather.pressure
  humidity.innerHTML = weather.humidity
}


