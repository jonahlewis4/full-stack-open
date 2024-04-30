const Countries = ({countries}) => {
  //if there are over 10 countires, then tell the user to make a more specific query.

  if(countries.length > 10){
    return <p>Too many matches, specify another filter</p>
  }
  //if there is more than one country, but less than 11, list all of them
  else if(countries.length > 1)
  {
    return(
      countries.map( country => {
        return (
          <p key = {country.cca2}>{country.name.common}</p>

        )
      })
  )}
  //default case: if there is only one single country, Display that Country and many of its statistics.
  //some countries have multiple capitals so we will use ternary statments to account for that
  else if (countries.length == 1){
    return (
      <div>
        {console.log(countries[0])}
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


        
      </div>
    )
  }
}
   
export default Countries