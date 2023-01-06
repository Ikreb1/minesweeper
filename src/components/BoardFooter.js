import React from 'react'
import './board.css'

class BoardFooter extends React.Component {
    renderBottomBorder(boardWidth, boardHeight) {
        let topBar = [<div className="borderBottomLeft"></div>]
        
        for (let i = 0; i < boardWidth; i++) {
            topBar.push(<div className="borderTopBottom"></div>);
        }
        topBar.push(<div className="borderBottomRight"></div>);

        return <div className="board-row">{topBar}</div>;
    }

    render() {
        return (
                this.renderBottomBorder(this.props.width, this.props.height)
        );
    }
}

export default BoardFooter