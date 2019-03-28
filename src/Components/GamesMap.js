import React, { Component } from 'react';
import generateMap from '../functional/generateMap';
import generateDrawingMap from '../functional/generateDrawingMap';

export class GamesMap extends Component {
    constructor() {
        super();
        this.state = {
            mapIsGenerate: false,
            mapWithObjects: []
        }
    }

    generatorNewMap = () => {
        const generatedMap = generateMap();
        this.setState({
            mapIsGenerate: true,
            mapWithObjects: generatedMap
        })
    }

    render() {
        if (this.props.onHelp) {
            return (
                <div>
                    <h1>||HELP||</h1>
                    <h3>1. for moving use arrow keys</h3>
                    <h3>2. for digging use "d" key. Works only if you have any weapon</h3>
                    <h3>3. for close help menu press "h" key again</h3>
                </div>
            )
        }
        if (!this.state.mapIsGenerate) {
            this.generatorNewMap()
        }
        
        const renderMap = generateDrawingMap(this.state.mapWithObjects);
        return (
            <table>
                <tbody>
                    {renderMap}
                </tbody>
            </table>
        )
    }
}
