import React from 'react'

const Person = (props) => {
    return (
    <div>{props.person.name} {props.person.number}<br></br><br></br></div>)
  }

const Persons = ({ persons, nameFilter}) => {
    {var things = persons.filter(person => person.name.toLowerCase().includes(nameFilter.toLowerCase())).map(person => 
        <Person key={person.name} person={person} />
    )}
    return(things)
}

export default Persons