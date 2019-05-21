import enemiesAction from '../functional/enemiesAction';

it('Проверка передвижения монстра на карте', () => {
    expect(enemiesAction(
        { positionY: 0, positionX: 2 },
        [
            [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }]]
        ],
        [{ positionY: 0, positionX: 0, stamina: 10 }]
    )).toEqual({
        updatedHero: { positionY: 0, positionX: 2 },
        updatedCreatures: [{ positionY: 0, positionX: 1, stamina: 9 }]
    })
});

it('Проверка блокировки монстра другим монстром', () => {
    expect(enemiesAction(
        { positionY: 0, positionX: 2, health: 100 },
        [
            [[{ "icon": "floor" }], [{ "icon": "floor" }], [{ "icon": "floor" }]]
        ],
        [{ positionY: 0, positionX: 0, stamina: 10 }, { positionY: 0, positionX: 1, damage: 10, stamina: 3 }]
    )).toEqual({
        updatedHero: { positionY: 0, positionX: 2, health: 90 },
        updatedCreatures: [{ positionY: 0, positionX: 0, stamina: 9 }, { positionY: 0, positionX: 1, damage: 10, stamina: 2 }]
    })
});

it('Проверка блокировки монстра стеной', () => {
    expect(enemiesAction(
        { positionY: 0, positionX: 2 },
        [
            [[{ "icon": "floor" }], [{ "icon": "wall" }], [{ "icon": "floor" }]]
        ],
        [{ positionY: 0, positionX: 0, stamina: 10 }]
    )).toEqual({
        updatedHero: { positionY: 0, positionX: 2 },
        updatedCreatures: [{ positionY: 0, positionX: 0, stamina: 9 }]
    })
});

it('Проверка удара героя врагом', () => {
    expect(enemiesAction(
        { positionY: 0, positionX: 1, health: 100 },
        [
            [[{ "icon": "floor" }], [{ "icon": "floor" }]]
        ],
        [{ positionY: 0, positionX: 0, damage: 10, stamina: 10 }]
    )).toEqual({
        updatedHero: { positionY: 0, positionX: 1, health: 90 },
        updatedCreatures: [{ positionY: 0, positionX: 0, damage: 10, stamina: 9 }]
    })
});

it('Проверка удара героя врагом с передвижением', () => {
    expect(enemiesAction(
        { positionY: 0, positionX: 1, health: 100 },
        [
            [[{ "icon": "wall" }], [{ "icon": "floor" }]],
            [[{ "icon": "floor" }], [{ "icon": "floor" }]]
        ],
        [{ positionY: 1, positionX: 0, damage: 10, stamina: 10 }]
    )).toEqual({
        updatedHero: { positionY: 0, positionX: 1, health: 90 },
        updatedCreatures: [{ positionY: 1, positionX: 1, damage: 10, stamina: 9 }]
    })
});
