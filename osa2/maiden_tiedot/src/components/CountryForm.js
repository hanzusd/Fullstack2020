import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './Countries'

const CountryForm = ({countries, setCountries, countrySearch}) => {
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])
  return (<Countries countries={countries} countrySearch={countrySearch}/>)
}

export default CountryForm