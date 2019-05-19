import expansionMap from '../functional/expansionMap';

describe('Тесты функции expansionMap', () => {
    it('Корректная замена элемента "Пустое место" на элемент "Стена"', () => {
        expect(expansionMap(
            { x: 0, y: 0 },
            [0],
            [0],
            [[[{ "icon": " " }]]],
            {
                "positionX": 0,
                "positionY": 0
            },
            { "icon": "wall" },
            [{ "icon": " " }],
            [{
                "positionX": 0,
                "positionY": 0
            }]
        )).toEqual({
            "updatedTargetCoordinates": { x: 0, y: 0 },
            "map": [[[{ "icon": "wall" }]]],
            "hero": {
                "positionX": 0,
                "positionY": 0
            },
            "creatures": [{
                "positionX": 0,
                "positionY": 0
            }]
        })
    });

    it('Добавление новой строки карты сверху c генерацией стены', () => {
        expect(expansionMap(
            { x: 0, y: 0 },
            [0],
            [-1],
            [[[{ "icon": "floor" }]]],
            {
                "positionX": 0,
                "positionY": 0
            },
            { "icon": "wall" },
            [{ "icon": " " }],
            [{
                "positionX": 0,
                "positionY": 0
            }]
        )).toEqual({
            "updatedTargetCoordinates": { x: 0, y: 1 },
            "map": [
                [[{ "icon": "wall" }]],
                [[{ "icon": "floor" }]]
            ],
            "hero": {
                "positionX": 0,
                "positionY": 1
            },
            "creatures": [{
                "positionX": 0,
                "positionY": 1
            }]
        })
    });

    it('Добавление новой строки карты снизу c генерацией стены', () => {
        expect(expansionMap(
            { x: 0, y: 0 },
            [0],
            [1],
            [[[{ "icon": "floor" }]]],
            {
                "positionX": 0,
                "positionY": 0
            },
            { "icon": "wall" },
            [{ "icon": " " }],
            [{
                "positionX": 0,
                "positionY": 0
            }]
        )).toEqual({
            "updatedTargetCoordinates": { x: 0, y: 0 },
            "map": [
                [[{ "icon": "floor" }]],
                [[{ "icon": "wall" }]]
            ],
            "hero": {
                "positionX": 0,
                "positionY": 0
            },
            "creatures": [{
                "positionX": 0,
                "positionY": 0
            }]
        })
    });

    it('Добавление нового столбца карты справа c генерацией стены', () => {
        expect(expansionMap(
            { x: 0, y: 0 },
            [1],
            [0],
            [[[{ "icon": "floor" }]]],
            {
                "positionX": 0,
                "positionY": 0
            },
            { "icon": "wall" },
            [{ "icon": " " }],
            [{
                "positionX": 0,
                "positionY": 0
            }]
        )).toEqual({
            "updatedTargetCoordinates": { x: 0, y: 0 },
            "map": [[
                [{ "icon": "floor" }],
                [{ "icon": "wall" }]
            ]],
            "hero": {
                "positionX": 0,
                "positionY": 0
            },
            "creatures": [{
                "positionX": 0,
                "positionY": 0
            }]
        })
    });

    it('Добавление нового столбца карты слева c генерацией стены', () => {
        expect(expansionMap(
            { x: 0, y: 0 },
            [-1],
            [0],
            [[[{ "icon": "floor" }]]],
            {
                "positionX": 0,
                "positionY": 0
            },
            { "icon": "wall" },
            [{ "icon": " " }],
            [{
                "positionX": 0,
                "positionY": 0
            }]
        )).toEqual({
            "updatedTargetCoordinates": { x: 1, y: 0 },
            "map": [[
                [{ "icon": "wall" }],
                [{ "icon": "floor" }]
            ]],
            "hero": {
                "positionX": 1,
                "positionY": 0
            },
            "creatures": [{
                "positionX": 1,
                "positionY": 0
            }]
        })
    });

    it('Добавление новой строки сверху и нового столбца слева c генерацией травы', () => {
        expect(expansionMap(
            { x: 0, y: 0 },
            [-1, +0],
            [+0, -1],
            [[[{ "icon": "floor" }]]],
            {
                "positionX": 0,
                "positionY": 0
            },
            { "icon": "floor" },
            [{ "icon": " " }],
            [{
                "positionX": 0,
                "positionY": 0
            }]
        )).toEqual({
            "updatedTargetCoordinates": { x: 1, y: 1 },
            "map": [
                [[{ "icon": " " }], [{ "icon": "floor" }]],
                [[{ "icon": "floor" }], [{ "icon": "floor" }]]
            ],
            "hero": {
                "positionX": 1,
                "positionY": 1
            },
            "creatures": [{
                "positionX": 1,
                "positionY": 1
            }]
        })
    });

    it('Добавление 2 столбцов справа с генерацией травы', () => {
        expect(expansionMap(
            { x: 0, y: 0 },
            [2],
            [0],
            [[[{ "icon": "floor" }]]],
            {
                "positionX": 0,
                "positionY": 0
            },
            { "icon": "floor" },
            [{ "icon": " " }],
            [{
                "positionX": 0,
                "positionY": 0
            }]
        )).toEqual({
            "updatedTargetCoordinates": { x: 0, y: 0 },
            "map": [
                [[{ "icon": "floor" }], [{ "icon": " " }], [{ "icon": "floor" }]],
            ],
            "hero": {
                "positionX": 0,
                "positionY": 0
            },
            "creatures": [{
                "positionX": 0,
                "positionY": 0
            }]
        })
    });

    it('Проверка сохранения положения нескольких монстров на карте при добавлении строки слева', () => {
        expect(expansionMap(
            { x: 0, y: 0 },
            [-1],
            [0],
            [[[{ "icon": "floor" }]]],
            {
                "positionX": 0,
                "positionY": 0
            },
            { "icon": "floor" },
            [{ "icon": " " }],
            [
                { "positionX": 0, "positionY": 0 },
                { "positionX": 0, "positionY": 0 }
            ]
        )).toEqual({
            "updatedTargetCoordinates": { x: 1, y: 0 },
            "map": [
                [[{ "icon": "floor" }], [{ "icon": "floor" }]],
            ],
            "hero": {
                "positionX": 1,
                "positionY": 0
            },
            "creatures": [
                { "positionX": 1, "positionY": 0 },
                { "positionX": 1, "positionY": 0 }
            ]
        })
    });
})
