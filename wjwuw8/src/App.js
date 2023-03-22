import React, { Component }  from 'react';
import { useState } from 'react';


function Square({value, onSquareClick}) {
  return (
  <button 
    className="square"
    onClick={onSquareClick}
  >
    {value}
  </button>
  );
}

function checkWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let line of lines) {

    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c] && squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Board({ xIsNext, squares, onPlay }) {
  // const [squares, setSquares] = useState(Array(9).fill(null));
  // const [xIsNext, setXIsNext] = useState(true);

  const winner = checkWinner(squares);
  let status;
  if (winner) {
    status = "Winner is " + winner;
  } else {
    status = "Next player is " + (xIsNext ? "X" : "O");
  }

  function handleSquareClick(id) {
    if(squares[id] || checkWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[id] = "X";
    } else {
      nextSquares[id] = "O"
    }
    onPlay(nextSquares)
  }

  return (
    <div>
      <div className="status">{status}</div>

      <div className="board-row">
        <Square value={squares[0]} onSquareClick = {() => handleSquareClick(0)} />
        <Square value={squares[1]} onSquareClick = {() => handleSquareClick(1)}/>
        <Square value={squares[2]} onSquareClick = {() => handleSquareClick(2)}/>
      </div>

      <div className="board-row">
        <Square value={squares[3]} onSquareClick = {() => handleSquareClick(3)}/>
        <Square value={squares[4]} onSquareClick = {() => handleSquareClick(4)}/>
        <Square value={squares[5]} onSquareClick = {() => handleSquareClick(5)}/>
      </div>

      <div className="board-row">
        <Square value={squares[6]} onSquareClick = {() => handleSquareClick(6)}/>
        <Square value={squares[7]} onSquareClick = {() => handleSquareClick(7)}/>
        <Square value={squares[8]} onSquareClick = {() => handleSquareClick(8)}/>
      </div>
      
    </div>
  );
}


export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove]

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1)
    setXIsNext(!xIsNext);

  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove)
    setXIsNext(nextMove%2 === 0)
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });


  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}