import drawTunnel from '../functional/drawTunnel';

describe('Тесты функции drawTunnel без генерации камня', () => {
    it('Проверка генерации пещеры вниз без генерации камня', () => {
        const inputCoord = { x: 1, y: 1 },
            outputCoord =  { x: 1, y: 1 },
            inputMap = [
                [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }]]
            ],
            outputMap = [
                [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "wall" }]],
                [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }]]
            ],
            inputHero = {
                "positionX": 0,
                "positionY": 1
            },
            ouputHero = {
                "positionX": 0,
                "positionY": 1
            },
            inputCreatures = [{
                "positionX": 0,
                "positionY": 0
            }],
            outputCreatures = [{
                "positionX": 0,
                "positionY": 0
            }],
            message = drawTunnel(inputCoord, false, inputMap, inputHero, inputCreatures);


        expect(inputCoord).toEqual(outputCoord);
        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(ouputHero);
        expect(inputCreatures).toEqual(outputCreatures);
        expect(message).toEqual(false);
    });

    it('Проверка генерации пещеры вверх без генерации камня', () => {
        const inputCoord = { x: 1, y: 0 },
            outputCoord =  { x: 1, y: 1 },
            inputMap = [
                [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }]],
                [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }]]
            ],
            outputMap = [
                [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "wall" }]],
                [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }]]
            ],
            inputHero = {
                "positionX": 1,
                "positionY": 1
            },
            ouputHero = {
                "positionX": 1,
                "positionY": 2
            },
            inputCreatures = [{
                "positionX": 0,
                "positionY": 1
            }],
            outputCreatures = [{
                "positionX": 0,
                "positionY": 2
            }],
            message = drawTunnel(inputCoord, false, inputMap, inputHero, inputCreatures);


        expect(inputCoord).toEqual(outputCoord);
        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(ouputHero);
        expect(inputCreatures).toEqual(outputCreatures);
        expect(message).toEqual(false);
    });

    it('Проверка генерации пещеры вправо без генерации камня', () => {
        const inputCoord = { x: 1, y: 1 },
            outputCoord =  { x: 1, y: 1 },
            inputMap = [
                [[{ "icon": "floor" }], [{ "icon": "wall" }]],
                [[{ "icon": "floor" }], [{ "icon": "wall" }]],
                [[{ "icon": "floor" }], [{ "icon": "wall" }]]
            ],
            outputMap = [
                [[{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": "wall" }]],
                [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "wall" }]],
                [[{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": "wall" }]]
            ],
            inputHero = {
                "positionX": 0,
                "positionY": 1
            },
            ouputHero = {
                "positionX": 0,
                "positionY": 1
            },
            inputCreatures = [{
                "positionX": 0,
                "positionY": 0
            }],
            outputCreatures = [{
                "positionX": 0,
                "positionY": 0
            }],
            message = drawTunnel(inputCoord, false, inputMap, inputHero, inputCreatures);


        expect(inputCoord).toEqual(outputCoord);
        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(ouputHero);
        expect(inputCreatures).toEqual(outputCreatures);
        expect(message).toEqual(false);
    });

    it('Проверка генерации пещеры влево без генерации камня', () => {
        const inputCoord = { x: 0, y: 1 },
            outputCoord =  { x: 1, y: 1 },
            inputMap = [
                [[{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }]]
            ],
            outputMap = [
                [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "floor" }]]
            ],
            inputHero = {
                "positionX": 1,
                "positionY": 1
            },
            ouputHero = {
                "positionX": 2,
                "positionY": 1
            },
            inputCreatures = [{
                "positionX": 1,
                "positionY": 0
            }],
            outputCreatures = [{
                "positionX": 2,
                "positionY": 0
            }],
            message = drawTunnel(inputCoord, false, inputMap, inputHero, inputCreatures);


        expect(inputCoord).toEqual(outputCoord);
        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(ouputHero);
        expect(inputCreatures).toEqual(outputCreatures);
        expect(message).toEqual(false);
    });

    it('Проверка выкапывания одиночных стен без генерации камня', () => {
        const inputCoord = { x: 1, y: 1 },
            outputCoord = { x: 1, y: 1 },
            inputMap = [
                [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }]],
                [[{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }]]
            ],
            outputMap = [
                [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }]],
                [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }]],
                [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }]]
            ],
            inputHero = {
                "positionX": 0,
                "positionY": 1
            },
            ouputHero = {
                "positionX": 0,
                "positionY": 1
            },
            inputCreatures = [
                { "positionX": 0, "positionY": 1 }
            ],
            outputCreatures = [
                { "positionX": 0, "positionY": 1 }
            ],
            message = drawTunnel(inputCoord, false, inputMap, inputHero, inputCreatures);


        expect(inputCoord).toEqual(outputCoord);
        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(ouputHero);
        expect(inputCreatures).toEqual(outputCreatures);
        expect(message).toEqual(false);
    });
})

describe('Тесты генерации камня при раскопке', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    it('Проверка генерации раскапывания камня при копании вниз', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn(() => 0);
        });
        const drawTunnelWithMock = require('../functional/drawTunnel').default,
            inputCoord = { x: 1, y: 1 },
            outputCoord =  { x: 1, y: 1 },
            inputMap = [
                [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }]]
            ],
            outputMap = [
                [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }, { "type": "money", "name": "gem", "cost": 10, "icon": "gem" }], [{ "icon": "wall" }]],
                [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }]]
            ],
            inputHero = {
                "positionX": 1,
                "positionY": 0
            },
            ouputHero = {
                "positionX": 1,
                "positionY": 0
            },
            inputCreatures = [{
                "positionX": 0,
                "positionY": 0
            }],
            outputCreatures = [{
                "positionX": 0,
                "positionY": 0
            }],
            message = drawTunnelWithMock(inputCoord, true, inputMap, inputHero, inputCreatures);


        expect(inputCoord).toEqual(outputCoord);
        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(ouputHero);
        expect(inputCreatures).toEqual(outputCreatures);
        expect(message).toEqual("you found a gem!");
    });

    it('Проверка генерации раскапывания камня при копании вверх', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn(() => 0);
        });

        const drawTunnelWithMock = require('../functional/drawTunnel').default,
            inputCoord = { x: 1, y: 0 },
            outputCoord =  { x: 1, y: 1 },
            inputMap = [
                [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }]],
                [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }]]
            ],
            outputMap = [
                [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }, { "type": "money", "name": "gem", "cost": 10, "icon": "gem" }], [{ "icon": "wall" }]],
                [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }]]
            ],
            inputHero = {
                "positionX": 1,
                "positionY": 1
            },
            ouputHero = {
                "positionX": 1,
                "positionY": 2
            },
            inputCreatures = [{
                "positionX": 0,
                "positionY": 1
            }],
            outputCreatures = [{
                "positionX": 0,
                "positionY": 2
            }],
            message = drawTunnelWithMock(inputCoord, true, inputMap, inputHero, inputCreatures);


        expect(inputCoord).toEqual(outputCoord);
        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(ouputHero);
        expect(inputCreatures).toEqual(outputCreatures);
        expect(message).toEqual("you found a gem!");
    });

    it('Проверка генерации раскапывания камня при копании вправо', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn(() => 0);
        });

        const drawTunnelWithMock = require('../functional/drawTunnel').default,
            inputCoord = { x: 1, y: 1 },
            outputCoord =  { x: 1, y: 1 },
            inputMap = [
                [[{ "icon": "floor" }], [{ "icon": "wall" }]],
                [[{ "icon": "floor" }], [{ "icon": "wall" }]],
                [[{ "icon": "floor" }], [{ "icon": "wall" }]]
            ],
            outputMap = [
                [[{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": "wall" }]],
                [[{ "icon": "floor" }], [{ "icon": "floor" }, { "type": "money", "name": "gem", "cost": 10, "icon": "gem" }], [{ "icon": "wall" }]],
                [[{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": "wall" }]]
            ],
            inputHero = {
                "positionX": 0,
                "positionY": 1
            },
            ouputHero = {
                "positionX": 0,
                "positionY": 1
            },
            inputCreatures = [{
                "positionX": 0,
                "positionY": 0
            }],
            outputCreatures = [{
                "positionX": 0,
                "positionY": 0
            }],
            message = drawTunnelWithMock(inputCoord, true, inputMap, inputHero, inputCreatures);


        expect(inputCoord).toEqual(outputCoord);
        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(ouputHero);
        expect(inputCreatures).toEqual(outputCreatures);
        expect(message).toEqual("you found a gem!");
    });

    it('Проверка генерации раскапывания камня при копании влево', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn(() => 0);
        });

        const drawTunnelWithMock = require('../functional/drawTunnel').default,
            inputCoord = { x: 0, y: 1 },
            outputCoord =  { x: 1, y: 1 },
            inputMap = [
                [[{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }]]
            ],
            outputMap = [
                [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }, { "type": "money", "name": "gem", "cost": 10, "icon": "gem" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "floor" }]]
            ],
            inputHero = {
                "positionX": 1,
                "positionY": 1
            },
            ouputHero = {
                "positionX": 2,
                "positionY": 1
            },
            inputCreatures = [{
                "positionX": 1,
                "positionY": 0
            }],
            outputCreatures = [{
                "positionX": 2,
                "positionY": 0
            }],
            message = drawTunnelWithMock(inputCoord, true, inputMap, inputHero, inputCreatures);


        expect(inputCoord).toEqual(outputCoord);
        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(ouputHero);
        expect(inputCreatures).toEqual(outputCreatures);
        expect(message).toEqual("you found a gem!");
    });

    it('Проверка отсутствия камня при копании вниз с другой вероятностью', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn(() => 5);
        });

        const drawTunnelWithMock = require('../functional/drawTunnel').default,
            inputCoord = { x: 1, y: 1 },
            outputCoord =  { x: 1, y: 1 },
            inputMap = [
                [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }]]
            ],
            outputMap = [
                [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "wall" }]],
                [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }]]
            ],
            inputHero = {
                "positionX": 1,
                "positionY": 0
            },
            ouputHero = {
                "positionX": 1,
                "positionY": 0
            },
            inputCreatures = [{
                "positionX": 0,
                "positionY": 0
            }],
            outputCreatures = [{
                "positionX": 0,
                "positionY": 0
            }],
            message = drawTunnelWithMock(inputCoord, true, inputMap, inputHero, inputCreatures);


        expect(inputCoord).toEqual(outputCoord);
        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(ouputHero);
        expect(inputCreatures).toEqual(outputCreatures);
        expect(message).toEqual(false);
    });

    it('Проверка отсутствия камня при другой вероятности при копании вверх', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn(() => 5);
        });

        const drawTunnelWithMock = require('../functional/drawTunnel').default,
            inputCoord = { x: 1, y: 0 },
            outputCoord =  { x: 1, y: 1 },
            inputMap = [
                [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }]],
                [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }]]
            ],
            outputMap = [
                [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "wall" }]],
                [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }]]
            ],
            inputHero = {
                "positionX": 1,
                "positionY": 1
            },
            ouputHero = {
                "positionX": 1,
                "positionY": 2
            },
            inputCreatures = [{
                "positionX": 0,
                "positionY": 1
            }],
            outputCreatures = [{
                "positionX": 0,
                "positionY": 2
            }],
            message = drawTunnelWithMock(inputCoord, true, inputMap, inputHero, inputCreatures);


        expect(inputCoord).toEqual(outputCoord);
        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(ouputHero);
        expect(inputCreatures).toEqual(outputCreatures);
        expect(message).toEqual(false);
    });

    it('Проверка отсутствия камня при другой вероятности при копании вправо', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn(() => 5);
        });

        const drawTunnelWithMock = require('../functional/drawTunnel').default,
            inputCoord = { x: 1, y: 1 },
            outputCoord =  { x: 1, y: 1 },
            inputMap = [
                [[{ "icon": "floor" }], [{ "icon": "wall" }]],
                [[{ "icon": "floor" }], [{ "icon": "wall" }]],
                [[{ "icon": "floor" }], [{ "icon": "wall" }]]
            ],
            outputMap = [
                [[{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": "wall" }]],
                [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "wall" }]],
                [[{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": "wall" }]]
            ],
            inputHero = {
                "positionX": 0,
                "positionY": 1
            },
            ouputHero = {
                "positionX": 0,
                "positionY": 1
            },
            inputCreatures = [{
                "positionX": 0,
                "positionY": 0
            }],
            outputCreatures = [{
                "positionX": 0,
                "positionY": 0
            }],
            message = drawTunnelWithMock(inputCoord, true, inputMap, inputHero, inputCreatures);


        expect(inputCoord).toEqual(outputCoord);
        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(ouputHero);
        expect(inputCreatures).toEqual(outputCreatures);
        expect(message).toEqual(false);
    });

    it('Проверка отсутствия камня при другой вероятности при копании влево', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn(() => 5);
        });

        const drawTunnelWithMock = require('../functional/drawTunnel').default,
            inputCoord = { x: 0, y: 1 },
            outputCoord =  { x: 1, y: 1 },
            inputMap = [
                [[{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }]]
            ],
            outputMap = [
                [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "floor" }]]
            ],
            inputHero = {
                "positionX": 1,
                "positionY": 1
            },
            ouputHero = {
                "positionX": 2,
                "positionY": 1
            },
            inputCreatures = [{
                "positionX": 1,
                "positionY": 0
            }],
            outputCreatures = [{
                "positionX": 2,
                "positionY": 0
            }],
            message = drawTunnelWithMock(inputCoord, true, inputMap, inputHero, inputCreatures);


        expect(inputCoord).toEqual(outputCoord);
        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(ouputHero);
        expect(inputCreatures).toEqual(outputCreatures);
        expect(message).toEqual(false);
    });
})
