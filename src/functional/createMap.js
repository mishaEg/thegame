import createObject from './createObject';
import initMap from './initMap';
import startMap from '../data/map.json';
import elements from '../data/elements';

export default function createMap() {
  const map = initMap(startMap);
  createObject(map, 1, elements.sword);
  createObject(map, 1, elements.shield);
  createObject(map, 2, elements.grass);
  return map;
}
