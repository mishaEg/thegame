import moveHero from './moveHero';
import digging from './digging';
import HeroPunch from './Hero.Punch';
import EnemyMove from './Enemy.Move';

function movingAndDigging(map, hero, key, creatures) {
    let loggingMessage,
        updatedHero,
        updatedEnemy;

    if (hero.readyToMine) {
        const { message } = digging(map, hero, key, creatures);

        loggingMessage = message;
    } else {
        const {
            message,
            isMoved,
            wasAfight,
            movedHero,
            updatedCreatures
        } = moveHero(map, hero, key, creatures);

        loggingMessage = message;
        if (isMoved) {
            updatedHero = movedHero;
        } else if (wasAfight) {
            updatedEnemy = updatedCreatures;
        }

        if (currentCreature.status !== 'sleeping') {
            EnemyMove(map, currentCreature, hero);
        }
    }

    return loggingMessage;
}

module.exports = movingAndDigging;
