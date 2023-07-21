import React, { useState } from "react";
import { createRoot } from "react-dom/client";


const Button = ({clickHandler, text}) => 
    <button onClick= {clickHandler}> {text}</button>

const Anecdote= ({anecdote}) => { 
  return (
  <>
    <p>{anecdote.anecdote}</p>
    <p>Has {anecdote.votes} votes</p>
  </>
  )}

const App = ({anecdotes}) => {
  
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(-1)

  
  const randomSelect = (max) => {
      setSelected(getRandomInt(max))
  } 

  const getRandomInt = (max) =>  {
    return Math.floor(Math.random() * max);
  }

  
  const increaseVotesByOne = (anecdote) => {
      let copy = anecdote
      setVotes(copy.votes++)
      anecdote = {...copy, votes}
  }


  const getMaxAnecdote=  () => anecdotes.reduce((max, current) => 
        current.votes > max.votes ? max = current : max)
  

  return (
    <>
  
    <div>
      <h2>Anecdote of the day</h2>
      <Anecdote anecdote= {anecdotes[selected]}/>
    </div>
      <Button clickHandler={() => randomSelect(anecdotes.length)} text= "Next anecdote"/>
      <Button clickHandler={() => increaseVotesByOne(anecdotes[selected])} text= "Vote"/>
    <div>
      <h2>Anecdote with most votes</h2>
      <Anecdote anecdote= {getMaxAnecdote()}/>
    </div>
    </>
  )
}

const anecdotes = [
  {anecdote: 'If it hurts, do it more often.', votes: 0},
  {anecdote: 'Adding manpower to a late software project makes it later!', votes: 0},
  {anecdote: 'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', votes: 0},
  {anecdote: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', votes: 0},
  {anecdote: 'Premature optimization is the root of all evil.', votes: 0},
  {anecdote: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', votes: 0},
  {anecdote: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.', votes: 0},
  {anecdote: 'The only way to go fast, is to go well.', votes:0}
]



const root = createRoot(document.getElementById("root"));
root.render(<App anecdotes = {anecdotes}/>);
