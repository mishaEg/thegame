import generateGrass from './generateGrass';
import generateObjectMap from './generateObjectMap';
import generateSwords from './generateSwords';
import generateShield from './generateShield';
import createHero from './createHero';
import initMap from '../data/map.json';

export default function generateMap() {
    const mapWithObject = generateObjectMap(initMap);
    generateGrass(mapWithObject, 2);
    generateSwords(mapWithObject, 1);
    generateShield(mapWithObject, 1);
    createHero(mapWithObject, 2, 2);
    return mapWithObject;
}
