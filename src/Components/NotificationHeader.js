import React, { Component } from 'react';

export class NotificationHeader extends Component {

    heroStats() {
        const { hero } = this.props;
        if (hero) {
            return 'health: ' + hero.health + ' | weapon: ' + hero.weapon.name + ' | shield: ' + hero.shield.name + ' | money: ' + hero.money;
        };
        return null;
    }
    render() {
        return (
            <div className="message_bar">
                {this.heroStats()}
                <br />
                {this.props.message}
            </div>
        );
    }
}