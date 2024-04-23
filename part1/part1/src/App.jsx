const Header = (props) => {
  console.log(props)
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = (props) => {
  console.log(props)
  return (
  <div>   
     <p>
        <Part part = {props.part1} exercises = {props.exercises1}/>
      </p>
      
      <p>
        <Part part = {props.part2} exercises = {props.exercises2}/>
      </p>
      <p>
        <Part part = {props.part2} exercises = {props.exercises2}/>
      </p>
  </div>
  )
}

const Part = (props) => {
  console.log(props)
  return(
    <div>
      <p>{props.part} {props.exercises}</p>
    </div>
  )
}

const Total = (props) => {
  console.log(props)
 return(
  <div>
  <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
</div>
 )
}

const App = () => {
  const course = 'Half Stack application development'

  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },

    {
      name: 'Using props to pass data',
      exercises: 7
    },

    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course = {course}/>
      <Content part1 = {parts[0].name} exercises1 = {parts[0].exercises} part2 = {parts[1].name} exercises2 = {parts[1].exercises} part3 = {parts[2].name} exercises3 = {parts[2].name} />
      <Total exercises1 = {parts[0].exercises} exercises2 = {parts[1].exercises} exercises3 = {parts[2].exercises} />
    </div>
  )
  
}

export default App