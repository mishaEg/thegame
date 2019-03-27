import elements from '../data/elements';

/**
 * @description Функция для преобразования входящего массива в массив объектов
 * @param {Array} mapWithSymbol - Двумерный массив из спецсимволов
 * @return {Array} Возвращает трехмерный массив объектов
 */
export default function generateObjectMap(mapWithSymbol) {
    return mapWithSymbol.map(currentRow => {
        return currentRow.map(currentColumn => {
            switch (currentColumn) {
                case '=': return [elements.wall]
                case '*': return [elements.floor]
                default: return [elements.emptySpace]
            }
        })
    });
}