import React from 'react'

const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
  const Total = ({ course }) => {
    var courses = course.parts
    const total = courses.reduce((sum, place) => {
      return sum + place.exercises
    }, 0)
    return <b>total of {total} exercises</b>
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.name} {props.exercises}
      </p>    
    )
  }
  
  const Content = ({ course }) => {
    var courses = course.parts
    var kurssit = courses.map(kurssi => <Part key={kurssi.id} name={kurssi.name} exercises={kurssi.exercises} />)
    return (kurssit)
  }
  
  const Course = ({course}) => {
    return (
      <div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
      </div>
    )
  }
  
  export default Course