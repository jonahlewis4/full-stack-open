import axios from 'axios'
import {useEffect} from 'react'
import {useState} from 'react'
const weatherKey = import.meta.env.VITE_WEATHER_KEY

const Countries = ({countries, onClick}) => {
  //if there are over 10 countires, then tell the user to make a more specific query.

  const [weatherData, setWeatherData] = useState(null)
  const [singleCountry, setSingleCountry] = useState(null)

  useEffect(() => {
    if(singleCountry && countries.length == 1)  {
      const latitude = singleCountry.capitalInfo.latlng[0]
      const longitude = singleCountry.capitalInfo.latlng[1] 
      axios 
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherKey}&units=metric`)
        .then(result => {
          setWeatherData(result.data)
        })
        .catch(err => {
          console.log("key is invalid")
        })
    }
  }, [singleCountry])
  
  if(countries.length > 10){
    return <p>Too many matches, specify another filter</p>
  }
  //if there is more than one country, but less than 11, list all of them
  else if(countries.length > 1)
  {
    return(
      countries.map( country => {
        return (
          <div key = {country.cca2}>  
            {country.name.common + ' '}
            <button onClick = {() => onClick(country)}>show</button> 
          </div>
        )
      })
  )}
  //default case: if there is only one single country, Display that Country and many of its statistics.
  //some countries have multiple capitals so we will use ternary statments to account for that
  else if (countries.length == 1) {
      //if the country has changed, change the single country.
        //get the weather data of the country
      
        if(!singleCountry || countries[0].name.common !== singleCountry.name.common){
        setSingleCountry(countries[0])
      }
      
    
    if (weatherData != null){
      return (
      
        <div>
            <h2>{countries[0].name.common}</h2>
            <div>{countries[0].capital.length == 1 ? 'capital' : 'capitals'} {
              countries[0].capital.length == 1 ? countries[0].capital[0] : <ul>
                {countries[0].capital.map(capital => <li key = {capital}>{capital}</li>)}
              </ul>
            }
            </div>
            <div>area {countries[0].area}</div>
            <br/>
            <strong>languages: </strong>
            <ul>  
              {Object.entries(countries[0].languages).map(language => {
                return (
                  <li key = {language[1]}>{language[1]}</li>
                )
            })}
            </ul>
            <img src={countries[0].flags.png} alt = {countries[0].flags.alt}/>
            
            <div>
              <h2>Weather in {countries[0].capital[0]}</h2>

              {countries[0].capital.length == 1 ? <div></div> 
                : <div>{`*multiple capitals*: I only have lat and long data for the first capital  ${countries[0].capital[0]}, which means I can only check the weather at that one capital :(`}</div>}
              <div>temperature {weatherData.main.temp} Celcius</div>
            
              <img src = {`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}/>

              <div>wind {weatherData.wind.speed} m/s </div>

              </div>
            </div>
      )
    }
  }
}
   
export default Countries