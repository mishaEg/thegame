/**
 * @description
 */

import elements from '../data/elements';
import expansionMap from './expansionMap';
import Enemy from '../Units/Enemy';

export default function drawCave(x, y, direction, treasure, map, hero) {
    let generateEnemy = false,
        line_dx = 0,
        line_dy = 0,
        dx = [-1, -1, -1, 0, 0, 0, 1, 1, 1]; // смещения, соответствующие соседям ячейки

    const { floor, emptySpace, wall, grass, iron_shield, iron_sword, gem } = elements,
        dy = [0, 1, -1, 0, 1, -1, 0, 1, -1]; // справа, снизу, слева и сверху

    /* line_dx = [-1, 0, 1, -2, 2, -2, 2, -2, 2, -2, +2, -2, -1, +0, +1, +2]; полные координаты для отрисовки всех пещер
       line_dy = [+2, 2, 2, +2, 2, +1, 1, +0, 0, -1, -1, -2, -2, -2, -2, -2]; */

    switch (direction) {
        case 'left':
            x -= 1;
            dx = [-3, -3, -3, -2, -2, -2, -1, -1, -1];
            if (x <= 1) {
                line_dx = [-2, -2, -2, -2, -2, -1, 0, 1, -1, 0, 1];
            } else {
                line_dx = [-4, -4, -4, -4, -4, -3, -2, -1, -3, -2, -1];
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
            if (y < 0) {
                line_dy = [3, 2, 1, 3, 2, 1, 0, 0, 0, 0, 0];
            } else {
                line_dy = [1, 0, -1, 1, 0, -1, -2, -2, -2, -2, -2];
            }
            line_dx = [-2, -2, -2, 2, 2, 2, 0, 1, 2, -1, -2];
            // line_dy = [3, 2, 1, 3, 2, 1, 0, 0, 0, 0, 0];
            break;
        case 'down':
            y += 2;
            line_dx = [-1, 0, 1, -2, 2, -2, 2, -2, 2, -2, +2, -2, -1, +1, +2];
            line_dy = [+2, 2, 2, +2, 2, +1, 1, +0, 0, -1, -1, -2, -2, -2, -2];
            break;
        default:
            throw new Error("direction is not a correct:" + direction);
    }

    expansionMap(x, y, dx, dy, map, hero, floor, [emptySpace, wall]); // пещера
    expansionMap(x, y, line_dx, line_dy, map, hero, wall, [emptySpace]); // стены вокруг

    y = Math.abs(y);
    x = Math.abs(x);

    switch (treasure) {
        case 'enemy':
            generateEnemy = new Enemy(x, y);
            break;
        case 'grass':
            map[y][x].push(grass);
            break;
        case 'iron sword':
            map[y][x].push(iron_sword);
            break;
        case 'iron shield':
            map[y][x].push(iron_shield);
            break;
        case 'gem':
            map[y][x].push(gem);
            break;
        default:
            throw new Error(`Treasure is not correct: ${treasure}`);
    }

    return {
        generateEnemy: generateEnemy
    };
}
