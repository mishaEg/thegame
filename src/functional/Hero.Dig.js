import elements from '../data/elements';
import expansionMap from './expansionMap';
import getRandomInt from './getRandomInt';
import drawCave from './drawCave';

/**
 * @description функция поиска самого верхнего элемента по заданным координатам
 * @return последний элемент массива в заданной ячейке карты
 */
function getGex(map, y, x) {
    const len = map[y][x].length;

    return map[y][x][len - 1];
}

/**
 * @description реализация функции копания для героя
 * !!мутирует входные объекты map, hero!!
 * @return message, x, y
 */
export default function HeroDig(map, hero, key, creatures) {
    let dx = 0,
        dy = 0,
        msg = '',
        x = 0,
        y = 0;

    switch (key) {
        case "left": dx = -1; break;
        case "right": dx = 1; break;
        case "up": dy = -1; break;
        case "down": dy = 1; break;
        default: throw new Error("Некорректный ключ key:" + key);
    }

    x = hero.positionX + dx;
    y = hero.positionY + dy;

    const gex = getGex(map, y, x),
        exDx = [1, 0, -1, 0], // смещения, соответствующие соседям ячейки
        exDy = [0, 1, 0, -1]; // справа, снизу, слева и сверху


    if (gex.icon === 'wall') {
        const RANDOM_GENERATE_CAVE = getRandomInt(0, 12);
        let treasure = 'none';

        switch (true) {
            case (RANDOM_GENERATE_CAVE > 4 && RANDOM_GENERATE_CAVE < 6):
                msg = 'you found cave with enemy!';
                treasure = 'enemy';
                break;
            case (RANDOM_GENERATE_CAVE > 6 && RANDOM_GENERATE_CAVE < 8):
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
            case (RANDOM_GENERATE_CAVE > 9):
                msg = 'you found a gem!';
                treasure = 'gem';
                break;
            default:
                expansionMap(x, y, exDx, exDy, map, hero, elements.wall, [elements.emptySpace]);
                map[y][x][0] = elements.floor;
                if (key === "left") {
                    x = hero.positionX;
                    y = hero.positionY;
                }
        }
        if (treasure !== 'none') {
            const { generateEnemy } = drawCave(x, y, key, treasure, map, hero);

            if (generateEnemy) {
                creatures.push(generateEnemy);
            }
        }
    } else {
        msg = 'there is nothing to dig';
    }
    hero.readyToMine = false;

    return {
        message: msg
    };
}
