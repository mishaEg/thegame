import elements from '../data/elements';
import expansionMap from './expansionMap';
import Enemy from '../Units/Enemy';
import drawTunnel from './drawTunnel';

/**
 * Реализация генерации пещеры с сокровищем на карте
 */
function drawBodyCave(diggingCoordinate, treasure, map, hero, creatures) {
    const { floor, emptySpace, wall, grass, iron_sword, iron_shield } = elements,
        dx = [-1, -1, -1, 0, 0, +0, 1, 1, +1], // смещения, для обхвата площади
        dy = [+0, +1, -1, 0, 1, -1, 0, 1, -1], // размером 3х3 с центром в указанной точке
        wall_dx = [-1, 0, 1, -2, 2, -2, 2, -2, 2, -2, +2, -2, -1, +0, +1, +2], // смещения для отрисовки
        wall_dy = [+2, 2, 2, +2, 2, +1, 1, +0, 0, -1, -1, -2, -2, -2, -2, -2]; // стен во всех пещерах

    // Генерация пола пещеры размером 3х3 с центром в указанной точке
    expansionMap(diggingCoordinate, dx, dy, map, hero, floor, [emptySpace, wall], creatures);

    // Генерация стен вокруг пещеры с центром в указанной точке
    expansionMap(diggingCoordinate, wall_dx, wall_dy, map, hero, wall, [emptySpace], creatures);


    switch (treasure) {
        case 'enemy':
            creatures.push(new Enemy(diggingCoordinate.x, diggingCoordinate.y));
            break;
        case 'grass':
            map[diggingCoordinate.y][diggingCoordinate.x].push(grass);
            break;
        case 'iron sword':
            map[diggingCoordinate.y][diggingCoordinate.x].push(iron_sword);
            break;
        case 'iron shield':
            map[diggingCoordinate.y][diggingCoordinate.x].push(iron_shield);
            break;
        case 'none':
            break;
        default:
            throw new Error(`Treasure is not correct: ${treasure}`);
    }
}

/**
 * @description реализация генерации пещеры на карте
 * @return generateEnemy false - если пещера сгенерирована без врага, object - враг
 */
function drawCave(diggingCoordinate, direction, treasure, map, hero, creatures) {
    drawTunnel(diggingCoordinate, false, map, hero, creatures);

    switch (direction) {
        case 'left':
            diggingCoordinate.x -= 2;
            break;
        case 'right':
            diggingCoordinate.x += 2;
            break;
        case 'up':
            diggingCoordinate.y -= 2;
            break;
        case 'down':
            diggingCoordinate.y += 2;
            break;
        default:
            throw new Error("direction is not a correct:" + direction);
    }
    drawBodyCave(diggingCoordinate, treasure, map, hero, creatures);
}

export default drawCave;
