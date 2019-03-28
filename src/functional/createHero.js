import {Hero} from '../Units/Hero';

/**
 * @description Функция для случайной генерации щитов на карте там, где уже расположен пол
 * @param {Array} inputMap - Входящий двухмерный массив
 * @param {Number} countGenerateShields - Количество щитов, необходимых сгенерировать на карте
 */
export default function createHero(inputMap, y, x) {
    const hero = new Hero(x, y);
    inputMap[y][x].push(hero);
}
