import React, { Component } from 'react';
import drawMap from '../functional/drawMap';
import createMap from '../functional/createMap';
import getRandomCoordinates from '../functional/getRandomCoordinates';
import NotificationHeader from './NotificationHeader';
import movingAndDigging from '../functional/movingAndDigging';
import Hero from '../Units/Hero';
import HeroPickUp from '../functional/Hero.PickUp';
import Enemy from '../Units/Enemy';

export default class GamesMap extends Component {
    constructor() {
        super();
        this.state = {
            onHelp: false,
            message: '',
            hero: new Hero(2, 2),
            creatures: []
        };
    }

    componentWillMount = () => {
        const createdMap = createMap(),
            coordinates = getRandomCoordinates(createdMap),
            enemy = new Enemy(coordinates.x, coordinates.y),
            { creatures } = this.state;

        creatures.push(enemy);
        this.setState({
            map: createdMap,
            creatures: creatures
        });
    }

    componentWillReceiveProps = (nextProps) => {
        const { keyPress } = nextProps;

        if (keyPress !== null) {
            this.handleKeyPressed(keyPress);
        }
    }

    handleKeyPressed = (key) => {
        const { map, hero, creatures, onHelp } = this.state;
        let { message } = this.state;

        switch (key) {
            case 'h':
                this.setState({
                    onHelp: !onHelp
                });
                return;
            case 'p':
                message = HeroPickUp(map, hero, message);
                break;
            case 'd':
                if (hero.weapon.name !== 'none') {
                    hero.readyToMine = !hero.readyToMine;
                    if (hero.readyToMine) {
                        message = `you rised the pickaxe (${hero.weapon.name}). Now, choose direction to dig`;
                    } else {
                        message = `you lower the pickaxe (${hero.weapon.name})`;
                    }
                } else {
                    message = 'you need any weapon to dig';
                }
                break;
            default:
                message = movingAndDigging(map, hero, key, creatures);
        }

        this.setState({
            hero: hero,
            map: map,
            message: message,
            creatures: creatures
        });
    };

    render() {
        const { map, hero, message, creatures, onHelp } = this.state;
        let drawingMap = [];

        if (map) {
            drawingMap = drawMap(map, hero, creatures);
        }

        return (
            <div>
                {onHelp
                    ? (
                        <div>
                            <h1>||HELP||</h1>
                            <h3>1. for moving use arrow keys</h3>
                            <h3>2. for digging use "d" key. Works only if you have any weapon</h3>
                            <h3>3. for close help menu press "h" key again</h3>
                        </div>
                    )
                    : (
                        <div>
                            <NotificationHeader
                                hero={hero}
                                message={message}
                            />
                            <table>
                                <tbody>
                                    {drawingMap}
                                </tbody>
                            </table>
                        </div>
                    )
                }
            </div>
        );
    }
}
