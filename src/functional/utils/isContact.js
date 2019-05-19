/**
 * @description Проверка совпадения координат 2 объектов
 * @return {Boolean} true - если объекты находятся в 1 ячейке
 */
export default function isContact(target_one, target_two) {
    return target_one.positionX === target_two.positionX && target_one.positionY === target_two.positionY;
}
