import React, { Component } from 'react';
import generateMap from '../functional/generateMap';
import mapFromJson from '../data/map.json';

export class GamesMap extends Component {
    constructor() {
        super();
        this.state = {
            onHelp: false
        }
    }

    render() {
        if (this.state.onHelp) {
            return (
                <div>
                    <h1>||HELP||</h1>
                    <h3>1. for moving use arrow keys</h3>
                    <h3>2. for digging use "d" key. Works only if you have any weapon</h3>
                    <h3>3. for close help menu press "h" key again</h3>
                </div>
            )
        }
        const generatedMap = generateMap(mapFromJson);
        const renderMap = generatedMap.map(currentRow => {
            return <tr>{currentRow.map(currentColumn => {
                return <td>{currentColumn}</td>})}</tr>
        })
        return (
            <table>
                <tbody>
                    {renderMap}
                </tbody>
            </table>
        )
    }
}