import elements from '../data/elements';

/**
 * @description Функция для преобразования входящего массива в массив объектов
 * @param {Array} map - Двумерный массив из спецсимволов
 * @return {Array} Возвращает трехмерный массив объектов
 */
export default function initMap(map) {
    const { floor, wall, emptySpace } = elements;

    return map.map(currentRow => currentRow.map((currentColumn) => {
        switch (currentColumn) {
            case '=': return [wall];
            case '*': return [floor];
            default: return [emptySpace];
        }
    }));
}
