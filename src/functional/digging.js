import getRandomInt from './utils/getRandomInt';
import getTopItem from './utils/getTopItem';
import drawCave from './drawCave';
import drawTunnel from './drawTunnel';

/**
 * @description реализация функции копания для героя
 * @return message, x, y
 */
export default function digging(map, hero, direction, creatures) {
    let dx = 0,
        dy = 0;

    switch (direction) {
        case "left": dx = -1; break;
        case "right": dx = 1; break;
        case "up": dy = -1; break;
        case "down": dy = 1; break;
        default: throw new Error("Некорректный параметр direction:" + direction);
    }

    const diggingCoordinate = {
            x: hero.positionX + dx,
            y: hero.positionY + dy
        },
        diggingItem = getTopItem(map, diggingCoordinate.y, diggingCoordinate.x);

    let updatedObjects = {
        message: "there is nothing to dig",
        updatedCreatures: [...creatures],
        updatedHero: {
            ...hero,
            readyToMine: false
        },
        updatedMap: [...map]
    };

    if (diggingItem.icon !== 'wall') {
        return updatedObjects;
    }

    const RANDOM_GENERATE_CAVE = getRandomInt(0, 4);

    if (RANDOM_GENERATE_CAVE === 0) { // Условие для генерации пещеры, шанс 20%
        const RANDOM_GENERATE_ITEM = getRandomInt(0, 7);
        let message = '',
            treasure = '';

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

        const {
            mapWithCave,
            heroOnMapWithCave,
            creaturesOnMapWithCave
        } = drawCave(diggingCoordinate, direction, treasure, map, hero, creatures);

        updatedObjects = {
            ...updatedObjects,
            message: message,
            updatedMap: [...mapWithCave],
            updatedHero: {
                ...heroOnMapWithCave,
                readyToMine: false
            },
            updatedCreatures: [...creaturesOnMapWithCave]
        };
    } else {
        // Если рандом на пещеру не выпал, тогда отрисовываем
        // туннель с вероятностью раскопки камня 10%
        const {
            map: mapWithTunnel,
            hero: heroOnMapWithTunnel,
            creatures: creaturesOnMapWithTunnel,
            message: messageAboutGeneratedGem
        } = drawTunnel(diggingCoordinate, true, map, hero, creatures);

        updatedObjects = {
            ...updatedObjects,
            message: messageAboutGeneratedGem,
            updatedMap: [...mapWithTunnel],
            updatedHero: {
                ...heroOnMapWithTunnel,
                readyToMine: false
            },
            updatedCreatures: [...creaturesOnMapWithTunnel]
        };
    }

    return updatedObjects;
}
