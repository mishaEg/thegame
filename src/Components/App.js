import React, { Component } from 'react';
import { NotificationHeader } from './NotificationHeader';
import { GamesMap } from './GamesMap';
import KeyboardEventHandler from 'react-keyboard-event-handler';

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            currentKeyPressed: null
        }
    }

    handleKeyPressed = (key) => {
        this.setState({
            currentKeyPressed: key
        })
    }

    render() {
        const acceptKeys = ['down', 'left', 'right', 'up', 'h']
        return (
            <div>
                <KeyboardEventHandler 
                    handleKeys={acceptKeys}
                    onKeyEvent={(key, e) => this.handleKeyPressed(key)}/>
                <NotificationHeader />
                <GamesMap currentKey={this.state.currentKeyPressed}/>
            </div>
        )
    }
}
