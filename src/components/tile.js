
function Tile(props) {
    return (
      <button id="clickableTile" className="tile" onClick={props.onClick} onContextMenu={props.onContextMenu}>
        {props.value ? props.value.renderedText : ""}
      </button>
    );
  }

export default Tile;