import React, { Component } from 'react';

export default class NotificationHeader extends Component {
    heroStats = () => {
        const { hero } = this.props;
        if (hero) {
            const message = `health: ${hero.health} | weapon: ${hero.weapon.name} | shield: ${hero.shield.name} | money: ' + hero.money`;
            return message;
        }
        return null;
    }

    render() {
        const { message } = this.props;

        return (
            <div className="message_bar">
                {this.heroStats()}
                <br />
                {message}
            </div>
        );
    }
}
