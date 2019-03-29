import React, {
  Component
} from 'react';
import {
  NotificationHeader
} from './NotificationHeader';
import {
  GamesMap
} from './GamesMap';

export default class App extends Component {
  render() {
    return (
      <div>
        <NotificationHeader />
        <GamesMap />
      </div >
    )
  }
}
