/**
 * @description
 */
export default function HeroPickUp(inputMap, inputHero, message) {

    const hero = Object.assign(inputHero), // клон объекта (не стейт)
        map = Object.assign(inputMap), // клон объекта (не стейт)
        gex = getGex(map, hero.positionY, hero.positionX),
        length = map[hero.positionY][hero.positionX].length;

    switch (gex.type) {
        case 'money':
            hero.money += 10;
            map[hero.positionY][hero.positionX].splice(length - 1, 1);
            message = 'you raised money and take 10 gold! ^_^';
            break;
        case 'shield':
            hero.shield = gex;
            map[hero.positionY][hero.positionX].splice(length - 1, 1);
            message = 'you raised shield';
            break;
        case 'weapon':
            hero.weapon = gex;
            hero.damage = hero.damage + hero.weapon.damage;
            map[hero.positionY][hero.positionX].splice(length - 1, 1);
            message = 'you raised shield and increace your power!';
            break;
        default: 
            message = 'no items to take';
    }

    return {
        hero: hero,
        map: map,
        message: message
    };
}

function getGex(map, y, x) {
    const len = map[y][x].length;

    return map[y][x][len - 1];
}