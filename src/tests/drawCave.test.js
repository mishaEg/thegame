import drawCave from '../functional/drawCave';
import Enemy from '../Units/Enemy';

describe('Тесты функции drawCave', () => {
    it('Проверка генерации пещеры c травой на карте и сохранение координат героя, врагов, координат копания при копании вверх', () => {
        expect(drawCave(
            { x: 2, y: 0 },
            "up", // direction
            "grass", // treasure
            [
                [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }]],
                [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }]]
            ],
            { positionX: 2, positionY: 1 },
            [{
                positionX: 3, positionY: 1
            }]
        )).toEqual({
            "mapWithCave": [
                [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "wall" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "floor" }, { "icon": "grass" }], [{ "icon": "floor" }], [{ "icon": "wall" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "wall" }]],
                [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": "wall" }]],
                [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }]]
            ],
            "heroOnMapWithCave": {
                positionX: 2, positionY: 5
            },
            "creaturesOnMapWithCave": [{
                positionX: 3, positionY: 5
            }]
        })
    });

    it('Проверка генерации пещеры c травой на карте и сохранение координат героя, врагов, координат копания при копании вниз', () => {
        expect(drawCave(
            { x: 2, y: 1 },
            "down", // direction
            "grass", // treasure
            [
                [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }]]
            ],
            { positionX: 2, positionY: 0 },
            [{
                positionX: 3, positionY: 0
            }]
        )).toEqual({
            "mapWithCave": [
                [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": "wall" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "wall" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "floor" }, { "icon": "grass" }], [{ "icon": "floor" }], [{ "icon": "wall" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "wall" }]],
                [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }]],
            ],
            "heroOnMapWithCave": {
                positionX: 2, positionY: 0
            },
            "creaturesOnMapWithCave": [{
                positionX: 3, positionY: 0
            }]
        })
    });

    it('Проверка генерации пещеры c травой на карте и сохранение координат героя, врагов, координат копания при копании вправо', () => {
        expect(drawCave(
            { x: 1, y: 2 },
            "right", // direction
            "grass", // treasure
            [
                [[{ "icon": "floor" }], [{ "icon": "wall" }]],
                [[{ "icon": "floor" }], [{ "icon": "wall" }]],
                [[{ "icon": "floor" }], [{ "icon": "wall" }]],
                [[{ "icon": "floor" }], [{ "icon": "wall" }]],
                [[{ "icon": "floor" }], [{ "icon": "wall" }]],
            ],
            { positionX: 0, positionY: 2 },
            [{ positionX: 0, positionY: 3 }]
        )).toEqual({
            "mapWithCave": [
                [[{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }]],
                [[{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "wall" }]],
                [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }, { "icon": "grass" }], [{ "icon": "floor" }], [{ "icon": "wall" }]],
                [[{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "wall" }]],
                [[{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }]],
            ],
            "heroOnMapWithCave": {
                positionX: 0, positionY: 2
            },
            "creaturesOnMapWithCave": [{
                positionX: 0, positionY: 3
            }]
        })
    });

    it('Проверка генерации пещеры c травой на карте и сохранение координат героя, врагов, координат копания при копании влево', () => {
        expect(drawCave(
            { x: 0, y: 2 },
            "left", // direction
            "grass", // treasure
            [
                [[{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }]],
            ],
            { positionX: 1, positionY: 2 },
            [{ positionX: 1, positionY: 3 }]
        )).toEqual({
            "mapWithCave": [
                [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "floor" }, { "icon": "grass" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "floor" }]],
            ],
            "heroOnMapWithCave": {
                positionX: 5, positionY: 2
            },
            "creaturesOnMapWithCave": [{
                positionX: 5, positionY: 3
            }]
        })
    });

    it('Проверка генерации пещеры c врагом на карте и сохранение координат героя, врагов, координат копания при копании влево', () => {
        expect(drawCave(
            { x: 0, y: 2 },
            "left", // direction
            "enemy", // treasure
            [
                [[{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }]],
            ],
            { positionX: 1, positionY: 2 },
            [{ positionX: 1, positionY: 3 }]
        )).toEqual({
            "mapWithCave": [
                [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "floor" }]],
            ],
            "heroOnMapWithCave": {
                positionX: 5, positionY: 2
            },
            "creaturesOnMapWithCave": [
                { positionX: 5, positionY: 3 },
                new Enemy(2, 2)
            ]
        })
    });

    it('Проверка генерации пещеры c травой без врагов на карте на карте и сохранение координат при копании влево', () => {
        expect(drawCave(
            { x: 0, y: 2 },
            "left", // direction
            "grass", // treasure
            [
                [[{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }]],
            ],
            { positionX: 1, positionY: 2 },
            []
        )).toEqual({
            "mapWithCave": [
                [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "floor" }, { "icon": "grass" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "floor" }]],
            ],
            "heroOnMapWithCave": {
                positionX: 5, positionY: 2
            },
            "creaturesOnMapWithCave": []
        })
    });
})
