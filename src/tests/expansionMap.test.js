import expansionMap from '../functional/expansionMap';

describe('Тесты функции expansionMap', () => {
    it('Корректная замена элемента "Пустое место" на элемент "Стена"', () => {
        const inputCoord = { x: 0, y: 0 },
            outputCoord = { x: 0, y: 0 },
            inputMap = [[[{ "icon": " " }]]],
            outputMap = [[[{ "icon": "wall" }]]],
            inputHero = {
                "positionX": 0,
                "positionY": 0
            },
            outputHero = {
                "positionX": 0,
                "positionY": 0
            },
            inputCreatures = [{
                "positionX": 0,
                "positionY": 0
            }],
            outputCreatures = [{
                "positionX": 0,
                "positionY": 0
            }];

        expansionMap(inputCoord, [0], [0], inputMap, inputHero, { "icon": "wall" }, [{ "icon": " " }], inputCreatures);

        expect(inputCoord).toEqual(outputCoord);
        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(outputHero);
        expect(inputCreatures).toEqual(outputCreatures);
    });

    it('Добавление новой строки карты сверху c генерацией стены', () => {
        const inputCoord = { x: 0, y: 0 },
            outputCoord = { x: 0, y: 1 },
            inputMap = [[[{ "icon": "floor" }]]],
            outputMap = [
                [[{ "icon": "wall" }]],
                [[{ "icon": "floor" }]]
            ],
            inputHero = {
                "positionX": 0,
                "positionY": 0
            },
            outputHero = {
                "positionX": 0,
                "positionY": 1
            },
            inputCreatures = [{
                "positionX": 0,
                "positionY": 0
            }],
            outputCreatures = [{
                "positionX": 0,
                "positionY": 1
            }];

        expansionMap(inputCoord, [0], [-1], inputMap, inputHero, { "icon": "wall" }, [{ "icon": " " }], inputCreatures);

        expect(inputCoord).toEqual(outputCoord);
        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(outputHero);
        expect(inputCreatures).toEqual(outputCreatures);
    });

    it('Добавление новой строки карты снизу c генерацией стены', () => {
        const inputCoord = { x: 0, y: 0 },
            outputCoord = { x: 0, y: 0 },
            inputMap = [[[{ "icon": "floor" }]]],
            outputMap = [
                [[{ "icon": "floor" }]],
                [[{ "icon": "wall" }]]
            ],
            inputHero = {
                "positionX": 0,
                "positionY": 0
            },
            outputHero = {
                "positionX": 0,
                "positionY": 0
            },
            inputCreatures = [{
                "positionX": 0,
                "positionY": 0
            }],
            outputCreatures = [{
                "positionX": 0,
                "positionY": 0
            }];

        expansionMap(inputCoord, [0], [1], inputMap, inputHero, { "icon": "wall" }, [{ "icon": " " }], inputCreatures);

        expect(inputCoord).toEqual(outputCoord);
        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(outputHero);
        expect(inputCreatures).toEqual(outputCreatures);
    });

    it('Добавление нового столбца карты справа c генерацией стены', () => {
        const inputCoord = { x: 0, y: 0 },
            outputCoord = { x: 0, y: 0 },
            inputMap = [[[{ "icon": "floor" }]]],
            outputMap = [[
                [{ "icon": "floor" }],
                [{ "icon": "wall" }]
            ]],
            inputHero = {
                "positionX": 0,
                "positionY": 0
            },
            outputHero = {
                "positionX": 0,
                "positionY": 0
            },
            inputCreatures = [{
                "positionX": 0,
                "positionY": 0
            }],
            outputCreatures = [{
                "positionX": 0,
                "positionY": 0
            }];

        expansionMap(inputCoord, [1], [0], inputMap, inputHero, { "icon": "wall" }, [{ "icon": " " }], inputCreatures);

        expect(inputCoord).toEqual(outputCoord);
        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(outputHero);
        expect(inputCreatures).toEqual(outputCreatures);
    });

    it('Добавление нового столбца карты слева c генерацией стены', () => {
        const inputCoord = { x: 0, y: 0 },
            outputCoord = { x: 1, y: 0 },
            inputMap = [[[{ "icon": "floor" }]]],
            outputMap = [[
                [{ "icon": "wall" }],
                [{ "icon": "floor" }]
            ]],
            inputHero = {
                "positionX": 0,
                "positionY": 0
            },
            outputHero = {
                "positionX": 1,
                "positionY": 0
            },
            inputCreatures = [{
                "positionX": 0,
                "positionY": 0
            }],
            outputCreatures = [{
                "positionX": 1,
                "positionY": 0
            }];

        expansionMap(inputCoord, [-1], [0], inputMap, inputHero, { "icon": "wall" }, [{ "icon": " " }], inputCreatures);

        expect(inputCoord).toEqual(outputCoord);
        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(outputHero);
        expect(inputCreatures).toEqual(outputCreatures);
    });

    it('Добавление новой строки сверху и нового столбца слева c генерацией травы', () => {
        const inputCoord = { x: 0, y: 0 },
            outputCoord = { x: 1, y: 1 },
            inputMap = [[[{ "icon": "floor" }]]],
            outputMap = [
                [[{ "icon": " " }], [{ "icon": "floor" }]],
                [[{ "icon": "floor" }], [{ "icon": "floor" }]]
            ],
            inputHero = {
                "positionX": 0,
                "positionY": 0
            },
            outputHero = {
                "positionX": 1,
                "positionY": 1
            },
            inputCreatures = [{
                "positionX": 0,
                "positionY": 0
            }],
            outputCreatures = [{
                "positionX": 1,
                "positionY": 1
            }];

        expansionMap(inputCoord, [-1, 0], [0, -1], inputMap, inputHero, { "icon": "floor" }, [{ "icon": " " }], inputCreatures);

        expect(inputCoord).toEqual(outputCoord);
        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(outputHero);
        expect(inputCreatures).toEqual(outputCreatures);
    });

    it('Добавление 2 столбцов справа с генерацией травы', () => {
        const inputCoord = { x: 0, y: 0 },
            outputCoord = { x: 0, y: 0 },
            inputMap = [[[{ "icon": "floor" }]]],
            outputMap = [
                [[{ "icon": "floor" }], [{ "icon": " " }], [{ "icon": "floor" }]],
            ],
            inputHero = {
                "positionX": 0,
                "positionY": 0
            },
            outputHero = {
                "positionX": 0,
                "positionY": 0
            },
            inputCreatures = [{
                "positionX": 0,
                "positionY": 0
            }],
            outputCreatures = [{
                "positionX": 0,
                "positionY": 0
            }];

        expansionMap(inputCoord, [2], [0], inputMap, inputHero, { "icon": "floor" }, [{ "icon": " " }], inputCreatures);

        expect(inputCoord).toEqual(outputCoord);
        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(outputHero);
        expect(inputCreatures).toEqual(outputCreatures);
    });

    it('Проверка сохранения положения нескольких монстров на карте при добавлении строки слева', () => {
        const inputCoord = { x: 0, y: 0 },
            outputCoord = { x: 1, y: 0 },
            inputMap = [[[{ "icon": "floor" }]]],
            outputMap = [
                [[{ "icon": "floor" }], [{ "icon": "floor" }]],
            ],
            inputHero = {
                "positionX": 0,
                "positionY": 0
            },
            outputHero = {
                "positionX": 1,
                "positionY": 0
            },
            inputCreatures = [
                { "positionX": 0, "positionY": 0 },
                { "positionX": 0, "positionY": 0 }
            ],
            outputCreatures = [
                { "positionX": 1, "positionY": 0 },
                { "positionX": 1, "positionY": 0 }
            ];

        expansionMap(inputCoord, [-1], [0], inputMap, inputHero, { "icon": "floor" }, [{ "icon": " " }], inputCreatures);

        expect(inputCoord).toEqual(outputCoord);
        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(outputHero);
        expect(inputCreatures).toEqual(outputCreatures);
    });
})
