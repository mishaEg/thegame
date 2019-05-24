import moveHero from '../functional/moveHero';
import Enemy from '../Units/Enemy';

describe('Проверка функции moveHero', () => {
    it('Передвижение героя вправо на чистую ячейку', () => {
        expect(moveHero(
            [
                [[{ "icon": "floor" }], [{ "icon": "floor" }]]
            ],
            {
                "positionX": 0,
                "positionY": 0
            },
            "right",
            []
        )).toEqual({
            "message": false,
            "movedHero": {
                "positionX": 1,
                "positionY": 0
            },
            "updatedCreatures": []
        })
    });

    it('Передвижение героя влево на чистую ячейку', () => {
        expect(moveHero(
            [
                [[{ "icon": "floor" }], [{ "icon": "floor" }]]
            ],
            {
                "positionX": 1,
                "positionY": 0
            },
            "left",
            []
        )).toEqual({
            "message": false,
            "movedHero": {
                "positionX": 0,
                "positionY": 0
            },
            "updatedCreatures": []
        })
    });

    it('Передвижение героя вниз на чистую ячейку', () => {
        expect(moveHero(
            [
                [[{ "icon": "floor" }]],
                [[{ "icon": "floor" }]]
            ],
            {
                "positionX": 0,
                "positionY": 0
            },
            "down",
            []
        )).toEqual({
            "message": false,
            "movedHero": {
                "positionX": 0,
                "positionY": 1
            },
            "updatedCreatures": []
        })
    });

    it('Передвижение героя вверх на чистую ячейку', () => {
        expect(moveHero(
            [
                [[{ "icon": "floor" }]],
                [[{ "icon": "floor" }]]
            ],
            {
                "positionX": 0,
                "positionY": 1
            },
            "up",
            []
        )).toEqual({
            "message": false,
            "movedHero": {
                "positionX": 0,
                "positionY": 0
            },
            "updatedCreatures": []
        })
    });

    it('Передвижение героя вверх на траву', () => {
        expect(moveHero(
            [
                [[{ "icon": "floor" }, { "icon": "grass" }]],
                [[{ "icon": "floor" }]]
            ],
            {
                "positionX": 0,
                "positionY": 1
            },
            "up",
            []
        )).toEqual({
            "message": "you stay at grass and feels fresh green leaves by your foots :з.",
            "movedHero": {
                "positionX": 0,
                "positionY": 0
            },
            "updatedCreatures": []
        })
    });

    it('Передвижение героя вверх на деревянный меч', () => {
        expect(moveHero(
            [
                [[{ "icon": "floor" }, { "icon": "sword", "type": "weapon" }]],
                [[{ "icon": "floor" }]]
            ],
            {
                "positionX": 0,
                "positionY": 1
            },
            "up",
            []
        )).toEqual({
            "message": 'you stay at sword, if you wanna pick it up, press "p"',
            "movedHero": {
                "positionX": 0,
                "positionY": 0
            },
            "updatedCreatures": []
        })
    });

    it('Передвижение героя вверх на деревянный щит', () => {
        expect(moveHero(
            [
                [[{ "icon": "floor" }, { "icon": "shield", "type": "shield" }]],
                [[{ "icon": "floor" }]]
            ],
            {
                "positionX": 0,
                "positionY": 1
            },
            "up",
            []
        )).toEqual({
            "message": 'you stay at shield, if you wanna pick it up, press "p"',
            "movedHero": {
                "positionX": 0,
                "positionY": 0
            },
            "updatedCreatures": []
        })
    });

    it('Передвижение героя вверх на железный меч', () => {
        expect(moveHero(
            [
                [[{ "icon": "floor" }, { "icon": "iron_sword", "type": "weapon" }]],
                [[{ "icon": "floor" }]]
            ],
            {
                "positionX": 0,
                "positionY": 1
            },
            "up",
            []
        )).toEqual({
            "message": 'you stay at iron_sword, if you wanna pick it up, press "p"',
            "movedHero": {
                "positionX": 0,
                "positionY": 0
            },
            "updatedCreatures": []
        })
    });

    it('Передвижение героя вверх на железный щит', () => {
        expect(moveHero(
            [
                [[{ "icon": "floor" }, { "icon": "iron_shield", "type": "shield" }]],
                [[{ "icon": "floor" }]]
            ],
            {
                "positionX": 0,
                "positionY": 1
            },
            "up",
            []
        )).toEqual({
            "message": 'you stay at iron_shield, if you wanna pick it up, press "p"',
            "movedHero": {
                "positionX": 0,
                "positionY": 0
            },
            "updatedCreatures": []
        })
    });

    it('Передвижение героя вверх на гем', () => {
        expect(moveHero(
            [
                [[{ "icon": "floor" }, { "icon": "gem", "type": "money" }]],
                [[{ "icon": "floor" }]]
            ],
            {
                "positionX": 0,
                "positionY": 1
            },
            "up",
            []
        )).toEqual({
            "message": 'you stay at gem, if you wanna pick it up, press "p"',
            "movedHero": {
                "positionX": 0,
                "positionY": 0
            },
            "updatedCreatures": []
        })
    });

    it('Столкновение героя с монстром(спящим) при движении вверх', () => {
        const inputEnemy = new Enemy(0, 0),
            outputEnemy = new Enemy(0, 0);

        outputEnemy.getDamage(10);

        expect(moveHero(
            [
                [[{ "icon": "floor" }]],
                [[{ "icon": "floor" }]]
            ],
            {
                "positionX": 0,
                "positionY": 1,
                "damage": 10
            },
            "up",
            [inputEnemy]
        )).toEqual({
            "message": "you punch sleeping enemy, once more punch for waked up",
            "movedHero": {
                "positionX": 0,
                "positionY": 1,
                "damage": 10
            },
            "updatedCreatures": [outputEnemy]
        })
    });

    it('Столкновение героя с монстром(пробуждение) при движении вверх', () => {
        const inputEnemy = new Enemy(0, 0),
            outputEnemy = new Enemy(0, 0);

        inputEnemy.getDamage(10);
        outputEnemy.getDamage(10);
        outputEnemy.getDamage(10);

        expect(moveHero(
            [
                [[{ "icon": "floor" }]],
                [[{ "icon": "floor" }]]
            ],
            {
                "positionX": 0,
                "positionY": 1,
                "damage": 10
            },
            "up",
            [inputEnemy]
        )).toEqual({
            "message": "you punch sleeping enemy and woke him up",
            "movedHero": {
                "positionX": 0,
                "positionY": 1,
                "damage": 10
            },
            "updatedCreatures": [outputEnemy]
        })
    });

    it('Столкновение героя с монстром(проснувшимся) при движении вверх', () => {
        const inputEnemy = new Enemy(0, 0),
            outputEnemy = new Enemy(0, 0);

        inputEnemy.getDamage(10);
        inputEnemy.getDamage(10);
        outputEnemy.getDamage(10);
        outputEnemy.getDamage(10);
        outputEnemy.getDamage(10);

        expect(moveHero(
            [
                [[{ "icon": "floor" }]],
                [[{ "icon": "floor" }]]
            ],
            {
                "positionX": 0,
                "positionY": 1,
                "damage": 10
            },
            "up",
            [inputEnemy]
        )).toEqual({
            "message": "you punch enemy",
            "movedHero": {
                "positionX": 0,
                "positionY": 1,
                "damage": 10
            },
            "updatedCreatures": [outputEnemy]
        })
    });
})

describe('Негативные тесты функции moveHero', () => {
    it('Невозможность перемещения героя вверх на ячейку со стеной', () => {
        expect(moveHero(
            [
                [[{ "icon": "wall" }]],
                [[{ "icon": "floor" }]]
            ],
            {
                "positionX": 0,
                "positionY": 1
            },
            "up",
            []
        )).toEqual({
            "message": "there is no the way",
            "movedHero": {
                "positionX": 0,
                "positionY": 1
            },
            "updatedCreatures": []
        })
    });
})
