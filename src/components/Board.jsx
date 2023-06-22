import React from 'react';
import Square from './Square';
import PropTypes from 'prop-types';

const Board = ({squares, click})=>{
    return(
        <div className='board'>
           {squares.map((square, index)=>(
        <Square key={index} value={square} onClick={()=>click(index)}/>
           ))}

        </div>
    )
};

Board.propTypes ={
    squares: PropTypes.array,
    click: PropTypes.func,
}

export default Board