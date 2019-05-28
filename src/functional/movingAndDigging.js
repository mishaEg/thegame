import moveHero from './moveHero';
import digging from './digging';

function movingAndDigging(map, hero, key, creatures) {
    let loggingMessage;

    if (hero.readyToMine) {
        loggingMessage = digging(map, hero, key, creatures);
    } else {
        loggingMessage = moveHero(map, hero, key, creatures);
    }

    return loggingMessage;
}

export default movingAndDigging;
