import elements from '../data/elements';
import getRandomInt from './getRandomInt';

/**
 * @description Функция для случайной генерации щитов на карте там, где уже расположен пол
 * @param {Array} inputMap - Входящий двухмерный массив
 * @param {Number} countGenerateShields - Количество щитов, необходимых сгенерировать на карте
 */
export default function generateGrass(inputMap, countGenerateShields) {
    for (let counterShields = 0; counterShields < countGenerateShields; counterShields++) {
        let x = getRandomInt(2, inputMap[0].length - 1),
            y = getRandomInt(2, inputMap.length - 1),
            len = inputMap[y][x].length - 1;
        
        if (inputMap[y][x][len].icon !== elements.floor.icon) {
            counterShields--;
        } else {
            inputMap[y][x].push(elements.shield);
        };
    }
}