import isContact from './utils/isContact';
import moveHero from './moveHero';
import digging from './digging';
import HeroPunch from './Hero.Punch';
import EnemyMove from './Enemy.Move';

function movingAndDigging(map, hero, key, creatures) {
    let loggingMessage;

    if (hero.readyToMine) {
        const { message } = digging(map, hero, key, creatures);

        loggingMessage = message;
    } else {
        const { message, newCoordX, newCoordY } = moveHero(map, hero, key, creatures);

        loggingMessage = message;

        creatures.forEach((currentCreature) => {
            if (isContact({ positionX: newCoordX, positionY: newCoordY }, currentCreature)) {
                const messageOfPunch = HeroPunch(currentCreature, hero);

                loggingMessage += messageOfPunch;
            }

            if (currentCreature.status !== 'sleeping') {
                EnemyMove(map, currentCreature, hero);
            }
        });
    }

    return loggingMessage;
}

module.exports = movingAndDigging;
