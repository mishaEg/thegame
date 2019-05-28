import drawCave from '../functional/drawCave';
import Enemy from '../Units/Enemy';

describe('Тесты функции drawCave', () => {
    it('Проверка генерации пещеры c травой на карте и сохранение координат героя, врагов, координат копания при копании вверх', () => {
        const targetCoordinates = { x: 2, y: 0 },
            inputMap = [
                [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }]],
                [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }]]
            ],
            outputMap = [
                [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "wall" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "floor" }, { "icon": "grass" }], [{ "icon": "floor" }], [{ "icon": "wall" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "wall" }]],
                [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": "wall" }]],
                [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }]]
            ],
            inputHero = { positionX: 2, positionY: 1 },
            outputHero = { positionX: 2, positionY: 5 },
            inputCreatures = [{
                positionX: 3, positionY: 1
            }],
            outputCreatures = [{
                positionX: 3, positionY: 5
            }];
        drawCave(targetCoordinates, "up", "grass", inputMap, inputHero, inputCreatures);

        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(outputHero);
        expect(inputCreatures).toEqual(outputCreatures);
    });

    it('Проверка генерации пещеры c травой на карте и сохранение координат героя, врагов, координат копания при копании вниз', () => {
        const targetCoordinates = { x: 2, y: 1 },
            inputMap = [
                [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }]]
            ],
            outputMap = [
                [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": "wall" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "wall" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "floor" }, { "icon": "grass" }], [{ "icon": "floor" }], [{ "icon": "wall" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "wall" }]],
                [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }]],
            ],
            inputHero = { positionX: 2, positionY: 0 },
            outputHero = { positionX: 2, positionY: 0 },
            inputCreatures = [{
                positionX: 3, positionY: 0
            }],
            outputCreatures = [{
                positionX: 3, positionY: 0
            }];
        drawCave(targetCoordinates, "down", "grass", inputMap, inputHero, inputCreatures);

        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(outputHero);
        expect(inputCreatures).toEqual(outputCreatures);
    });

    it('Проверка генерации пещеры c травой на карте и сохранение координат героя, врагов, координат копания при копании вправо', () => {
        const targetCoordinates = { x: 1, y: 2 },
            inputMap = [
                [[{ "icon": "floor" }], [{ "icon": "wall" }]],
                [[{ "icon": "floor" }], [{ "icon": "wall" }]],
                [[{ "icon": "floor" }], [{ "icon": "wall" }]],
                [[{ "icon": "floor" }], [{ "icon": "wall" }]],
                [[{ "icon": "floor" }], [{ "icon": "wall" }]],
            ],
            outputMap = [
                [[{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }]],
                [[{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "wall" }]],
                [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }, { "icon": "grass" }], [{ "icon": "floor" }], [{ "icon": "wall" }]],
                [[{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "wall" }]],
                [[{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }]],
            ],
            inputHero = { positionX: 0, positionY: 2 },
            outputHero = { positionX: 0, positionY: 2 },
            inputCreatures = [{
                positionX: 0, positionY: 3
            }],
            outputCreatures = [{
                positionX: 0, positionY: 3
            }];
        drawCave(targetCoordinates, "right", "grass", inputMap, inputHero, inputCreatures);

        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(outputHero);
        expect(inputCreatures).toEqual(outputCreatures);
    });

    it('Проверка генерации пещеры c травой на карте и сохранение координат героя, врагов, координат копания при копании влево', () => {
        const targetCoordinates = { x: 0, y: 2 },
            inputMap = [
                [[{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }]],
            ],
            outputMap = [
                [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "floor" }, { "icon": "grass" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "floor" }]],
            ],
            inputHero = { positionX: 1, positionY: 2 },
            outputHero = { positionX: 5, positionY: 2 },
            inputCreatures = [{
                positionX: 1, positionY: 3
            }],
            outputCreatures = [{
                positionX: 5, positionY: 3
            }];
        drawCave(targetCoordinates, "left", "grass", inputMap, inputHero, inputCreatures);

        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(outputHero);
        expect(inputCreatures).toEqual(outputCreatures);
    });

    it('Проверка генерации пещеры c врагом на карте и сохранение координат героя, врагов, координат копания при копании влево', () => {
        const targetCoordinates = { x: 0, y: 2 },
            inputMap = [
                [[{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }]],
            ],
            outputMap = [
                [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "floor" }]],
            ],
            inputHero = { positionX: 1, positionY: 2 },
            outputHero = { positionX: 5, positionY: 2 },
            inputCreatures = [{
                positionX: 1, positionY: 3
            }],
            outputCreatures = [
                { positionX: 5, positionY: 3 },
                new Enemy(2, 2)
            ];
        drawCave(targetCoordinates, "left", "enemy", inputMap, inputHero, inputCreatures);

        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(outputHero);
        expect(inputCreatures).toEqual(outputCreatures);
    });

    it('Проверка генерации пещеры c травой без врагов на карте на карте и сохранение координат при копании влево', () => {
        const targetCoordinates = { x: 0, y: 2 },
            inputMap = [
                [[{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }]],
            ],
            outputMap = [
                [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "floor" }, { "icon": "grass" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "floor" }]],
            ],
            inputHero = { positionX: 1, positionY: 2 },
            outputHero = { positionX: 5, positionY: 2 },
            inputCreatures = [],
            outputCreatures = [];
        drawCave(targetCoordinates, "left", "grass", inputMap, inputHero, inputCreatures);

        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(outputHero);
        expect(inputCreatures).toEqual(outputCreatures);
    });
})
