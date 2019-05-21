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
        dy = 0,
        treasure = 'none',
        msg = false;

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
        diggingItem = getTopItem(map, diggingCoordinate.y, diggingCoordinate.x),
        RANDOM_GENERATE_CAVE = getRandomInt(0, 12);

    if (diggingItem.icon !== 'wall') {
        return {
            diggedUp: false,
            message: "there is nothing to dig",
            updatedHero: {
                ...hero,
                readyToMine: false
            }
        };
    }

    switch (true) {
        case (RANDOM_GENERATE_CAVE === 6):
            msg = 'you found cave with enemy!';
            treasure = 'enemy';
            break;
        case (RANDOM_GENERATE_CAVE === 7):
            msg = 'you found cave with grass!';
            treasure = 'grass';
            break;
        case (RANDOM_GENERATE_CAVE === 8):
            msg = 'you found cave with iron shield!';
            treasure = 'iron shield';
            break;
        case (RANDOM_GENERATE_CAVE === 9):
            msg = 'you found cave with iron sword!';
            treasure = 'iron sword';
            break;
        case (RANDOM_GENERATE_CAVE === 10):
            msg = 'you found a gem!';
            treasure = 'gem';
            break;
        default: // по умолчанию отрисовываем туннель без сообщения
            break;
    }

    let updatedObjects = {
        diggedUp: true,
        message: msg
    };

    if (treasure === 'none') {
        const {
            map: mapWithTunnel,
            hero: heroOnMapWithTunnel,
            creatures: creaturesOnMapWithTunnel
        } = drawTunnel(diggingCoordinate, map, hero, creatures);

        updatedObjects = {
            ...updatedObjects,
            updatedMap: [...mapWithTunnel],
            updatedHero: {
                ...heroOnMapWithTunnel,
                readyToMine: false
            },
            updatedCreatures: [...creaturesOnMapWithTunnel]
        };
    } else {
        const {
            mapWithCave,
            heroOnMapWithCave,
            creaturesOnMapWithCave
        } = drawCave(diggingCoordinate, direction, treasure, map, hero, creatures);

        updatedObjects = {
            ...updatedObjects,
            updatedMap: [...mapWithCave],
            updatedHero: {
                ...heroOnMapWithCave,
                readyToMine: false
            },
            updatedCreatures: [...creaturesOnMapWithCave]
        };
    }

    return updatedObjects;
}
