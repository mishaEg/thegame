import enemiesAction from '../functional/enemiesAction';
import Enemy from '../Units/Enemy';
import Hero from '../Units/Hero';

it('Проверка сохранения позиции спящего монстра', () => {
    const inputEnemy = [new Enemy(0, 0)],
        outputEnemy = [new Enemy(0, 0)],
        inputHero = { positionY: 0, positionX: 2 },
        outputHero = { positionY: 0, positionX: 2 },
        map = [
            [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }]]
        ];
    enemiesAction(inputHero, map, inputEnemy);

    expect(inputEnemy).toEqual(outputEnemy);
    expect(inputHero).toEqual(outputHero);
});

it('Проверка регенерации спящего монстра', () => {
    const inputEnemy = [new Enemy(0, 0)],
        outputEnemy = [new Enemy(0, 0)],
        inputHero = { positionY: 0, positionX: 2 },
        outputHero = { positionY: 0, positionX: 2 },
        map = [
            [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }]]
        ];

    inputEnemy[0].getDamage(10);
    outputEnemy[0].getDamage(10);
    outputEnemy[0].regeneration();
    enemiesAction(inputHero, map, inputEnemy);

    expect(inputEnemy).toEqual(outputEnemy);
    expect(inputHero).toEqual(outputHero);
});

it('Проверка передвижения монстра на карте', () => {
    const inputEnemy = [new Enemy(0, 0)],
        outputEnemy = [new Enemy(0, 0)],
        inputHero = { positionY: 0, positionX: 2 },
        outputHero = { positionY: 0, positionX: 2 },
        map = [
            [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }]]
        ];

    inputEnemy[0].wakedUp();
    outputEnemy[0].wakedUp();
    outputEnemy[0].move(1, 0);
    enemiesAction(inputHero, map, inputEnemy);

    expect(inputEnemy).toEqual(outputEnemy);
    expect(inputHero).toEqual(outputHero);
});

it('Проверка блокировки монстра другим монстром', () => {
    const inputEnemy = [new Enemy(0, 0), new Enemy(1, 0)],
        outputEnemy = [new Enemy(0, 0), new Enemy(1, 0)],
        inputHero = { positionY: 0, positionX: 2 },
        outputHero = { positionY: 0, positionX: 2 },
        map = [
            [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }]]
        ];

    inputEnemy[0].wakedUp();
    outputEnemy[0].wakedUp();
    enemiesAction(inputHero, map, inputEnemy);

    expect(inputEnemy).toEqual(outputEnemy);
    expect(inputHero).toEqual(outputHero);
});

it('Проверка блокировки монстра стеной', () => {
    const inputEnemy = [new Enemy(0, 0)],
        outputEnemy = [new Enemy(0, 0)],
        inputHero = { positionY: 0, positionX: 2 },
        outputHero = { positionY: 0, positionX: 2 },
        map = [
            [[{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": "floor" }]]
        ];

    inputEnemy[0].wakedUp();
    outputEnemy[0].wakedUp();
    enemiesAction(inputHero, map, inputEnemy);

    expect(inputEnemy).toEqual(outputEnemy);
    expect(inputHero).toEqual(outputHero);
});

it('Проверка удара героя врагом', () => {
    const inputEnemy = [new Enemy(0, 0)],
        outputEnemy = [new Enemy(0, 0)],
        inputHero = new Hero(0, 1),
        outputHero = new Hero(0, 1),
        map = [
            [[{ "icon": "floor" }], [{ "icon": "floor" }]]
        ];

    outputHero.health = 50;
    inputEnemy[0].wakedUp();
    outputEnemy[0].wakedUp();
    enemiesAction(inputHero, map, inputEnemy);

    expect(inputEnemy).toEqual(outputEnemy);
    expect(inputHero).toEqual(outputHero);
});

it('Проверка уменьшения урона по герою при наличии параметра defence', () => {
    const inputEnemy = [new Enemy(0, 0)],
        outputEnemy = [new Enemy(0, 0)],
        inputHero = new Hero(0, 1),
        outputHero = new Hero(0, 1),
        map = [
            [[{ "icon": "floor" }], [{ "icon": "floor" }]]
        ];

    inputHero.defence = 30;
    outputHero.defence = 30;
    outputHero.health = 80;
    inputEnemy[0].wakedUp();
    outputEnemy[0].wakedUp();
    enemiesAction(inputHero, map, inputEnemy);

    expect(inputEnemy).toEqual(outputEnemy);
    expect(inputHero).toEqual(outputHero);
});

it('Проверка удара героя врагом с передвижением', () => {
    const inputEnemy = [new Enemy(0, 1)],
        outputEnemy = [new Enemy(1, 1)],
        inputHero = new Hero(0, 1),
        outputHero = new Hero(0, 1),
        map = [
            [[{ "icon": "wall" }], [{ "icon": "floor" }]],
            [[{ "icon": "floor" }], [{ "icon": "floor" }]]
        ];

    outputHero.health = 50;
    inputEnemy[0].wakedUp();
    outputEnemy[0].wakedUp();
    outputEnemy[0].tired();
    enemiesAction(inputHero, map, inputEnemy);

    expect(inputEnemy).toEqual(outputEnemy);
    expect(inputHero).toEqual(outputHero);
});
