import generateGrass from './generateGrass';
import generateObjectMap from './generateObjectMap';
import generateSwords from './generateSwords';
import generateShield from './generateShield';
import generateDrawingMap from './generateDrawingMap';
import {Hero} from '../Units/Hero';

export default function generateMap(initMap) {
    const hero = new Hero();
    const mapWithObject = generateObjectMap(initMap);
    generateGrass(mapWithObject, 2)
    generateSwords(mapWithObject, 1)
    generateShield(mapWithObject, 1)
    return generateDrawingMap(mapWithObject);
}