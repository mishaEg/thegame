import elements from '../data/elements';
import expansionMap from './expansionMap';
import Enemy from '../Units/Enemy';
import drawTunnel from './drawTunnel';
import getRandomInt from './utils/getRandomInt';

/**
 * Проверка на возможность отрисовки тела пещеры
 */
function isClear(diggingCoordinate, dx, dy, map) {
    for (let index = 0; index < dy.length - 1; index++) {
        const checkCoordinateY = diggingCoordinate.y + dy[index],
            checkCoordinateX = diggingCoordinate.x + dx[index];

        if (map[checkCoordinateY] !== undefined) {
            if (map[checkCoordinateY][checkCoordinateX] !== undefined) {
                if (map[checkCoordinateY][checkCoordinateX].icon !== ' ') {
                    return false;
                }
            }
        }
    }

    return true;
}

/**
 * Реализация генерации пещеры с сокровищем на карте
 */
function drawBodyCave(diggingCoordinate, map, hero, creatures) {
    const { floor, emptySpace, wall, grass, iron_sword, iron_shield } = elements,
        dx = [-1, -1, -1, 0, 0, +0, 1, 1, +1], // смещения, для обхвата площади
        dy = [+0, +1, -1, 0, 1, -1, 0, 1, -1], // размером 3х3 с центром в указанной точке
        wall_dx = [-1, 0, 1, -2, 2, -2, 2, -2, 2, -2, +2, -2, -1, +0, +1, +2], // смещения для отрисовки
        wall_dy = [+2, 2, 2, +2, 2, +1, 1, +0, 0, -1, -1, -2, -2, -2, -2, -2], // стен во всех пещерах
        RANDOM_GENERATE_ITEM = getRandomInt(0, 7);

    let treasure,
        message;

    switch (true) {
        case (RANDOM_GENERATE_ITEM === 2 || RANDOM_GENERATE_ITEM === 3):
            message = 'you found cave with enemy!';
            treasure = 'enemy';
            break;
        case (RANDOM_GENERATE_ITEM === 4 || RANDOM_GENERATE_ITEM === 5):
            message = 'you found cave with grass!';
            treasure = 'grass';
            break;
        case (RANDOM_GENERATE_ITEM === 6):
            message = 'you found cave with iron shield!';
            treasure = 'iron shield';
            break;
        case (RANDOM_GENERATE_ITEM === 7):
            message = 'you found cave with iron sword!';
            treasure = 'iron sword';
            break;
        default:
            message = 'you found empty cave';
            treasure = 'none';
    }

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

    return message;
}

/**
 * Перемещение координат в точку в центре пещеры
 */
function switchCoordToMidCave(diggingCoordinate, direction) {
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
}

/**
 * Перемещение координат на вход в пещеру
 */
function switchCoordToInputCave(diggingCoordinate, direction) {
    switch (direction) {
        case 'left':
            diggingCoordinate.x += 2;
            break;
        case 'right':
            diggingCoordinate.x -= 2;
            break;
        case 'up':
            diggingCoordinate.y += 2;
            break;
        case 'down':
            diggingCoordinate.y -= 2;
            break;
        default:
            throw new Error("direction is not a correct:" + direction);
    }
}

/**
 * Реализация генерации пещеры на карте
 * @return generateEnemy false - если пещера сгенерирована без врага, object - враг
 */
function drawCave(diggingCoordinate, direction, map, hero, creatures) {
    const dx = [-1, -1, -1, 0, 0, +0, 1, 1, +1], // смещения, для обхвата площади
        dy = [+0, +1, -1, 0, 1, -1, 0, 1, -1]; // размером 3х3 с центром в указанной точке
    let message = false;

    switchCoordToMidCave(diggingCoordinate, direction);

    // Если на отрисовку пещеры нет места - не отрисовываем
    if (isClear(diggingCoordinate, dx, dy, map)) {
        message = drawBodyCave(diggingCoordinate, map, hero, creatures);
    }

    switchCoordToInputCave(diggingCoordinate, direction);
    drawTunnel(diggingCoordinate, false, map, hero, creatures);

    return message;
}

export default drawCave;
