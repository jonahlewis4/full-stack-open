import { useState } from 'react'


//create a Button component

const Button = ({handleClick, text}) =>
{
  return (
    <button onClick = {handleClick}>{text}</button>
  )
}



const Statistics = ({good, neutral, bad}) => {
    if(good != 0 || neutral != 0 || bad != 0)
    {
      return (
        <div>  
          <h1>statistics</h1>
          <div>good {good}</div>
          <div>neutral {neutral}</div>
          <div>bad {bad}</div>
          <div>all {good + bad + neutral}</div>
          <div>average {(good - bad) / (good + bad + neutral)}</div>
          <div>positive {good / (good + bad + neutral) * 100} %</div>
        </div>
      )
    }
    else{
      return (
        <div>
          <h1>statistics</h1>
          <p>No feedback given</p>
        </div>
      )    
    }
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
      <Statistics good = {good} neutral = {neutral} bad = {bad}/>
    </div>
  )
}

export default App