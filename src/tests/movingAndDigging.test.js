import movingAndDigging from '../functional/movingAndDigging';

it('Передвижение героя на карте вправо на чистую ячейку', () => {
    expect(movingAndDigging(
        [
            [[{ "icon": "floor" }], [{ "icon": "floor" }]]
        ],
        {
            positionX: 0, positionY: 0, readyToMine: false
        },
        "right",
        []
    )).toEqual({
        message: false,
        map: [
            [[{ "icon": "floor" }], [{ "icon": "floor" }]]
        ],
        hero: { positionY: 0, positionX: 1, readyToMine: false },
        creatures: []
    })
});

it('Передвижение героя на карте вправо на траву', () => {
    expect(movingAndDigging(
        [
            [[{ "icon": "floor" }], [{ "icon": "floor" }, { "icon": "grass" }]]
        ],
        {
            positionX: 0, positionY: 0, readyToMine: false
        },
        "right",
        []
    )).toEqual({
        message: "you stay at grass and feels fresh green leaves by your foots :з.",
        map: [
            [[{ "icon": "floor" }], [{ "icon": "floor" }, { "icon": "grass" }]]
        ],
        hero: { positionY: 0, positionX: 1, readyToMine: false },
        creatures: []
    })
});

it('Раскопка туннеля вправо', () => {
    expect(movingAndDigging(
        [
            [[{ 'icon': "floor" }], [{ 'icon': "floor" }]]
        ],
        {
            positionX: 0,
            positionY: 0,
            readyToMine: true
        },
        "right",
        []
    )).toEqual({
        message: "there is nothing to dig",
        map: [
            [[{ 'icon': "floor" }], [{ 'icon': "floor" }]]
        ],
        hero: {
            positionX: 0,
            positionY: 0,
            readyToMine: false
        },
        creatures: []
    })
});