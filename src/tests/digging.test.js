import Enemy from '../Units/Enemy';

describe('Негативные тесты функции digging', () => {
    it('Попытка раскопки прочего элемента, отличного от стены, вправо', () => {
        const digging = require('../functional/digging');

        expect(digging(
            [
                [[{ 'icon': "floor" }], [{ 'icon': "floor" }]]
            ],
            {
                "positionX": 0,
                "positionY": 0,
                "readyToMine": true
            },
            "right",
            [{
                "positionX": 0,
                "positionY": 0
            }]
        )).toEqual(
            {
                "diggedUp": false,
                "message": "there is nothing to dig",
                "updatedHero": {
                    "readyToMine": false
                }
            }
        )
    });
})

describe('Тесты с генерацией туннеля в функции digging', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    it('Раскопка туннеля вправо', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn(() => 1)
        });
        const digging = require('../functional/digging');

        expect(digging(
            [
                [[{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                [[{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                [[{ 'icon': "floor" }], [{ 'icon': "wall" }]]
            ],
            {
                "positionX": 0,
                "positionY": 1,
                "readyToMine": true
            },
            "right",
            [{
                "positionX": 0,
                "positionY": 0
            }]
        )).toEqual(
            {
                "diggedUp": true,
                "message": false,
                "updatedHero": {
                    "positionX": 0,
                    "positionY": 1,
                    "readyToMine": false
                },
                "updatedMap": [
                    [[{ 'icon': "floor" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "floor" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]]
                ],
                "updatedCreatures": [{
                    "positionX": 0,
                    "positionY": 0
                }]
            }
        )
    });

    it('Раскопка туннеля влево', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn(() => 1)
        });
        const digging = require('../functional/digging');

        expect(digging(
            [
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }]]
            ],
            {
                "positionX": 1,
                "positionY": 1,
                "readyToMine": true
            },
            "left",
            [{
                "positionX": 1,
                "positionY": 0
            }]
        )).toEqual(
            {
                "diggedUp": true,
                "message": false,
                "updatedHero": {
                    "positionX": 2,
                    "positionY": 1,
                    "readyToMine": false
                },
                "updatedMap": [
                    [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "floor" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "floor" }]]
                ],
                "updatedCreatures": [{
                    "positionX": 2,
                    "positionY": 0
                }]
            }
        )
    });

    it('Раскопка туннеля вверх', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn(() => 1)
        });
        const digging = require('../functional/digging');

        expect(digging(
            [
                [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]],
                [[{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }]]
            ],
            {
                "positionX": 1,
                "positionY": 1,
                "readyToMine": true
            },
            "up",
            [{
                "positionX": 0,
                "positionY": 1
            }]
        )).toEqual(
            {
                "diggedUp": true,
                "message": false,
                "updatedHero": {
                    "positionX": 1,
                    "positionY": 2,
                    "readyToMine": false
                },
                "updatedMap": [
                    [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }]]
                ],
                "updatedCreatures": [{
                    "positionX": 0,
                    "positionY": 2
                }]
            }
        )
    });

    it('Раскопка туннеля вниз', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn(() => 1)
        });
        const digging = require('../functional/digging');


        expect(digging(
            [
                [[{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]]
            ],
            {
                "positionX": 1,
                "positionY": 0,
                "readyToMine": true
            },
            "down",
            [{
                "positionX": 0,
                "positionY": 0
            }]
        )).toEqual(
            {
                "diggedUp": true,
                "message": false,
                "updatedHero": {
                    "positionX": 1,
                    "positionY": 0,
                    "readyToMine": false
                },
                "updatedMap": [
                    [[{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]]
                ],
                "updatedCreatures": [{
                    "positionX": 0,
                    "positionY": 0
                }]
            }
        )
    });

    it('Раскопка туннеля вниз без врагов', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn(() => 1)
        });
        const digging = require('../functional/digging');

        expect(digging(
            [
                [[{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]]
            ],
            {
                "positionX": 1,
                "positionY": 0,
                "readyToMine": true
            },
            "down",
            []
        )).toEqual(
            {
                "diggedUp": true,
                "message": false,
                "updatedHero": {
                    "positionX": 1,
                    "positionY": 0,
                    "readyToMine": false
                },
                "updatedMap": [
                    [[{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]]
                ],
                "updatedCreatures": []
            }
        )
    });
})

describe('Тесты с генерацией пещеры с врагом в функции digging', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    it('Раскопка пещеры с врагом при копании вниз', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn(() => 6)
        });
        const digging = require('../functional/digging');

        expect(digging(
            [
                [[{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]]
            ],
            {
                "positionX": 2,
                "positionY": 0,
                "readyToMine": true
            },
            "down",
            []
        )).toEqual(
            {
                "diggedUp": true,
                "message": "you found cave with enemy!",
                "updatedHero": {
                    "positionX": 2,
                    "positionY": 0,
                    "readyToMine": false
                },
                "updatedMap": [
                    [[{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]]
                ],
                "updatedCreatures": [
                    new Enemy(2, 3)
                ]
            }
        )
    });

    it('Раскопка пещеры с врагом при копании вверх', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn(() => 6)
        });
        const digging = require('../functional/digging');

        expect(digging(
            [
                [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]],
                [[{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }]]
            ],
            {
                "positionX": 2,
                "positionY": 1,
                "readyToMine": true
            },
            "up",
            []
        )).toEqual(
            {
                "diggedUp": true,
                "message": "you found cave with enemy!",
                "updatedHero": {
                    "positionX": 2,
                    "positionY": 5,
                    "readyToMine": false
                },
                "updatedMap": [
                    [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }]]
                ],
                "updatedCreatures": [
                    new Enemy(2, 2)
                ]
            }
        )
    });

    it('Раскопка пещеры с врагом при копании вправо', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn(() => 6)
        });
        const digging = require('../functional/digging');

        expect(digging(
            [
                [[{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                [[{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                [[{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                [[{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                [[{ 'icon': "floor" }], [{ 'icon': "wall" }]]
            ],
            {
                "positionX": 0,
                "positionY": 2,
                "readyToMine": true
            },
            "right",
            []
        )).toEqual(
            {
                "diggedUp": true,
                "message": "you found cave with enemy!",
                "updatedHero": {
                    "positionX": 0,
                    "positionY": 2,
                    "readyToMine": false
                },
                "updatedMap": [
                    [[{ 'icon': "floor" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "floor" }], [{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "floor" }], [{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "floor" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]]
                ],
                "updatedCreatures": [
                    new Enemy(3, 2)
                ]
            }
        )
    });

    it('Раскопка пещеры с врагом при копании влево', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn(() => 6)
        });
        const digging = require('../functional/digging');

        expect(digging(
            [
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }]]
            ],
            {
                "positionX": 1,
                "positionY": 2,
                "readyToMine": true
            },
            "left",
            []
        )).toEqual(
            {
                "diggedUp": true,
                "message": "you found cave with enemy!",
                "updatedHero": {
                    "positionX": 5,
                    "positionY": 2,
                    "readyToMine": false
                },
                "updatedMap": [
                    [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "floor" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }], [{ 'icon': "floor" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }], [{ 'icon': "floor" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "floor" }]]
                ],
                "updatedCreatures": [
                    new Enemy(2, 2)
                ]
            }
        )
    });

    it('Раскопка пещеры с врагом при копании влево с сохранением координат существующих врагов', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn(() => 6)
        });
        const digging = require('../functional/digging');

        expect(digging(
            [
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }]]
            ],
            {
                "positionX": 1,
                "positionY": 2,
                "readyToMine": true
            },
            "left",
            [
                new Enemy(1, 0)
            ]
        )).toEqual(
            {
                "diggedUp": true,
                "message": "you found cave with enemy!",
                "updatedHero": {
                    "positionX": 5,
                    "positionY": 2,
                    "readyToMine": false
                },
                "updatedMap": [
                    [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "floor" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }], [{ 'icon': "floor" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }], [{ 'icon': "floor" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "floor" }]]
                ],
                "updatedCreatures": [
                    new Enemy(5, 0),
                    new Enemy(2, 2)
                ]
            }
        )
    });
})

describe('Тесты с генерацией пещеры с травой в функции digging', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    it('Раскопка пещеры с травой при копании влево', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn(() => 7)
        });
        const digging = require('../functional/digging');

        expect(digging(
            [
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }]]
            ],
            {
                "positionX": 1,
                "positionY": 2,
                "readyToMine": true
            },
            "left",
            []
        )).toEqual(
            {
                "diggedUp": true,
                "message": "you found cave with grass!",
                "updatedHero": {
                    "positionX": 5,
                    "positionY": 2,
                    "readyToMine": false
                },
                "updatedMap": [
                    [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "floor" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }], [{ 'icon': "floor" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }, { 'icon': "grass" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }], [{ 'icon': "floor" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "floor" }]]
                ],
                "updatedCreatures": []
            }
        )
    });

    it('Раскопка пещеры с травой при копании вправо', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn(() => 7)
        });
        const digging = require('../functional/digging');

        expect(digging(
            [
                [[{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                [[{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                [[{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                [[{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                [[{ 'icon': "floor" }], [{ 'icon': "wall" }]]
            ],
            {
                "positionX": 0,
                "positionY": 2,
                "readyToMine": true
            },
            "right",
            []
        )).toEqual(
            {
                "diggedUp": true,
                "message": "you found cave with grass!",
                "updatedHero": {
                    "positionX": 0,
                    "positionY": 2,
                    "readyToMine": false
                },
                "updatedMap": [
                    [[{ 'icon': "floor" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "floor" }], [{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }, { 'icon': "grass" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "floor" }], [{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "floor" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]]
                ],
                "updatedCreatures": []
            }
        )
    });

    it('Раскопка пещеры с травой при копании вверх', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn(() => 7)
        });
        const digging = require('../functional/digging');

        expect(digging(
            [
                [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]],
                [[{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }]]
            ],
            {
                "positionX": 2,
                "positionY": 1,
                "readyToMine": true
            },
            "up",
            []
        )).toEqual(
            {
                "diggedUp": true,
                "message": "you found cave with grass!",
                "updatedHero": {
                    "positionX": 2,
                    "positionY": 5,
                    "readyToMine": false
                },
                "updatedMap": [
                    [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }, { 'icon': "grass" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }]]
                ],
                "updatedCreatures": []
            }
        )
    });

    it('Раскопка пещеры с травой при копании вниз', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn(() => 7)
        });
        const digging = require('../functional/digging');

        expect(digging(
            [
                [[{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]]
            ],
            {
                "positionX": 2,
                "positionY": 0,
                "readyToMine": true
            },
            "down",
            []
        )).toEqual(
            {
                "diggedUp": true,
                "message": "you found cave with grass!",
                "updatedHero": {
                    "positionX": 2,
                    "positionY": 0,
                    "readyToMine": false
                },
                "updatedMap": [
                    [[{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }, { 'icon': "grass" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]]
                ],
                "updatedCreatures": []
            }
        )
    });

    it('Раскопка пещеры с травой при копании вниз с сохранением координат существующих врагов', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn(() => 7)
        });
        const digging = require('../functional/digging');

        expect(digging(
            [
                [[{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]]
            ],
            {
                "positionX": 2,
                "positionY": 0,
                "readyToMine": true
            },
            "down",
            [
                new Enemy(0, 1)
            ]
        )).toEqual(
            {
                "diggedUp": true,
                "message": "you found cave with grass!",
                "updatedHero": {
                    "positionX": 2,
                    "positionY": 0,
                    "readyToMine": false
                },
                "updatedMap": [
                    [[{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }, { 'icon': "grass" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]]
                ],
                "updatedCreatures": [
                    new Enemy(0, 1)
                ]
            }
        )
    });
})

describe('Тесты с генерацией пещеры с железным щитом в функции digging', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    it('Раскопка пещеры с железным щитом при копании влево', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn(() => 8)
        });
        const digging = require('../functional/digging');

        expect(digging(
            [
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }]]
            ],
            {
                "positionX": 1,
                "positionY": 2,
                "readyToMine": true
            },
            "left",
            []
        )).toEqual(
            {
                "diggedUp": true,
                "message": "you found cave with iron shield!",
                "updatedHero": {
                    "positionX": 5,
                    "positionY": 2,
                    "readyToMine": false
                },
                "updatedMap": [
                    [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "floor" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }], [{ 'icon': "floor" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }, { "icon": "iron_shield", "type": "shield", "defence": 20 }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }], [{ 'icon': "floor" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "floor" }]]
                ],
                "updatedCreatures": []
            }
        )
    });

    it('Раскопка пещеры с железным щитом при копании вправо', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn(() => 8)
        });
        const digging = require('../functional/digging');

        expect(digging(
            [
                [[{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                [[{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                [[{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                [[{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                [[{ 'icon': "floor" }], [{ 'icon': "wall" }]]
            ],
            {
                "positionX": 0,
                "positionY": 2,
                "readyToMine": true
            },
            "right",
            []
        )).toEqual(
            {
                "diggedUp": true,
                "message": "you found cave with iron shield!",
                "updatedHero": {
                    "positionX": 0,
                    "positionY": 2,
                    "readyToMine": false
                },
                "updatedMap": [
                    [[{ 'icon': "floor" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "floor" }], [{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }, { "icon": "iron_shield", "type": "shield", "defence": 20 }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "floor" }], [{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "floor" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]]
                ],
                "updatedCreatures": []
            }
        )
    });

    it('Раскопка пещеры с железным щитом при копании вверх', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn(() => 8)
        });
        const digging = require('../functional/digging');

        expect(digging(
            [
                [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]],
                [[{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }]]
            ],
            {
                "positionX": 2,
                "positionY": 1,
                "readyToMine": true
            },
            "up",
            []
        )).toEqual(
            {
                "diggedUp": true,
                "message": "you found cave with iron shield!",
                "updatedHero": {
                    "positionX": 2,
                    "positionY": 5,
                    "readyToMine": false
                },
                "updatedMap": [
                    [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }, { "icon": "iron_shield", "type": "shield", "defence": 20 }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }]]
                ],
                "updatedCreatures": []
            }
        )
    });

    it('Раскопка пещеры с железным щитом при копании вниз', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn(() => 8)
        });
        const digging = require('../functional/digging');

        expect(digging(
            [
                [[{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]]
            ],
            {
                "positionX": 2,
                "positionY": 0,
                "readyToMine": true
            },
            "down",
            []
        )).toEqual(
            {
                "diggedUp": true,
                "message": "you found cave with iron shield!",
                "updatedHero": {
                    "positionX": 2,
                    "positionY": 0,
                    "readyToMine": false
                },
                "updatedMap": [
                    [[{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }, { "icon": "iron_shield", "type": "shield", "defence": 20 }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]]
                ],
                "updatedCreatures": []
            }
        )
    });

    it('Раскопка пещеры с железным щитом при копании вниз с сохранением координат существующих врагов', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn(() => 8)
        });
        const digging = require('../functional/digging');

        expect(digging(
            [
                [[{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]]
            ],
            {
                "positionX": 2,
                "positionY": 0,
                "readyToMine": true
            },
            "down",
            [
                new Enemy(0, 1)
            ]
        )).toEqual(
            {
                "diggedUp": true,
                "message": "you found cave with iron shield!",
                "updatedHero": {
                    "positionX": 2,
                    "positionY": 0,
                    "readyToMine": false
                },
                "updatedMap": [
                    [[{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }, { "icon": "iron_shield", "type": "shield", "defence": 20 }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]]
                ],
                "updatedCreatures": [
                    new Enemy(0, 1)
                ]
            }
        )
    });
})

describe('Тесты с генерацией пещеры с железным мечом в функции digging', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    it('Раскопка пещеры с железным мечом при копании влево', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn(() => 9)
        });
        const digging = require('../functional/digging');

        expect(digging(
            [
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }]]
            ],
            {
                "positionX": 1,
                "positionY": 2,
                "readyToMine": true
            },
            "left",
            []
        )).toEqual(
            {
                "diggedUp": true,
                "message": "you found cave with iron sword!",
                "updatedHero": {
                    "positionX": 5,
                    "positionY": 2,
                    "readyToMine": false
                },
                "updatedMap": [
                    [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "floor" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }], [{ 'icon': "floor" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }, { "icon": "iron_sword", "type": "weapon", "damage": 50 }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }], [{ 'icon': "floor" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "floor" }]]
                ],
                "updatedCreatures": []
            }
        )
    });

    it('Раскопка пещеры с железным мечом при копании вправо', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn(() => 9)
        });
        const digging = require('../functional/digging');

        expect(digging(
            [
                [[{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                [[{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                [[{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                [[{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                [[{ 'icon': "floor" }], [{ 'icon': "wall" }]]
            ],
            {
                "positionX": 0,
                "positionY": 2,
                "readyToMine": true
            },
            "right",
            []
        )).toEqual(
            {
                "diggedUp": true,
                "message": "you found cave with iron sword!",
                "updatedHero": {
                    "positionX": 0,
                    "positionY": 2,
                    "readyToMine": false
                },
                "updatedMap": [
                    [[{ 'icon': "floor" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "floor" }], [{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }, { "icon": "iron_sword", "type": "weapon", "damage": 50 }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "floor" }], [{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "floor" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]]
                ],
                "updatedCreatures": []
            }
        )
    });

    it('Раскопка пещеры с железным мечом при копании вверх', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn(() => 9)
        });
        const digging = require('../functional/digging');

        expect(digging(
            [
                [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]],
                [[{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }]]
            ],
            {
                "positionX": 2,
                "positionY": 1,
                "readyToMine": true
            },
            "up",
            []
        )).toEqual(
            {
                "diggedUp": true,
                "message": "you found cave with iron sword!",
                "updatedHero": {
                    "positionX": 2,
                    "positionY": 5,
                    "readyToMine": false
                },
                "updatedMap": [
                    [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }, { "icon": "iron_sword", "type": "weapon", "damage": 50 }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }]]
                ],
                "updatedCreatures": []
            }
        )
    });

    it('Раскопка пещеры с железным мечом при копании вниз', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn(() => 9)
        });
        const digging = require('../functional/digging');

        expect(digging(
            [
                [[{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]]
            ],
            {
                "positionX": 2,
                "positionY": 0,
                "readyToMine": true
            },
            "down",
            []
        )).toEqual(
            {
                "diggedUp": true,
                "message": "you found cave with iron sword!",
                "updatedHero": {
                    "positionX": 2,
                    "positionY": 0,
                    "readyToMine": false
                },
                "updatedMap": [
                    [[{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }, { "icon": "iron_sword", "type": "weapon", "damage": 50 }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]]
                ],
                "updatedCreatures": []
            }
        )
    });

    it('Раскопка пещеры с железным мечом при копании вниз с сохранением координат существующих врагов', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn(() => 9)
        });
        const digging = require('../functional/digging');

        expect(digging(
            [
                [[{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]]
            ],
            {
                "positionX": 2,
                "positionY": 0,
                "readyToMine": true
            },
            "down",
            [
                new Enemy(0, 1)
            ]
        )).toEqual(
            {
                "diggedUp": true,
                "message": "you found cave with iron sword!",
                "updatedHero": {
                    "positionX": 2,
                    "positionY": 0,
                    "readyToMine": false
                },
                "updatedMap": [
                    [[{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }, { "icon": "iron_sword", "type": "weapon", "damage": 50 }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]]
                ],
                "updatedCreatures": [
                    new Enemy(0, 1)
                ]
            }
        )
    });
})

describe('Тесты с генерацией пещеры с камнем в функции digging', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    it('Раскопка пещеры с камнем при копании влево', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn(() => 10)
        });
        const digging = require('../functional/digging');

        expect(digging(
            [
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "floor" }]]
            ],
            {
                "positionX": 1,
                "positionY": 2,
                "readyToMine": true
            },
            "left",
            []
        )).toEqual(
            {
                "diggedUp": true,
                "message": "you found a gem!",
                "updatedHero": {
                    "positionX": 5,
                    "positionY": 2,
                    "readyToMine": false
                },
                "updatedMap": [
                    [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "floor" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }], [{ 'icon': "floor" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }, { "icon": "gem", 'cost': 10, "type": "money" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }], [{ 'icon': "floor" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "floor" }]]
                ],
                "updatedCreatures": []
            }
        )
    });

    it('Раскопка пещеры с камнем при копании вправо', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn(() => 10)
        });
        const digging = require('../functional/digging');

        expect(digging(
            [
                [[{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                [[{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                [[{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                [[{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                [[{ 'icon': "floor" }], [{ 'icon': "wall" }]]
            ],
            {
                "positionX": 0,
                "positionY": 2,
                "readyToMine": true
            },
            "right",
            []
        )).toEqual(
            {
                "diggedUp": true,
                "message": "you found a gem!",
                "updatedHero": {
                    "positionX": 0,
                    "positionY": 2,
                    "readyToMine": false
                },
                "updatedMap": [
                    [[{ 'icon': "floor" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "floor" }], [{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }, { "icon": "gem", 'cost': 10, "type": "money" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "floor" }], [{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "floor" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]]
                ],
                "updatedCreatures": []
            }
        )
    });

    it('Раскопка пещеры с камнем при копании вверх', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn(() => 10)
        });
        const digging = require('../functional/digging');

        expect(digging(
            [
                [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]],
                [[{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }]]
            ],
            {
                "positionX": 2,
                "positionY": 1,
                "readyToMine": true
            },
            "up",
            []
        )).toEqual(
            {
                "diggedUp": true,
                "message": "you found a gem!",
                "updatedHero": {
                    "positionX": 2,
                    "positionY": 5,
                    "readyToMine": false
                },
                "updatedMap": [
                    [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }, { "icon": "gem", 'cost': 10, "type": "money" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }]]
                ],
                "updatedCreatures": []
            }
        )
    });

    it('Раскопка пещеры с камнем при копании вниз', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn(() => 10)
        });
        const digging = require('../functional/digging');

        expect(digging(
            [
                [[{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]]
            ],
            {
                "positionX": 2,
                "positionY": 0,
                "readyToMine": true
            },
            "down",
            []
        )).toEqual(
            {
                "diggedUp": true,
                "message": "you found a gem!",
                "updatedHero": {
                    "positionX": 2,
                    "positionY": 0,
                    "readyToMine": false
                },
                "updatedMap": [
                    [[{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }, { "icon": "gem", 'cost': 10, "type": "money" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]]
                ],
                "updatedCreatures": []
            }
        )
    });

    it('Раскопка пещеры с камнем при копании вниз с сохранением координат существующих врагов', () => {
        jest.mock('../functional/utils/getRandomInt', () => {
            return jest.fn(() => 10)
        });
        const digging = require('../functional/digging');

        expect(digging(
            [
                [[{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }]],
                [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]]
            ],
            {
                "positionX": 2,
                "positionY": 0,
                "readyToMine": true
            },
            "down",
            [
                new Enemy(0, 0)
            ]
        )).toEqual(
            {
                "diggedUp": true,
                "message": "you found a gem!",
                "updatedHero": {
                    "positionX": 2,
                    "positionY": 0,
                    "readyToMine": false
                },
                "updatedMap": [
                    [[{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }, { "icon": "gem", 'cost': 10, "type": "money" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "floor" }], [{ 'icon': "wall" }]],
                    [[{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }], [{ 'icon': "wall" }]]
                ],
                "updatedCreatures": [
                    new Enemy(0, 0)
                ]
            }
        )
    });
})
