import "./board.css"
import React from 'react';
import Board from './board.js';
import BoardHeader from './boardHeader.js'
import BoardFooter from "./BoardFooter";

class Game extends React.Component {
    defaultState() {
        let initTiles = () => {
            let tiles = []
            for (let i = 0; i < this.props.height * this.props.width; i++) {
                tiles.push({
                    isBomb: false,
                    isFlagged: false,
                    isRevealed: false,
                    AdjacentBombCount: 0
                });
            }
            return tiles;
        } 
        return {
            bombCount: this.props.bombInitialCount,
            bombState: Array(this.props.height * this.props.width).fill(false),
            history: [
                {
                    tiles: initTiles()
                }
            ],
            stepNumber: 0,
            isGameOver: false,
            startTime : new Date(),
        };
    }
    constructor(props) {
        super(props);
        this.reset = this.reset.bind(this);
        this.state = this.defaultState();
    }

    generateBombs(index) {
        let invalidBombPlacements = this.getAdjacentIndexes(index);
        invalidBombPlacements.push(index);

        let bombState = Array(this.props.height * this.props.width).fill(false);
        let bombCount = this.state.bombCount;
        while (bombCount > 0) {
            let index = Math.floor(Math.random() * bombState.length);
            if (invalidBombPlacements.includes(index)) {
                continue;
            }
            if (bombState[index] === false) {
                bombState[index] = true;
                bombCount--;
            }
        }
        this.setState({
            bombState: bombState
        });
        return bombState;
    }

    getCardinalAdjacentIndexes(index) {
        let validIndexes = [];
        const width = this.props.width;
        const height = this.props.height;
        let row = index % width;
        let column = Math.floor(index / width);

        if (row - 1 >= 0)
        {
            let middleLeft = (row - 1) + column * width;
            validIndexes.push(middleLeft);
        }

        if (column - 1 >= 0)
        {
            let topMiddle = (row) + (column - 1) * width;
            validIndexes.push(topMiddle);
        }

        if (row + 1 < width)
        {
            let middleRight = (row + 1) + (column) * width;
            validIndexes.push(middleRight);
        }

        if (column + 1 < height)
        {
            let bottomMiddle = (row) + (column + 1) * width;
            validIndexes.push(bottomMiddle);
        }

        return validIndexes;
    }

    // need a version the returns only cardinal direction tiles
    getAdjacentIndexes(index) {
        let validIndexes = [];
        const width = this.props.width;
        const height = this.props.height;
        let row = index % width;
        let column = Math.floor(index / width);
        
        if (row - 1 >= 0 && column - 1 >= 0)
        {
            let topLeft = (row - 1) + (column - 1) * width;
            validIndexes.push(topLeft);
        }
        if (row - 1 >= 0)
        {
            let middleLeft = (row - 1) + column * width;
            validIndexes.push(middleLeft);
        }
        if (column - 1 >= 0)
        {
            let topMiddle = (row) + (column - 1) * width;
            validIndexes.push(topMiddle);
        }
        if (row + 1 < width && column - 1 >= 0)
        {
            let topRight = (row + 1) + (column - 1) * width;
            validIndexes.push(topRight);
        }
        if (row + 1 < width)
        {
            let middleRight = (row + 1) + (column) * width;
            validIndexes.push(middleRight);
        }
        if (row + 1 < width && column + 1 < height)
        {
            let bottomRight = (row + 1) + (column + 1) * width;
            validIndexes.push(bottomRight);
        }
        if (column + 1 < height)
        {
            let bottomMiddle = (row) + (column + 1) * width;
            validIndexes.push(bottomMiddle);
        }
        if (row - 1 >= 0 && column + 1 < height)
        {
            let bottomLeft = (row - 1) + (column + 1) * width;
            validIndexes.push(bottomLeft);
        }

        return validIndexes;
    }

    getAdjacentBombCount(index, bombState) {
        let adjacentBombCount = 0;

        const validIndexes = this.getAdjacentIndexes(index);
        validIndexes.forEach((validIndex) => {
            if (bombState[validIndex]) adjacentBombCount++;
        });

        return adjacentBombCount;
    }

    clickTile(index, bombState, tiles) {
        let isGameOver = false;
        tiles[index].adjacentBombCount = this.getAdjacentBombCount(index, bombState)
        tiles[index].isRevealed = true;
        if (bombState[index]) {
            tiles[index].isBomb = true;
            isGameOver = true
            return isGameOver;
        }
        tiles[index].renderedText = tiles[index].adjacentBombCount;

        if (tiles[index].adjacentBombCount === 0 && !bombState[index]) {
            const validIndexes = this.getAdjacentIndexes(index);
            validIndexes.forEach((validIndex) => {
                if (!tiles[validIndex].isRevealed) {
                    this.clickTile(validIndex, bombState, tiles);
                }
            });
        }

        return isGameOver;
    }

    handleClick(index) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];

        let time = this.state.startTime;
        let bombState = this.state.bombState.slice();
        if (this.state.stepNumber === 0) {
            bombState = this.generateBombs(index);
            time = new Date();
        }
        const tiles = current.tiles.slice();

        if (tiles[index].isRevealed || tiles[index].isFlagged || this.state.isGameOver) {
            return;
        }

        let isGameOver = this.clickTile(index, bombState, tiles)
        

        this.setState({
            history: history.concat([
                {
                    tiles: tiles
                }
            ]),
            stepNumber: history.length,
            isGameOver: isGameOver,
            startTime: time
        });
    }

    handleRightClick(index) {
        if (this.state.isGameOver) {
            return;
        }
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const tiles = current.tiles.slice();
        let bombCount = this.state.bombCount;

        let tile = tiles[index];
        if (tile.isRevealed) {
            return;
        }
        else if (tile.isFlagged) {
            tile.isFlagged = false;
            tile.renderedText = "";
            bombCount += 1;
        }
        else
        {
            tile.isFlagged = true;
            tile.renderedText = "F";
            bombCount -= 1;
        }
        tiles[index] = tile;

        this.setState({
            history: history.concat([
                {
                    tiles: tiles
                }
            ]),
            stepNumber: history.length,
            bombCount: bombCount
        });
    }

    reset() {
        this.setState(this.defaultState());
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
  
        return (
            <div className="game" onContextMenu={() => {return false;}} onDrag={() => {return false;}} onDragStart={() => {return false;}}>
                <div className="game-board">
                    <BoardHeader
                        height={this.props.height}
                        width={this.props.width}
                        resetFunction={this.reset}
                        bombCount={this.state.bombCount}
                        startTime={this.state.startTime}
                    />
                    <Board
                        height={this.props.height}
                        width={this.props.width}
                        tiles={current.tiles}
                        onClick={i => this.handleClick(i)}
                        onContextMenu={i => this.handleRightClick(i)}
                    />
                    <BoardFooter
                        height={this.props.height}
                        width={this.props.width}
                    />
                </div>
            </div>
        );
    }
}

export default Game;