import elements from '../data/elements';
import getRandomInt from './getRandomInt';

/**
 * @description Функция для случайной генерации мечей на карте там, где уже расположен пол
 * @param {Array} inputMap - Входящий двухмерный массив
 * @param {Number} countGenerateSwords - Количество травы, необходимой сгенерировать на карте
 */
export default function generateSwords(inputMap, countGenerateSwords) {
    for (let counterSwords = 0; counterSwords < countGenerateSwords; counterSwords++) {
        let x = getRandomInt(2, inputMap[0].length - 1),
            y = getRandomInt(2, inputMap.length - 1),
            len = inputMap[y][x].length - 1;
        
        if (inputMap[y][x][len].icon !== elements.floor.icon) {
            counterSwords--;
        } else {
            inputMap[y][x].push(elements.sword);
        };
    }
}
