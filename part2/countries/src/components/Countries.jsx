import axios from 'axios'
const Countries = ({countries, onClick}) => {
  //if there are over 10 countires, then tell the user to make a more specific query.

  console.log("Recreating countires componenet ")

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
            {console.log(country)}
            <button onClick = {() => onClick(country)}>show</button> 
          </div>
        )
      })
  )}
  //default case: if there is only one single country, Display that Country and many of its statistics.
  //some countries have multiple capitals so we will use ternary statments to account for that
  else if (countries.length == 1){
    //get the weather data of the country


    //latitude, longitude, and an API key are needed to make a call.

    

    //this is hardcoded while i'm just testing it.

    let success = false;
    console.log(`fetching weather data for ${countries[0].name.common}`)
    const weatherKey = 'ba4200d724e541a785db16b31acea40c'
    const latitude = countries[0].latlng[0]
    const longitude = countries[0].latlng[1]
    axios 
    .get(`https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&exclude=minutely,hourly,daily,alerts&appid=${weatherKey}`)
    .then(result => {
      console.log(result.data)
      success = true;
    })
    .catch(result => {
      success = false;
    })
    
   


    return (
      <div>
        {console.log(countries[0])}
        {console.log(`${success} on trying to fetch weather data`)}
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
          {console.log(countries[0].languages)}
          {Object.entries(countries[0].languages).map(language => {
            return (
              <li key = {language[1]}>{language[1]}</li>
            )
        })}
        </ul>
        <img src={countries[0].flags.png} alt = {countries[0].flags.alt}/>
        
        {success ? <div>
            <h2>Weather in {countries[0].name.common}</h2>
            temperature {'placeholder '} Celcius
            <img src = {'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'} alt = {'placeholder alt'}/>
            wind {'placeholder '} m/s 
          </div>
           : (<div>{`Failed to fetch the weather data for ${countries[0].name.common} `}</div>)
        }





        
      </div>
    )
  }
}
   
export default Countries