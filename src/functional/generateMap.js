import generateGrass from './generateGrass';
import generateObjectMap from './generateObjectMap';
import generateSwords from './generateSwords';
import generateShield from './generateShield';
import {Hero} from '../Units/Hero';
import initMap from '../data/map.json';

export default function generateMap() {
    const hero = new Hero();
    const mapWithObject = generateObjectMap(initMap);
    generateGrass(mapWithObject, 2)
    generateSwords(mapWithObject, 1)
    generateShield(mapWithObject, 1)
    return mapWithObject
}