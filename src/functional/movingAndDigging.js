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
    let loggingMessage;

    if (hero.readyToMine) {
        const { message, coordX, coordY } = HeroDig(map, hero, key),
            RANDOM_GENERATE_CAVE = getRandomInt(0, 12);

        loggingMessage = message;
        coordinate.y = coordY;
        coordinate.x = coordX;

        let treasure = 'none';

        switch (true) {
            case (RANDOM_GENERATE_CAVE > 4 && RANDOM_GENERATE_CAVE < 6):
                loggingMessage = 'you found cave with enemy!';
                treasure = 'enemy';
                break;
            case (RANDOM_GENERATE_CAVE > 6 && RANDOM_GENERATE_CAVE < 8):
                loggingMessage = 'you found cave with grass!';
                treasure = 'grass';
                break;
            case (RANDOM_GENERATE_CAVE === 8):
                loggingMessage = 'you found cave with iron shield!';
                treasure = 'iron shield';
                break;
            case (RANDOM_GENERATE_CAVE === 9):
                loggingMessage = 'you found cave with iron sword!';
                treasure = 'iron sword';
                break;
            case (RANDOM_GENERATE_CAVE > 9):
                loggingMessage = 'you found a gem!';
                treasure = 'gem';
                break;
            default:
                loggingMessage = '';
        }
        if (treasure !== 'none') {
            const { generateEnemy } = drawCave(coordinate.x, coordinate.y, key, treasure, map, hero);

            if (generateEnemy) {
                creatures.push(generateEnemy);
            }
        }
    } else {
        const { message, newCoordX, newCoordY } = HeroMove(map, hero, key, creatures);

        loggingMessage = message;
        coordinate.x = newCoordX;
        coordinate.y = newCoordY;
    }

    creatures.forEach((currentCreature, indexCreature) => {
        if (isContact({ positionX: coordinate.x, positionY: coordinate.y }, currentCreature)) {
            const messageOfPunch = HeroPunch(currentCreature, hero);

            loggingMessage += messageOfPunch;
            creatures[indexCreature] = currentCreature;
        }

        if (currentCreature.status !== 'sleeping') {
            EnemyMove(map, currentCreature, hero);
        }
    });

    return loggingMessage;
}
