import React from 'react';

/**
 * @description Функция для преобразования карты в формат для отрисовки
 * @param {Array} inputMap - Входящий двухмерный массив
 * @return {Array} - Возвращает новый массив для отрисовки
 */
export default function generateDrawingMap(inputMap) {
    const generatedMap = inputMap.map(currentRow => {
        return currentRow.map(currentColumn => {
            return currentColumn[currentColumn.length - 1].icon
        })
    })
    return generatedMap.map(currentRow => {
        return <tr>{currentRow.map(currentColumn => {
            return <td><div className={`map_object ${currentColumn}`} /></td>})}</tr>
    })
}
