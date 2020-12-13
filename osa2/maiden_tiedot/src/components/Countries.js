import React from 'react'

const Countries = ({countries, countrySearch, setCountrySearch}) => {
  {var things = countries.filter(country => country.name.toLowerCase().includes(countrySearch.toLowerCase()))}

  if (things.length > 10) {
    return(<div>Too many matches, please add another filter.</div>)
  } else {
    if(things.length === 1) {
      return(<FullCountry country={things}/>)
    } else {
    return(things.map(country => <Country key={country.name} country={country} setCountrySearch={setCountrySearch}/>))
    }
  }
}

const Country = ({country, setCountrySearch}) => {
  return(<div>{country.name} <button onClick={() => setCountrySearch(country.name)}>show</button><br/></div>)
}

const FullCountry = ({country}) => {
  return(<div>
    <h2>{country[0].name}</h2>
    capital {country[0].capital} <br/>
    population {country[0].population} <br />
    <b>languages</b> <br/>
    <Lang languages={country[0].languages}/>
    <img src={country[0].flag} alt="flag" width="150" height="100"></img>
  </div>)
}

const Lang = ({languages}) => {
  {var lang = languages.map(language => <Language key={language.name} language={language}/>) }
  return lang
}

const Language = ({language}) => {
  return (<li>{language.name}</li>)
}


export default Countries 