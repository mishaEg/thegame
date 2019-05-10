import isContact from './isContact';
import HeroMove from './Hero.Move';
import HeroDig from './Hero.Dig';
import HeroPunch from './Hero.Punch';
import EnemyMove from './Enemy.Move';

export default function movingAndDigging(map, hero, key, creatures) {
    let loggingMessage;

    if (hero.readyToMine) {
        const { message } = HeroDig(map, hero, key, creatures);

        loggingMessage = message;
    } else {
        const { message, newCoordX, newCoordY } = HeroMove(map, hero, key, creatures);

        loggingMessage = message;

        creatures.forEach((currentCreature, indexCreature) => {
            if (isContact({ positionX: newCoordX, positionY: newCoordY }, currentCreature)) {
                const messageOfPunch = HeroPunch(currentCreature, hero);

                loggingMessage += messageOfPunch;
                creatures[indexCreature] = currentCreature;
            }

            if (currentCreature.status !== 'sleeping') {
                EnemyMove(map, currentCreature, hero);
            }
        });
    }

    return loggingMessage;
}
