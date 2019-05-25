import getTopItem from './utils/getTopItem';
import isContact from './utils/isContact';
import elements from '../data/elements';

/**
 * @description реализация сражения героя с монстром
 * @return creature - объект монстра после сражения
 */
function heroHitsCreature(hero, creature) {
    let message = 'you punch enemy',
        isDied = false;

    if (creature.status === 'sleeping') {
        if (creature.depthOfSleep === 2) {
            message = "you punch sleeping enemy, once more punch for waked up";
        } else if (creature.depthOfSleep === 1) {
            message = "you punch sleeping enemy and woke him up";
        }
        creature.getDamage(hero.damage);
    } else {
        const enemyStatusBefore = creature.status;

        creature.getDamage(hero.damage);
        if (enemyStatusBefore !== creature.status) {
            switch (creature.status) {
                case 'irritation':
                    message = 'you punch enemy and he became irritated';
                    break;
                case 'rage':
                    message = 'you punch enemy and he became raged';
                    break;
                case 'humility':
                    message = 'you punch enemy and he became humble';
                    break;
                default:
                    break;
            }
        }
    }

    if (creature.status === 'dead') {
        message = 'you punch enemy and kill him';
        isDied = true;
    }

    return {
        isDied: isDied,
        fightMessage: message
    };
}

/**
 * @description реализация функции движения героя на карте
 * @return message - лог событий или false,
 * movedHero - обновленный объект героя,
 * updatedCreatures - обновленный список врагов
 */
function moveHero(map, hero, key, creatures) {
    let dx = 0,
        dy = 0,
        message = false,
        wasAfight = false,
        changeMap = false,
        isMoved = false;

    switch (key) {
        case "left": dx = -1; break;
        case "right": dx = 1; break;
        case "up": dy = -1; break;
        case "down": dy = 1; break;
        default: throw new Error("key is not correct:" + key);
    }

    const xTravelCoordinates = hero.positionX + dx,
        yTravelCoordinates = hero.positionY + dy,
        upperItem = getTopItem(map, yTravelCoordinates, xTravelCoordinates),

        updatedCreatures = creatures.reduce((accumulator, currentCreature) => {
            if (isContact({ positionX: xTravelCoordinates, positionY: yTravelCoordinates }, currentCreature)) {
                const {
                        fightMessage,
                        isDied
                    } = heroHitsCreature(hero, currentCreature),
                    { ectoplasma } = elements;

                wasAfight = true;
                message = fightMessage;
                if (isDied) {
                    changeMap = true;
                    map[yTravelCoordinates][xTravelCoordinates].push(ectoplasma);
                } else {
                    accumulator.push(currentCreature);
                }
            } else {
                accumulator.push(currentCreature);
            }

            return accumulator;
        }, []);

    if (!wasAfight) {
        switch (upperItem.icon) {
            case 'wall':
                message = 'there is no the way';
                break;
            case ' ':
                message = 'Its whitespace? how did you do this?? (bug!)';
                break;
            case 'grass':
                isMoved = true;
                message = 'you stay at ' + upperItem.icon + ' and feels fresh green leaves by your foots :з.';
                break;
            default:
                if (upperItem.type) {
                    message = 'you stay at ' + upperItem.icon + ', if you wanna pick it up, press "p"';
                }
                isMoved = true;
        }
    }

    const updatedMap = changeMap ? map : [];

    return {
        message: message,
        movedHero: {
            ...hero,
            positionX: isMoved ? xTravelCoordinates : hero.positionX,
            positionY: isMoved ? yTravelCoordinates : hero.positionY
        },
        updatedMap: updatedMap,
        updatedCreatures: updatedCreatures
    };
}

export default moveHero;
