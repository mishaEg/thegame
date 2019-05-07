import React, { Component } from 'react';
import { GamesMap } from './GamesMap';
import KeyboardEventHandler from 'react-keyboard-event-handler';

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            keyPress: null
        }
    }

    handleKeyPressed = (key) => {
        this.setState({
            keyPress: key
        })
    }

    render() {
        let acceptKeys = ['down', 'left', 'right', 'up', 'h', 'p', 'd'];

        if (this.state.onHelp) {
            acceptKeys = ['h'];
        };

        return (
            <div>
                <KeyboardEventHandler
                    handleKeys={acceptKeys}
                    onKeyEvent={(key, e) => this.handleKeyPressed(key)}
                />
                <GamesMap keyPress={this.state.keyPress}/>
            </div >
        )
    }
}
