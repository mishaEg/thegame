import elements from '../data/elements';

/**
 * @description реализация расширения текущей карты
 * !!Данная функция мутирует значения map и hero!!
 */
export default function expansionMap(targetCoordinate, dx, dy, map, hero, gex, replasments, creatures) {
    const { emptySpace } = elements;

    dy.forEach((currentItem, index) => {
        let newY = targetCoordinate.y + currentItem,
            newX = targetCoordinate.x + dx[index];

        if (map[newY] === undefined) {
            while (newY < 0 || newY > map.length - 1) {
                const line = [];

                for (let column = 0; column < map[hero.positionY].length - 1; column++) {
                    line[column] = [emptySpace];
                }
                line[newX] = [gex];
                if (newY < 0) { // добавление новой линии к карте сверху
                    map.unshift(line); // добавление в начало массива map значения line
                    hero.positionY += 1;
                    targetCoordinate.y += 1;
                    newY += 1;
                    creatures.forEach((currentCreature) => {
                        currentCreature.positionY += 1;
                    });
                } else if (newY > map.length - 1) { // добавление линии снизу
                    map.push(line);
                }
            }
        } else if (map[newY][newX] === undefined) {
            while (newX < 0 || newX > map[newY].length - 1) {
                if (newX < 0) { // добавление новой клетки к карте слева
                    map.forEach((rowInMap) => {
                        rowInMap.unshift([emptySpace]); // добавление в начало каждой строки элемента
                    });
                    creatures.forEach((currentCreature) => {
                        currentCreature.positionX += 1;
                    });
                    map[newY][0][0] = gex;
                    hero.positionX += 1;
                    targetCoordinate.x += 1;
                    newX += 1;
                } else { // добавление столбца к карте справа
                    map.forEach((rowInMap) => {
                        rowInMap.push([emptySpace]);
                    });
                    map[newY][newX][0] = gex;
                }
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
