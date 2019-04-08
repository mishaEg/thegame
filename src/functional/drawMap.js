import React from 'react';

/**
 * @description Функция для преобразования карты в формат для отрисовки
 * @param {Array} inputMap - Входящий двухмерный массив
 * @return {Array} - Возвращает новый массив для отрисовки
 */
export default function drawMap(inputMap, hero) {
    const generatedMap = inputMap.map(currentRow => {
        return currentRow.map(currentColumn => {
            return currentColumn[currentColumn.length - 1].icon;
        });
    });

    generatedMap[hero.positionY][hero.positionX] = hero.icon;
    
    return generatedMap.map(currentRow => {
        return <tr>{currentRow.map(currentColumn => {
            return <td><div className={`map_object ${currentColumn}`} /></td>})}</tr>
    });
}
