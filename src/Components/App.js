import React, {
  Component
} from 'react';
import {
  NotificationHeader
} from './NotificationHeader';
import {
  GamesMap
} from './GamesMap';
import KeyboardEventHandler from 'react-keyboard-event-handler';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      onHelp: false,
      keyPressed: null,
      needMove: false
    }
  }

  handleKeyPressed = (key) => {
    switch (key) {
      case 'h':
        this.setState({
          onHelp: !this.state.onHelp
        });
        break;
      default: 
        this.setState({
          keyPressed: key,
          needMove: true
        });
    }
  }

  handleMoveEnded = () => {
      this.setState({
          needMove: false
      })
  }

  render() {
    const acceptKeys = ['down', 'left', 'right', 'up', 'h']
    return (
      <div>
      <KeyboardEventHandler
        handleKeys = {acceptKeys}
        onKeyEvent = {(key, e) => this.handleKeyPressed(key)}
      />
      <NotificationHeader />
      <GamesMap
        onHelp = {this.state.onHelp}
        keyPressed = {this.state.keyPressed}
        needMove = {this.state.needMove}
        handleMoveEnded={this.handleMoveEnded}
      />
      </div>
    )
  }
}
