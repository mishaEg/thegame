import React, { Component } from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';

// import elements from '../data/elements';

import drawMap from '../functional/drawMap';
import drawCave from '../functional/drawCave';
import createMap from '../functional/createMap';
import getRandomInt from '../functional/getRandomInt';
import getRandomCoordinates from '../functional/getRandomCoordinates';
import isContact from '../functional/isContact';
import { NotificationHeader } from './NotificationHeader';

import { Hero } from '../Units/Hero';
import HeroMove from '../functional/Hero.Move';
import HeroPickUp from '../functional/Hero.PickUp';
import HeroDig from '../functional/Hero.Dig';
import HeroPunch from '../functional/Hero.Punch';

import { Enemy } from '../Units/Enemy';
import EnemyMove from '../functional/Enemy.Move';

export class GamesMap extends Component {
    constructor() {
        super();
        this.state = {
            onHelp: false,
            message: '',
            hero: new Hero(2, 2),
            creatures: []
        }
    }

    componentWillMount() {
        const createdMap = createMap(),
            coordinates = getRandomCoordinates(createdMap),
            enemy = new Enemy(coordinates.x, coordinates.y);
        let newCreatures = this.state.creatures;
        newCreatures.push(enemy);
        this.setState({
            map: createdMap,
            creatures: newCreatures
        });
    }

    handleKeyPressed = (key) => {
        let updated = {
            hero: this.state.hero,
            map: this.state.map,
            message: this.state.message,
            creatures: this.state.creatures,
            x: 0,
            y: 0
        },
            buffer = '';
        switch (key) {
            case 'h':
                this.setState({
                    onHelp: !this.state.onHelp
                });
                break;
            case 'p':
                buffer = HeroPickUp(this.state.map, this.state.hero);
                updated.map = buffer.map;
                updated.hero = buffer.hero;
                break;
            case 'd':
                if (this.state.hero.weapon.name !== 'none') {
                    updated.hero.readyToMine = true;
                    updated.message = 'you rised the pike (' + this.state.hero.weapon.name + '). Now, choose direction to dig';
                } else {
                    updated.message = 'you need any weapon to dig';
                };
                break;
            default:
                if (this.state.hero.readyToMine) {
                    buffer = HeroDig(this.state.map, this.state.hero, key); // return hero: hero, map: map, message: msg, x: x, y: y
                    updated.y = buffer.y;
                    updated.x = buffer.x;

                    var rnd_cave = getRandomInt(0, 12),
                        treasure = 'none';
                    switch (true) {
                        case (rnd_cave > 4 && rnd_cave < 6):
                            updated.message += 'you found cave with enemy!';
                            treasure = 'enemy';
                            break;
                        case (rnd_cave > 6 && rnd_cave < 8):
                            updated.message += 'you found cave with grass!';
                            treasure = 'grass';
                            break;
                        case (rnd_cave === 8):
                            updated.message += 'you found cave with iron shield!';
                            treasure = 'iron shield';
                            break;
                        case (rnd_cave === 9):
                            updated.message += 'you found cave with iron sword!';
                            treasure = 'iron sword';
                            break;
                        case (rnd_cave > 9):
                            updated.message += 'you found a gem!';
                            treasure = 'gem';
                            break;
                    };
                    if (treasure !== 'none') {
                        buffer = drawCave(updated.x, updated.y, key, treasure, updated.map, updated.hero); // return hero: hero, map: map
                        updated.map = buffer.map;
                        updated.hero = buffer.hero;
                        if (buffer.enemy) {
                            updated.creatures.push(buffer.enemy);
                        };
                    };
                } else {
                    buffer = HeroMove(this.state.map, this.state.hero, key, this.state.creatures); // return hero: hero, map: map, message: msg, x: x, y: y
                    updated.map = buffer.map;
                    updated.hero = buffer.hero;
                    updated.message = buffer.message;
                    updated.x = buffer.x;
                    updated.y = buffer.y;
                };

                for (var i in this.state.creatures) {
                    if (isContact({ positionX: updated.x, positionY: updated.y }, this.state.creatures[i])) {
                        buffer = HeroPunch(this.state.creatures[i], updated.hero); // return message: msg, target: target
                        updated.message += buffer.message;
                        updated.creatures[i] = buffer.target;
                    };

                    if (this.state.creatures[i].status !== 'sleeping') {
                        buffer = EnemyMove(updated.map, this.state.creatures[i], updated.hero);
                        updated.creatures[i] = buffer.enemy;
                        updated.hero = buffer.hero;
                    };
                };

                break;
        };

        this.setState({
            hero: updated.hero,
            map: updated.map,
            message: updated.message,
            creatures: updated.creatures
        });
    };

    render() {
        let drawingMap = [];
        let acceptKeys = ['down', 'left', 'right', 'up', 'h', 'p', 'd'];

        if (this.state.onHelp) {
            acceptKeys = ['h'];
        };

        if (this.state.map) {
            drawingMap = drawMap(this.state.map, this.state.hero, this.state.creatures);
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
