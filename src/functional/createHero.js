import { Hero } from '../Units/Hero';

/**
 * @description Функция создания героя на карте по заданным координатам
 * @param {Array} inputMap - Входящая карта объектов
 */
export default function createHero(y, x) {
    return new Hero(2, 2);
}
