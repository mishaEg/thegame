import getRandomInt from './utils/getRandomInt';
import getTopItem from './utils/getTopItem';
import drawCave from './drawCave';
import drawTunnel from './drawTunnel';

/**
 * Реализация функции копания для героя
 * @return message
 */
export default function digging(map, hero, direction, creatures) {
    let dx = 0,
        dy = 0,
        message = "there is nothing to dig";

    hero.readyToMine = false;

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

    if (diggingItem.icon !== 'wall') {
        return message;
    }

    const RANDOM_GENERATE_CAVE = getRandomInt(0, 4);

    if (RANDOM_GENERATE_CAVE === 0) { // Условие для генерации пещеры, шанс 20%
        const RANDOM_GENERATE_ITEM = getRandomInt(0, 7);
        let treasure = '';

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

        drawCave(diggingCoordinate, direction, treasure, map, hero, creatures);
    } else {
        // Если рандом на пещеру не выпал, тогда отрисовываем
        // туннель с вероятностью раскопки камня 10%
        message = drawTunnel(diggingCoordinate, true, map, hero, creatures);
    }

    return message;
}
