import axios from 'axios'
import {useEffect} from 'react'
import {useState} from 'react'
const Countries = ({countries, onClick}) => {
  //if there are over 10 countires, then tell the user to make a more specific query.

  const [weatherData, setWeatherData] = useState([])
  let previousCountry = []

  
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
  else if (countries.length == 1){
    //get the weather data of the country
    console.log(previousCountry)
    console.log(countries[0])
    if(JSON.stringify(previousCountry) !== JSON.stringify(countries[0])){
      console.log(`fetching weather data`)
      const weatherKey = 'ba4200d724e541a785db16b31acea40c'
      const latitude = countries[0].latlng[0]
      const longitude = countries[0].latlng[1]
      axios 
      .get('')
      .then(result => {
        setWeatherData(result.data)
        previousCountry = countries[0]
        console.log(previousCountry)
        console.log(result.data)
      })
      .catch(result => {
        previousCountry = countries[0]
        console.log(previousCountry)
        console.log(countries[0])

      })
    }
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
              <h2>Weather in {countries[0].name.common}</h2>
              temperature {'placeholder '} Celcius
              <img src = {'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'} alt = {'placeholder alt'}/>
              wind {'placeholder '} m/s 
          </div>
        </div>
    )
  }
}
   
export default Countries