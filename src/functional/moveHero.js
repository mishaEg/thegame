import getTopItem from './utils/getTopItem';
import isContact from './utils/isContact';

/**
 * @description реализация сражения героя с монстром
 * @return creature - объект монстра после сражения
 */
function clashHeroWithCreature(hero, creature) {
    let message = 'you punch enemy';

    if (creature.depthOfSleep === 2) {
        message = "you punch sleeping enemy, once more punch for waked up";
    } else if (creature.depthOfSleep === 1) {
        message = "you punch sleeping enemy and woke him up";
    }
    creature.getDamage(hero.damage);
    /**
     * Это вынесено в отдельную функцию,
     * чтобы в будущем добавить получение урона герою
     * ну и для других ништяков (фич)
     */

    return {
        fightMessage: message
    };
}

/**
 * @description реализация функции движения героя на карте
 * @return message - лог текущего события, x, y - новые координаты героя
 */
function moveHero(map, hero, key, creatures) {
    let dx = 0,
        dy = 0,
        message = false,
        wasAfight = false,
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

        updatedCreatures = creatures.map((currentCreature) => {
            if (isContact({ positionX: xTravelCoordinates, positionY: yTravelCoordinates }, currentCreature)) {
                const { fightMessage } = clashHeroWithCreature(hero, currentCreature);

                wasAfight = true;
                message = fightMessage;
            }
            // короче, невероятно, но если использовать методы класса
            // то объект отвратительно деструктурировать.
            // приходиться все время его прокидывать, и мутировать,
            // иначе он теряем методы класса
            return currentCreature;
        });

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

    return {
        message: message,
        isMoved: isMoved,
        wasAfight: wasAfight,
        updatedHero: {
            ...hero,
            positionX: isMoved ? xTravelCoordinates : hero.positionX,
            positionY: isMoved ? yTravelCoordinates : hero.positionY
        },
        updatedCreatures: updatedCreatures
    };
}

module.exports = moveHero;
