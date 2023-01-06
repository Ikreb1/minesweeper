import React from 'react';
import './board.css';
import Tile from './tile.js';

class Board extends React.Component {
    rendertiles(i) {
        return (
        <Tile
            value={this.props.tiles[i]}
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

    renderBoard(boardWidth, boardHeight) {
        let board = [];
        for (let i = 0; i < boardHeight; i++) {
            let row = <div className="board-row">{this.renderRow(i, boardWidth)}</div>;
            board.push(row);
        }
        return board;
    }

    render() {
        return (
            <div>
                {this.renderBoard(this.props.width, this.props.height)}
            </div>
        );
    }
}

export default Board;