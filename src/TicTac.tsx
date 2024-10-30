import React, {useMemo} from "react";
import "./TicTac.css";
import { useState } from 'react';

interface SquareProps {
    value: string|null;
    onSquareClick: () => void;
    winningMove: boolean;
}

function Square({value,onSquareClick, winningMove}: SquareProps) : React.ReactElement {
    return (
        <button
            className={`square ${winningMove ? 'winning' : ''}`}
            onClick={onSquareClick}
        >
            {value}
        </button>
    );
}
type SquareValue = string | null;
type Squares = Array<SquareValue>;
interface WinnerResult {
    winner: string | null;
    winningMove: number[];
}
interface HistoryEntry {
    squares: Squares;        // The board state after the move
    position: [number, number] | null; // The position of the move in (row, col) format
}


function calculateWinner(squares: Squares) : WinnerResult {
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
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return { winner: squares[a], winningMove:lines[i] };
        }
    }
    return { winner: null, winningMove: [] };
}

interface BoardProps {
    xIsNext: boolean;
    squares: Squares;
    onPlay: (nextSquares: Squares, position:[number, number]) => void;
}

function Board({xIsNext, squares, onPlay}: BoardProps) : React.ReactElement {
    const { winner, winningMove } = useMemo(() => calculateWinner(squares), [squares]);
    function handleClick(i: number) {

        if (squares[i] !== null || winner !== null) {
            return;
        }
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = "X";
        } else {
            nextSquares[i] = "O";
        }
        const row = Math.floor(i / 3) + 1;
        const col = i % 3 + 1;
        onPlay(nextSquares, [row, col]);
    }

    return (
        <>
            {Array(3).fill(null).map((_, rowIndex) => (
                <div className="board-row" key={rowIndex}>
                    {Array(3).fill(null).map((_, colIndex) => {
                        const index = rowIndex * 3 + colIndex;
                        return (
                            <Square
                                key={index}
                                value={squares[index]}
                                onSquareClick={() => handleClick(index)}
                                winningMove={winningMove.includes(index)}
                            />
                        );
                    })}
                </div>
            ))}
        </>
    );

}

interface ToggleButtonProps {
    onToggle: () => void;
}
function ToggleButton({onToggle}: ToggleButtonProps) {
    return <button onClick={onToggle}>Toogle order</button>
}

function TicTac() {
    const [history, setHistory] = useState<Array<HistoryEntry>>(
        [{ squares: Array(9).fill(null), position: null }]
    );
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove]['squares'];
    const [isAscending, setIsAscending] = useState(true);
    function inverseState() {
        setIsAscending(prevState => !prevState);
    }
    const { winner } = calculateWinner(currentSquares);
    const gameIsFinished = winner !== null || currentMove === 9;

    function handlePlay(nextSquares: SquareValue[], position: [number, number]) {
        setHistory((prevHistory) => [
            ...prevHistory.slice(0, currentMove + 1),
            { squares: nextSquares, position }
        ]);
        setCurrentMove((prevMove) => prevMove + 1);
    }


    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }

    function jumpTo(nextMove: number) {
        setCurrentMove(nextMove);
    }

    const moves: React.ReactElement[]  = history.map((entry, move) => {
        const [row, col] = entry.position || [null, null];
        const positionText = row !== null && col !== null ? ` (${row}, ${col})` : '';
        let line;

        if (move === currentMove) {
            line = <span>{`You are at move #${move}${positionText}`}</span>;
        }
        else if (move > 0) {
            line = <button onClick={() => jumpTo(move)}>{`Go to move #${move}${positionText}`}</button>;
        } else {
            line = <button onClick={() => jumpTo(move)}>Go to game start</button>
        }
        return (
            <li key={move}>
                {line}
            </li>
        );
    });

    return (
        <div className="TicTac">
            <div className="status">{status}</div>

            <div className="game">
                <div className="game-board">
                    <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
                </div>
                {gameIsFinished && (
                    <div className="game-info">
                        <br />
                        Game is Finished
                    </div>
                )}
                <div className="game-info">
                    <ul className="game-moves">{isAscending ? moves : moves.reverse()}</ul>
                </div>
                <div className="toogle-list-order">
                    <ToggleButton onToggle={inverseState}/>
                </div>
            </div>
        </div>
    );
}

export default TicTac;
