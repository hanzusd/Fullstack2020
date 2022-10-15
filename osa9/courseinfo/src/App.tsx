interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CourseNormalPart extends CourseDescriptionBase {
  type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CourseDescriptionBase {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CourseDescriptionBase {
  type: "special";
  requirements: Array<string>;
}

interface CourseDescriptionBase extends CoursePartBase {
  description: string;
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the easy course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the hard course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
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

interface ContentProps {
  parts: CoursePart[];
}

interface PartProps {
  part: CoursePart;
}

const Header = (props:HeaderProps) => {
  return <h1>{props.name}</h1>
}

const Content = (props:ContentProps) => {
  return (<div>
  {props.parts.map(part =>
    <div key={part.name}>
    <Part part={part}/>
    </div>
  )}
  </div>)
}

const Part = (props:PartProps) => {
    switch (props.part.type) {
      case "normal":
        return (
        <div style={{marginBottom: "1rem"}}>
          <div style={{fontWeight: "bold"}}>{props.part.name} {props.part.exerciseCount}</div>
          <div style={{fontStyle: "italic"}}>{props.part.description}</div>
        </div>)
      break;
      case "groupProject":
        return (
        <div style={{marginBottom: "1rem"}}>
          <div style={{fontWeight: "bold"}}>{props.part.name} {props.part.exerciseCount}</div>
          <div>project exercises {props.part.groupProjectCount}</div>
        </div>)
      break;
      case "submission":
        return (
        <div style={{marginBottom: "1rem"}}>
          <div style={{fontWeight: "bold"}}>{props.part.name} {props.part.exerciseCount}</div>
          <div style={{fontStyle: "italic"}}>{props.part.description}</div>
          <div>submit to {props.part.exerciseSubmissionLink}</div>
        </div>)
      break;
      case "special":
        return (
        <div style={{marginBottom: "1rem"}}>
          <div style={{fontWeight: "bold"}}>{props.part.name} {props.part.exerciseCount}</div>
          <div style={{fontStyle: "italic"}}>{props.part.description}</div>
          <div>required skills:{props.part.requirements.map(req => " "+req)}</div>
        </div>)
      break;
      default:
        return assertNever(props.part)
    }

}

const Total = (props:ContentProps) => {
  return(
    <div>
      <div>
        Number of exercises{" "}
        {props.parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </div>
    </div>
  )
}

export default App;