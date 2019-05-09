import isContact from './isContact';
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
        const { message, coordX, coordY } = HeroDig(map, hero, key, creatures);

        loggingMessage = message;
        coordinate.y = coordY;
        coordinate.x = coordX;
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
