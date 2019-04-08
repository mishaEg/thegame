/**
 * @description
 */

import elements from '../data/elements';

export default function EnemyMove(inputMapObject, inputEnemy, inputTarget) {

    const { wall } = elements;

    let target = Object.assign(inputTarget), // клон объекта (не стейт)
        enemy = Object.assign(inputEnemy),
        map = Object.assign(inputMapObject); // клон объекта (не стейт)

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

    for (var i in map) {
        grid[i] = new Array(map[i].length);
        for (var j in map[i]) {
            if (map[i][j][map[i][j].length - 1].icon !== wall.icon) {
                grid[i][j] = BLANK;
            } else grid[i][j] = WALL;
        };
    };

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
        if (grid[target.positionY][target.positionX] !== BLANK) {
            d = grid[target.positionY][target.positionX];
            x = target.positionX;
            y = target.positionY;
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
                    if (px[1] === target.positionX && py[1] === target.positionY) {
                        if (target.icon !== 'd') {
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
    } while (!stop && grid[target.positionY][target.positionX] === BLANK);

    return {
        enemy: enemy,
        hero: target
    };
}