import elements from '../data/elements';
import expansionMap from './expansionMap';
import Enemy from '../Units/Enemy';

/**
 * @description реализация генерации пещеры на карте
 * !!Данная функция мутирует значения map, hero!!
 * @return generateEnemy false - если пещера сгенерирована без врага, object - враг
 */
export default function drawCave(targetCoordinate, direction, treasure, map, hero) {
    let generateEnemy = false;

    const { floor, emptySpace, wall, grass, iron_shield, iron_sword, gem } = elements,
        dx = [-1, -1, -1, 0, 0, +0, 1, 1, +1], // смещения, для обхвата площади
        dy = [+0, +1, -1, 0, 1, -1, 0, 1, -1], // размером 3х3 с центром в указанной точке
        line_dx = [-1, 0, 1, -2, 2, -2, 2, -2, 2, -2, +2, -2, -1, +0, +1, +2], // смещения для отрисовки
        line_dy = [+2, 2, 2, +2, 2, +1, 1, +0, 0, -1, -1, -2, -2, -2, -2, -2]; // стен во всех пещерах

    // Генерация стен вокруг указанной точки
    expansionMap(targetCoordinate, dx, dy, map, hero, wall, [emptySpace]);
    // Замена стены в указанной точке на пол
    expansionMap(targetCoordinate, [0], [0], map, hero, floor, [wall]);

    switch (direction) {
        case 'left':
            targetCoordinate.x -= 2;
            break;
        case 'right':
            targetCoordinate.x += 2;
            break;
        case 'up':
            targetCoordinate.y -= 2;
            break;
        case 'down':
            targetCoordinate.y += 2;
            break;
        default:
            throw new Error("direction is not a correct:" + direction);
    }

    // Генерация пола пещеры размером 3х3 с центром в указанной точке
    expansionMap(targetCoordinate, dx, dy, map, hero, floor, [emptySpace, wall]);
    // Генерация стен вокруг пещеры с центром в указанной точке
    expansionMap(targetCoordinate, line_dx, line_dy, map, hero, wall, [emptySpace]);

    switch (treasure) {
        case 'enemy':
            generateEnemy = new Enemy(targetCoordinate.x, targetCoordinate.y);
            break;
        case 'grass':
            map[targetCoordinate.y][targetCoordinate.x].push(grass);
            break;
        case 'iron sword':
            map[targetCoordinate.y][targetCoordinate.x].push(iron_sword);
            break;
        case 'iron shield':
            map[targetCoordinate.y][targetCoordinate.x].push(iron_shield);
            break;
        case 'gem':
            map[targetCoordinate.y][targetCoordinate.x].push(gem);
            break;
        default:
            throw new Error(`Treasure is not correct: ${treasure}`);
    }

    return {
        generateEnemy: generateEnemy
    };
}
