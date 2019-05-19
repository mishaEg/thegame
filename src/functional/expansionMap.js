import elements from '../data/elements';

/**
 * реализация возможности увеличения карты с возможной заменой массива элементов на переданный
 *
 * @param {Object} targetCoordinate - координаты точки для смещений
 * @param {Array} dx - массив смещений для координаты x
 * @param {Array} dy - массив смещений для координаты y
 * @param {Array} map - трехмерный массив объектов карты, которую необходимо увеличить
 * @param {Object} hero - объект героя, координаты которого необходимо менять в зависсимости от расширения
 * @param {Object} replacement - объект, который необходимо сгенерировать на всех координатах смещения
 * @param {Array} elementsForReplace - массив объектов, которые будут заменены на элемент replacement
 * @param {Array} creatures - массив объектов врага, координаты которых необходимо менять при расширении карты
 * @returns {Object} updatedTargetCoordinates - новые координаты вскапываемой точки,
 * map - увеличенная карта,
 * hero - новые координаты героя,
 * creatures - массив объектов врагов с новыми координатами
 */
function expansionMap(targetCoordinate, dx, dy, map, hero, replacement, replacementItems, creatures) {
    const mapForUpdate = [...map],
        allEnemyOnMap = [...creatures],
        elementsForReplace = [...replacementItems],
        { emptySpace } = elements;
    let { x: targetCoordinateX, y: targetCoordinateY } = targetCoordinate,
        { positionX: heroPositionX, positionY: heroPositionY } = hero;

    dy.forEach((currentDy, index) => {
        let checkCoordinateY = targetCoordinateY + currentDy,
            checkCoordinateX = targetCoordinateX + dx[index];

        if (mapForUpdate[checkCoordinateY] === undefined) {
            while (checkCoordinateY < 0 || checkCoordinateY > mapForUpdate.length - 1) {
                const newAddedLine = [];

                mapForUpdate[heroPositionY].forEach(() => {
                    newAddedLine.push([emptySpace]);
                });
                newAddedLine[checkCoordinateX] = [replacement];
                if (checkCoordinateY < 0) { // добавление новой линии к карте сверху
                    mapForUpdate.unshift(newAddedLine); // добавление в начало массива map значения newAddedLine
                    heroPositionY += 1;
                    targetCoordinateY += 1;
                    checkCoordinateY += 1;
                    allEnemyOnMap.forEach((currentEnemy) => {
                        currentEnemy.positionY += 1;
                    });
                } else if (checkCoordinateY > mapForUpdate.length - 1) { // добавление линии снизу
                    mapForUpdate.push(newAddedLine);
                }
            }
        } else if (mapForUpdate[checkCoordinateY][checkCoordinateX] === undefined) {
            while (checkCoordinateX < 0 || checkCoordinateX > mapForUpdate[checkCoordinateY].length - 1) {
                if (checkCoordinateX < 0) { // добавление новой клетки к карте слева
                    mapForUpdate.forEach((currentRow) => {
                        currentRow.unshift([emptySpace]); // добавление в начало каждой строки элемента
                    });
                    allEnemyOnMap.forEach((currentEnemy) => {
                        currentEnemy.positionX += 1;
                    });
                    mapForUpdate[checkCoordinateY][0][0] = replacement;
                    heroPositionX += 1;
                    targetCoordinateX += 1;
                    checkCoordinateX += 1;
                } else { // добавление столбца к карте справа
                    mapForUpdate.forEach((currentRow) => {
                        currentRow.push([emptySpace]);
                    });
                }
            }
            mapForUpdate[checkCoordinateY][checkCoordinateX][0] = replacement;
        } else {
            elementsForReplace.forEach((currentReplace) => {
                if (mapForUpdate[checkCoordinateY][checkCoordinateX][0].icon === currentReplace.icon) {
                    mapForUpdate[checkCoordinateY][checkCoordinateX][0] = replacement;
                }
            });
        }
    });

    return {
        updatedTargetCoordinates: {
            x: targetCoordinateX,
            y: targetCoordinateY
        },
        map: [...mapForUpdate],
        hero: {
            ...hero,
            positionX: heroPositionX,
            positionY: heroPositionY
        },
        creatures: [...allEnemyOnMap]
    };
}

module.exports = expansionMap;
