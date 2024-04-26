const Header = (props) => {
  console.log(props)
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = ({parts}) => {
  console.log(parts)
  return (
  <div>   
      
    {parts.map( (part) => <Part part = {part}/>)}
  </div>
  )
}

const Part = ({part}) => {
  console.log(part)
  console.log(part.exercises)
  return(
      <p>{part.name} {part.exercises}</p>
  )
}

const Total = (props) => {
  console.log(props)
 return(
  <div>
    <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
  </div>
 )
}

const Course = ({course}) =>{
  console.log(course)

  return (
    <div>
      <h1>{course.name}</h1>
    
      <Content parts = {course.parts}/>
    </div>
  
  )
}

const App = () => {
  const course = {
  
    name: 'Half Stack application development',

    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },

      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2

      },

      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }
  return (
    <Course course = {course} />
  )
  
}

export default App