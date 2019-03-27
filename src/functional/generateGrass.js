import elements from '../data/elements';
import getRandomInt from './getRandomInt';

/**
 * @description Функция для случайной генерации травы на карте там, где уже расположен пол
 * @param {Array} inputMap - Входящий двухмерный массив
 * @param {Number} countGenerateGrass - Количество травы, необходимой сгенерировать на карте
 */
export default function generateGrass(inputMap, countGenerateGrass) {
    for (let counterGrass = 0; counterGrass < countGenerateGrass; counterGrass++) {
        let x = getRandomInt(2, inputMap[0].length - 1),
            y = getRandomInt(2, inputMap.length - 1),
            len = inputMap[y][x].length - 1;
        
        if (inputMap[y][x][len].icon !== elements.floor.icon) {
            counterGrass--;
        } else {
            inputMap[y][x].push(elements.grass);
        };
    }
}