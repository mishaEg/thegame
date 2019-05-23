import elements from '../data/elements';
import expansionMap from './expansionMap';
import Enemy from '../Units/Enemy';
import drawTunnel from './drawTunnel';

/**
 * Реализация генерации пещеры с сокровищем на карте
 */
function drawBodyCave(targetCoordinate, treasure, map, hero, creatures) {
    const { floor, emptySpace, wall, grass, iron_sword, iron_shield } = elements,
        dx = [-1, -1, -1, 0, 0, +0, 1, 1, +1], // смещения, для обхвата площади
        dy = [+0, +1, -1, 0, 1, -1, 0, 1, -1], // размером 3х3 с центром в указанной точке
        wall_dx = [-1, 0, 1, -2, 2, -2, 2, -2, 2, -2, +2, -2, -1, +0, +1, +2], // смещения для отрисовки
        wall_dy = [+2, 2, 2, +2, 2, +1, 1, +0, 0, -1, -1, -2, -2, -2, -2, -2], // стен во всех пещерах

        { // Генерация пола пещеры размером 3х3 с центром в указанной точке
            updatedTargetCoordinates: targetCoordinateOnMapWithFloorCave,
            map: mapWithFloorCave,
            hero: heroOnMapWithFloorCave,
            creatures: creaturesOnMapWithFloorCave
        } = expansionMap(targetCoordinate, dx, dy, map, hero, floor, [emptySpace, wall], creatures),

        { // Генерация стен вокруг пещеры с центром в указанной точке
            updatedTargetCoordinates: targetCoordOnMapWithCave,
            map: mapWithCave,
            hero: heroOnMapWithCave,
            creatures: creaturesOnMapWithCave
        } = expansionMap(
            targetCoordinateOnMapWithFloorCave, wall_dx, wall_dy, mapWithFloorCave,
            heroOnMapWithFloorCave, wall, [emptySpace], creaturesOnMapWithFloorCave
        );
    let resultCreaturesOnMap = [...creaturesOnMapWithCave];

    switch (treasure) {
        case 'enemy':
            resultCreaturesOnMap = [
                ...resultCreaturesOnMap,
                new Enemy(targetCoordOnMapWithCave.x, targetCoordOnMapWithCave.y)
            ];
            break;
        case 'grass':
            mapWithCave[targetCoordOnMapWithCave.y][targetCoordOnMapWithCave.x].push(grass);
            break;
        case 'iron sword':
            mapWithCave[targetCoordOnMapWithCave.y][targetCoordOnMapWithCave.x].push(iron_sword);
            break;
        case 'iron shield':
            mapWithCave[targetCoordOnMapWithCave.y][targetCoordOnMapWithCave.x].push(iron_shield);
            break;
        case 'none':
            break;
        default:
            throw new Error(`Treasure is not correct: ${treasure}`);
    }

    return {
        mapWithCave: [...mapWithCave],
        heroOnMapWithCave: { ...heroOnMapWithCave },
        creaturesOnMapWithCave: [...resultCreaturesOnMap]
    };
}

/**
 * @description реализация генерации пещеры на карте
 * @return generateEnemy false - если пещера сгенерирована без врага, object - враг
 */
function drawCave(diggingCoordinate, direction, treasure, map, hero, creatures) {
    const {
        updateDiggingCoordinate: diggingCoordinateWithTunnel,
        map: mapWithTunnel,
        hero: heroOnMapWithTunnel,
        creatures: creaturesOnMapWithTunnel
    } = drawTunnel(diggingCoordinate, false, map, hero, creatures);

    switch (direction) {
        case 'left':
            diggingCoordinateWithTunnel.x -= 2;
            break;
        case 'right':
            diggingCoordinateWithTunnel.x += 2;
            break;
        case 'up':
            diggingCoordinateWithTunnel.y -= 2;
            break;
        case 'down':
            diggingCoordinateWithTunnel.y += 2;
            break;
        default:
            throw new Error("direction is not a correct:" + direction);
    }
    const {
        mapWithCave,
        heroOnMapWithCave,
        creaturesOnMapWithCave
    } = drawBodyCave(diggingCoordinateWithTunnel, treasure, mapWithTunnel, heroOnMapWithTunnel, creaturesOnMapWithTunnel);

    return {
        mapWithCave: [...mapWithCave],
        heroOnMapWithCave: { ...heroOnMapWithCave },
        creaturesOnMapWithCave: [...creaturesOnMapWithCave]
    };
}

export default drawCave;
