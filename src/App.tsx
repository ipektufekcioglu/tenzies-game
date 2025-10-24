import { useState } from 'react'
import type { JSX } from "react"
import Die from "./components/Die"
import Confetti from "react-confetti"

export default function App(): JSX.Element {

  const [isClicked, setIsClicked] = useState(new Array(10).fill(false))
  const [diceValues, setDiceValues] = useState(new Array(10).fill(0).map(() => getDieValue()))
  const [chosenDieValue, setChosenDieValue] = useState<number | null>(null)

  const isGameWon = isClicked.filter((item) => item === false).length > 0 ? false : true

  const diceElements: JSX.Element[] = diceValues.map((value: number, index: number): JSX.Element => {
      return (
          <Die 
            key={index}
            isClicked={isClicked[index]} 
            dieValue={value} 
            handleClick={() => handleClick(index)}
          />
      )
  })

  function getDieValue(): number {
      return Math.floor(Math.random() * 6) + 1
  }

  function handleClick(id: number): void {
      setIsClicked(prev => {
          if (chosenDieValue === null) {
            setChosenDieValue(diceValues[id]) 
            return prev.map((_, index) => id === index)
          }
          if (chosenDieValue === diceValues[id]) {
            return prev.map((value, index) => id === index ? true : value)
          }
          return prev
        })
  }

  function handleRoll(): void {
    if (!isGameWon) {
      setDiceValues((prev) => prev.map((num, index) => isClicked[index] ? num : getDieValue()))
    } else {
      setDiceValues(new Array(10).fill(0).map(() => getDieValue()))
      setIsClicked(new Array(10).fill(false))
      setChosenDieValue(null)
    }
  }

  return (
    <div className='game-container'>
        {isGameWon && <Confetti/>}
        {isGameWon && <p style={{color: "#59E391"}}>🎉 Congratulations! You won! Press "New Game" to start again. 🎉</p>}
        <h1>Tenzies</h1>
        <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className='dice-container'>
          {diceElements}
        </div>
        <button className='roll-btn' onClick={handleRoll}>{isGameWon ? "New Game" : "Roll"}</button>

    </div>
  )
}