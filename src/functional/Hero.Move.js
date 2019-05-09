import isContact from './isContact';

/**
 * @description функция поиска самого верхнего элемента по заданным координатам
 * @return последний элемент массива в заданной ячейке карты
 */
function getGex(map, y, x) {
    const len = map[y][x].length;

    return map[y][x][len - 1];
}

/**
 * @description реализация функции движения героя на карте
 * !!!Мутирует входящие значения map, hero
 * @return message - лог текущего события, x, y - новые координаты героя
 */
export default function HeroMove(map, hero, key, creatures) {
    let dx = 0,
        dy = 0,
        msg = '',
        contactWithAnyEnemy = false;

    switch (key) {
        case "left": dx = -1; break;
        case "right": dx = 1; break;
        case "up": dy = -1; break;
        case "down": dy = 1; break;
        default: throw new Error("key is not correct:" + key);
    }

    const x = hero.positionX + dx,
        y = hero.positionY + dy,
        gex = getGex(map, y, x);

    creatures.forEach((currentCreature) => {
        if (isContact({ positionX: x, positionY: y }, currentCreature)) {
            contactWithAnyEnemy = true;
        }
    });

    if (!contactWithAnyEnemy) {
        switch (gex.icon) {
            case 'wall':
                msg = 'there is no the way';
                break;
            case 'sleeping_enemy':
                break;
            case ' ':
                msg = 'how you that doing??';
                break;
            case 'grass':
                msg = 'you stay at ' + gex.icon + ' and feels fresh green leaves by your foots :з.';
                hero.positionY += dy;
                hero.positionX += dx;
                break;
            default:
                if (gex.type) {
                    msg = 'you stay at ' + gex.icon + ', if you wanna pick it up, press "p"';
                }
                hero.positionY += dy;
                hero.positionX += dx;
        }
    }

    return {
        message: msg,
        newCoordX: x,
        newCoordY: y
    };
}
