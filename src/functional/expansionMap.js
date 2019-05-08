/**
 * @description реализация расширения текущей карты
 * !!Данная функция мутирует значения map и hero!!
 */

import elements from '../data/elements';

export default function expansionMap(x, y, dx, dy, map, hero, gex, replasments) {
    const { emptySpace } = elements;

    dy.forEach((currentItem, index) => {
        const newY = y + currentItem,
            newX = x + dx[index];

        if (map[newY] === undefined) {
            const line = [];

            for (let column = 0; column < map[hero.positionY].length; column++) {
                line[column] = [emptySpace];
            }
            line[newX] = [gex];
            if (newY < 0) { // добавление новой линии к карте сверху
                map.unshift(line); // добавление в начало массива map значения line
                hero.positionY += 1;
                y += 1;
            } else if (newY > map.length - 1) { // добавление линии снизу
                map.push(line);
            }
        } else if (map[newY][newX] === undefined) {
            if (newX < 0) { // добавление новой клетки к карте слева
                map.forEach((rowInMap) => {
                    rowInMap.unshift([emptySpace]); // добавление в начало каждой строки элемента
                });
                map[newY][0][0] = gex;
                hero.positionX += 1;
                x += 1;
            } else { // добавление столбца к карте справа
                map.forEach((rowInMap) => {
                    rowInMap.push([emptySpace]);
                });
                map[newY][newX][0] = gex;
            }
        } else {
            replasments.forEach((currentReplace) => {
                if (map[newY][newX][0] === currentReplace) {
                    map[newY][newX][0] = gex;
                }
            });
        }
    });
}
