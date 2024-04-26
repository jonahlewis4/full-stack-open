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

const Total = ({parts}) => {
 return(
    <strong>total of {parts.reduce((sum, part) => {return(sum + part.exercises)}, 0)} exercises</strong>
 )
}

const Course = ({course}) =>{
  console.log(course)

  return (
    <div>
      <h1>{course.name}</h1>
    
      <Content parts = {course.parts}/>
      <Total parts = {course.parts}/>
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
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }
  return (
    <Course course = {course} />
  )
  
}

export default App