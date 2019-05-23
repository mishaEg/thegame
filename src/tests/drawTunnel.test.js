import drawTunnel from '../functional/drawTunnel';

describe('Тесты функции drawTunnel без генерации камня', () => {
    it('Проверка генерации пещеры вниз без генерации камня', () => {
        expect(drawTunnel(
            { x: 1, y: 1 },
            false,
            [
                [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }]]
            ],
            {
                "positionX": 0,
                "positionY": 1
            },
            [{
                "positionX": 0,
                "positionY": 0
            }]
        )).toEqual(
            {
                "updateDiggingCoordinate": { x: 1, y: 1 },
                "map": [
                    [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }]],
                    [[{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "wall" }]],
                    [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }]]
                ],
                "hero": {
                    "positionX": 0,
                    "positionY": 1
                },
                "creatures": [{
                    "positionX": 0,
                    "positionY": 0
                }],
                "message": false
            }
        )
    });

    it('Проверка генерации пещеры вверх без генерации камня', () => {
        expect(drawTunnel(
            { x: 1, y: 0 },
            false,
            [
                [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }]],
                [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }]]
            ],
            {
                "positionX": 1,
                "positionY": 1
            },
            [{
                "positionX": 0,
                "positionY": 1
            }]
        )).toEqual(
            {
                "updateDiggingCoordinate": { x: 1, y: 1 },
                "map": [
                    [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }]],
                    [[{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "wall" }]],
                    [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }]]
                ],
                "hero": {
                    "positionX": 1,
                    "positionY": 2
                },
                "creatures": [{
                    "positionX": 0,
                    "positionY": 2
                }],
                "message": false
            }
        )
    });

    it('Проверка генерации пещеры вправо без генерации камня', () => {
        expect(drawTunnel(
            { x: 1, y: 1 },
            false,
            [
                [[{ "icon": "floor" }], [{ "icon": "wall" }]],
                [[{ "icon": "floor" }], [{ "icon": "wall" }]],
                [[{ "icon": "floor" }], [{ "icon": "wall" }]]
            ],
            {
                "positionX": 0,
                "positionY": 1
            },
            [{
                "positionX": 0,
                "positionY": 0
            }]
        )).toEqual(
            {
                "updateDiggingCoordinate": { x: 1, y: 1 },
                "map": [
                    [[{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": "wall" }]],
                    [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "wall" }]],
                    [[{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": "wall" }]]
                ],
                "hero": {
                    "positionX": 0,
                    "positionY": 1
                },
                "creatures": [{
                    "positionX": 0,
                    "positionY": 0
                }],
                "message": false
            }
        )
    });

    it('Проверка генерации пещеры влево без генерации камня', () => {
        expect(drawTunnel(
            { x: 0, y: 1 },
            false,
            [
                [[{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }]]
            ],
            {
                "positionX": 1,
                "positionY": 1
            },
            [{
                "positionX": 1,
                "positionY": 0
            }]
        )).toEqual(
            {
                "updateDiggingCoordinate": { x: 1, y: 1 },
                "map": [
                    [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "floor" }]],
                    [[{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "floor" }]],
                    [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "floor" }]]
                ],
                "hero": {
                    "positionX": 2,
                    "positionY": 1
                },
                "creatures": [{
                    "positionX": 2,
                    "positionY": 0
                }],
                "message": false
            }
        )
    });

    it('Проверка выкапывания одиночных стен без генерации камня', () => {
        expect(drawTunnel(
            { x: 1, y: 1 },
            false,
            [
                [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }]],
                [[{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }]]
            ],
            {
                "positionX": 0,
                "positionY": 1
            },
            [{
                "positionX": 0,
                "positionY": 0
            }]
        )).toEqual(
            {
                "updateDiggingCoordinate": { x: 1, y: 1 },
                "map": [
                    [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }]],
                    [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }]],
                    [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }]]
                    ],
                "hero": {
                    "positionX": 0,
                    "positionY": 1
                },
                "creatures": [{
                    "positionX": 0,
                    "positionY": 0
                }],
                "message": false
            }
        )
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
        const drawTunnelWithMock = require('../functional/drawTunnel').default;

        expect(drawTunnelWithMock(
            { x: 1, y: 1 },
            true,
            [
                [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }]]
            ],
            {
                "positionX": 1,
                "positionY": 0
            },
            [{
                "positionX": 0,
                "positionY": 0
            }]
        )).toEqual(
            {
                "updateDiggingCoordinate": { x: 1, y: 1 },
                "map": [
                    [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }]],
                    [[{ "icon": "wall" }], [{ "icon": "floor" }, { "type": "money", "cost": 10, "icon": "gem" }], [{ "icon": "wall" }]],
                    [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }]]
                ],
                "hero": {
                    "positionX": 1,
                    "positionY": 0
                },
                "creatures": [{
                    "positionX": 0,
                    "positionY": 0
                }],
                "message": "you found a gem!"
            }
        )
    });

    it('Проверка генерации раскапывания камня при копании вверх', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn(() => 0);
        });
        const drawTunnelWithMock = require('../functional/drawTunnel').default;

        expect(drawTunnelWithMock(
            { x: 1, y: 0 },
            true,
            [
                [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }]],
                [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }]]
            ],
            {
                "positionX": 1,
                "positionY": 1
            },
            [{
                "positionX": 0,
                "positionY": 1
            }]
        )).toEqual(
            {
                "updateDiggingCoordinate": { x: 1, y: 1 },
                "map": [
                    [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }]],
                    [[{ "icon": "wall" }], [{ "icon": "floor" }, { "type": "money", "cost": 10, "icon": "gem" }], [{ "icon": "wall" }]],
                    [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }]]
                ],
                "hero": {
                    "positionX": 1,
                    "positionY": 2
                },
                "creatures": [{
                    "positionX": 0,
                    "positionY": 2
                }],
                "message": "you found a gem!"
            }
        )
    });

    it('Проверка генерации раскапывания камня при копании вправо', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn(() => 0);
        });
        const drawTunnelWithMock = require('../functional/drawTunnel').default;

        expect(drawTunnelWithMock(
            { x: 1, y: 1 },
            true,
            [
                [[{ "icon": "floor" }], [{ "icon": "wall" }]],
                [[{ "icon": "floor" }], [{ "icon": "wall" }]],
                [[{ "icon": "floor" }], [{ "icon": "wall" }]]
            ],
            {
                "positionX": 0,
                "positionY": 1
            },
            [{
                "positionX": 0,
                "positionY": 0
            }]
        )).toEqual(
            {
                "updateDiggingCoordinate": { x: 1, y: 1 },
                "map": [
                    [[{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": "wall" }]],
                    [[{ "icon": "floor" }], [{ "icon": "floor" }, { "type": "money", "cost": 10, "icon": "gem" }], [{ "icon": "wall" }]],
                    [[{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": "wall" }]]
                ],
                "hero": {
                    "positionX": 0,
                    "positionY": 1
                },
                "creatures": [{
                    "positionX": 0,
                    "positionY": 0
                }],
                "message": "you found a gem!"
            }
        )
    });

    it('Проверка генерации раскапывания камня при копании влево', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn(() => 0);
        });
        const drawTunnelWithMock = require('../functional/drawTunnel').default;

        expect(drawTunnelWithMock(
            { x: 0, y: 1 },
            true,
            [
                [[{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }]]
            ],
            {
                "positionX": 1,
                "positionY": 1
            },
            [{
                "positionX": 1,
                "positionY": 0
            }]
        )).toEqual(
            {
                "updateDiggingCoordinate": { x: 1, y: 1 },
                "map": [
                    [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "floor" }]],
                    [[{ "icon": "wall" }], [{ "icon": "floor" }, { "type": "money", "cost": 10, "icon": "gem" }], [{ "icon": "floor" }]],
                    [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "floor" }]]
                ],
                "hero": {
                    "positionX": 2,
                    "positionY": 1
                },
                "creatures": [{
                    "positionX": 2,
                    "positionY": 0
                }],
                "message": "you found a gem!"
            }
        )
    });

    it('Проверка отсутствия камня при копании вниз с другой вероятностью', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn(() => 5);
        });
        const drawTunnelWithMock = require('../functional/drawTunnel').default;

        expect(drawTunnelWithMock(
            { x: 1, y: 1 },
            true,
            [
                [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }]]
            ],
            {
                "positionX": 1,
                "positionY": 0
            },
            [{
                "positionX": 0,
                "positionY": 0
            }]
        )).toEqual(
            {
                "updateDiggingCoordinate": { x: 1, y: 1 },
                "map": [
                    [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }]],
                    [[{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "wall" }]],
                    [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }]]
                ],
                "hero": {
                    "positionX": 1,
                    "positionY": 0
                },
                "creatures": [{
                    "positionX": 0,
                    "positionY": 0
                }],
                "message": false
            }
        )
    });

    it('Проверка отсутствия камня при другой вероятности при копании вверх', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn(() => 5);
        });
        const drawTunnelWithMock = require('../functional/drawTunnel').default;

        expect(drawTunnelWithMock(
            { x: 1, y: 0 },
            true,
            [
                [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }]],
                [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }]]
            ],
            {
                "positionX": 1,
                "positionY": 1
            },
            [{
                "positionX": 0,
                "positionY": 1
            }]
        )).toEqual(
            {
                "updateDiggingCoordinate": { x: 1, y: 1 },
                "map": [
                    [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }]],
                    [[{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "wall" }]],
                    [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }]]
                ],
                "hero": {
                    "positionX": 1,
                    "positionY": 2
                },
                "creatures": [{
                    "positionX": 0,
                    "positionY": 2
                }],
                "message": false
            }
        )
    });

    it('Проверка отсутствия камня при другой вероятности при копании вправо', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn(() => 5);
        });
        const drawTunnelWithMock = require('../functional/drawTunnel').default;

        expect(drawTunnelWithMock(
            { x: 1, y: 1 },
            true,
            [
                [[{ "icon": "floor" }], [{ "icon": "wall" }]],
                [[{ "icon": "floor" }], [{ "icon": "wall" }]],
                [[{ "icon": "floor" }], [{ "icon": "wall" }]]
            ],
            {
                "positionX": 0,
                "positionY": 1
            },
            [{
                "positionX": 0,
                "positionY": 0
            }]
        )).toEqual(
            {
                "updateDiggingCoordinate": { x: 1, y: 1 },
                "map": [
                    [[{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": "wall" }]],
                    [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "wall" }]],
                    [[{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": "wall" }]]
                ],
                "hero": {
                    "positionX": 0,
                    "positionY": 1
                },
                "creatures": [{
                    "positionX": 0,
                    "positionY": 0
                }],
                "message": false
            }
        )
    });

    it('Проверка отсутствия камня при другой вероятности при копании влево', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn(() => 5);
        });
        const drawTunnelWithMock = require('../functional/drawTunnel').default;

        expect(drawTunnelWithMock(
            { x: 0, y: 1 },
            true,
            [
                [[{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }]]
            ],
            {
                "positionX": 1,
                "positionY": 1
            },
            [{
                "positionX": 1,
                "positionY": 0
            }]
        )).toEqual(
            {
                "updateDiggingCoordinate": { x: 1, y: 1 },
                "map": [
                    [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "floor" }]],
                    [[{ "icon": "wall" }], [{ "icon": "floor" }], [{ "icon": "floor" }]],
                    [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "floor" }]]
                ],
                "hero": {
                    "positionX": 2,
                    "positionY": 1
                },
                "creatures": [{
                    "positionX": 2,
                    "positionY": 0
                }],
                "message": false
            }
        )
    });
})
