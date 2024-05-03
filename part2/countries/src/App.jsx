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

        })
    }, [])
    
    
    
    //function to handle serach bar changes.
    
    //function to handle when the player picks the show butotn on country list
    const setSingleCountry = (country) => {
      setCountriesToShow([country])

    }



    return (
      <div> 
        <SearchFilter text = "find countries" setCountriesToShow = {setCountriesToShow} countries = {countries} countriesToShow = {countries}/> 
        <Countries countries = {countriesToShow} onClick = {setSingleCountry} />
      </div>
    )
}

export default App
