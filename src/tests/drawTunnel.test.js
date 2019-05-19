import drawTunnel from '../functional/drawTunnel';

describe('Тесты функции drawTunnel', () => {
    it('Проверка генерации пещеры вниз', () => {
        expect(drawTunnel(
            {
                x: 1, y: 1
            },
            [
                [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }]]
            ],
            {
                "positionX": 0,
                "positionY": 1
            },
            [
                {
                    "positionX": 0,
                    "positionY": 0
                }
            ]
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
                "creatures": [
                    {
                        "positionX": 0,
                        "positionY": 0
                    }
                ]
            }
        )
    });

    it('Проверка генерации пещеры вверх', () => {
        expect(drawTunnel(
            {
                x: 1, y: 0
            },
            [
                [[{ "icon": "wall" }], [{ "icon": "wall" }], [{ "icon": "wall" }]],
                [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }]]
            ],
            {
                "positionX": 1,
                "positionY": 1
            },
            [
                {
                    "positionX": 0,
                    "positionY": 1
                }
            ]
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
                "creatures": [
                    {
                        "positionX": 0,
                        "positionY": 2
                    }
                ]
            }
        )
    });

    it('Проверка генерации пещеры вправо', () => {
        expect(drawTunnel(
            {
                x: 1, y: 1
            },
            [
                [[{ "icon": "floor" }], [{ "icon": "wall" }]],
                [[{ "icon": "floor" }], [{ "icon": "wall" }]],
                [[{ "icon": "floor" }], [{ "icon": "wall" }]]
            ],
            {
                "positionX": 0,
                "positionY": 1
            },
            [
                {
                    "positionX": 0,
                    "positionY": 0
                }
            ]
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
                "creatures": [
                    {
                        "positionX": 0,
                        "positionY": 0
                    }
                ]
            }
        )
    });

    it('Проверка генерации пещеры влево', () => {
        expect(drawTunnel(
            {
                x: 0, y: 1
            },
            [
                [[{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": "wall" }], [{ "icon": "floor" }]]
            ],
            {
                "positionX": 1,
                "positionY": 1
            },
            [
                {
                    "positionX": 1,
                    "positionY": 0
                }
            ]
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
                "creatures": [
                    {
                        "positionX": 2,
                        "positionY": 0
                    }
                ]
            }
        )
    });

    it('Проверка выкапывания одиночных стен', () => {
        expect(drawTunnel(
            {
                x: 1, y: 1
            },
            [
                [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }]],
                [[{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": "floor" }]],
                [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }]]
            ],
            {
                "positionX": 0,
                "positionY": 1
            },
            [
                {
                    "positionX": 0,
                    "positionY": 0
                }
            ]
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
                "creatures": [
                    {
                        "positionX": 0,
                        "positionY": 0
                    }
                ]
            }
        )
    });
})
