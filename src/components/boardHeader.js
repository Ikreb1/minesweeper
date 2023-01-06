import React from 'react';

import './board.css';

class BoardHeader extends React.Component {

    returnNumberClassName(number) {
        return "time" + number;
    }

    renderTopBorder() {
        let topBar = [<div className="borderTopLeft"></div>]
        
        for (let i = 0; i < this.props.width; i++) {
            topBar.push(<div className="borderTopBottom"></div>);
        }
        topBar.push(<div className="borderTopRight"></div>);

        return <div className="board-row">{topBar}</div>;
    }

    renderMiddle() {
        const currentTime = new Date();
        // convert from milliseconds to seconds
        const elapsedTime = (currentTime - this.props.startTime) / 1000;
        const boardWidth = this.props.width;
        const resetFunction = this.props.resetFunction;
        const bombCount = this.props.bombCount;
        const bombCountHundreds = Math.min(Math.floor(bombCount / 100), 9);
        const bombCountTens = Math.floor((bombCount - bombCountHundreds * 100) / 10);
        const bombCountOnes = Math.floor(bombCount - bombCountHundreds * 100 - bombCountTens * 10);
        const timeHundreds = Math.min(Math.floor(elapsedTime/ 100 ), 9);
        const timeTens = Math.floor((elapsedTime - timeHundreds * 100) / 10);
        const timeOnes = Math.floor(elapsedTime - timeHundreds * 100 - timeTens * 10);

        let middle = [<div className="borderLeftRightLong"></div>];
        
        middle.push(<div className={this.returnNumberClassName(bombCountHundreds)} id='mines_hundreds'></div>)
        middle.push(<div className={this.returnNumberClassName(bombCountTens)} id='mines_tens'></div>)
        middle.push(<div className={this.returnNumberClassName(bombCountOnes)} id='mines_ones'></div>)

        let style = {
            "marginLeft": (boardWidth / 2 * 16) - 58 + "px",
            "marginRight": (boardWidth / 2 * 16) - 58 + "px"
        }

        middle.push(<div className="smileyface" id='face' onClick={resetFunction} style={style}></div>)

        middle.push(<div className={this.returnNumberClassName(timeHundreds)} id='time_hundreds'></div>)
        middle.push(<div className={this.returnNumberClassName(timeTens)} id='time_tens'></div>)
        middle.push(<div className={this.returnNumberClassName(timeOnes)} id='time_ones'></div>)

        middle.push(<div className="borderLeftRightLong"></div>);
        return <div className="board-row">{middle}</div>;
    }

    renderBottomBorder() {
        const boardWidth = this.props.width;
        let bottomBar = [<div className="borderJointTopLeft"></div>]

        for (let i = 0; i < boardWidth; i++) {
            bottomBar.push(<div className="borderTopBottom"></div>);
        }

        bottomBar.push(<div className="borderJointTopRight"></div>);

        return <div className="board-row">{bottomBar}</div>;
    }

    renderHeader()
    {
        let header = [];
        header.push(this.renderTopBorder());
        header.push(this.renderMiddle());
        header.push(this.renderBottomBorder());
        return header;
    }


    render(props) {
        return (
            <div>
                {this.renderHeader()}
            </div>
        );
    }
}

export default BoardHeader