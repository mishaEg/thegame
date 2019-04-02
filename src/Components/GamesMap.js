import React, { Component } from 'react';
import generateDrawingMap from '../functional/generateDrawingMap';
import HeroMove from '../functional/Hero.Move';
import HeroPickUp from '../functional/Hero.PickUp';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import generateMap from '../functional/generateMap';
import { NotificationHeader } from './NotificationHeader';
import { Hero } from '../Units/Hero';

export class GamesMap extends Component {
    constructor() {
        super();
        this.state = {
            onHelp: false,
            message: '',
            hero: new Hero(2, 2)
        }
    }

    componentWillMount() {
        const generatedMap = generateMap();
        this.setState({
            map: generatedMap
        });
    }

    handleKeyPressed = (key) => {
        let updated = '';
        switch (key) {
            case 'h':
                this.setState({
                    onHelp: !this.state.onHelp
                });
                break;
            case 'p':
                updated = HeroPickUp(this.state.map, this.state.hero);
                this.setState({
                    hero: updated.hero,
                    map: updated.map,
                });
                break;
            default:
                updated = HeroMove(this.state.map, this.state.hero, key);
                this.setState({
                    hero: updated.hero,
                    map: updated.map,
                    message: updated.message
                });
                break;
        }
    }

    render() {
        let drawingMap = [];
        const acceptKeys = ['down', 'left', 'right', 'up', 'h', 'p'];

        if (this.state.map) {
            drawingMap = generateDrawingMap(this.state.map, this.state.hero);
        };

        return (
            <div>
                <NotificationHeader
                    hero={this.state.hero}
                    message={this.state.message}
                />
                <KeyboardEventHandler
                    handleKeys={acceptKeys}
                    onKeyEvent={(key, e) => this.handleKeyPressed(key)}
                />
                {this.state.onHelp ?
                    <div>
                        <h1>||HELP||</h1>
                        <h3>1. for moving use arrow keys</h3>
                        <h3>2. for digging use "d" key. Works only if you have any weapon</h3>
                        <h3>3. for close help menu press "h" key again</h3>
                    </div> :
                    <table>
                        <tbody>
                            {drawingMap}
                        </tbody>
                    </table>}
            </div>
        )
    }
}
