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

  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }


  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }


 

  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course = {course}/>
      <Content part1 = {part1.name} exercises1 = {part1.exercises} part2 = {part2.name} exercises2 = {part2.exercises} part3 = {part3.name} exercises3 = {part3.name} />
      <Total exercises1 = {part1.exercises} exercises2 = {part2.exercises} exercises3 = {part3.exercises} />
    </div>
  )
  
}

export default App