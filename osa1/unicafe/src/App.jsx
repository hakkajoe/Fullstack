import { useState } from 'react'

const StatisticLine = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
)

const Statistics = (props) => {
  const {good, neutral, bad, total, list} = props

  const handleAverage = () => {
    if (list.length === 0) {
      return 0
    }
    const sum = list.reduce((acc, value) => acc + value, 0)
    return sum / list.length
  }

  const handlePositive = () => {
    if (total === 0) {
      return 0
    }
    return (good / total) * 100 + ' %'
  }

  if (list.length === 0) {
    return ('No feedback given')
  }
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value ={good} />
        <StatisticLine text="neutral" value ={neutral} />
        <StatisticLine text="bad" value ={bad} />
        <StatisticLine text="total" value ={total} />
        <StatisticLine text="average" value ={handleAverage()} />
        <StatisticLine text="positive" value ={handlePositive()} />
      </tbody>
    </table>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [list, setList] = useState([])

  const handleFeedback = (value) => {
    const updatedValue = value + 1
    if (value === 0) {
      const updatedNeutral = neutral + 1;
      setNeutral(updatedNeutral);
      setTotal(updatedNeutral + good + bad);
      setList(list.concat(0));
    } 
    else if (value === 1) {
      const updatedGood = good + 1;
      setGood(updatedGood);
      setTotal(updatedGood + neutral + bad);
      setList(list.concat(1));
    } 
    else {
      const updatedBad = bad + 1;
      setBad(updatedBad);
      setTotal(updatedBad + neutral + good);
      setList(list.concat(-1));
    }
  }

  return (
    <div>
      <h1>
        <b>give feedback</b>
      </h1>
      <p>
        <Button handleClick={() => handleFeedback(1)} text="good" />
        <Button handleClick={() => handleFeedback(0)} text="neutral" />
        <Button handleClick={() => handleFeedback(-1)} text="bad" />
      </p>
      <h1>
        <b>statistics</b>
      </h1>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} list={list}/>
    </div>
  )
}

export default App