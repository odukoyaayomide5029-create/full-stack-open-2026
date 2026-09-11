import { useState } from 'react'
const Buttons=({onClick,text})=>{
return(
  <>
  <button onClick={onClick}> {text}</button>
    
  </>
)
}
const Statistics = ({good,bad,neutral})=>{
 const total = good + bad + neutral
 if (total===0){
  return(
  <p>No feedback given</p>
  )
 }
 return(
  <>
  <h1>STATISTICS</h1>
  <table>
    <tbody>
      <tr><td>Good</td><td>{good}</td></tr>
      <tr><td>Neutral</td><td>{neutral}</td></tr>
      <tr><td>Bad</td><td>{bad}</td></tr>
      <tr><td>Total</td><td>{total}</td></tr>
      <tr><td>Average</td><td>{total > 0 ? (good - bad) / total : 0}</td></tr>
      <tr><td>Positive</td><td>{total > 0 ? (good / total) * 100 : 0}%</td></tr>
    </tbody>
  </table>
</>
 )
}







const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>
      <Buttons onClick={(()=>{setGood(good+1)})} text="good"/>
          <Buttons onClick={(()=>{setNeutral(neutral+1)})} text="neutral" />
              <Buttons onClick={(()=>{setBad(bad+1)})}  text="bad"/>
              <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App