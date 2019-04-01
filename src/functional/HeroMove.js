/**
 * @description
 */
export default function HeroMove(inputMapObject, hero, key, msg) {
    let dx = 0,
        dy = 0,
        gex = '';

    switch (key) {
        case "left": dx = -1; break;
        case "right": dx = 1; break;
        case "up": dy = -1; break;
        case "down": dy = 1; break;
        default: throw new Error("Невозможно обработать данное нажатие")
    };

    gex = getGex(inputMapObject, hero.positionY + dy, hero.positionX + dx);

    if (gex === 'wall') {
        msg = 'there is no the way';
        inputMapObject[hero.positionY][hero.positionX].pop();
    } else {
        msg = 'you stay at ' + gex;
        inputMapObject[hero.positionY][hero.positionX].pop();
        hero.positionY += dy;
        hero.positionX += dx;
    }
    return [hero, inputMapObject, msg];
}

function getGex(map, y, x) {
   return map[y][x][map[y][x].length - 1].icon;
}