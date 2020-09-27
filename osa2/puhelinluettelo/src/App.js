import React, { useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ nameFilter, setNameFilter ] = useState('')

  const handleNameFilter = (event) => {
    setNameFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <div>
          <Filter nameFilter={nameFilter} handleNameFilter={handleNameFilter} />
      <h2>Add new</h2>
          <PersonForm persons={persons} setPersons={setPersons}/>
        </div>
        <form>
      </form>
      <h2>Numbers</h2>
      <Persons persons={persons} nameFilter={nameFilter} />
    </div>
  )

}

export default App