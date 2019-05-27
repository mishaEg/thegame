import movingAndDigging from './movingAndDigging';
import pickUp from './pickUp';

export default function heroActions(hero, map, creatures, key) {
    let message;

    switch (key) {
        case 'p':
            message = pickUp(map, hero);
            break;
        case 'd':
            if (hero.weapon.name !== 'none') {
                hero.readyToMine = !hero.readyToMine;
                if (hero.readyToMine) {
                    message = `you rised the pickaxe (${hero.weapon.name}). Now, choose direction to dig`;
                } else {
                    message = `you lower the pickaxe (${hero.weapon.name})`;
                }
            } else {
                message = 'you need any weapon to dig';
            }
            break;
        default: {
            const {
                map: mapAfterHeroAction,
                hero: heroAfterAction,
                message: messageOfHeroAction,
                creatures: creaturesAfterHeroAction
            } = movingAndDigging(map, hero, key, creatures);

            map = mapAfterHeroAction;
            hero = heroAfterAction;
            message = messageOfHeroAction;
            creatures = creaturesAfterHeroAction;
        }
    }
    // hero.effectsHandler();

    return message;
}
