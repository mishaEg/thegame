import React, { Component } from 'react';
import generateDrawingMap from '../functional/generateDrawingMap';
import HeroMove from '../functional/Hero.Move';
import HeroPickUp from '../functional/Hero.PickUp';
import HeroDig from '../functional/Hero.Dig';
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
            case 'd':
                if (this.state.hero.weapon.name !== 'none') {
                    const miner = this.state.hero;
                    miner.readyToMine = true;
                    this.setState({
                        hero: miner,
                        message: 'you rised the pike (' + this.state.hero.weapon.name + '). Now, choose direction to dig'
                    });
                } else {
                    this.setState({
                        message: 'you need any weapon to dig'
                    });
                };
                break;
            default:
                if (this.state.hero.readyToMine) {
                    updated = HeroDig(this.state.map, this.state.hero, key);
                } else {
                    updated = HeroMove(this.state.map, this.state.hero, key);
                };
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
        let acceptKeys = ['down', 'left', 'right', 'up', 'h', 'p', 'd'];

        if (this.state.onHelp) {
          acceptKeys = ['h'];
        };

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
