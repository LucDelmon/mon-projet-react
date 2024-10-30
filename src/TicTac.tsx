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


function calculateWinner(squares: Squares): WinnerResult {
    const boardSize = Math.sqrt(squares.length); // Calculate the board size dynamically
    const lines: number[][] = [];

    // Generate row winning lines
    for (let row = 0; row < boardSize; row++) {
        const line = [];
        for (let col = 0; col < boardSize; col++) {
            line.push(row * boardSize + col);
        }
        lines.push(line);
    }

    // Generate column winning lines
    for (let col = 0; col < boardSize; col++) {
        const line = [];
        for (let row = 0; row < boardSize; row++) {
            line.push(row * boardSize + col);
        }
        lines.push(line);
    }

    // Generate top-left to bottom-right diagonal
    const topLeftBottomRight = [];
    for (let i = 0; i < boardSize; i++) {
        topLeftBottomRight.push(i * boardSize + i);
    }
    lines.push(topLeftBottomRight);

    // Generate top-right to bottom-left diagonal
    const topRightBottomLeft = [];
    for (let i = 0; i < boardSize; i++) {
        topRightBottomLeft.push(i * boardSize + (boardSize - 1 - i));
    }
    lines.push(topRightBottomLeft);

    // Check for a winner
    for (const line of lines) {
        const [first, ...rest] = line;
        if (squares[first] && rest.every(index => squares[index] === squares[first])) {
            return { winner: squares[first], winningMove: line };
        }
    }

    return { winner: null, winningMove: [] };
}


interface BoardProps {
    xIsNext: boolean;
    squares: Squares;
    onPlay: (nextSquares: Squares, position:[number, number]) => void;
    row_count: number;
}

function Board({xIsNext, squares, onPlay, row_count}: BoardProps) : React.ReactElement {
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
        const row = Math.floor(i / row_count) + 1;
        const col = i % row_count + 1;
        onPlay(nextSquares, [row, col]);
    }

    return (
        <>
            {Array(row_count).fill(null).map((_, rowIndex) => (
                <div className="board-row" key={rowIndex}>
                    {Array(row_count).fill(null).map((_, colIndex) => {
                        const index = rowIndex * row_count + colIndex;
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

interface TicTacProps {
    row_count: number;
}

function TicTac({row_count}: TicTacProps) : React.ReactElement {
    const SquaresCount = Math.pow(row_count, 2);
    const [history, setHistory] = useState<Array<HistoryEntry>>(
        [{ squares: Array(SquaresCount).fill(null), position: null }]
    );
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove]['squares'];
    const [isAscending, setIsAscending] = useState(true);
    function inverseState() {
        setIsAscending(prevState => !prevState);
    }
    const { winner } = calculateWinner(currentSquares);
    const gameIsFinished = winner !== null || currentMove === SquaresCount;

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
        <div className="tic-tac">
            <div className="status">{status}</div>

            <div className="game">
                <div className="game-board">
                    <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} row_count={row_count}/>
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
