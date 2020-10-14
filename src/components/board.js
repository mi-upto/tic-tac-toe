import React, { useState, useMemo, useCallback } from 'react';
import Square from '@/components/square';
import calculateWinner from '@/components/calculateWinner';

const Board = () => {
  console.log('render');
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

    const winner = calculateWinner(squares);
    const status = useMemo(() => {
      if (winner) {
        return `Winner: ${winner}`;
      } else {
        const nextPlayer = xIsNext ? "x" : "o";
        return `Next player: ${nextPlayer}`;
      }
    }, [xIsNext, winner]);

    const handleClick = useCallback((index) => {
    if (calculateWinner(squares) || squares[index]) {
      return;
    }

    setSquares((oldSquares) => {
      const newSquares = [...oldSquares];
      newSquares[index] = xIsNext ? 'x' : 'o';
      return newSquares
    })
    setXIsNext(!xIsNext);
  }, [squares, xIsNext])

  const renderSquare = useCallback(
    (index) => {
      return <Square value={squares[index]} onClick={() => handleClick(index)} />;
    },
    [squares, handleClick]
  );

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
    );
}

export default Board;

// export default class Board extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       squares: Array(9).fill(null),
//       xIsNext: true,
//     };
//   }

//   handleClick(i) {
//     // squares を直接変更しないよう slice で配列のコピーを作成
//     const squares = this.state.squares.slice();

//     if (calculateWinner(squares) || squares[i]) {
//       return;
//     }

//     squares[i] = this.state.xIsNext ? "x" : "o";
//     this.setState({
//       squares: squares,
//       xIsNext: !this.state.xIsNext,
//     });
//   }

//   renderSquare(i) {
//     return (
//       <Square
//         value={this.state.squares[i]}
//         onClick={() => this.handleClick(i)}
//       />
//     );
//   }

//   render() {
//     const winner = calculateWinner(this.state.squares);
//     let status = '';

//     if (winner) {
//       status = `Winner: ${winner}`;
//     } else {
//       const nextPlayer = this.state.xIsNext ? 'x' : 'o';
//       status = `Next player: ${nextPlayer}`;
//     }

//     return (
//       <div>
//         <div className="status">{status}</div>
//         <div className="board-row">
//           {this.renderSquare(0)}
//           {this.renderSquare(1)}
//           {this.renderSquare(2)}
//         </div>
//         <div className="board-row">
//           {this.renderSquare(3)}
//           {this.renderSquare(4)}
//           {this.renderSquare(5)}
//         </div>
//         <div className="board-row">
//           {this.renderSquare(6)}
//           {this.renderSquare(7)}
//           {this.renderSquare(8)}
//         </div>
//       </div>
//     );
//   }
// }
