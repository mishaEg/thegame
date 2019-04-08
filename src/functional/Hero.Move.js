/**
 * @description
 */

import isContact from '../functional/isContact';

export default function HeroMove(inputMap, inputHero, key, inputCreatures) {
    let dx = 0,
        dy = 0,
        x = 0,
        y = 0,
        gex = '',
        msg = '',
        contact = false,
        hero = Object.assign(inputHero), // клон объекта (не стейт)
        map = Object.assign(inputMap); // клон объекта (не стейт)

    switch (key) {
        case "left": dx = -1; break;
        case "right": dx = 1; break;
        case "up": dy = -1; break;
        case "down": dy = 1; break;
        default: throw new Error("Невозможно обработать данное нажатие")
    };

    x = hero.positionX + dx;
    y = hero.positionY + dy;

    gex = getGex(map, y, x);

    for (var i in inputCreatures) {
        if (isContact({positionX: x, positionY: y}, inputCreatures[i])) {
            contact = true;
            break;
        };
    };

    if (!contact) {
        switch (gex.icon) {
            case 'wall':
                msg = 'there is no the way';
                break;
            case 'sleeping_enemy':
                break;
            case ' ':
                msg = 'there is no the way';
                break;
            case 'grass':
                msg = ' and feels fresh green leaves by your foots :з';
            default:
                msg = 'you stay at ' + gex.icon + msg + '.';
                if (gex.type) {
                    msg += ' If you wanna pick it up, press "p"';
                };
                hero.positionY += dy;
                hero.positionX += dx;
                break;
        };
    };

    return {
        hero: hero,
        map: map,
        message: msg,
        x: x,
        y: y
    };
}

function getGex(map, y, x) {
    return map[y][x][map[y][x].length - 1];
}