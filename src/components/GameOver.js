import React, { useContext } from 'react';
import { AppContext } from '../App';

const GameOver = () => {
    const { gameOver, currAttempt, correctWord } = useContext(AppContext)
    return (
        <div className='gameOver'>
            <h3>{gameOver.gussedWord ? "You Correctly gussed" : "You failed"}</h3>
            <h1>Correct: {correctWord}</h1>
            {gameOver.gussedWord && (<h3>You gussed in {currAttempt.attempt} attmepts!</h3>)}
        </div>
    )
}

export default GameOver