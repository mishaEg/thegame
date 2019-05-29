import pickUp from '../functional/pickUp';
import Hero from '../Units/Hero';
import elements from '../data/elements';

it('Проверка поднятия героем гема', () => {
    const map = [[[
        { 'icon': "wall" },
        { "type": "money", "cost": 10, "icon": "gem" }
    ]]],
        inputHero = new Hero(0, 0),
        outputHero = new Hero(0, 0),
        message = pickUp(map, inputHero);

    outputHero.money = 10;

    expect(map).toEqual([[[
        { 'icon': "wall" }
    ]]]);
    expect(inputHero).toEqual(outputHero);
    expect(message).toEqual('you raised money and take 10 gold! ^_^');
});

it('Проверка поднятия деревянного меча', () => {
    const map = [[[
        { 'icon': "wall" },
        { "name": "wooden sword", "type": "weapon", "icon": "sword", "damage": 18 }
    ]]],
        { sword } = elements,
        inputHero = new Hero(0, 0),
        outputHero = new Hero(0, 0),
        message = pickUp(map, inputHero);

    outputHero.weapon = sword;
    outputHero.damage += sword.damage;

    expect(map).toEqual([[[
        { 'icon': "wall" }
    ]]]);
    expect(inputHero).toEqual(outputHero);
    expect(message).toEqual(
        'you raised wooden sword!'
    );
});

it('Проверка поднятия железного меча', () => {
    const map = [[[
        { 'icon': "wall" },
        { "name": "iron sword", "type": "weapon", "icon": "iron_sword", "damage": 50 }
    ]]],
        { iron_sword } = elements,
        inputHero = new Hero(0, 0),
        outputHero = new Hero(0, 0),
        message = pickUp(map, inputHero);

    outputHero.weapon = iron_sword;
    outputHero.damage += iron_sword.damage;

    expect(map).toEqual([[[
        { 'icon': "wall" }
    ]]]);
    expect(inputHero).toEqual(outputHero);
    expect(message).toEqual(
        'you raised iron sword!'
    );
});


it('Проверка поднятия железного меча, при этом имея деревянный меч', () => {
    const map = [[[
        { 'icon': "wall" },
        {
            "name": "iron sword",
            "type": "weapon",
            "icon": "iron_sword",
            "damage": 50
        }
    ]]],
        { iron_sword, sword } = elements,
        inputHero = new Hero(0, 0),
        outputHero = new Hero(0, 0);
    
    inputHero.weapon = sword;
    inputHero.damage += sword.damage;
    const message = pickUp(map, inputHero);

    outputHero.weapon = iron_sword;
    outputHero.damage += iron_sword.damage;

    expect(map).toEqual([[[
        { 'icon': "wall" },
        {
            "name": "wooden sword",
            "type": "weapon",
            "icon": "sword",
            "damage": 18
        }
    ]]]);
    expect(inputHero).toEqual(outputHero);
    expect(message).toEqual(
        'you raised iron sword!'
    );
});

it('Проверка поднятия деревянного щита', () => {
    const map = [[[
        { 'icon': "wall" },
        {
            "name": "wooden shield",
            "type": "shield",
            "icon": "shield",
            "defence": 2
        }
    ]]],
        { shield } = elements,
        inputHero = new Hero(0, 0),
        outputHero = new Hero(0, 0),
        message = pickUp(map, inputHero);

    outputHero.shield = shield;
    outputHero.defence += shield.defence;

    expect(map).toEqual([[[
        { 'icon': "wall" }
    ]]]);
    expect(inputHero).toEqual(outputHero);
    expect(message).toEqual(
        'you raised wooden shield!'
    );
});

it('Проверка поднятия железного щита', () => {
    const map = [[[
        { 'icon': "wall" },
        {
            "name": "iron shield",
            "type": "shield",
            "icon": "iron_shield",
            "defence": 20
        }
    ]]],
        { iron_shield } = elements,
        inputHero = new Hero(0, 0),
        outputHero = new Hero(0, 0),
        message = pickUp(map, inputHero);

    outputHero.shield = iron_shield;
    outputHero.defence += iron_shield.defence;

    expect(map).toEqual([[[
        { 'icon': "wall" }
    ]]]);
    expect(inputHero).toEqual(outputHero);
    expect(message).toEqual(
        'you raised iron shield!'
    );
});

it('Проверка поднятия железного щита, при этом имея деревянный щит', () => {
    const map = [[[
        { 'icon': "wall" },
        {
            "name": "iron shield",
            "type": "shield",
            "icon": "iron_shield",
            "defence": 20
        }
    ]]],
        { iron_shield, shield } = elements,
        inputHero = new Hero(0, 0),
        outputHero = new Hero(0, 0);
    
    inputHero.shield = shield;
    inputHero.defence += shield.defence;
    const message = pickUp(map, inputHero);

    outputHero.shield = iron_shield;
    outputHero.defence += iron_shield.defence;

    expect(map).toEqual([[[
        { 'icon': "wall" },
        {
            "name": "wooden shield",
            "type": "shield",
            "icon": "shield",
            "defence": 2
        }
    ]]]);
    expect(inputHero).toEqual(outputHero);
    expect(message).toEqual(
        'you raised iron shield!'
    );
});

it('Проверка поднятия железного щита, при этом имея железный щит', () => {
    const map = [[[
        { 'icon': "wall" },
        {
            "name": "iron shield",
            "type": "shield",
            "icon": "iron_shield",
            "defence": 20
        }
    ]]],
        { iron_shield } = elements,
        inputHero = new Hero(0, 0),
        outputHero = new Hero(0, 0);
    
    inputHero.shield = iron_shield;
    inputHero.defence += iron_shield.defence;
    const message = pickUp(map, inputHero);

    outputHero.shield = iron_shield;
    outputHero.defence += iron_shield.defence;

    expect(map).toEqual([[[
        { 'icon': "wall" },
        {
            "name": "iron shield",
            "type": "shield",
            "icon": "iron_shield",
            "defence": 20
        }
    ]]]);
    expect(inputHero).toEqual(outputHero);
    expect(message).toEqual(
        'you raised iron shield!'
    );
});

it('Проверка поднятия и съедание эктоплазмы', () => {
    const map = [[[
        { 'icon': "wall" },
        {
            "type": "food",
            "name": "ectoplasma",
            "icon": "ectoplasma"
        }
    ]]],
        inputHero = new Hero(0, 0),
        outputHero = new Hero(0, 0),
        message = pickUp(map, inputHero);

    outputHero.eat();

    expect(map).toEqual([[[
        { 'icon': "wall" }
    ]]]);
    expect(inputHero).toEqual(outputHero);
    expect(message).toEqual(
        'you picked up and eat ectoplasma, but feel bad'
    );
});