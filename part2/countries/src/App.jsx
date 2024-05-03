import { useState } from 'react'
import {useEffect} from 'react'
import Countries from './components/Countries'
import SearchFilter from './components/SearchFilter'
import countryService from './services/country'

function App() {
    const [searchKey, setSearchKey] = useState('')
    const [countries, setCountries] = useState([])
    const [countriesToShow, setCountriesToShow] = useState(countries)
    useEffect(() => {
      countryService
        .getAll()
        .then(initialCountries => {
          setCountries(initialCountries)
          setCountriesToShow(initialCountries.filter(country => country.name.common.includes(searchKey)))

          console.log(initialCountries)
        })
    }, [])
    
    
    
    //function to handle serach bar changes.
    const handleSearchChange = (event) => {
      setSearchKey(event.target.value)
      console.log(searchKey)
      setCountriesToShow(countries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase())))
    }
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
        <SearchFilter text = "find countries" value = {searchKey} onChange = {handleSearchChange}/> 
        <Countries countries = {countriesToShow} onClick = {setSingleCountry}/>
      </div>
    )
}

export default App
