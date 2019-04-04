import elements from '../data/elements';

const { wall } = elements;

export class Enemy {
  constructor(positionX, positionY) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.icon = 'z';
    this.health = 100;
    this.depthOfSleep = 2;
    this.stamina = 0;
    this.damage = 20;
    this.status = 'sleeping';
    this.type = 'enemy';
  };

  wakedUp() {
    this.icon = 'e';
    this.stamina = 12;
  };

  regeneration() {
    if (this.health < 100 && this.health > 0) {
      this.health += 1;
    };
  };

  damaged(damage) {
    this.health -= damage;
    //console.log('enemy health:', this.health);
    if (this.health < 80 && this.health > 60 && this.status != 'irritated') {
      //msg += ' || enemy looks irritated by your punches!o:';
      this.status = 'irritated';
      this.damage = 25;
      this.stamina += 2;
    } else if (this.health < 60 && this.status != 'anger') {
      //msg += ' || enemy becomes more anger!o:';
      this.status = 'anger';
      this.damage = 50;
      this.stamina += 8;
    } else if (this.health <= 0) {
      //msg += ' => you killed the enemy!o:';
      //map[this.positionY][this.positionX].push(this);
      this.icon = 'd';
      this.type = 'corpse';
    };
  };

  fallAsleep() {
    this.status = 'sleeping';
    this.icon = 'z';
    this.depthOfSleep = 2;
    //msg = 'enemy tired of follow you and he falling asleep...';
  };

  move(map, target) {
    const WALL = -1, // непроходимая ячейка
      BLANK = -2;
    var grid = [],
      dx = [1, 0, -1, 0], // смещения, соответствующие соседям ячейки
      dy = [0, 1, 0, -1], // справа, снизу, слева и сверху
      d = 0,
      x = 0,
      y = 0,
      k = 0,
      len = 0,
      px = [],
      py = [],
      stop = false;

    for (var i in map) {
      grid[i] = new Array(map[i].length);
      for (var j in map[i]) {
        if (map[i][j][map[i][j].length - 1].icon != wall.icon) {
          grid[i][j] = BLANK;
        } else grid[i][j] = WALL;
      };
    };

    grid[this.positionY][this.positionX] = 0;
    do {
      stop = true;
      for (y in map) {
        for (x in map[y]) {
          if (grid[y][x] == d) {
            for (k = 0; k < 4; k++) {
              var newY = parseInt(y) + dy[k],
                newX = parseInt(x) + dx[k];
              if (grid[newY][newX] == BLANK) {
                stop = false;
                grid[newY][newX] = d + 1;
              };
            };
          };
        };
      };
      d++;
      if (grid[target.positionY][target.positionX] != BLANK) {
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
            if (grid[pathY][pathX] == d) {
              x = x + dx[k];
              y = y + dy[k];
              break;
            };
          };
          if (d == 0) {
            //console.log('new enemy position would be:', py[1], px[1], 'so, hero position is:', hero.positionY, hero.positionX);
            if (px[1] == target.positionX && py[1] == target.positionY) {
              if (this.depthOfSleep == 0) {
                this.depthOfSleep -= 1;
              } else if (target.icon != 'd') {
                //msg = 'the enemy attak you! :o';
                target.damaged(this.damage);
              }
            } else {
              this.positionX = px[1];
              this.positionY = py[1];
              this.stamina -= 1;
              if (this.stamina <= 0) {
                this.fallAsleep();
              };
            };
          };
        };
      };
    } while (!stop && grid[target.positionY][target.positionX] == BLANK);
  };
};