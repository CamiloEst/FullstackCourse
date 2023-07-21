import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import './index.css'

const Title = ({ title }) => <h2>{title}</h2>;

const Button = ({ text, onClick }) => <button onClick={onClick}> {text}</button>

const Buttons = ({states}) => {

  const increaseByOne = (counter, setFunction) => 
    setFunction(counter + 1);

  return (
  <>
      <Button onClick={() => increaseByOne(states.good, states.setGood)}
         text= "Good"/>

      <Button onClick={() => increaseByOne(states.neutral, states.setNeutral)}
        text= "Neutral"/>

      <Button onClick={() => increaseByOne(states.bad, states.setBad)}
        text= "Bad"/>
  </>
  )
}

const StatisticCell = ({ name, total }) => {
  return (
   <>
      <td>{name}</td> 
      <td> {total}</td>
   </>
  )
};

const StatisticsRow = (props) => props.statistics.map(statistic => {
  return (
  <tr key={statistic.name}>
    <StatisticCell   name={statistic.name}  total={statistic.total}/>
  </tr>
)}
)

const StatisticsTable = ({ good, neutral, bad }) => {
  
  const all = good + neutral + bad;

  const statistics = [
    { name: "good", total: good },
    { name: "neutral", total: neutral },
    { name: "bad", total: bad },
    { name: "all", total: all },
    { name: "average", total: (good - bad) / all},
    { name: "positive", total: (good * 100) / all },
  ];

  return  all === 0 ? <p>No feedback given</p> :
   <table> 
    <tbody>
      <StatisticsRow statistics = {statistics} />
   </tbody>
   </table>
};



const App = () => {

  const feedBackTitle = "Give feedback";
  const statisticsTitle = "Statics";

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const states = {good, setGood, neutral, setNeutral ,bad, setBad}


  return (
    <>
      <Title title={feedBackTitle} />

      <Buttons states={states} />

      <Title title={statisticsTitle} />

      <StatisticsTable good={good} neutral={neutral} bad={bad} />
    </>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);