import enemiesAction from '../functional/enemiesAction';
import Enemy from '../Units/Enemy';

it('Проверка сохранения позиции спящего монстра', () => {
    const sleepEnemy = new Enemy(0, 0);

    expect(enemiesAction(
        { positionY: 0, positionX: 2 },
        [
            [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }]]
        ],
        [sleepEnemy]
    )).toEqual({
        updatedHero: { positionY: 0, positionX: 2 },
        updatedCreatures: [sleepEnemy]
    })
});

it('Проверка регенерации спящего монстра', () => {
    const inputEnemy = new Enemy(0, 0),
        outputEnemy = new Enemy(0, 0);

    inputEnemy.getDamage(10);
    outputEnemy.getDamage(10);
    outputEnemy.regeneration();

    expect(enemiesAction(
        { positionY: 0, positionX: 2 },
        [
            [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }]]
        ],
        [inputEnemy]
    )).toEqual({
        updatedHero: { positionY: 0, positionX: 2 },
        updatedCreatures: [outputEnemy]
    })
});

it('Проверка передвижения монстра на карте', () => {
    const inputEnemy = new Enemy(0, 0),
        outputEnemy = new Enemy (0, 0);

    inputEnemy.wakedUp();
    outputEnemy.wakedUp();
    outputEnemy.move(1, 0);

    expect(enemiesAction(
        { positionY: 0, positionX: 2 },
        [
            [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }]]
        ],
        [inputEnemy]
    )).toEqual({
        updatedHero: { positionY: 0, positionX: 2 },
        updatedCreatures: [outputEnemy]
    })
});

it('Проверка блокировки монстра другим монстром', () => {
    const firstEnemy = new Enemy(0, 0),
        secondEnemy = new Enemy (1, 0);

    firstEnemy.wakedUp();
    expect(enemiesAction(
        { positionY: 0, positionX: 2 },
        [
            [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }]]
        ],
        [firstEnemy, secondEnemy]
    )).toEqual({
        updatedHero: { positionY: 0, positionX: 2 },
        updatedCreatures: [firstEnemy, secondEnemy]
    })
});

it('Проверка блокировки монстра стеной', () => {
    const enemy = new Enemy(0, 0);

    enemy.wakedUp();
    expect(enemiesAction(
        { positionY: 0, positionX: 2 },
        [
            [[{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": "floor" }]]
        ],
        [enemy]
    )).toEqual({
        updatedHero: { positionY: 0, positionX: 2 },
        updatedCreatures: [enemy]
    })
});

it('Проверка удара героя врагом', () => {
    const inputEnemy = new Enemy(0, 0),
        outputEnemy = new Enemy (0, 0);

    inputEnemy.wakedUp();
    outputEnemy.wakedUp();
    expect(enemiesAction(
        { positionY: 0, positionX: 1, health: 100 },
        [
            [[{ "icon": "floor" }], [{ "icon": "floor" }]]
        ],
        [inputEnemy]
    )).toEqual({
        updatedHero: { positionY: 0, positionX: 1, health: 50 },
        updatedCreatures: [outputEnemy]
    })
});

it('Проверка удара героя врагом с передвижением', () => {
    const inputEnemy = new Enemy(0, 1),
        outputEnemy = new Enemy (1, 1);

    inputEnemy.wakedUp();
    outputEnemy.wakedUp();
    outputEnemy.tired();
    expect(enemiesAction(
        { positionY: 0, positionX: 1, health: 100 },
        [
            [[{ "icon": "wall" }], [{ "icon": "floor" }]],
            [[{ "icon": "floor" }], [{ "icon": "floor" }]]
        ],
        [inputEnemy]
    )).toEqual({
        updatedHero: { positionY: 0, positionX: 1, health: 50 },
        updatedCreatures: [outputEnemy]
    })
});
