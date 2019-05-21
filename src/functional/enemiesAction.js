import PF from 'pathfinding';
import isContact from './utils/isContact';

function createMatrixForPF(inputMap, otherCreatures) {
    const matrixForPF = inputMap.map((currentRow, indexRow) => {
        return currentRow.map((currentColumn, indexCol) => {
            const iconLastItem = currentColumn[currentColumn.length - 1].icon;
            let hereEnemy = false;

            otherCreatures.forEach((currentCreature) => {
                if (currentCreature.positionY === indexRow && currentCreature.positionX === indexCol) {
                    hereEnemy = true;
                }
            });
            if (iconLastItem === 'wall' || hereEnemy) {
                return 1;
            }
            return 0;
        });
    });

    return matrixForPF;
}

/**
 * @description реализация нанесения урона текущим врагом по герою
 */
function enemyHitsHero(creature, hero) {
    const damagedHero = {
        ...hero,
        health: hero.health - creature.damage
    };

    return {
        damagedHero: damagedHero
    };
}

/**
 * @description реализация функции передвижения переданного врага
 */
function onceEnemyAction(creature, map, hero, otherCreatures) {
    const dy = [+0, +1, -1, 0, 1, -1, 0, 1, -1], // смещения, для обхвата площади
        dx = [-1, -1, -1, 0, 0, +0, 1, 1, +1]; // размером 3х3 с центром в указанной точке

    dy.forEach((currentDy, index) => {
        const XpositionForCheckHero = creature.positionX + dx[index],
            YpositionForCheckHero = creature.positionY + currentDy;

        if (isContact({ positionX: XpositionForCheckHero, positionY: YpositionForCheckHero }, hero)) {
            const { damagedHero } = enemyHitsHero(creature, hero);

            hero = damagedHero;
        }
    });

    const matrixForPF = createMatrixForPF(map, otherCreatures),
        finder = new PF.AStarFinder(),
        grid = new PF.Grid(matrixForPF),
        path = finder.findPath(
            creature.positionX,
            creature.positionY,
            hero.positionX,
            hero.positionY,
            grid
        );

    // Если путь не найден, массив будет пустым
    // Если путь найден и следующий шаг будет не на позицию героя, тогда монстр двигается
    if (path.length !== 0 && !(path[1][0] === hero.positionX && path[1][1] === hero.positionY)) {
        creature.positionX = path[1][0];
        creature.positionY = path[1][1];
    }

    creature.stamina -= 1;

    return {
        updatedHero: { ...hero },
        updatedCreature: creature
    };
}

/**
 * Реализация действий всех существ на карте
 */
function enemiesAction(hero, map, creatures) {
    const updatedAllCreatures = creatures.map((creature) => {
        const enemyWithoutCurrent = creatures.filter((currCreature) => {
                return currCreature !== creature;
            }),
            {
                updatedHero,
                updatedCreature
            } = onceEnemyAction(creature, map, hero, enemyWithoutCurrent);

        hero = updatedHero;
        return updatedCreature;
    });

    return {
        updatedCreatures: [...updatedAllCreatures],
        updatedHero: { ...hero }
    };
}

export default enemiesAction;
