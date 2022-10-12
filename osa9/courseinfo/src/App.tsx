const App = () => {
  const courseName = "Half Stack application development";
  const courseParts:CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts}/>
    </div>
  )
};

interface HeaderProps {
  name: string;
}

interface CoursePart {
  name: string;
  exerciseCount: number;
}

interface ContentProps {
  parts: CoursePart[];
}

const Header = (props:HeaderProps) => {
  return <h1>{props.name}</h1>
}

const Content = (props:ContentProps) => {
  return (
  <div>
    <p>
      {props.parts[0].name} {props.parts[0].exerciseCount}
    </p>
    <p>
      {props.parts[1].name} {props.parts[1].exerciseCount}
    </p>
    <p>
      {props.parts[2].name} {props.parts[2].exerciseCount}
    </p>
  </div>)
}

const Total = (props:ContentProps) => {
  return(
    <div>
      <p>
        Number of exercises{" "}
        {props.parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  )
}

export default App;