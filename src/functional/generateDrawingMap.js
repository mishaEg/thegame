/**
 * @description Функция для преобразования карты в формат для отрисовки
 * @param {Array} inputMap - Входящий двухмерный массив
 * @return {Array} - Возвращает новый массив для отрисовки
 */
export default function generateDrawingMap(inputMap) {
    return inputMap.map(currentRow => {
        return currentRow.map(currentColumn => {
            return currentColumn[currentColumn.length - 1].icon
        })
    })
}