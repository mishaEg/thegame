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
            "updatedMap": [],
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
            "updatedMap": [],
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
            "updatedMap": [],
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
            "updatedMap": [],
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
            "updatedMap": [],
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
            "updatedMap": [],
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
            "updatedMap": [],
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
            "updatedMap": [],
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
            "updatedMap": [],
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
            "updatedMap": [],
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
            "updatedMap": [],
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
            "updatedMap": [],
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
            "updatedMap": [],
            "updatedCreatures": [outputEnemy]
        })
    });

    it('Проверка перехода состояния монстра из пробужденного в раздраженный', () => {
        const inputEnemy = new Enemy(0, 0),
            outputEnemy = new Enemy(0, 0);

        inputEnemy.wakedUp();
        outputEnemy.wakedUp();
        outputEnemy.getDamage(20);

        expect(moveHero(
            [
                [[{ "icon": "floor" }]],
                [[{ "icon": "floor" }]]
            ],
            {
                "positionX": 0,
                "positionY": 1,
                "damage": 20
            },
            "up",
            [inputEnemy]
        )).toEqual({
            "message": "you punch enemy and he became irritated",
            "movedHero": {
                "positionX": 0,
                "positionY": 1,
                "damage": 20
            },
            "updatedMap": [],
            "updatedCreatures": [outputEnemy]
        })
    });

    it('Проверка отсутствия перехода состояния монстра из пробужденного в раздраженный', () => {
        const inputEnemy = new Enemy(0, 0),
            outputEnemy = new Enemy(0, 0);

        inputEnemy.wakedUp();
        outputEnemy.wakedUp();
        outputEnemy.getDamage(5);

        expect(moveHero(
            [
                [[{ "icon": "floor" }]],
                [[{ "icon": "floor" }]]
            ],
            {
                "positionX": 0,
                "positionY": 1,
                "damage": 5
            },
            "up",
            [inputEnemy]
        )).toEqual({
            "message": "you punch enemy",
            "movedHero": {
                "positionX": 0,
                "positionY": 1,
                "damage": 5
            },
            "updatedMap": [],
            "updatedCreatures": [outputEnemy]
        })
    });

    it('Проверка перехода состояния монстра из раздраженного в яростный', () => {
        const inputEnemy = new Enemy(0, 0),
            outputEnemy = new Enemy(0, 0);

        inputEnemy.wakedUp();
        inputEnemy.getDamage(40);
        outputEnemy.wakedUp();
        outputEnemy.getDamage(40);
        outputEnemy.getDamage(20);

        expect(moveHero(
            [
                [[{ "icon": "floor" }]],
                [[{ "icon": "floor" }]]
            ],
            {
                "positionX": 0,
                "positionY": 1,
                "damage": 20
            },
            "up",
            [inputEnemy]
        )).toEqual({
            "message": "you punch enemy and he became raged",
            "movedHero": {
                "positionX": 0,
                "positionY": 1,
                "damage": 20
            },
            "updatedMap": [],
            "updatedCreatures": [outputEnemy]
        })
    });

    it('Проверка перехода состояния монстра из яростного в смиренный', () => {
        const inputEnemy = new Enemy(0, 0),
            outputEnemy = new Enemy(0, 0);

        inputEnemy.wakedUp();
        inputEnemy.getDamage(60);
        outputEnemy.wakedUp();
        outputEnemy.getDamage(60);
        outputEnemy.getDamage(30);

        expect(moveHero(
            [
                [[{ "icon": "floor" }]],
                [[{ "icon": "floor" }]]
            ],
            {
                "positionX": 0,
                "positionY": 1,
                "damage": 30
            },
            "up",
            [inputEnemy]
        )).toEqual({
            "message": "you punch enemy and he became humble",
            "movedHero": {
                "positionX": 0,
                "positionY": 1,
                "damage": 30
            },
            "updatedMap": [],
            "updatedCreatures": [outputEnemy]
        })
    });

    it('Проверка появление эктоплазмы при смерти монстра', () => {
        const enemy = new Enemy(0, 0);

        enemy.wakedUp();
        expect(moveHero(
            [
                [[{ "icon": "floor" }]],
                [[{ "icon": "floor" }]]
            ],
            {
                "positionX": 0,
                "positionY": 1,
                "damage": 100
            },
            "up",
            [enemy]
        )).toEqual({
            "message": "you punch enemy and kill him",
            "movedHero": {
                "positionX": 0,
                "positionY": 1,
                "damage": 100
            },
            "updatedMap": [
                [[{ "icon": "floor" }, { "type": "food", "icon": "ectoplasma" }]],
                [[{ "icon": "floor" }]]
            ],
            "updatedCreatures": []
        })
    });

    it('Проверка убийства спящего монстра', () => {
        const enemy = new Enemy(0, 0);

        expect(moveHero(
            [
                [[{ "icon": "floor" }]],
                [[{ "icon": "floor" }]]
            ],
            {
                "positionX": 0,
                "positionY": 1,
                "damage": 100
            },
            "up",
            [enemy]
        )).toEqual({
            "message": "you punch enemy and kill him",
            "movedHero": {
                "positionX": 0,
                "positionY": 1,
                "damage": 100
            },
            "updatedMap": [
                [[{ "icon": "floor" }, { "type": "food", "icon": "ectoplasma" }]],
                [[{ "icon": "floor" }]]
            ],
            "updatedCreatures": []
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
            "updatedMap": [],
            "updatedCreatures": []
        })
    });
})
