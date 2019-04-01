import React, { Component } from 'react';
import generateDrawingMap from '../functional/generateDrawingMap';
import HeroMove from '../functional/HeroMove';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import generateMap from '../functional/generateMap';
import createHero from '../functional/createHero';
import { NotificationHeader } from './NotificationHeader';

export class GamesMap extends Component {
    constructor() {
        super();
        this.state = {
            onHelp: false,
            message: ''
        }
    }

    componentDidMount() {
        const generatedMap = generateMap();
        const generatedHero = createHero();
        this.setState({
            hero: generatedHero,
            map: generatedMap,
        });
    }

    handleKeyPressed = (key) => {
        switch (key) {
            case 'h':
                this.setState({
                    onHelp: !this.state.onHelp
                });
                break;
            default:
                const movedHero = HeroMove(this.state.map, this.state.hero, key);
                this.setState({
                    hero: movedHero[0],
                    map: movedHero[1],
                    message: movedHero[2]
                });
                break;
        }
    }

    render() {

        let drawingMap = [];

        if (this.state.onHelp) {
            return (
                <div>
                    <h1>||HELP||</h1>
                    <h3>1. for moving use arrow keys</h3>
                    <h3>2. for digging use "d" key. Works only if you have any weapon</h3>
                    <h3>3. for close help menu press "h" key again</h3>
                </div>
            )
        };

        if (this.state.map) {
            drawingMap = generateDrawingMap(this.state.map, this.state.hero);
        };

        const acceptKeys = ['down', 'left', 'right', 'up', 'h'];
        return (
            <div>
                <NotificationHeader 
                    message={this.state.message}
                />
                <KeyboardEventHandler
                    handleKeys={acceptKeys}
                    onKeyEvent={(key, e) => this.handleKeyPressed(key)}
                />
                {this.state.map ?
                    <table>
                        <tbody>
                            {drawingMap}
                        </tbody>
                    </table> : null}
            </div>
        )
    }
}
