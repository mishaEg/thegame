import elements from '../data/elements';
import expansionMap from './expansionMap';
import getRandomInt from './utils/getRandomInt';

/**
 * Реализация генерации входа в пещеру на карте
 */
function drawTunnel(diggingCoordinate, generateGem, map, hero, creatures) {
    const { floor, emptySpace, wall, gem } = elements,
        dx = [-1, -1, -1, 0, 0, +0, 1, 1, +1], // смещения, для обхвата площади
        dy = [+0, +1, -1, 0, 1, -1, 0, 1, -1]; // размером 3х3 с центром в указанной точке

    // Генерация стен вокруг указанной точки
    expansionMap(diggingCoordinate, dx, dy, map, hero, wall, [emptySpace], creatures);
    // Замена стены в указанной точке на пол
    expansionMap(diggingCoordinate, [0], [0], map, hero, floor, [wall], creatures);

    let message = false;
    if (generateGem) {
        const RANDOM_GENERATE_GEM = getRandomInt(0, 9);

        if (RANDOM_GENERATE_GEM === 0) {
            map[diggingCoordinate.y][diggingCoordinate.x].push(gem);
            message = 'you found a gem!';
        }
    }

    return message;
}

export default drawTunnel;
