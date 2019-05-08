/**
 * @description
 */

import elements from '../data/elements';

export default function EnemyMove(map, enemy, hero) {
    const { wall } = elements,
        WALL = -1, // непроходимая ячейка
        BLANK = -2,
        grid = [],
        dx = [1, 0, -1, 0], // смещения, соответствующие соседям ячейки
        dy = [0, 1, 0, -1], // справа, снизу, слева и сверху
        px = [],
        py = [];

    let d = 0,
        k = 0,
        stop = false;

    map.forEach((currentRow, indexRow) => {
        grid[indexRow] = [];
        currentRow.forEach((currentColumn, indexColumn) => {
            if (currentColumn[currentColumn.length - 1].icon !== wall.icon) {
                grid[indexRow][indexColumn] = BLANK;
            } else {
                grid[indexRow][indexColumn] = WALL;
            }
        });
    });

    grid[enemy.positionY][enemy.positionX] = 0;
    do {
        stop = true;
        map.forEach((currentRow, indexRow) => {
            currentRow.forEach((currentColumn, indexColumn) => {
                if (grid[currentRow][currentColumn] === d) {
                    for (k = 0; k < 4; k++) {
                        const newY = parseInt(indexRow, 10) + dy[k],
                            newX = parseInt(indexColumn, 10) + dx[k];
                        if (grid[newY][newX] === BLANK) {
                            stop = false;
                            grid[newY][newX] = d + 1;
                        }
                    }
                }
            });
        });
        d++;
        if (grid[hero.positionY][hero.positionX] !== BLANK) {
            d = grid[hero.positionY][hero.positionX];
            let x = hero.positionX,
                y = hero.positionY;
            while (d > 0) {
                px[d] = x;
                py[d] = y;
                d--;
                for (k = 0; k < 4; k++) {
                    const pathY = parseInt(y, 10) + dy[k],
                        pathX = parseInt(x, 10) + dx[k];
                    if (grid[pathY][pathX] === d) {
                        x = x + dx[k];
                        y = y + dy[k];
                        break;
                    }
                }
                if (d === 0) {
                    if (px[1] === hero.positionX && py[1] === hero.positionY) {
                        if (hero.icon !== 'd') {
                            // msg = 'the enemy attak you! :o';
                        }
                    } else {
                        enemy.positionX = px[1];
                        enemy.positionY = py[1];
                        enemy.stamina -= 1;
                        if (enemy.stamina <= 0) {
                            enemy.fallAsleep();
                        }
                    }
                }
            }
        }
    } while (!stop && grid[hero.positionY][hero.positionX] === BLANK);
}
