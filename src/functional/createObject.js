import elements from '../data/elements';
import getRandomInt from './getRandomInt';

/**
 * @description Функция для случайной генерации на карте там, где уже расположен пол
 * @param {Array} inputMap - Входящий двухмерный массив
 * @param {Number} countOfObjects - Количество, необходимых сгенерировать на карте
 */
export default function createObject(inputMap, countOfObjects, object) {

    const { floor } = elements;

    for (let counter = 0; counter < countOfObjects; counter++) {
        let x = getRandomInt(2, inputMap[0].length - 1),
            y = getRandomInt(2, inputMap.length - 1),
            len = inputMap[y][x].length - 1;

        if (inputMap[y][x][len].icon !== floor.icon) {
            counter--;
        } else {
            inputMap[y][x].push(object);
        };
    }
}