import isContact from './isContact';
import getRandomInt from './getRandomInt';
import drawCave from './drawCave';
import HeroMove from './Hero.Move';
import HeroDig from './Hero.Dig';
import HeroPunch from './Hero.Punch';
import EnemyMove from './Enemy.Move';

export default function movingAndDigging(map, hero, key, creatures) {
    const coordinate = {
        y: 0,
        x: 0
    };

    if (hero.readyToMine) {
        // Надо будет пофиксить функцию HeroDig(). Она возвращает излишний message
        const buffer = HeroDig(map, hero, key), // return message: msg, x: x, y: y
            RND_CAVE = getRandomInt(0, 12);

        coordinate.y = buffer.y;
        coordinate.x = buffer.x;

        let treasure = 'none';

        switch (true) {
            case (RND_CAVE > 4 && RND_CAVE < 6):
                coordinate.message = 'you found cave with enemy!';
                treasure = 'enemy';
                break;
            case (RND_CAVE > 6 && RND_CAVE < 8):
                coordinate.message = 'you found cave with grass!';
                treasure = 'grass';
                break;
            case (RND_CAVE === 8):
                coordinate.message = 'you found cave with iron shield!';
                treasure = 'iron shield';
                break;
            case (RND_CAVE === 9):
                coordinate.message = 'you found cave with iron sword!';
                treasure = 'iron sword';
                break;
            case (RND_CAVE > 9):
                coordinate.message = 'you found a gem!';
                treasure = 'gem';
                break;
            default:
                coordinate.message = '';
        }
        if (treasure !== 'none') {
            const drawBuffer = drawCave(coordinate.x, coordinate.y, key, treasure, coordinate.map, coordinate.hero);

            if (drawBuffer.enemy) {
                coordinate.creatures.push(buffer.enemy);
            }
        }
    } else {
        const buffer = HeroMove(map, hero, key, creatures); // return message: msg, x: x, y: y

        coordinate.map = map;
        coordinate.hero = hero;
        coordinate.message = buffer.message;
        coordinate.x = buffer.x;
        coordinate.y = buffer.y;
    }

    creatures.forEach((currentCreature, indexCreature) => {
        if (isContact({ positionX: coordinate.x, positionY: coordinate.y }, currentCreature)) {
            const buffer = HeroPunch(currentCreature, coordinate.hero); // return message: msg

            coordinate.message += buffer.message;
            coordinate.creatures[indexCreature] = currentCreature;
        }

        if (currentCreature.status !== 'sleeping') {
            coordinate.creatures[indexCreature] = EnemyMove(coordinate.map, currentCreature, coordinate.hero);
        }
    });
}
