import elements from '../data/elements';
import expansionMap from './expansionMap';

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
export default function HeroDig(map, hero, key) {
    let dx = 0,
        dy = 0,
        msg = 'digging...',
        x = hero.positionX + dx,
        y = hero.positionY + dy;
    const gex = getGex(map, y, x);

    switch (key) {
        case "left": dx = -1; break;
        case "right": dx = 1; break;
        case "up": dy = -1; break;
        case "down": dy = 1; break;
        default: throw new Error("Невозможно обработать данное нажатие");
    }

    if (gex.icon === 'wall') {
        const exDx = [1, 0, -1, 0], // смещения, соответствующие соседям ячейки
            exDy = [0, 1, 0, -1]; // справа, снизу, слева и сверху

        expansionMap(x, y, exDx, exDy, map, hero, elements.wall, [elements.emptySpace]);
        map[y][x][0] = elements.floor;
        if (key === "left") {
            x = hero.positionX;
            y = hero.positionY;
        }
    } else {
        msg = 'there is nothing to dig';
    }
    hero.readyToMine = false;

    return {
        message: msg,
        x: x,
        y: y
    };
}
