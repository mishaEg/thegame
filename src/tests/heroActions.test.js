import heroActions from '../functional/heroActions';
import elements from '../data/elements';
import Hero from '../Units/Hero';

it('Поднятие железного меча для раскопки', () => {
    const map = [[[
        { 'icon': "wall" }
    ]]],
        { iron_sword } = elements,
        inputHero = new Hero(0, 0),
        outputHero = new Hero(0, 0),
        creatures = [],
        key = 'd',
        message = heroActions(inputHero, map, creatures, key);

    inputHero.weapon = iron_sword;
    outputHero.weapon = iron_sword;
    outputHero.readyToMine = true;
    expect(map).toEqual([[[
        { 'icon': "wall" }
    ]]]);
    expect(inputHero).toEqual(outputHero);
    expect(message).toEqual(
        'you rised the pickaxe (iron sword). Now, choose direction to dig'
    );
});

it('Отмена раскопки железным мечом', () => {
    const map = [[[
        { 'icon': "wall" }
    ]]],
        { iron_sword } = elements,
        inputHero = new Hero(0, 0),
        outputHero = new Hero(0, 0),
        creatures = [],
        key = 'd',
        message = heroActions(inputHero, map, creatures, key);

    inputHero.readyToMine = true;
    inputHero.weapon = iron_sword;
    outputHero.weapon = iron_sword;
    expect(map).toEqual([[[
        { 'icon': "wall" }
    ]]]);
    expect(inputHero).toEqual(outputHero);
    expect(message).toEqual(
        'you lower the pickaxe (iron sword)'
    );
});

it('Поднятие деревянного меча для раскопки', () => {
    const map = [[[
        { 'icon': "wall" }
    ]]],
        { sword } = elements,
        inputHero = new Hero(0, 0),
        outputHero = new Hero(0, 0),
        creatures = [],
        key = 'd',
        message = heroActions(inputHero, map, creatures, key);

    inputHero.weapon = sword,
    outputHero.weapon = sword,
    outputHero.readyToMine = true;

    expect(map).toEqual([[[
        { 'icon': "wall" }
    ]]]);
    expect(inputHero).toEqual(outputHero);
    expect(message).toEqual(
        'you rised the pickaxe (wooden sword). Now, choose direction to dig'
    );
});


it('Отмена раскопки деревянным мечом', () => {
    const map = [[[
        { 'icon': "wall" }
    ]]],
        { sword } = elements,
        inputHero = new Hero(0, 0),
        outputHero = new Hero(0, 0),
        creatures = [],
        key = 'd',
        message = heroActions(inputHero, map, creatures, key);

    inputHero.readyToMine = true;
    inputHero.weapon = sword;
    outputHero.weapon = sword;
    expect(map).toEqual([[[
        { 'icon': "wall" }
    ]]]);
    expect(inputHero).toEqual(outputHero);
    expect(message).toEqual(
        'you lower the pickaxe (wooden sword)'
    );
});

it('Попытка раскопки без оружия', () => {
    const map = [[[
        { 'icon': "wall" }
    ]]],
        inputHero = new Hero(0, 0),
        outputHero = new Hero(0, 0),
        creatures = [],
        key = 'd',
        message = heroActions(inputHero, map, creatures, key);

    expect(map).toEqual([[[
        { 'icon': "wall" }
    ]]]);
    expect(inputHero).toEqual(outputHero);
    expect(message).toEqual(
        'you need any weapon to dig'
    );
});