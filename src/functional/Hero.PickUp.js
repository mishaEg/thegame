/**
 * @description
 */
export default function HeroPickUp(inputMapObject, hero) {

    const gex = getGex(inputMapObject, hero.positionY, hero.positionX);
    const length = inputMapObject[hero.positionY][hero.positionX].length;

    switch (gex.type) {
        case 'money':
            hero.money += 10;
            inputMapObject[hero.positionY][hero.positionX].splice(length - 1, 1);
            break;
        case 'shield':
            hero.shield = gex;
            inputMapObject[hero.positionY][hero.positionX].splice(length - 1, 1);
            break;
        case 'weapon':
            hero.weapon = gex;
            inputMapObject[hero.positionY][hero.positionX].splice(length - 1, 1);
            break;
    }

    return {
        hero: hero,
        map: inputMapObject
     };
}

function getGex(map, y, x) {
    const len = map[y][x].length;

    return map[y][x][len - 1];
}