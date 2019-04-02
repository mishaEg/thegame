/**
 * @description
 */
export default function HeroMove(inputMapObject, hero, key) {
    let dx = 0,
        dy = 0,
        gex = '',
        msg = '',
        tempHero = Object.assign(hero); // Копирование объекта, чтобы по ссылке не менять состояние неправильным способом

    switch (key) {
        case "left": dx = -1; break;
        case "right": dx = 1; break;
        case "up": dy = -1; break;
        case "down": dy = 1; break;
        default: throw new Error("Невозможно обработать данное нажатие")
    };

    gex = getGex(inputMapObject, hero.positionY + dy, hero.positionX + dx);

    switch (gex.icon) {
        case 'wall':
            msg = 'there is no the way';
            break;
        case 'grass':
            msg = ' and feels fresh green leaves by your foots :з';
        default:
            msg = 'you stay at ' + gex.icon + msg + '.';
            if (gex.type) {
                msg += ' If you wanna pick it up, press "p"';
            };
            tempHero.positionY += dy;
            tempHero.positionX += dx;
            break;
    }

    return {
        hero: tempHero,
        map: inputMapObject,
        message: msg
    };
}

function getGex(map, y, x) {
    return map[y][x][map[y][x].length - 1];
}