import elements from '../data/elements';
import expansionMap from './expansionMap';

/**
 * Реализация генерации входа в пещеру на карте
 */
function drawTunnel(diggingCoordinate, map, hero, creatures) {
    const { floor, emptySpace, wall } = elements,
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

    return {
        updateDiggingCoordinate: { ...digCoordOnMapWithTunnel },
        map: [...mapWithTunnel],
        hero: { ...heroOnMapWithTunnel },
        creatures: [...creaturesOnMapWithTunnel]
    };
}

export default drawTunnel;
