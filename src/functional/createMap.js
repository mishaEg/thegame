import createObject from './createObject';
import initMap from './initMap';
import startMap from '../data/map.json';
import { sword, shield, grass } from '../data/elements';

export default function createMap() {
    const map = initMap(startMap);

    createObject(map, 1, sword);
    createObject(map, 1, shield);
    createObject(map, 2, grass);

    return map;
}
