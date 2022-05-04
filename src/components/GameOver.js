import React, { useContext } from 'react';
import { AppContext } from '../App';

const GameOver = () => {
    const { gameOver, currAttempt, correctWord } = useContext(AppContext)
    return (
        <p class="lead">
            {/* <div className='gameOver'> */}
            {gameOver.gussedWord ? "You Correctly Gussed " : "You failed"}
            <br></br>
            Correct word: '{correctWord}'
            <br></br>
            {gameOver.gussedWord && (<p>You gussed in {currAttempt.attempt} attmepts!</p>)}
            <button className='btn btn-outline-warning' onClick={() => window.location.reload(false)}>Click to reload!</button>
            {/* </div > */}
        </p>
    )
}

export default GameOver