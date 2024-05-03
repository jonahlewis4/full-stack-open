import { useState } from 'react'
import {useEffect} from 'react'
import Countries from './components/Countries'
import SearchFilter from './components/SearchFilter'
import countryService from './services/country'

function App() {
    //const [searchKey, setSearchKey] = useState('')
    const [countries, setCountries] = useState([])
    const [countriesToShow, setCountriesToShow] = useState(countries)
    useEffect(() => {
      countryService
        .getAll()
        .then(initialCountries => {
          setCountries(initialCountries)
          setCountriesToShow(initialCountries)

          console.log(initialCountries)
        })
    }, [])
    
    
    
    //function to handle serach bar changes.
    
    //function to handle when the player picks the show butotn on country list
    const setSingleCountry = (country) => {
      console.log("setting to one single country")
      console.log(country)
      console.log(country.name.common)
      setCountriesToShow([country])
      console.log(countriesToShow)

    }



    return (
      <div> 
        {console.log('rerendering')}
        <SearchFilter text = "find countries" setCountriesToShow = {setCountriesToShow} countries = {countries} countriesToShow = {countries}/> 
        <Countries countries = {countriesToShow} onClick = {setSingleCountry} />
      </div>
    )
}

export default App
