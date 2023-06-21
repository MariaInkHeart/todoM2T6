import React, {useState} from 'react';
import Board from './Board';
import { calculateWinner } from '../winner';
import PropTypes from 'prop-types';

const Game = ()=>{
    const [board, setBoard] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext]= useState(true);
    const winner = calculateWinner(board);
    
    const handleClick= (index)=> {
        const boardCopy =[...board];
        if (winner || boardCopy[index]) return
        boardCopy[index]= xIsNext? 'X' : 'O'
        setBoard(boardCopy)
        setXIsNext(!xIsNext)
    }

handleClick.propTypes ={
        index: PropTypes.number
    }
    const startNewGame = () => {
        return (
          <button
            className="start_btn"
            onClick={() => setBoard(Array(9).fill(null))}
          >
            Новая игра
          </button>
        );
      };
    
    const totalFinal = () =>{
        if(winner){
            return <p> Победа  {winner} </p>
        } else if (winner === "дружбы"){
           return <p>Ничья</p>
        } else{
           return <p>Ход: {(xIsNext? 'X': 'O')}</p>
        }
    }

    return(
        <div className='wrapper'>
            <p className='gameInfo'>{totalFinal()}</p>
<Board squares={board} click={handleClick}/>
{startNewGame()}
        </div>
    )
}

export default Game