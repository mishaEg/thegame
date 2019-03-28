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
      onHelp: false
    }
  }

  handleKeyPressed = (key) => {
    console.log('key:', key, 'help:', this.state.onHelp);
    switch (key) {
      case 'h':
        this.setState({
          onHelp: !this.state.onHelp
        });
      break;
    }
  }

  render() {
    const acceptKeys = ['down', 'left', 'right', 'up', 'h']
    return (
      <div>
      <KeyboardEventHandler
        handleKeys = {
          acceptKeys
        }
        onKeyEvent = {
          (key, e) => this.handleKeyPressed(key)
        }
      />
      <NotificationHeader />
      <GamesMap
        onHelp = {
          this.state.onHelp
        }
      />
      </div>
    )
  }
}
