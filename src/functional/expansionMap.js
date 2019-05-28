import elements from '../data/elements';

/**
 * Реализация возможности увеличения карты с возможной заменой массива элементов на переданный
 *
 * @param {Object} targetCoordinate - координаты точки для смещений
 * @param {Array} dx - массив смещений для координаты x
 * @param {Array} dy - массив смещений для координаты y
 * @param {Array} map - трехмерный массив объектов карты, которую необходимо увеличить
 * @param {Object} hero - объект героя, координаты которого необходимо менять в зависсимости от расширения
 * @param {Object} replacement - объект, который необходимо сгенерировать на всех координатах смещения
 * @param {Array} creatures - массив объектов врага, координаты которых необходимо менять при расширении карты
 */
function expansionMap(targetCoordinate, dx, dy, map, hero, replacement, replacementItems, creatures) {
    const { emptySpace } = elements;

    dy.forEach((currentDy, index) => {
        let checkCoordinateY = targetCoordinate.y + currentDy,
            checkCoordinateX = targetCoordinate.x + dx[index];

        if (map[checkCoordinateY] === undefined) {
            while (checkCoordinateY < 0 || checkCoordinateY > map.length - 1) {
                const newAddedLine = [];

                map[hero.positionY].forEach(() => {
                    newAddedLine.push([emptySpace]);
                });
                newAddedLine[checkCoordinateX] = [replacement];
                if (checkCoordinateY < 0) { // добавление новой линии к карте сверху
                    map.unshift(newAddedLine); // добавление в начало массива map значения newAddedLine
                    hero.positionY += 1;
                    targetCoordinate.y += 1;
                    checkCoordinateY += 1;
                    creatures.forEach((currentEnemy) => {
                        currentEnemy.positionY += 1;
                    });
                } else if (checkCoordinateY > map.length - 1) { // добавление линии снизу
                    map.push(newAddedLine);
                }
            }
        } else if (map[checkCoordinateY][checkCoordinateX] === undefined) {
            while (checkCoordinateX < 0 || checkCoordinateX > map[checkCoordinateY].length - 1) {
                if (checkCoordinateX < 0) { // добавление новой клетки к карте слева
                    map.forEach((currentRow) => {
                        currentRow.unshift([emptySpace]); // добавление в начало каждой строки элемента
                    });
                    creatures.forEach((currentEnemy) => {
                        currentEnemy.positionX += 1;
                    });
                    map[checkCoordinateY][0][0] = replacement;
                    hero.positionX += 1;
                    targetCoordinate.x += 1;
                    checkCoordinateX += 1;
                } else { // добавление столбца к карте справа
                    map.forEach((currentRow) => {
                        currentRow.push([emptySpace]);
                    });
                }
            }
            map[checkCoordinateY][checkCoordinateX][0] = replacement;
        } else {
            replacementItems.forEach((currentReplace) => {
                if (map[checkCoordinateY][checkCoordinateX][0].icon === currentReplace.icon) {
                    map[checkCoordinateY][checkCoordinateX][0] = replacement;
                }
            });
        }
    });
}

export default expansionMap;
