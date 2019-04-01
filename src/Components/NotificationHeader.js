import React, { Component } from 'react';

export class NotificationHeader extends Component {
    render() {
        return (
            <div className="message_bar">
                {this.props.message}
            </div>
        );
    }
}