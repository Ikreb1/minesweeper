import React from "react";
import "./board.css";

class Tile extends React.Component {

  getClassName() {
    const tile = this.props.tile;
    if (tile.isFlagged) {
      return "bombFlagged";
    }
    if (!tile.isRevealed) {
      return "blank";
    }
    else if (tile.isRevealed) {
      if (tile.isBomb) {
        return "bombRevealed";
      }
      return "open" + tile.adjacentBombCount;
    }
    return 0;
  };

  render() {
    return (
      <div id="clickableTile" className={this.getClassName()} onClick={this.props.onClick} onContextMenu={this.props.onContextMenu}/>
    )
  };
}

export default Tile;