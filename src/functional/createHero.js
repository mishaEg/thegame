import { Hero } from '../Units/Hero';

/**
 * @description Функция создания героя на карте по заданным координатам
 * @param {Array} inputMap - Входящая карта объектов
 */
export default function createHero(inputMap, y, x) {
    const hero = new Hero();
    inputMap[y][x].push(hero);
}
