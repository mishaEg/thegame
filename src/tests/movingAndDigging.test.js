import movingAndDigging from '../functional/movingAndDigging';
import Hero from '../Units/Hero';

it('Передвижение героя на карте вправо на чистую ячейку', () => {
    const inputHero = new Hero(0, 0),
        outputHero = new Hero(0, 1),
        inputMap = [[[{ "icon": "floor" }], [{ "icon": "floor" }]]],
        outputMap = [[[{ "icon": "floor" }], [{ "icon": "floor" }]]],
        creatures = [],
        message = movingAndDigging(inputMap, inputHero, "right", creatures);

    expect(inputMap).toEqual(outputMap);
    expect(message).toEqual(false);
    expect(inputHero).toEqual(outputHero);
    expect(creatures).toEqual([]);
});

it('Передвижение героя на карте вправо на траву', () => {
    const inputHero = new Hero(0, 0),
        outputHero = new Hero(0, 1),
        inputMap = [[[{ "icon": "floor" }], [{ "icon": "floor" }, { "icon": "grass" }]]],
        outputMap = [[[{ "icon": "floor" }], [{ "icon": "floor" }, { "icon": "grass" }]]],
        creatures = [],
        message = movingAndDigging(inputMap, inputHero, "right", creatures);

    expect(inputMap).toEqual(outputMap);
    expect(message).toEqual("you stay at grass and feels fresh green leaves by your feet :з.");
    expect(inputHero).toEqual(outputHero);
    expect(creatures).toEqual([]);
});

it('раскопка элемента, отличного от стены вправо', () => {
    const inputHero = new Hero(0, 0),
        outputHero = new Hero(0, 0),
        inputMap = [[[{ "icon": "floor" }], [{ "icon": "floor" }]]],
        outputMap = [[[{ "icon": "floor" }], [{ "icon": "floor" }]]],
        creatures = [];

    inputHero.readyToMine = true;
    const message = movingAndDigging(inputMap, inputHero, "right", creatures);

    expect(inputMap).toEqual(outputMap);
    expect(message).toEqual("there is nothing to dig");
    expect(inputHero).toEqual(outputHero);
    expect(creatures).toEqual([]);
});