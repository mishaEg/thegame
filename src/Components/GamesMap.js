import React, { Component } from 'react';
import generateMap from '../functional/generateMap';
import generateDrawingMap from '../functional/generateDrawingMap';
import createHero from '../functional/createHero';
import HeroMove from '../functional/HeroMove';

export class GamesMap extends Component {
    constructor() {
        super();
        this.state = {
            map: [],
            hero: null
        }
    }

    generatorNewMap = () => {
        const generatedMap = generateMap();
        const generatedHero = createHero();
        this.setState({
            hero: generatedHero,
            map: generatedMap
        });
    }


    handleHeroMove = () => {
        HeroMove(this.state.map, this.state.hero, this.state.keyPressed);
    }

    render() {

        let drawingMap = [];

        if (this.props.onHelp) {
            return (
                <div>
                    <h1>||HELP||</h1>
                    <h3>1. for moving use arrow keys</h3>
                    <h3>2. for digging use "d" key. Works only if you have any weapon</h3>
                    <h3>3. for close help menu press "h" key again</h3>
                </div>
            )
        };

        if (this.state.map.length === 0) {
            this.generatorNewMap();
            // return (<div></div>)
        }
        drawingMap = generateDrawingMap(this.state.map, this.state.hero);
        // drawingMap = generateDrawingMap(this.state.map);

        return (
            <table>
                <tbody>
                    {drawingMap}
                </tbody>
            </table>
        )
    }
}
