import React, { Component } from 'react';
import drawMap from '../functional/drawMap';
import createMap from '../functional/createMap';
import getRandomCoordinates from '../functional/utils/getRandomCoordinates';
import NotificationHeader from './NotificationHeader';
import Hero from '../Units/Hero';
import enemiesAction from '../functional/enemiesAction';
import Enemy from '../Units/Enemy';
import heroActions from '../functional/heroActions';

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

        if (key === 'h') {
            this.setState({
                onHelp: !onHelp
            });

            return;
        }

        const message = heroActions(hero, map, creatures, key);

        enemiesAction(hero, map, creatures);
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
