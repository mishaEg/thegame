/**
 * @description
 */

import elements from '../data/elements';

export default function EnemyMove(map, inputEnemy, hero) {
    const { wall } = elements;

    let enemy = Object.assign(inputEnemy);

    const WALL = -1, // непроходимая ячейка
          BLANK = -2;
    var grid = [],
        dx = [1, 0, -1, 0], // смещения, соответствующие соседям ячейки
        dy = [0, 1, 0, -1], // справа, снизу, слева и сверху
        d = 0,
        x = 0,
        y = 0,
        k = 0,
        px = [],
        py = [],
        stop = false;

    map.forEach((currentRow, indexRow) => {
        grid[indexRow] = [];
        currentRow.forEach((currentColumn, indexColumn) => {
            if (currentColumn[currentColumn.length -1].icon !== wall.icon) {
                grid[indexRow][indexColumn] = BLANK;
            } else {
                grid[indexRow][indexColumn] = WALL;
            }
        })
    });

    grid[enemy.positionY][enemy.positionX] = 0;
    do {
        stop = true;
        for (y in map) {
            for (x in map[y]) {
                if (grid[y][x] === d) {
                    for (k = 0; k < 4; k++) {
                        var newY = parseInt(y) + dy[k],
                            newX = parseInt(x) + dx[k];
                        if (grid[newY][newX] === BLANK) {
                            stop = false;
                            grid[newY][newX] = d + 1;
                        };
                    };
                };
            };
        };
        d++;
        if (grid[hero.positionY][hero.positionX] !== BLANK) {
            d = grid[hero.positionY][hero.positionX];
            x = hero.positionX;
            y = hero.positionY;
            while (d > 0) {
                px[d] = x;
                py[d] = y;
                d--;
                for (k = 0; k < 4; k++) {
                    var pathY = parseInt(y) + dy[k],
                        pathX = parseInt(x) + dx[k];
                    if (grid[pathY][pathX] === d) {
                        x = x + dx[k];
                        y = y + dy[k];
                        break;
                    };
                };
                if (d === 0) {
                    if (px[1] === hero.positionX && py[1] === hero.positionY) {
                        if (hero.icon !== 'd') {
                            //msg = 'the enemy attak you! :o';
                        };
                    } else {
                        enemy.positionX = px[1];
                        enemy.positionY = py[1];
                        enemy.stamina -= 1;
                        if (enemy.stamina <= 0) {
                            enemy.fallAsleep();
                        };
                    };
                };
            };
        };
    } while (!stop && grid[hero.positionY][hero.positionX] === BLANK);

    return enemy;
}