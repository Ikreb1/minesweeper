import React from 'react';
import './board.css';
import Tile from './tile.js';

class Board extends React.Component {
    rendertiles(i) {
        return (
        <Tile
            tile={this.props.tiles[i]}
            onClick={() => this.props.onClick(i)}
            onContextMenu={() => this.props.onContextMenu(i)}
        />
        );
    }

    renderRow(colum, rowLength) {
        let row = [];
        for (let i = 0; i < rowLength; i++) {
            row.push(this.rendertiles(colum * rowLength + i));
        }
        return row;
    }

    renderBoard() {
        let board = [];
        const boardWidth = this.props.width;
        const boardHeight = this.props.height;
        for (let i = 0; i < boardHeight; i++) {
            let row = <div className="board-row"><div className='borderLeftRight'/>{this.renderRow(i, boardWidth)}<div className='borderLeftRight'/></div>;
            board.push(row);
        }
        return board;
    }

    render() {
        return (
                this.renderBoard()
        );
    }
}

export default Board;