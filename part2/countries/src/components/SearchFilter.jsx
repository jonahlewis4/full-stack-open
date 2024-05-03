import {useState} from 'react'


const SearchFilter = ({text, setCountriesToShow, countries, countriesToShow}) => {
  const [searchKey, setSearchKey] = useState('')
  const handleSearchChange = (event) => {
  const oldCountries = countries.filter(country => country.name.common.toLowerCase().includes(searchKey.toLowerCase()))
  setSearchKey(event.target.value)
  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
  if(JSON.stringify(oldCountries) !== JSON.stringify(filteredCountries)){
    setCountriesToShow(filteredCountries)

  }  
} 
    return (
      <div> 
          {text}   
          <input  
                value = {searchKey}
                onChange = {handleSearchChange}
          />
      </div>
    )
  }
  export default SearchFilter