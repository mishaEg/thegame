import Enemy from '../Units/Enemy';

describe('Негативные тесты функции digging', () => {
    it('Попытка раскопки прочего элемента, отличного от стены, вправо', () => {
        const digging = require('../functional/digging').default,
            inputMap = [[[{ 'icon': "floor" }], [{ 'icon': "floor" }]]],
            outputMap = [[[{ 'icon': "floor" }], [{ 'icon': "floor" }]]],
            inputHero = { "positionX": 0, "positionY": 0, "readyToMine": true },
            outputHero = { "positionX": 0, "positionY": 0, "readyToMine": false },
            inputCreatures = [{ "positionX": 0, "positionY": 0 }],
            outputCreatures = [{ "positionX": 0, "positionY": 0 }],
            message = digging(inputMap, inputHero, "right", inputCreatures);

        expect(message).toEqual("there is nothing to dig");
        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(outputHero);
        expect(inputCreatures).toEqual(outputCreatures);
    });
})

describe('Тесты с генерацией туннеля в функции digging', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    it('Раскопка туннеля вниз', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn().mockReturnValueOnce(4).mockReturnValueOnce(1)
        });
        const digging = require('../functional/digging').default,
            inputMap = [
                [[{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]]
            ],
            outputMap = [
                [[{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]]
            ],
            inputHero = {
                "positionX": 1,
                "positionY": 0,
                "readyToMine": true
            },
            outputHero = {
                "positionX": 1,
                "positionY": 0,
                "readyToMine": false
            },
            inputCreatures = [{
                "positionX": 0,
                "positionY": 0
            }],
            outputCreatures = [{
                "positionX": 0,
                "positionY": 0
            }],
            message = digging(inputMap, inputHero, "down", inputCreatures);

        expect(message).toEqual(false);
        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(outputHero);
        expect(inputCreatures).toEqual(outputCreatures);
    });

    it('Раскопка туннеля вниз без врагов', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn().mockReturnValueOnce(4).mockReturnValueOnce(1)
        });
        const digging = require('../functional/digging').default,
            inputMap = [
                [[{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]]
            ],
            outputMap = [
                [[{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]]
            ],
            inputHero = {
                "positionX": 1,
                "positionY": 0,
                "readyToMine": true
            },
            outputHero = {
                "positionX": 1,
                "positionY": 0,
                "readyToMine": false
            },
            inputCreatures = [],
            outputCreatures = [],
            message = digging(inputMap, inputHero, "down", inputCreatures);

        expect(message).toEqual(false);
        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(outputHero);
        expect(inputCreatures).toEqual(outputCreatures);
    });
})

describe('Тесты с генерацией пещеры с врагом в функции digging', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    it('Раскопка пещеры с врагом при копании вправо', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn().mockReturnValueOnce(0).mockReturnValueOnce(3)
        });

        const digging = require('../functional/digging').default,
            inputMap = [
                [[{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                [[{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                [[{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                [[{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                [[{ 'icon': "floor" }], [{ 'icon': "wall" }]]
            ],
            outputMap = [
                [[{ 'icon': "floor" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]],
                [[{ 'icon': "floor" }], [{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                [[{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                [[{ 'icon': "floor" }], [{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                [[{ 'icon': "floor" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]]
            ],
            inputHero = {
                "positionX": 0,
                "positionY": 2,
                "readyToMine": true
            },
            outputHero = {
                "positionX": 0,
                "positionY": 2,
                "readyToMine": false
            },
            inputCreatures = [],
            outputCreatures = [new Enemy(3, 2)],
            message = digging(inputMap, inputHero, "right", inputCreatures);

        expect(message).toEqual("you found cave with enemy!");
        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(outputHero);
        expect(inputCreatures).toEqual(outputCreatures);
    });

    it('Раскопка пещеры с врагом при копании влево с сохранением координат существующих врагов', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn().mockReturnValueOnce(0).mockReturnValueOnce(3)
        });

        const digging = require('../functional/digging').default,
            inputMap = [
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }]]
            ],
            outputMap = [
                [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "floor" }]]
            ],
            inputHero = {
                "positionX": 1,
                "positionY": 2,
                "readyToMine": true
            },
            outputHero = {
                "positionX": 5,
                "positionY": 2,
                "readyToMine": false
            },
            inputCreatures = [new Enemy(1, 0)],
            outputCreatures = [new Enemy(5, 0), new Enemy(2, 2)],
            message = digging(inputMap, inputHero, "left", inputCreatures);

        expect(message).toEqual("you found cave with enemy!");
        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(outputHero);
        expect(inputCreatures).toEqual(outputCreatures);
    });
})

describe('Тесты с генерацией пещеры с травой в функции digging', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    it('Раскопка пещеры с травой при копании вверх', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn().mockReturnValueOnce(0).mockReturnValueOnce(5)
        });

        const digging = require('../functional/digging').default,
            inputMap = [
                [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]],
                [[{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }]]
            ],
            outputMap = [
                [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }, { 'icon': "grass" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]],
                [[{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }]]
            ],
            inputHero = {
                "positionX": 2,
                "positionY": 1,
                "readyToMine": true
            },
            outputHero = {
                "positionX": 2,
                "positionY": 5,
                "readyToMine": false
            },
            inputCreatures = [],
            outputCreatures = [],
            message = digging(inputMap, inputHero, "up", inputCreatures);

        expect(message).toEqual("you found cave with grass!");
        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(outputHero);
        expect(inputCreatures).toEqual(outputCreatures);
    });

    it('Раскопка пещеры с травой при копании вниз с сохранением координат существующих врагов', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn().mockReturnValueOnce(0).mockReturnValueOnce(5)
        });

        const digging = require('../functional/digging').default,
            inputMap = [
                [[{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]]
            ],
            outputMap = [
                [[{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }, { 'icon': "grass" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]]
            ],
            inputHero = {
                "positionX": 2,
                "positionY": 0,
                "readyToMine": true
            },
            outputHero = {
                "positionX": 2,
                "positionY": 0,
                "readyToMine": false
            },
            inputCreatures = [new Enemy(0, 1)],
            outputCreatures = [new Enemy(0, 1)],
            message = digging(inputMap, inputHero, "down", inputCreatures);

        expect(message).toEqual("you found cave with grass!");
        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(outputHero);
        expect(inputCreatures).toEqual(outputCreatures);
    });
})

describe('Тесты с генерацией пещеры с железным щитом в функции digging', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    it('Раскопка пещеры с железным щитом при копании вниз', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn().mockReturnValueOnce(0).mockReturnValueOnce(6)
        });

        const digging = require('../functional/digging').default,
            inputMap = [
                [[{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]]
            ],
            outputMap = [
                [[{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }, { "icon": "iron_shield", "name": "iron shield", "type": "shield", "defence": 20 }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]]
            ],
            inputHero = {
                "positionX": 2,
                "positionY": 0,
                "readyToMine": true
            },
            outputHero = {
                "positionX": 2,
                "positionY": 0,
                "readyToMine": false
            },
            inputCreatures = [],
            outputCreatures = [],
            message = digging(inputMap, inputHero, "down", inputCreatures);

        expect(message).toEqual("you found cave with iron shield!");
        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(outputHero);
        expect(inputCreatures).toEqual(outputCreatures);
    });

    it('Раскопка пещеры с железным щитом при копании вниз с сохранением координат существующих врагов', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn().mockReturnValueOnce(0).mockReturnValueOnce(6)
        });

        const digging = require('../functional/digging').default,
            inputMap = [
                [[{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]]
            ],
            outputMap = [
                [[{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }, { "icon": "iron_shield", "name": "iron shield", "type": "shield", "defence": 20 }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]]
            ],
            inputHero = {
                "positionX": 2,
                "positionY": 0,
                "readyToMine": true
            },
            outputHero = {
                "positionX": 2,
                "positionY": 0,
                "readyToMine": false
            },
            inputCreatures = [new Enemy(0, 1)],
            outputCreatures = [new Enemy(0, 1)],
            message = digging(inputMap, inputHero, "down", inputCreatures);

        expect(message).toEqual("you found cave with iron shield!");
        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(outputHero);
        expect(inputCreatures).toEqual(outputCreatures);
    });
})

describe('Тесты с генерацией пещеры с железным мечом в функции digging', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    it('Раскопка пещеры с железным мечом при копании влево', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn().mockReturnValueOnce(0).mockReturnValueOnce(7)
        });

        const digging = require('../functional/digging').default,
            inputMap = [
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }]]
            ],
            outputMap = [
                [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }, { "icon": "iron_sword", "name": "iron sword", "type": "weapon", "damage": 50 }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "floor" }]]
            ],
            inputHero = {
                "positionX": 1,
                "positionY": 2,
                "readyToMine": true
            },
            outputHero = {
                "positionX": 5,
                "positionY": 2,
                "readyToMine": false
            },
            inputCreatures = [],
            outputCreatures = [],
            message = digging(inputMap, inputHero, "left", inputCreatures);

        expect(message).toEqual("you found cave with iron sword!");
        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(outputHero);
        expect(inputCreatures).toEqual(outputCreatures);
    });

    it('Раскопка пещеры с железным мечом при копании вниз с сохранением координат существующих врагов', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn().mockReturnValueOnce(0).mockReturnValueOnce(7)
        });

        const digging = require('../functional/digging').default,
            inputMap = [
                [[{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]]
            ],
            outputMap = [
                [[{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }, { "icon": "iron_sword", "name": "iron sword", "type": "weapon", "damage": 50 }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]]
            ],
            inputHero = {
                "positionX": 2,
                "positionY": 0,
                "readyToMine": true
            },
            outputHero = {
                "positionX": 2,
                "positionY": 0,
                "readyToMine": false
            },
            inputCreatures = [new Enemy(0, 1)],
            outputCreatures = [new Enemy(0, 1)],
            message = digging(inputMap, inputHero, "down", inputCreatures);

        expect(message).toEqual("you found cave with iron sword!");
        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(outputHero);
        expect(inputCreatures).toEqual(outputCreatures);
    });
})

describe('Тесты с генерацией пещеры с камнем в функции digging', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    it('Раскопка туннеля с камнем при копании влево', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn().mockReturnValueOnce(4).mockReturnValueOnce(0)
        });

        const digging = require('../functional/digging').default,
            inputMap = [
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }]]
            ],
            outputMap = [
                [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }, { "type": "money", "name": "gem", "cost": 10, "icon": "gem" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "floor" }]]
            ],
            inputHero = {
                "positionX": 1,
                "positionY": 1,
                "readyToMine": true
            },
            outputHero = {
                "positionX": 2,
                "positionY": 1,
                "readyToMine": false
            },
            inputCreatures = [],
            outputCreatures = [],
            message = digging(inputMap, inputHero, "left", inputCreatures);

        expect(message).toEqual("you found a gem!");
        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(outputHero);
        expect(inputCreatures).toEqual(outputCreatures);
    });

    it('Раскопка туннеля с камнем при копании влево c сохранением координат монстров', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn().mockReturnValueOnce(4).mockReturnValueOnce(0)
        });

        const digging = require('../functional/digging').default,
            inputMap = [
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }]]
            ],
            outputMap = [
                [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }, { "type": "money", "name": "gem", "cost": 10, "icon": "gem" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "floor" }]]
            ],
            inputHero = {
                "positionX": 1,
                "positionY": 1,
                "readyToMine": true
            },
            outputHero = {
                "positionX": 2,
                "positionY": 1,
                "readyToMine": false
            },
            inputCreatures = [{
                "positionX": 1,
                "positionY": 0,
            }],
            outputCreatures = [{
                "positionX": 2,
                "positionY": 0,
            }],
            message = digging(inputMap, inputHero, "left", inputCreatures);

        expect(message).toEqual("you found a gem!");
        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(outputHero);
        expect(inputCreatures).toEqual(outputCreatures);
    });

    it('Раскопка туннеля без генерации камня при раскопке влево', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn().mockReturnValueOnce(4).mockReturnValueOnce(1)
        });

        const digging = require('../functional/digging').default,
            inputMap = [
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }]]
            ],
            outputMap = [
                [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "floor" }]]
            ],
            inputHero = {
                "positionX": 1,
                "positionY": 1,
                "readyToMine": true
            },
            outputHero = {
                "positionX": 2,
                "positionY": 1,
                "readyToMine": false
            },
            inputCreatures = [],
            outputCreatures = [],
            message = digging(inputMap, inputHero, "left", inputCreatures);

        expect(message).toEqual(false);
        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(outputHero);
        expect(inputCreatures).toEqual(outputCreatures);
    });
})
