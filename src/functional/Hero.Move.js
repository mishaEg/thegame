/**
 * @description
 */
export default function HeroMove(inputMapObject, hero, key) {
    let dx = 0,
        dy = 0,
        gex = '',
        msg = '';

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
            inputMapObject[hero.positionY][hero.positionX].pop();
            break;
        case 'grass':
            msg = ' and feels fresh green leaves by your foots :з';
        default:
            msg = 'you stay at ' + gex.icon + msg + '.';
            if (gex.type) {
                msg += ' If you wanna pick it up, press "p"';
            };
            inputMapObject[hero.positionY][hero.positionX].pop();
            hero.positionY += dy;
            hero.positionX += dx;
            break;
    }

    return {
        currentHero: hero,
        currentMap: inputMapObject,
        message: msg
    };
}

function getGex(map, y, x) {
    return map[y][x][map[y][x].length - 1];
}