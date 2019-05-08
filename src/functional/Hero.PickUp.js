/**
 * @description функция поиска самого верхнего элемента по заданным координатам
 * @return последний элемент массива в заданной ячейке карты
 */
function getGex(map, y, x) {
    const len = map[y][x].length;

    return map[y][x][len - 1];
}

/**
 * @description Функция реализации поднятия героем предметов
 * !!!Осторожно, функция мутирует переданные в нее параметры (map, hero)!!!
 */
export default function HeroPickUp(map, hero, message) {
    const gex = getGex(map, hero.positionY, hero.positionX);

    switch (gex.type) {
        case 'money':
            hero.money += 10;
            map[hero.positionY][hero.positionX].pop(); // удаляем на карте предмет, который подняли
            message = 'you raised money and take 10 gold! ^_^';
            break;
        case 'shield':
            hero.shield = gex;
            map[hero.positionY][hero.positionX].pop(); // удаляем на карте предмет, который подняли
            message = 'you raised shield';
            break;
        case 'weapon':
            hero.weapon = gex;
            hero.damage = hero.damage + hero.weapon.damage;
            map[hero.positionY][hero.positionX].pop(); // удаляем на карте предмет, который подняли
            message = 'you raised shield and increace your power!';
            break;
        default:
            message = 'no items to take';
    }
    return message;
}
