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
        stop = false;

    map.forEach((currentRow, indexRow) => {
        grid[indexRow] = [];
        currentRow.forEach((currentColumn, indexColumn) => {
            if (currentColumn[currentColumn.length - 1].icon !== wall.icon) {
                grid[indexRow][indexColumn] = BLANK; // генерируем карту из -2. Зачем?
            } else {
                grid[indexRow][indexColumn] = WALL; // где стены ложим в ячейку -1. Зачем?
            }
        });
    });

    grid[enemy.positionY][enemy.positionX] = 0; // где враг ложим в ячейку 0. Зачем?
    do {
        stop = true;
        for (let indexRow = 0; indexRow < map.length - 1; indexRow++) {
            for (let indexCol = 0; indexCol < map[indexRow].length - 1; indexCol++) {
                if (grid[indexRow][indexCol] === d) {
                    for (let indexDirection = 0; indexDirection < 4; indexDirection++) {
                        const newY = parseInt(indexRow, 10) + dy[indexDirection],
                            newX = parseInt(indexCol, 10) + dx[indexDirection];

                        if (grid[newY][newX] === BLANK) { // если в ячейке -2
                            stop = false;
                            grid[newY][newX] = d + 1; // то ложим в ячейку 1. Зачем?
                        }
                    }
                }
            }
        }
        d++; // какой-то непонятный счетчик
        if (grid[hero.positionY][hero.positionX] !== BLANK) {
            d = grid[hero.positionY][hero.positionX]; // ложим в d значение 1
            let x = hero.positionX,
                y = hero.positionY;
            while (d > 0) { // здесь я уже теряю всякий смысл этого кода
                px[d] = x;
                py[d] = y;
                d--;
                for (let indexDirection = 0; indexDirection < 4; indexDirection++) {
                    const pathY = parseInt(y, 10) + dy[indexDirection],
                        pathX = parseInt(x, 10) + dx[indexDirection];
                    if (grid[pathY][pathX] === d) {
                        x = x + dx[indexDirection];
                        y = y + dy[indexDirection];
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
