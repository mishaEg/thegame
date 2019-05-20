import enemyAction from '../functional/enemyAction';

it('Проверка передвижения монстра на карте', () => {
    expect(enemyAction(
        { positionY: 0, positionX: 0, stamina: 10 },
        [
            [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }]]
        ],
        { positionY: 0, positionX: 2 },
        []
    )).toEqual({
        isDamagedAhero: false,
        isCreatureMoved: true,
        hero: { positionY: 0, positionX: 2 },
        updatedCreature: { positionY: 0, positionX: 1, stamina: 9 }
    })
});

it('Проверка блокировки монстра другим монстром', () => {
    expect(enemyAction(
        { positionY: 0, positionX: 0, stamina: 10 },
        [
            [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }]]
        ],
        { positionY: 0, positionX: 2 },
        [{ positionY: 0, positionX: 1 }]
    )).toEqual({
        isDamagedAhero: false,
        isCreatureMoved: false,
        hero: { positionY: 0, positionX: 2 },
        updatedCreature: { positionY: 0, positionX: 0, stamina: 9 }
    })
});

it('Проверка блокировки монстра стеной', () => {
    expect(enemyAction(
        { positionY: 0, positionX: 0, stamina: 10 },
        [
            [[{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": "floor" }]]
        ],
        { positionY: 0, positionX: 2 },
        []
    )).toEqual({
        isDamagedAhero: false,
        isCreatureMoved: false,
        hero: { positionY: 0, positionX: 2 },
        updatedCreature: { positionY: 0, positionX: 0, stamina: 9 }
    })
});

it('Проверка удара героя врагом', () => {
    expect(enemyAction(
        { positionY: 0, positionX: 0, damage: 10, stamina: 10 },
        [
            [[{ "icon": "floor" }], [{ "icon": "floor" }]]
        ],
        { positionY: 0, positionX: 1, health: 100 },
        []
    )).toEqual({
        isDamagedAhero: true,
        isCreatureMoved: false,
        hero: { positionY: 0, positionX: 1, health: 90 },
        updatedCreature: { positionY: 0, positionX: 0, damage: 10, stamina: 9 }
    })
});

it('Проверка удара героя врагом с передвижением', () => {
    expect(enemyAction(
        { positionY: 1, positionX: 0, damage: 10, stamina: 10 },
        [
            [[{ "icon": "wall" }], [{ "icon": "floor" }]],
            [[{ "icon": "floor" }], [{ "icon": "floor" }]]
        ],
        { positionY: 0, positionX: 1, health: 100 },
        []
    )).toEqual({
        isDamagedAhero: true,
        isCreatureMoved: true,
        hero: { positionY: 0, positionX: 1, health: 90 },
        updatedCreature: { positionY: 1, positionX: 1, damage: 10, stamina: 9 }
    })
});
