import isContact from './isContact';
import getRandomInt from './getRandomInt';
import drawCave from './drawCave';
import HeroMove from './Hero.Move';
import HeroDig from './Hero.Dig';
import HeroPunch from './Hero.Punch';
import EnemyMove from './Enemy.Move';

export default function movingAndDigging(map, hero, key, updated, creatures) {
    if (hero.readyToMine) {
        const buffer = HeroDig(map, hero, key); // return hero: hero, map: map, message: msg, x: x, y: y
        updated.y = buffer.y;
        updated.x = buffer.x;

        var rnd_cave = getRandomInt(0, 12),
            treasure = 'none';
        switch (true) {
            case (rnd_cave > 4 && rnd_cave < 6):
                updated.message = 'you found cave with enemy!';
                treasure = 'enemy';
                break;
            case (rnd_cave > 6 && rnd_cave < 8):
                updated.message = 'you found cave with grass!';
                treasure = 'grass';
                break;
            case (rnd_cave === 8):
                updated.message = 'you found cave with iron shield!';
                treasure = 'iron shield';
                break;
            case (rnd_cave === 9):
                updated.message = 'you found cave with iron sword!';
                treasure = 'iron sword';
                break;
            case (rnd_cave > 9):
                updated.message = 'you found a gem!';
                treasure = 'gem';
                break;
            default: 
                updated.message = '';
        };
        if (treasure !== 'none') {
            const buffer = drawCave(updated.x, updated.y, key, treasure, updated.map, updated.hero); // return hero: hero, map: map
            updated.map = buffer.map;
            updated.hero = buffer.hero;
            if (buffer.enemy) {
                updated.creatures.push(buffer.enemy);
            };
        };
    } else {
        const buffer = HeroMove(map, hero, key, creatures); // return hero: hero, map: map, message: msg, x: x, y: y
        updated.map = buffer.map;
        updated.hero = buffer.hero;
        updated.message = buffer.message;
        updated.x = buffer.x;
        updated.y = buffer.y;
    };

    for (let i in creatures) {
        if (isContact({ positionX: updated.x, positionY: updated.y }, creatures[i])) {
            const buffer = HeroPunch(creatures[i], updated.hero); // return message: msg, target: target
            updated.message += buffer.message;
            updated.creatures[i] = buffer.target;
        };

        if (creatures[i].status !== 'sleeping') {
            updated.creatures[i] = EnemyMove(updated.map, creatures[i], updated.hero)
        };
    };
}