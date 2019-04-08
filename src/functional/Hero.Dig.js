/**
 * @description
 */

import elements from '../data/elements';
import expansionMap from '../functional/expansionMap';

export default function HeroDig(inputMapObject, inputHero, key) {

    let dx = 0,
        dy = 0,
        msg = 'digging...',
        hero = Object.assign(inputHero), // клон объекта (не стейт)
        map = Object.assign(inputMapObject); // клон объекта (не стейт)

    switch (key) {
        case "left": dx = -1; break;
        case "right": dx = 1; break;
        case "up": dy = -1; break;
        case "down": dy = 1; break;
        default: throw new Error("Невозможно обработать данное нажатие")
    };

    let x = hero.positionX + dx,
        y = hero.positionY + dy;

    const gex = getGex(map, y, x);

    if (gex.icon === 'wall') {
        const exDx = [1, 0, -1, 0], // смещения, соответствующие соседям ячейки
            exDy = [0, 1, 0, -1]; // справа, снизу, слева и сверху 
        let updated = '';
        map[y][x][0] = elements.floor;
        updated = expansionMap(x, y, exDx, exDy, map, hero, elements.wall, [elements.emptySpace]);
        hero = updated.hero;
        map = updated.map;
        if (key === "left") {
            x = hero.positionX;
            y = hero.positionY;
        };
    } else {
        msg = 'there is nothing to dig';
    };

    hero.readyToMine = false;

    return {
        hero: hero,
        map: map,
        message: msg,
        x: x,
        y: y
    };
}

function getGex(map, y, x) {
    const len = map[y][x].length;

    return map[y][x][len - 1];
}