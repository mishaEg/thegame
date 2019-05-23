import elements from '../data/elements';
import expansionMap from './expansionMap';
import getRandomInt from './utils/getRandomInt';

/**
 * Реализация генерации входа в пещеру на карте
 */
function drawTunnel(diggingCoordinate, generateGem, map, hero, creatures) {
    const { floor, emptySpace, wall, gem } = elements,
        dx = [-1, -1, -1, 0, 0, +0, 1, 1, +1], // смещения, для обхвата площади
        dy = [+0, +1, -1, 0, 1, -1, 0, 1, -1], // размером 3х3 с центром в указанной точке

        { // Генерация стен вокруг указанной точки
            updatedTargetCoordinates: digCoordinateOnMapWithWall,
            map: mapWithWall,
            hero: heroCoordOnMapWithWall,
            creatures: creaturesOnMapWithWall
        } = expansionMap(
            diggingCoordinate, dx, dy, map,
            hero, wall, [emptySpace], creatures
        ),
        { // Замена стены в указанной точке на пол
            updatedTargetCoordinates: digCoordOnMapWithTunnel,
            map: mapWithTunnel,
            hero: heroOnMapWithTunnel,
            creatures: creaturesOnMapWithTunnel
        } = expansionMap(
            digCoordinateOnMapWithWall, [0], [0], mapWithWall,
            heroCoordOnMapWithWall, floor, [wall], creaturesOnMapWithWall
        );
    let message = false;

    if (generateGem) {
        const RANDOM_GENERATE_GEM = getRandomInt(0, 9);

        if (RANDOM_GENERATE_GEM === 0) {
            mapWithTunnel[digCoordinateOnMapWithWall.y][digCoordinateOnMapWithWall.x].push(gem);
            message = 'you found a gem!';
        }
    }

    return {
        updateDiggingCoordinate: { ...digCoordOnMapWithTunnel },
        map: [...mapWithTunnel],
        hero: { ...heroOnMapWithTunnel },
        creatures: [...creaturesOnMapWithTunnel],
        message: message
    };
}

export default drawTunnel;
