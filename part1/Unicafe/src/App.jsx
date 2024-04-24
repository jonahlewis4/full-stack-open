import { useState } from 'react'


//create a Button component

const Button = ({handleClick, text}) =>
{
  return (
    <button onClick = {handleClick}>{text}</button>
  )
}

const DisplayValue = ({text, value}) => {
  return (
    <div>{text} {value}</div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  //create button functions to handle when buttons are clicked. These return functions!
  const updateGood = (value) => () => setGood(value)
  const updateNeutral = (value) => () => setNeutral(value)
  const updateBad = (value) => () => setBad(value)


  

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick = {updateGood(good + 1)} text = "good"/>
      <Button handleClick = {updateNeutral(neutral + 1)} text = "neutral"/>
      <Button handleClick = {updateBad(bad + 1)} text = "bad"/>
      
      <DisplayValue text = "good" value = {good}/>
      <DisplayValue text = "neutral" value = {neutral}/>
      <DisplayValue text = "bad" value = {bad}/>
    
    </div>
  )
}

export default App