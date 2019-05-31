import Enemy from '../Units/Enemy';

describe('Тесты функции drawCave', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    it('Проверка генерации пещеры c травой на карте и сохранение координат героя, врагов, координат копания при копании вверх', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn().mockReturnValueOnce(4);
        });

        const drawCaveWithMock = require('../functional/drawCave').default;

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
            }],
            message = drawCaveWithMock(targetCoordinates, "up", inputMap, inputHero, inputCreatures);

        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(outputHero);
        expect(inputCreatures).toEqual(outputCreatures);
        expect(message).toEqual("you found cave with grass!");
    });

    it('Проверка генерации пещеры c травой на карте и сохранение координат героя, врагов, координат копания при копании вниз', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn().mockReturnValueOnce(4);
        });

        const drawCaveWithMock = require('../functional/drawCave').default;

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
            }],
            message = drawCaveWithMock(targetCoordinates, "down", inputMap, inputHero, inputCreatures);

        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(outputHero);
        expect(inputCreatures).toEqual(outputCreatures);
        expect(message).toEqual("you found cave with grass!");
    });

    it('Проверка генерации пещеры c травой на карте и сохранение координат героя, врагов, координат копания при копании вправо', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn().mockReturnValueOnce(4);
        });

        const drawCaveWithMock = require('../functional/drawCave').default;

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
            }],
            message = drawCaveWithMock(targetCoordinates, "right", inputMap, inputHero, inputCreatures);

        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(outputHero);
        expect(inputCreatures).toEqual(outputCreatures);
        expect(message).toEqual("you found cave with grass!");
    });

    it('Проверка генерации пещеры c травой на карте и сохранение координат героя, врагов, координат копания при копании влево', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn().mockReturnValueOnce(4);
        });

        const drawCaveWithMock = require('../functional/drawCave').default;

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
            }],
            message = drawCaveWithMock(targetCoordinates, "left", inputMap, inputHero, inputCreatures);

        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(outputHero);
        expect(inputCreatures).toEqual(outputCreatures);
        expect(message).toEqual("you found cave with grass!");
    });

    it('Проверка генерации пещеры c врагом на карте и сохранение координат героя, врагов, координат копания при копании влево', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn().mockReturnValueOnce(2);
        });

        const drawCaveWithMock = require('../functional/drawCave').default;

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
            ],
            message = drawCaveWithMock(targetCoordinates, "left", inputMap, inputHero, inputCreatures);

        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(outputHero);
        expect(inputCreatures).toEqual(outputCreatures);
        expect(message).toEqual("you found cave with enemy!");
    });

    it('Проверка генерации пещеры c травой без врагов на карте на карте и сохранение координат при копании влево', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn().mockReturnValueOnce(4);
        });

        const drawCaveWithMock = require('../functional/drawCave').default;

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
            outputCreatures = [],
            message = drawCaveWithMock(targetCoordinates, "left", inputMap, inputHero, inputCreatures);

        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(outputHero);
        expect(inputCreatures).toEqual(outputCreatures);
        expect(message).toEqual("you found cave with grass!");
    });
});

describe('Проверки на умную генерацию пещер', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    it('Проверка умной генерации пещеры со сдвигом вправо при копании вверх', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn().mockReturnValueOnce(0);
        });

        const drawCaveWithMock = require('../functional/drawCave').default;

        const targetCoordinates = { x: 1, y: 4 },
            inputMap = [
                [[{ "icon": "wall" }], [{ "icon": " " }], [{ "icon": " " }]],
                [[{ "icon": "wall" }], [{ "icon": " " }], [{ "icon": " " }]],
                [[{ "icon": "wall" }], [{ "icon": " " }], [{ "icon": " " }]],
                [[{ "icon": "wall" }], [{ "icon": " " }], [{ "icon": " " }]],
                [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }]],
                [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "wall" }]]
            ],
            outputMap = [
                [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "wall" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "wall" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "wall" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }]],
                [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": " " }], [{ "icon": " " }]]
            ],
            inputHero = { positionX: 0, positionY: 0 },
            outputHero = { positionX: 0, positionY: 0 },
            inputCreatures = [],
            outputCreatures = [],
            message = drawCaveWithMock(targetCoordinates, "up", inputMap, inputHero, inputCreatures);

        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(outputHero);
        expect(inputCreatures).toEqual(outputCreatures);
        expect(message).toEqual("you found empty cave");
    });

    it('Проверка умной генерации пещеры со сдвигом влево при копании вверх', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn().mockReturnValueOnce(0);
        });

        const drawCaveWithMock = require('../functional/drawCave').default;

        const targetCoordinates = { x: 1, y: 4 },
            inputMap = [
                [[{ "icon": " " }], [{ "icon": " " }], [{ "icon": "wall" }]],
                [[{ "icon": " " }], [{ "icon": " " }], [{ "icon": "wall" }]],
                [[{ "icon": " " }], [{ "icon": " " }], [{ "icon": "wall" }]],
                [[{ "icon": " " }], [{ "icon": " " }], [{ "icon": "wall" }]],
                [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "floor" }]]
            ],
            outputMap = [
                [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "wall" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "wall" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "wall" }]],
                [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "wall" }]],
                [[{ "icon": " " }], [{ "icon": " " }], [{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "floor" }]]
            ],
            inputHero = { positionX: 1, positionY: 4 },
            outputHero = { positionX: 3, positionY: 4 },
            inputCreatures = [],
            outputCreatures = [],
            message = drawCaveWithMock(targetCoordinates, "up", inputMap, inputHero, inputCreatures);

        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(outputHero);
        expect(inputCreatures).toEqual(outputCreatures);
        expect(message).toEqual("you found empty cave");
    });

    it('Проверка умной генерации пещеры со сдвигом влево при копании вниз', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn().mockReturnValueOnce(0);
        });

        const drawCaveWithMock = require('../functional/drawCave').default;

        const targetCoordinates = { x: 1, y: 1 },
            inputMap = [
                [[{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }]],
                [[{ "icon": " " }], [{ "icon": " " }], [{ "icon": "wall" }]],
                [[{ "icon": " " }], [{ "icon": " " }], [{ "icon": "wall" }]],
                [[{ "icon": " " }], [{ "icon": " " }], [{ "icon": "wall" }]],
                [[{ "icon": " " }], [{ "icon": " " }], [{ "icon": "wall" }]]
            ],
            outputMap = [
                [[{ "icon": " " }], [{ "icon": " " }], [{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "wall" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "wall" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "wall" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "wall" }]],
                [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }]]
            ],
            inputHero = { positionX: 0, positionY: 0 },
            outputHero = { positionX: 2, positionY: 0 },
            inputCreatures = [],
            outputCreatures = [],
            message = drawCaveWithMock(targetCoordinates, "down", inputMap, inputHero, inputCreatures);

        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(outputHero);
        expect(inputCreatures).toEqual(outputCreatures);
        expect(message).toEqual("you found empty cave");
    });

    it('Проверка умной генерации пещеры со сдвигом вправо при копании вниз', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn().mockReturnValueOnce(0);
        });

        const drawCaveWithMock = require('../functional/drawCave').default;

        const targetCoordinates = { x: 1, y: 1 },
            inputMap = [
                [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "wall" }]],
                [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }]],
                [[{ "icon": "wall" }], [{ "icon": " " }], [{ "icon": " " }]],
                [[{ "icon": "wall" }], [{ "icon": " " }], [{ "icon": " " }]],
                [[{ "icon": "wall" }], [{ "icon": " " }], [{ "icon": " " }]],
                [[{ "icon": "wall" }], [{ "icon": " " }], [{ "icon": " " }]]
            ],
            outputMap = [
                [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": " " }], [{ "icon": " " }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "wall" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "wall" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "wall" }]],
                [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }]]
            ],
            inputHero = { positionX: 0, positionY: 0 },
            outputHero = { positionX: 0, positionY: 0 },
            inputCreatures = [],
            outputCreatures = [],
            message = drawCaveWithMock(targetCoordinates, "down", inputMap, inputHero, inputCreatures);

        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(outputHero);
        expect(inputCreatures).toEqual(outputCreatures);
        expect(message).toEqual("you found empty cave");
    });

    it('Проверка умной генерации пещеры со сдвигом вверх при копании вправо', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn().mockReturnValueOnce(0);
        });

        const drawCaveWithMock = require('../functional/drawCave').default;

        const targetCoordinates = { x: 1, y: 3 },
            inputMap = [
                [[{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": " " }], [{ "icon": " " }]],
                [[{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": " " }], [{ "icon": " " }]],
                [[{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": " " }], [{ "icon": " " }]],
                [[{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": " " }], [{ "icon": " " }]],
                [[{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }]]
            ],
            outputMap = [
                [[{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }]],
                [[{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "wall" }]],
                [[{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "wall" }]],
                [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "wall" }]],
                [[{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }]]
            ],
            inputHero = { positionX: 0, positionY: 0 },
            outputHero = { positionX: 0, positionY: 0 },
            inputCreatures = [],
            outputCreatures = [],
            message = drawCaveWithMock(targetCoordinates, "right", inputMap, inputHero, inputCreatures);

        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(outputHero);
        expect(inputCreatures).toEqual(outputCreatures);
        expect(message).toEqual("you found empty cave");
    });

    it('Проверка умной генерации пещеры со сдвигом вниз при копании вправо', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn().mockReturnValueOnce(0);
        });

        const drawCaveWithMock = require('../functional/drawCave').default;

        const targetCoordinates = { x: 1, y: 1 },
            inputMap = [
                [[{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }]],
                [[{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": " " }], [{ "icon": " " }]],
                [[{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": " " }], [{ "icon": " " }]],
                [[{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": " " }], [{ "icon": " " }]],
                [[{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": " " }], [{ "icon": " " }]]
            ],
            outputMap = [
                [[{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }]],
                [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "wall" }]],
                [[{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "wall" }]],
                [[{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "wall" }]],
                [[{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }]]
            ],
            inputHero = { positionX: 0, positionY: 0 },
            outputHero = { positionX: 0, positionY: 0 },
            inputCreatures = [],
            outputCreatures = [],
            message = drawCaveWithMock(targetCoordinates, "right", inputMap, inputHero, inputCreatures);

        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(outputHero);
        expect(inputCreatures).toEqual(outputCreatures);
        expect(message).toEqual("you found empty cave");
    });

    it('Проверка умной генерации пещеры со сдвигом вниз при копании влево', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn().mockReturnValueOnce(0);
        });

        const drawCaveWithMock = require('../functional/drawCave').default;

        const targetCoordinates = { x: 2, y: 1 },
            inputMap = [
                [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": " " }], [{ "icon": " " }], [{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": " " }], [{ "icon": " " }], [{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": " " }], [{ "icon": " " }], [{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": " " }], [{ "icon": " " }], [{ "icon": "wall" }], [{ "icon": "floor" }]]
            ],
            outputMap = [
                [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "floor" }]]
            ],
            inputHero = { positionX: 0, positionY: 0 },
            outputHero = { positionX: 2, positionY: 0 },
            inputCreatures = [],
            outputCreatures = [],
            message = drawCaveWithMock(targetCoordinates, "left", inputMap, inputHero, inputCreatures);

        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(outputHero);
        expect(inputCreatures).toEqual(outputCreatures);
        expect(message).toEqual("you found empty cave");
    });
})

describe('Проверки на отсутствие генераций пещеры', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    it('Отсутствие генерации пещеры при копании вправо', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn().mockReturnValueOnce(0);
        });

        const drawCaveWithMock = require('../functional/drawCave').default;

        const targetCoordinates = { x: 1, y: 1 },
            inputMap = [
                [[{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": "wall" }]],
                [[{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": " " }]],
                [[{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": "wall" }]],
            ],
            outputMap = [
                [[{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": "wall" }]],
                [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "wall" }]],
                [[{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": "wall" }]],
            ],
            inputHero = { positionX: 0, positionY: 0 },
            outputHero = { positionX: 0, positionY: 0 },
            inputCreatures = [],
            outputCreatures = [],
            message = drawCaveWithMock(targetCoordinates, "right", inputMap, inputHero, inputCreatures);

        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(outputHero);
        expect(inputCreatures).toEqual(outputCreatures);
        expect(message).toEqual(false);
    });

    it('Отсутствие генерации пещеры при копании влево', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn().mockReturnValueOnce(0);
        });

        const drawCaveWithMock = require('../functional/drawCave').default;

        const targetCoordinates = { x: 1, y: 1 },
            inputMap = [
                [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": " " }], [{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "floor" }]],
            ],
            outputMap = [
                [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "floor" }]],
            ],
            inputHero = { positionX: 0, positionY: 0 },
            outputHero = { positionX: 0, positionY: 0 },
            inputCreatures = [],
            outputCreatures = [],
            message = drawCaveWithMock(targetCoordinates, "left", inputMap, inputHero, inputCreatures);

        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(outputHero);
        expect(inputCreatures).toEqual(outputCreatures);
        expect(message).toEqual(false);
    });

    it('Отсутствие генерации пещеры при копании вниз', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn().mockReturnValueOnce(0);
        });

        const drawCaveWithMock = require('../functional/drawCave').default;

        const targetCoordinates = { x: 1, y: 1 },
            inputMap = [
                [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }]],
                [[{ "icon": "wall" }], [{ "icon": " " }], [{ "icon": "wall" }]]
            ],
            outputMap = [
                [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "wall" }]],
                [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }]]
            ],
            inputHero = { positionX: 0, positionY: 0 },
            outputHero = { positionX: 0, positionY: 0 },
            inputCreatures = [],
            outputCreatures = [],
            message = drawCaveWithMock(targetCoordinates, "down", inputMap, inputHero, inputCreatures);

        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(outputHero);
        expect(inputCreatures).toEqual(outputCreatures);
        expect(message).toEqual(false);
    });

    it('Отсутствие генерации пещеры на изведанной территории при копании вверх', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn().mockReturnValueOnce(0);
        });

        const drawCaveWithMock = require('../functional/drawCave').default;

        const targetCoordinates = { x: 1, y: 1 },
            inputMap = [
                [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }]],
                [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }]]
            ],
            outputMap = [
                [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "wall" }]],
                [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }]]
            ],
            inputHero = { positionX: 0, positionY: 0 },
            outputHero = { positionX: 0, positionY: 0 },
            inputCreatures = [],
            outputCreatures = [],
            message = drawCaveWithMock(targetCoordinates, "up", inputMap, inputHero, inputCreatures);

        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(outputHero);
        expect(inputCreatures).toEqual(outputCreatures);
        expect(message).toEqual(false);
    });
})
