import React, { useState } from 'react'
import Countries from './components/Countries'
import CountryForm from './components/CountryForm'
import Filter from './components/Filter'

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ countrySearch, setCountrySearch ] = useState('')

  const handleCountrySearch = (event) => {
    setCountrySearch(event.target.value)
  }
  
  return (
    <div>
      <h2>Countries search</h2>
      <Filter countrySearch={countrySearch} handleCountrySearch={handleCountrySearch}/>
      <CountryForm countries={countries} setCountries={setCountries} countrySearch={countrySearch} setCountrySearch={setCountrySearch} />
    </div>
  )
}

export default App;
