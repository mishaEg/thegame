/**
 * @description
 */
export default function HeroPickUp(inputMapObject, hero) {

    const gex = getGex(inputMapObject, hero.positionY, hero.positionX);
    const length = inputMapObject[hero.positionY][hero.positionX].length;

    switch (gex.type) {
        case 'money':
            hero.money += 10;
            inputMapObject[hero.positionY][hero.positionX].splice(length - 2, 1);
            break;
        case 'shield':
            hero.shield = gex;
            inputMapObject[hero.positionY][hero.positionX].splice(length - 2, 1);
            break;
        case 'weapon':
            hero.weapon = gex;
            inputMapObject[hero.positionY][hero.positionX].splice(length - 2, 1);
            break;
    }

    inputMapObject[hero.positionY][hero.positionX].pop();

    return [hero, inputMapObject];
}

function getGex(map, y, x) {
    return map[y][x][map[y][x].length - 2];
}