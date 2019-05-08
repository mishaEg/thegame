import KeyboardEventHandler from 'react-keyboard-event-handler';
import React, { Component } from 'react';
import GamesMap from './GamesMap';

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            keyPress: null
        };
    }

    handleKeyPressed = (key) => {
        this.setState({
            keyPress: key
        });
    }

    render() {
        let acceptKeys = ['down', 'left', 'right', 'up', 'h', 'p', 'd'];
        const { onHelp, keyPress } = this.state;

        if (onHelp) {
            acceptKeys = ['h'];
        }

        return (
            <div>
                <KeyboardEventHandler
                    handleKeys={acceptKeys}
                    onKeyEvent={key => this.handleKeyPressed(key)}
                />
                <GamesMap keyPress={keyPress} />
            </div>
        );
    }
}
