import moveHero from '../functional/moveHero';
import Enemy from '../Units/Enemy';
import Hero from '../Units/Hero';

describe('Проверка функции moveHero', () => {
    it('Передвижение героя вправо на чистую ячейку', () => {
        const inputMap = [
                [[{ "icon": "floor" }], [{ "icon": "floor" }]]
            ],
            outputMap = [
                [[{ "icon": "floor" }], [{ "icon": "floor" }]]
            ],
            inputHero = new Hero(0, 0),
            outputHero = new Hero(0, 1),
            inputCreatures = [],
            outputCreatures = [],
            message = moveHero(inputMap, inputHero, "right", inputCreatures);

        expect(message).toEqual(false);
        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(outputHero);
        expect(inputCreatures).toEqual(outputCreatures);
    });

    it('Передвижение героя влево на чистую ячейку', () => {
        const inputMap = [
                [[{ "icon": "floor" }], [{ "icon": "floor" }]]
            ],
            outputMap = [
                [[{ "icon": "floor" }], [{ "icon": "floor" }]]
            ],
            inputHero = new Hero(0, 1),
            outputHero = new Hero(0, 0),
            inputCreatures = [],
            outputCreatures = [],
            message = moveHero(inputMap, inputHero, "left", inputCreatures);

        expect(message).toEqual(false);
        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(outputHero);
        expect(inputCreatures).toEqual(outputCreatures);
    });

    it('Передвижение героя вниз на чистую ячейку', () => {
        const inputMap = [
                [[{ "icon": "floor" }]],
                [[{ "icon": "floor" }]]
            ],
            outputMap = [
                [[{ "icon": "floor" }]],
                [[{ "icon": "floor" }]]
            ],
            inputHero = new Hero(0, 0),
            outputHero = new Hero(1, 0),
            inputCreatures = [],
            outputCreatures = [],
            message = moveHero(inputMap, inputHero, "down", inputCreatures);

        expect(message).toEqual(false);
        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(outputHero);
        expect(inputCreatures).toEqual(outputCreatures);
    });

    it('Передвижение героя вверх на чистую ячейку', () => {
        const inputMap = [
                [[{ "icon": "floor" }]],
                [[{ "icon": "floor" }]]
            ],
            outputMap = [
                [[{ "icon": "floor" }]],
                [[{ "icon": "floor" }]]
            ],
            inputHero = new Hero(1, 0),
            outputHero = new Hero(0, 0),
            inputCreatures = [],
            outputCreatures = [],
            message = moveHero(inputMap, inputHero, "up", inputCreatures);

        expect(message).toEqual(false);
        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(outputHero);
        expect(inputCreatures).toEqual(outputCreatures);
    });

    it('Передвижение героя вверх на траву', () => {
        const inputMap = [
                [[{ "icon": "floor" }, { "icon": "grass" }]],
                [[{ "icon": "floor" }]]
            ],
            outputMap = [
                [[{ "icon": "floor" }, { "icon": "grass" }]],
                [[{ "icon": "floor" }]]
            ],
            inputHero = new Hero(1, 0),
            outputHero = new Hero(0, 0),
            inputCreatures = [],
            outputCreatures = [],
            message = moveHero(inputMap, inputHero, "up", inputCreatures);

        expect(message).toEqual("you stay at grass and feels fresh green leaves by your feet :з.");
        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(outputHero);
        expect(inputCreatures).toEqual(outputCreatures);
    });

    it('Передвижение героя вверх на деревянный меч', () => {
        const inputMap = [
                [[{ "icon": "floor" }, { "icon": "sword", "name": "wooden sword", "type": "weapon" }]],
                [[{ "icon": "floor" }]]
            ],
            outputMap = [
                [[{ "icon": "floor" }, { "icon": "sword", "name": "wooden sword", "type": "weapon" }]],
                [[{ "icon": "floor" }]]
            ],
            inputHero = new Hero(1, 0),
            outputHero = new Hero(0, 0),
            inputCreatures = [],
            outputCreatures = [],
            message = moveHero(inputMap, inputHero, "up", inputCreatures);

        expect(message).toEqual('you stay at wooden sword, if you wanna pick it up, press "p"');
        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(outputHero);
        expect(inputCreatures).toEqual(outputCreatures);
    });

    it('Передвижение героя вверх на деревянный щит', () => {
        const inputMap = [
                [[{ "icon": "floor" }, { "icon": "shield", "name": "wooden shield", "type": "shield" }]],
                [[{ "icon": "floor" }]]
            ],
            outputMap = [
                [[{ "icon": "floor" }, { "icon": "shield", "name": "wooden shield", "type": "shield" }]],
                [[{ "icon": "floor" }]]
            ],
            inputHero = new Hero(1, 0),
            outputHero = new Hero(0, 0),
            inputCreatures = [],
            outputCreatures = [],
            message = moveHero(inputMap, inputHero, "up", inputCreatures);

        expect(message).toEqual('you stay at wooden shield, if you wanna pick it up, press "p"');
        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(outputHero);
        expect(inputCreatures).toEqual(outputCreatures);
    });

    it('Передвижение героя вверх на железный меч', () => {
        const inputMap = [
                [[{ "icon": "floor" }, { "icon": "iron_sword", "name": "iron sword", "type": "weapon" }]],
                [[{ "icon": "floor" }]]
            ],
            outputMap = [
                [[{ "icon": "floor" }, { "icon": "iron_sword", "name": "iron sword", "type": "weapon" }]],
                [[{ "icon": "floor" }]]
            ],
            inputHero = new Hero(1, 0),
            outputHero = new Hero(0, 0),
            inputCreatures = [],
            outputCreatures = [],
            message = moveHero(inputMap, inputHero, "up", inputCreatures);

        expect(message).toEqual('you stay at iron sword, if you wanna pick it up, press "p"');
        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(outputHero);
        expect(inputCreatures).toEqual(outputCreatures);
    });

    it('Передвижение героя вверх на железный щит', () => {
        const inputMap = [
                [[{ "icon": "floor" }, { "icon": "iron_shield", "name": "iron shield", "type": "shield" }]],
                [[{ "icon": "floor" }]]
            ],
            outputMap = [
                [[{ "icon": "floor" }, { "icon": "iron_shield", "name": "iron shield", "type": "shield" }]],
                [[{ "icon": "floor" }]]
            ],
            inputHero = new Hero(1, 0),
            outputHero = new Hero(0, 0),
            inputCreatures = [],
            outputCreatures = [],
            message = moveHero(inputMap, inputHero, "up", inputCreatures);

        expect(message).toEqual('you stay at iron shield, if you wanna pick it up, press "p"');
        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(outputHero);
        expect(inputCreatures).toEqual(outputCreatures);
    });

    it('Передвижение героя вверх на гем', () => {
        const inputMap = [
                [[{ "icon": "floor" }, { "icon": "gem", "name": "gem", "type": "money" }]],
                [[{ "icon": "floor" }]]
            ],
            outputMap = [
                [[{ "icon": "floor" }, { "icon": "gem", "name": "gem", "type": "money" }]],
                [[{ "icon": "floor" }]]
            ],
            inputHero = new Hero(1, 0),
            outputHero = new Hero(0, 0),
            inputCreatures = [],
            outputCreatures = [],
            message = moveHero(inputMap, inputHero, "up", inputCreatures);

        expect(message).toEqual('you stay at gem, if you wanna pick it up, press "p"');
        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(outputHero);
        expect(inputCreatures).toEqual(outputCreatures);
    });

    it('Столкновение героя с монстром(спящим) при движении вверх', () => {
        const inputMap = [
                [[{ "icon": "floor" }]],
                [[{ "icon": "floor" }]]
            ],
            outputMap = [
                [[{ "icon": "floor" }]],
                [[{ "icon": "floor" }]]
            ],
            inputHero = new Hero(1, 0),
            outputHero = new Hero(1, 0),
            inputCreatures = [new Enemy(0, 0)],
            outputCreatures = [new Enemy(0, 0)];

        inputHero.damage = 10;
        outputHero.damage = 10;
        outputCreatures[0].getDamage(10);
        const message = moveHero(inputMap, inputHero, "up", inputCreatures);

        expect(message).toEqual('you punch sleeping enemy, once more punch for waked up');
        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(outputHero);
        expect(inputCreatures).toEqual(outputCreatures);
    });

    it('Столкновение героя с монстром(пробуждение) при движении вверх', () => {
        const inputMap = [
                [[{ "icon": "floor" }]],
                [[{ "icon": "floor" }]]
            ],
            outputMap = [
                [[{ "icon": "floor" }]],
                [[{ "icon": "floor" }]]
            ],
            inputHero = new Hero(1, 0),
            outputHero = new Hero(1, 0),
            inputCreatures = [new Enemy(0, 0)],
            outputCreatures = [new Enemy(0, 0)];

        inputHero.damage = 10;
        outputHero.damage = 10;
        inputCreatures[0].getDamage(10);
        outputCreatures[0].getDamage(10);
        outputCreatures[0].getDamage(10);

        const message = moveHero(inputMap, inputHero, "up", inputCreatures);

        expect(message).toEqual('you punch sleeping enemy and woke him up');
        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(outputHero);
        expect(inputCreatures).toEqual(outputCreatures);
    });

    it('Столкновение героя с монстром(проснувшимся) при движении вверх', () => {
        const inputMap = [
                [[{ "icon": "floor" }]],
                [[{ "icon": "floor" }]]
            ],
            outputMap = [
                [[{ "icon": "floor" }]],
                [[{ "icon": "floor" }]]
            ],
            inputHero = new Hero(1, 0),
            outputHero = new Hero(1, 0),
            inputCreatures = [new Enemy(0, 0)],
            outputCreatures = [new Enemy(0, 0)];

        inputHero.damage = 10;
        outputHero.damage = 10;
        inputCreatures[0].getDamage(10);
        inputCreatures[0].getDamage(10);
        outputCreatures[0].getDamage(10);
        outputCreatures[0].getDamage(10);
        outputCreatures[0].getDamage(10);

        const message = moveHero(inputMap, inputHero, "up", inputCreatures);

        expect(message).toEqual('you punch enemy');
        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(outputHero);
        expect(inputCreatures).toEqual(outputCreatures);
    });

    it('Проверка перехода состояния монстра из пробужденного в раздраженный', () => {
        const inputMap = [
                [[{ "icon": "floor" }]],
                [[{ "icon": "floor" }]]
            ],
            outputMap = [
                [[{ "icon": "floor" }]],
                [[{ "icon": "floor" }]]
            ],
            inputHero = new Hero(1, 0),
            outputHero = new Hero(1, 0),
            inputCreatures = [new Enemy(0, 0)],
            outputCreatures = [new Enemy(0, 0)];

        inputHero.damage = 20;
        outputHero.damage = 20;
        inputCreatures[0].wakedUp();
        outputCreatures[0].wakedUp();
        outputCreatures[0].getDamage(20);

        const message = moveHero(inputMap, inputHero, "up", inputCreatures);

        expect(message).toEqual('you punch enemy and he became irritated');
        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(outputHero);
        expect(inputCreatures).toEqual(outputCreatures);
    });

    it('Проверка отсутствия перехода состояния монстра из пробужденного в раздраженный', () => {
        const inputMap = [
                [[{ "icon": "floor" }]],
                [[{ "icon": "floor" }]]
            ],
            outputMap = [
                [[{ "icon": "floor" }]],
                [[{ "icon": "floor" }]]
            ],
            inputHero = new Hero(1, 0),
            outputHero = new Hero(1, 0),
            inputCreatures = [new Enemy(0, 0)],
            outputCreatures = [new Enemy(0, 0)];

        inputHero.damage = 5;
        outputHero.damage = 5;
        inputCreatures[0].wakedUp();
        outputCreatures[0].wakedUp();
        outputCreatures[0].getDamage(5);

        const message = moveHero(inputMap, inputHero, "up", inputCreatures);

        expect(message).toEqual('you punch enemy');
        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(outputHero);
        expect(inputCreatures).toEqual(outputCreatures);
    });

    it('Проверка перехода состояния монстра из раздраженного в яростный', () => {
        const inputMap = [
                [[{ "icon": "floor" }]],
                [[{ "icon": "floor" }]]
            ],
            outputMap = [
                [[{ "icon": "floor" }]],
                [[{ "icon": "floor" }]]
            ],
            inputHero = new Hero(1, 0),
            outputHero = new Hero(1, 0),
            inputCreatures = [new Enemy(0, 0)],
            outputCreatures = [new Enemy(0, 0)];

        inputHero.damage = 20;
        outputHero.damage = 20;
        inputCreatures[0].wakedUp();
        inputCreatures[0].getDamage(40);
        outputCreatures[0].wakedUp();
        outputCreatures[0].getDamage(40);
        outputCreatures[0].getDamage(20);

        const message = moveHero(inputMap, inputHero, "up", inputCreatures);

        expect(message).toEqual('you punch enemy and he became raged');
        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(outputHero);
        expect(inputCreatures).toEqual(outputCreatures);
    });

    it('Проверка перехода состояния монстра из яростного в смиренный', () => {
        const inputMap = [
                [[{ "icon": "floor" }]],
                [[{ "icon": "floor" }]]
            ],
            outputMap = [
                [[{ "icon": "floor" }]],
                [[{ "icon": "floor" }]]
            ],
            inputHero = new Hero(1, 0),
            outputHero = new Hero(1, 0),
            inputCreatures = [new Enemy(0, 0)],
            outputCreatures = [new Enemy(0, 0)];

        inputHero.damage = 30;
        outputHero.damage = 30;
        inputCreatures[0].wakedUp();
        inputCreatures[0].getDamage(60);
        outputCreatures[0].wakedUp();
        outputCreatures[0].getDamage(60);
        outputCreatures[0].getDamage(30);

        const message = moveHero(inputMap, inputHero, "up", inputCreatures);

        expect(message).toEqual('you punch enemy and he became humble');
        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(outputHero);
        expect(inputCreatures).toEqual(outputCreatures);
    });

    it('Проверка появление эктоплазмы при смерти монстра', () => {
        const inputMap = [
                [[{ "icon": "floor" }]],
                [[{ "icon": "floor" }]]
            ],
            outputMap = [
                [[{ "icon": "floor" }, { "type": "food", "name": "ectoplasma", "icon": "ectoplasma" }]],
                [[{ "icon": "floor" }]]
            ],
            inputHero = new Hero(1, 0),
            outputHero = new Hero(1, 0),
            inputCreatures = [new Enemy(0, 0)],
            outputCreatures = [];

        inputHero.damage = 100;
        outputHero.damage = 100;
        inputCreatures[0].wakedUp();

        const message = moveHero(inputMap, inputHero, "up", inputCreatures);

        expect(message).toEqual('you punch enemy and kill him');
        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(outputHero);
        expect(inputCreatures).toEqual(outputCreatures);
    });

    it('Проверка убийства спящего монстра', () => {
        const inputMap = [
                [[{ "icon": "floor" }]],
                [[{ "icon": "floor" }]]
            ],
            outputMap = [
                [[{ "icon": "floor" }, { "type": "food", "name": "ectoplasma", "icon": "ectoplasma" }]],
                [[{ "icon": "floor" }]]
            ],
            inputHero = new Hero(1, 0),
            outputHero = new Hero(1, 0),
            inputCreatures = [new Enemy(0, 0)],
            outputCreatures = [];

        inputHero.damage = 100;
        outputHero.damage = 100;

        const message = moveHero(inputMap, inputHero, "up", inputCreatures);

        expect(message).toEqual('you punch enemy and kill him');
        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(outputHero);
        expect(inputCreatures).toEqual(outputCreatures);
    });
})

describe('Негативные тесты функции moveHero', () => {
    it('Невозможность перемещения героя вверх на ячейку со стеной', () => {
        const inputMap = [
                [[{ "icon": "wall" }]],
                [[{ "icon": "floor" }]]
            ],
            outputMap = [
                [[{ "icon": "wall" }]],
                [[{ "icon": "floor" }]]
            ],
            inputHero = new Hero(1, 0),
            outputHero = new Hero(1, 0),
            inputCreatures = [],
            outputCreatures = [];

        const message = moveHero(inputMap, inputHero, "up", inputCreatures);

        expect(message).toEqual('there is no the way');
        expect(inputMap).toEqual(outputMap);
        expect(inputHero).toEqual(outputHero);
        expect(inputCreatures).toEqual(outputCreatures);
    });
})
