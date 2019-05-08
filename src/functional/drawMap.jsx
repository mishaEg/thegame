import React from 'react';

/**
 * @description Функция для преобразования карты в формат для отрисовки
 * @param {Array} inputMap - Входящий двухмерный массив
 * @return {Array} - Возвращает новый массив для отрисовки
 */
export default function drawMap(inputMap, hero, creatures) {
    const generatedMap = inputMap.map(currentRow => (
        currentRow.map(currentColumn => (
            currentColumn[currentColumn.length - 1].icon
        ))
    ));

    generatedMap[hero.positionY][hero.positionX] = hero.icon;

    creatures.forEach((currentCreatures) => {
        generatedMap[currentCreatures.positionY][currentCreatures.positionX] = currentCreatures.icon;
    });

    return generatedMap.map((currentRow, rowIndex) => (
        <tr key={rowIndex}>
            {currentRow.map((currentColumn, colIndex) => (
                <td key={colIndex}>
                    <div className={`map_object ${currentColumn}`} />
                </td>
            ))}
        </tr>
    ));
}
