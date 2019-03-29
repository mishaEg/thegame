import generateGrass from './generateGrass';
import generateObjectMap from './generateObjectMap';
import generateSwords from './generateSwords';
import generateShield from './generateShield';
import initMap from '../data/map.json';

export default function generateMap() {
  const mapWithObject = generateObjectMap(initMap);
  generateGrass(mapWithObject, 2);
  generateSwords(mapWithObject, 1);
  generateShield(mapWithObject, 1);
  return mapWithObject;
}
