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
        <h2>{course.name}</h2>
      
        <Content parts = {course.parts}/>
        <Total parts = {course.parts}/>
      </div>
    
    )
  }

  export default Course