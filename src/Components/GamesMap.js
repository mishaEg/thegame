import React, { Component } from 'react';
import generateDrawingMap from '../functional/generateDrawingMap';
import HeroMove from '../functional/Hero.Move';
import HeroPickUp from '../functional/Hero.PickUp';
import HeroDig from '../functional/Hero.Dig';
import drawCave from '../functional/drawCave';
import elements from '../data/elements';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import generateMap from '../functional/generateMap';
import getRandomInt from '../functional/getRandomInt';
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
                    var rnd_cave = getRandomInt(0, 12),
                        treasure = 'none',
                        y = updated.hero.positionY,
                        x = updated.hero.positionX,
                        newUpdated = '';
                    switch (true) {
                        case (rnd_cave > 4 && rnd_cave < 6):
                            updated.message += 'you found cave with enemy!';
                            treasure = 'enemy';
                            break;
                        case (rnd_cave > 6 && rnd_cave < 8):
                            updated.message += 'you found cave with grass!';
                            treasure = 'grass';
                            break;
                        case (rnd_cave == 8):
                            updated.message += 'you found cave with iron shield!';
                            treasure = 'iron shield';
                            break;
                        case (rnd_cave == 9):
                            updated.message += 'you found cave with iron sword!';
                            treasure = 'iron sword';
                            break;
                        case (rnd_cave > 9):
                            updated.message += 'you found a gem!';
                            updated.map[y][x].push(elements.gem);
                            break;
                    };
                    if (treasure != 'none') {
                        newUpdated = drawCave(x, y, key, treasure, updated.map, updated.hero);
                        updated.map = newUpdated.map;
                        updated.hero = newUpdated.hero;
                    };
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
