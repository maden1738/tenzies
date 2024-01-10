import React from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
       const [dice, setDice] = React.useState(allNewDice());
       const [tenzies, setTenzies] = React.useState(false);
       const [time, setTime] = React.useState({
              startTime: null,
              endTime: null,
       });
       const [totalTime, setTotalTime] = React.useState();

       React.useEffect(() => {
              const allHeld = dice.every((die) => die.isHeld);
              const firstValue = dice[0].value;
              const allSameValue = dice.every(
                     (die) => die.value === firstValue
              );
              if (allHeld && allSameValue) {
                     setTime({ ...time, endTime: new Date() }); // if game is over set the endTime
                     setTenzies(true);
              }
       }, [dice]);

       React.useEffect(() => {
              if (time.startTime && time.endTime) {
                     calculateTimeTaken();
              }
       }, [time]); // if both startTime and endTime is set, calculate total time

       function calculateTimeTaken() {
              const timeTaken = time.endTime - time.startTime;
              setTotalTime(timeTaken / 1000);
       }

       function generateNewDie() {
              return {
                     value: Math.ceil(Math.random() * 6),
                     isHeld: false,
                     id: nanoid(),
              };
       }

       function allNewDice() {
              const newDice = [];
              for (let i = 0; i < 10; i++) {
                     newDice.push(generateNewDie());
              }
              return newDice;
       }

       function rollDice() {
              if (!tenzies) {
                     setDice((oldDice) =>
                            oldDice.map((die) => {
                                   return die.isHeld ? die : generateNewDie();
                            })
                     );
              } else {
                     setTenzies(false);
                     setDice(allNewDice());
              }
       }

       function holdDice(id) {
              !time.startTime && setTime({ ...time, startTime: new Date() }); // setting startTime only when first die is hold
              setDice((oldDice) =>
                     oldDice.map((die) => {
                            return die.id === id
                                   ? { ...die, isHeld: !die.isHeld }
                                   : die;
                     })
              );
       }

       const diceElements = dice.map((die) => (
              <Die
                     key={die.id}
                     value={die.value}
                     isHeld={die.isHeld}
                     holdDice={() => holdDice(die.id)}
              />
       ));

       return (
              <main>
                     {tenzies && <Confetti />}
                     <h1 className="title">Tenzies</h1>
                     <p className="instructions">
                            Roll until all dice are the same. Click each die to
                            freeze it at its current value between rolls.
                     </p>
                     <div className="dice-container">{diceElements}</div>
                     <button className="roll-dice" onClick={rollDice}>
                            {tenzies ? "New Game" : "Roll"}
                     </button>
                     {tenzies && <p>You completed in {totalTime} seconds</p>}
              </main>
       );
}
