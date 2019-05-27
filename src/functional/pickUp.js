import getTopItem from './utils/getTopItem';

/**
 * @description Функция реализации поднятия героем предметов
 */
export default function pickUp(map, hero) {
    const gex = getTopItem(map, hero.positionY, hero.positionX);
    let message;

    switch (gex.type) {
        case 'money':
            hero.money += 10;
            map[hero.positionY][hero.positionX].pop(); // удаляем на карте предмет, который подняли
            message = 'you raised money and take 10 gold! ^_^';
            break;
        case 'shield':
            hero.takeShield(gex);
            map[hero.positionY][hero.positionX].pop(); // удаляем на карте предмет, который подняли
            message = 'you raised ' + gex.name + '!';
            break;
        case 'weapon':
            hero.takeWeapon(gex);
            map[hero.positionY][hero.positionX].pop(); // удаляем на карте предмет, который подняли
            message = 'you raised ' + gex.name + ' and increace your power!';
            break;
        case 'food':
            hero.eat();
            map[hero.positionY][hero.positionX].pop(); // удаляем на карте предмет, который подняли
            message = 'you picked up and eat ' + gex.name + ', but feel bad';
            break;
        default:
            message = 'no items to take';
    }
    return message;
}
