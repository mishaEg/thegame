/**
 * @description
 */

import elements from '../data/elements';
import expansionMap from '../functional/expansionMap';
import { Enemy } from '../Units/Enemy';

export default function drawCave(x, y, direction, treasure, inputMap, inputHero) {

  let map = Object.assign(inputMap),
    hero = Object.assign(inputHero); // клон объекта (не стейт)

  let updated = '';

  var line_dx = 0,
    line_dy = 0;

  const { floor, emptySpace, wall } = elements;

  switch (direction) {
    case 'left':
      x -= 1;
      if (x < 0) {
        line_dx = [0, 0, 0, 0, 0, 1, 2, 3, 1, 2, 3];
      } else {
        line_dx = [-2, -2, -2, -2, -2, -1, 0, 1, -1, 0, 1];
      }
      line_dy = [0, -1, 1, 2, -2, -2, -2, -2, 2, 2, 2];
      break;
    case 'right':
      x += 2;
      line_dx = [2, 2, 2, 2, 2, 1, 0, 0, 1, -1, -1];
      line_dy = [-1, 0, 1, -2, 2, 2, 2, -2, -2, -2, 2];
      break;
    case 'up':
      y -= 1;
      line_dx = [-2, -2, -2, 2, 2, 2, 0, 1, 2, -1, -2];
      line_dy = [3, 2, 1, 3, 2, 1, 0, 0, 0, 0, 0];
      break;
    case 'down':
      y += 2;
      line_dx = [-1, 0, 1, -2, 2, -2, 2, -2, 2, -2, 2];
      line_dy = [2, 2, 2, 2, 2, 1, 1, 0, 0, -1, -1];
      break;
  };

  var dx = [-1, -1, -1, 0, 0, 0, 1, 1, 1], // смещения, соответствующие соседям ячейки
    dy = [0, 1, -1, 0, 1, -1, 0, 1, -1]; // справа, снизу, слева и сверху

  expansionMap(x, y, dx, dy, map, hero, floor, [emptySpace, wall]); //пещера
  updated = expansionMap(x, y, line_dx, line_dy, map, hero, wall, [emptySpace]); //стены вокруг

  y = Math.abs(y);
  x = Math.abs(x);

  switch (treasure) {
    case 'enemy':
      var new_enemy = new Enemy(x, y);
      //creatures.push(new_enemy);
      break;
    case 'grass':
      map[y][x].push(elements.grass);
      break;
    case 'iron sword':
      map[y][x].push(elements.iron_sword);
      break;
    case 'iron shield':
      map[y][x].push(elements.iron_shield);
      break;
  };

  return updated;

};