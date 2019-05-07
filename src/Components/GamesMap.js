import React, { Component } from 'react';
import drawMap from '../functional/drawMap';
import createMap from '../functional/createMap';
import getRandomCoordinates from '../functional/getRandomCoordinates';
import { NotificationHeader } from './NotificationHeader';
import movingAndDigging from '../functional/movingAndDigging';

import { Hero } from '../Units/Hero';
import HeroPickUp from '../functional/Hero.PickUp';

import { Enemy } from '../Units/Enemy';

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

    componentWillMount = () => {
        const createdMap = createMap(),
            coordinates = getRandomCoordinates(createdMap),
            enemy = new Enemy(coordinates.x, coordinates.y);
        let {creatures} = this.state;

        creatures.push(enemy);
        this.setState({
            map: createdMap,
            creatures: creatures
        });
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.keyPress !== null) {
            this.handleKeyPressed(nextProps.keyPress);
        }
    }

    handleKeyPressed = (key) => {
        let updated = {
            hero: this.state.hero,
            map: this.state.map,
            message: this.state.message,
            creatures: this.state.creatures,
            x: 0,
            y: 0
        };

        switch (key) {
            case 'h':
                this.setState({
                    onHelp: !this.state.onHelp
                });
                return;
            case 'p':
                const buffer = HeroPickUp(this.state.map, this.state.hero, this.state.message);
                updated.hero = buffer.hero;
                updated.map = buffer.map;
                updated.message = buffer.message;
                break;
            case 'd':
                if (this.state.hero.weapon.name !== 'none') {
                    updated.hero.readyToMine = !updated.hero.readyToMine;
                    if (updated.hero.readyToMine) {
                        updated.message = `you rised the pickaxe (${this.state.hero.weapon.name}). Now, choose direction to dig`;
                    } else {
                        updated.message = `you lower the pickaxe (${this.state.hero.weapon.name})`;
                    }
                } else {
                    updated.message = 'you need any weapon to dig';
                };
                break;
            default:
                movingAndDigging(
                    this.state.map,
                    this.state.hero,
                    key,
                    updated,
                    this.state.creatures
                );
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

        if (this.state.map) {
            drawingMap = drawMap(this.state.map, this.state.hero, this.state.creatures);
        };

        return (
            <div>
                {this.state.onHelp ?
                    <div>
                        <h1>||HELP||</h1>
                        <h3>1. for moving use arrow keys</h3>
                        <h3>2. for digging use "d" key. Works only if you have any weapon</h3>
                        <h3>3. for close help menu press "h" key again</h3>
                    </div>:
                    <div>
                        <NotificationHeader
                            hero={this.state.hero}
                            message={this.state.message}
                        />
                        <table>
                            <tbody>
                                {drawingMap}
                            </tbody>
                        </table>
                    </div>}
            </div>
        )
    }
}
