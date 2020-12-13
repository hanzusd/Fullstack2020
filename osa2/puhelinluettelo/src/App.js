import React, { useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import './index.css'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ nameFilter, setNameFilter ] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const handleNameFilter = (event) => {
    setNameFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <div>
        <Notification message={errorMessage} />
        <Filter nameFilter={nameFilter} handleNameFilter={handleNameFilter} />
      <h2>Add new</h2>
        <PersonForm persons={persons} setPersons={setPersons} setErrorMessage={setErrorMessage}/>
        </div>
        <form>
      </form>
      <h2>Numbers</h2>
      <Persons persons={persons} nameFilter={nameFilter} setPersons={setPersons} setErrorMessage={setErrorMessage} />
    </div>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  if (message.error) {
    return (
      <div className="error">
        {message.msg}
      </div>
    )
  } else {
    return (
     <div className="success">
       {message.msg}
      </div>
  )
  }
}

export default App