/**
 * @description функция поиска самого верхнего элемента по заданным координатам
 * @return последний элемент массива в заданной ячейке карты
 */
function getTopItem(map, y, x) {
    const len = map[y][x].length;

    return map[y][x][len - 1];
}

export default getTopItem;
