import React, { useEffect, useState } from 'react'
import "./App.css";
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import { createContext } from 'react';
import { boardDefault, generateWordSet } from './Words'
import GameOver from './components/GameOver';

export const AppContext = createContext();

const App = () => {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0 });
  const [wordSet, setWordSet] = useState(new Set());
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [correctWord, setCorrectWord] = useState("");
  const [gameOver, setGameOver] = useState({ gameOver: false, gussedWord: false, });

  useEffect(() => {
    generateWordSet().then((words) => {
      // console.log(words.wordSet);
      setWordSet(words.wordSet);
      // console.log(words.todaysWord);
      setCorrectWord(words.todaysWord);
    });
  }, []);

  const onSelectLetter = (keyVal) => {
    if (currAttempt.letterPos > 4) return;
    const newBoard = [...board]
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos + 1 })
  }

  const onEnter = () => {
    if (currAttempt.letterPos !== 5) return;

    let currWord = "";
    for (let i = 0; i < 5; i++) {
      currWord += board[currAttempt.attempt][i];
    }
    currWord = currWord.toLowerCase();
    if (wordSet.has(currWord)) {
      setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 });
    } else {
      alert("Word not found");
    }

    if (currWord === correctWord) {
      setGameOver({ gameOver: true, gussedWord: true });
      return;
    }

    if (currAttempt.attempt === 5) {
      setGameOver({ gameOver: true, gussedWord: false });
    }
  };

  const onDelete = () => {
    if (currAttempt.letterPos === 0) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = "";
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos - 1 });
  }


  return (
    <div className='App'>
      <nav>
        <h1>Wordle</h1>
      </nav>
      <AppContext.Provider value={{
        board,
        setBoard,
        currAttempt,
        setCurrAttempt,
        onSelectLetter,
        onEnter,
        onDelete,
        correctWord,
        disabledLetters,
        setDisabledLetters,
        gameOver,
        setGameOver
      }}>
        <div className='game'>
          <Board />
          {gameOver.gameOver ? <GameOver /> : <Keyboard />}
        </div>
      </AppContext.Provider>
    </div>
  )
}

export default App