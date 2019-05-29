import PF from 'pathfinding';
import isContact from './utils/isContact';

function createMatrixForPF(map, allCreatures) {
    const matrixForPF = map.map((currentRow, indexRow) => {
        return currentRow.map((currentColumn, indexCol) => {
            const iconLastItem = currentColumn[currentColumn.length - 1].icon;
            let hereEnemy = false;

            allCreatures.forEach((currentCreature) => {
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
 * @description реализация функции передвижения переданного врага
 */
function onceEnemyAction(creature, map, hero, allCreatures) {
    const dy = [+0, +1, -1, 0, 1, -1, 0, 1, -1], // смещения, для обхвата площади
        dx = [-1, -1, -1, 0, 0, +0, 1, 1, +1]; // размером 3х3 с центром в указанной точке

    dy.forEach((currentDy, index) => {
        const XpositionForCheckHero = creature.positionX + dx[index],
            YpositionForCheckHero = creature.positionY + currentDy;

        if (isContact({ positionX: XpositionForCheckHero, positionY: YpositionForCheckHero }, hero)) {
            const reducedDamage = creature.damage - hero.defence;
            if (reducedDamage > 0) {
                hero.health -= reducedDamage;
            }
        }
    });

    const matrixForPF = createMatrixForPF(map, allCreatures),
        finder = new PF.AStarFinder(),
        grid = new PF.Grid(matrixForPF),
        path = finder.findPath(creature.positionX, creature.positionY, hero.positionX, hero.positionY, grid);

    // Если путь не найден, массив будет пустым
    // Если путь найден и следующий шаг будет не на позицию героя, тогда монстр двигается
    if (path.length !== 0 && !(path[1][0] === hero.positionX && path[1][1] === hero.positionY)) {
        creature.move(path[1][0], path[1][1]);
    }
}

/**
 * Реализация действий всех существ на карте
 */
function enemiesAction(hero, map, creatures) {
    creatures.forEach((creature) => {
        if (creature.status === 'sleeping') {
            creature.regeneration();
        } else {
            onceEnemyAction(creature, map, hero, creatures);
        }
    });
}

export default enemiesAction;
