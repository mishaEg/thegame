import moveHero from './moveHero';
import digging from './digging';

function movingAndDigging(map, hero, key, creatures) {
    let loggingMessage,
        heroAfterAction = hero,
        allEnemyAfterAction = creatures,
        mapAfterAction = map;

    if (hero.readyToMine) {
        const {
            message,
            diggedUp,
            updatedMap,
            updatedHero,
            updatedCreatures
        } = digging(map, hero, key, creatures);

        if (diggedUp) {
            allEnemyAfterAction = updatedCreatures;
            mapAfterAction = updatedMap;
        }
        heroAfterAction = updatedHero;
        loggingMessage = message;
    } else {
        const {
            message,
            wasAfight,
            movedHero,
            updatedCreatures
        } = moveHero(map, hero, key, creatures);

        if (wasAfight) {
            allEnemyAfterAction = updatedCreatures;
        }
        heroAfterAction = movedHero;
        loggingMessage = message;
    }

    return {
        map: mapAfterAction,
        hero: heroAfterAction,
        message: loggingMessage,
        creatures: allEnemyAfterAction
    };
}

module.exports = movingAndDigging;
