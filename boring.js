const keypress = require('keypress'),
  tty = require('tty'),
  readline = require('readline');

//console.log('press any key to start');
process.stdout.write('\u001b[2J\u001b[0;0H'); //clear all

var emptySpace = {
    icon: ' '
  },
  wall = {
    icon: '='
  },
  floor = {
    icon: '*'
  },
  grass = {
    icon: 'w'
  },
  sword = {
    type: 'weapon',
    name: 'wooden sword',
    icon: '/',
    damage: 18
  },
  shield = {
    type: 'shield',
    name: 'wooden shield',
    icon: '0',
    defence: 2
  },
  map = [],
  drawingMap = [],
  creatures = [],
  onHelp = false,
  msg = '';

class Hero {
  constructor(positionX, positionY) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.icon = '@';
    this.health = 100;
    this.damage = 2;
    this.defence = 0;
    this.weapon = 'none';
    this.shield = 'none';
    this.poisoned = false;
    this.readyToMine = false;
  };

  damaged(damage) {
    var countedDamage = damage - this.defence;
    if (countedDamage <= 0) {
      countedDamage = 1;
    }
    if (this.health > 0) {
      this.health -= countedDamage;
      if (this.health <= 0) {
        msg += ' => ha-ha, you died :в';
        this.icon = 'd';
      };
    };
  };

  punch(target) {
    if (target.depthOfSleep == 2) {
      msg = 'you punch the enemy, but he is sleeps. If you wanna wake him up, punch once more.';
      target.depthOfSleep -= 1;
    } else if (target.depthOfSleep == 1) {
      msg = 'you punch the enemy and wakes him up!';
      target.wakedUp();
      target.depthOfSleep -= 1;
    };
    target.damaged(this.damage);
  };

  pickUp(y, x) {
    var item = map[y][x][map[y][x].length - 1];

    if (item.type != undefined) {
      switch (item.type) {
        case 'weapon':
          this.damage += item.damage;
          this.weapon = item.name;
          msg = 'you picked up the ' + item.name;
          break;
        case 'shield':
          this.defence += item.defence;
          this.shield = item.name;
          msg = 'you picked up the ' + item.name;
          break;
        case 'corpress':
          this.health += 100;
          msg = 'you eat the corpress. Enemy blood fills up your siol. Somthing gose wrong...';
          this.poisoned = true;
          break;
        default:
          msg = 'you pick up something usless';
          break;
      };
      if (map[y][x].length == 1) {
        map[y][x][0] = floor;
      } else {
        //console.log('in "map" array more than 1 element on this tile');
        map[y][x].splice(-1, 1);
      };
    } else msg = 'there is nothing to pick up';
  };

  dig(y, x) {
    var gex = map[y][x][map[y][x].length - 1].icon;
    msg += ' digging...';
    var dx = [1, 0, -1, 0], // смещения, соответствующие соседям ячейки
      dy = [0, 1, 0, -1]; // справа, снизу, слева и сверху 

    map[y][x][0] = floor;

    expansion_map(x, y, dx, dy, wall, [emptySpace]);

  };
};

class Enemy {
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
      msg += ' || enemy looks irritated by your punches!o:';
      this.status = 'irritated';
      this.damage = 25;
      this.stamina += 2;
    } else if (this.health < 60 && this.status != 'anger') {
      msg += ' || enemy becomes more anger!o:';
      this.status = 'anger';
      this.damage = 50;
      this.stamina += 8;
    } else if (this.health <= 0) {
      msg += ' => you killed the enemy!o:';
      map[this.positionY][this.positionX].push(this);
      this.icon = 'd';
      this.type = 'corpress';
    };
  };

  fallAsleep() {
    this.status = 'sleeping';
    this.icon = 'z';
    this.depthOfSleep = 2;
    msg = 'enemy tired of follow you and he falling asleep...';
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
                msg = 'the enemy attak you! :o';
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

function expansion_map(x, y, dx, dy, gex, replasments) {

  for (var i in dy) {
    var newY = y + dy[i],
      newX = x + dx[i];
    //console.log('||newY:', newY, 'newX:', newX + '||');
    if (map[newY] == undefined) {
      var line = [];
      for (var l in map[hero.positionY]) {
        line[l] = [emptySpace];
      };
      line[newX] = [gex];
      if (newY < 0) { //добавление новой линии к карте сверху
        map.splice(0, 0, line);
        hero.positionY += 1;
        enemy.positionY += 1;
        y += 1;
        //console.log('add line to up');
      } else if (newY > map.length - 1) { //добавление новой линии к карте снизу
        map.splice(newY, 0, line);
      };
    } else if (map[newY][newX] == undefined) {
      if (newX < 0) { //добавление новой клетки к карте слева
        //console.log('add line from left');
        for (var l in map) {
          map[l].splice(0, 0, [emptySpace]);
        };
        map[newY][0][0] = gex;
        enemy.positionX += 1;
        hero.positionX += 1;
        x += 1;
      } else { //добавление новой клетки к карте справа
        //console.log('add line from right');
        for (var l in map) {
          map[l][newX] = [emptySpace];
        };
        map[newY][newX] = [gex];
      };
    } else {
      for (var k in replasments) {
        if (map[newY][newX][0] == replasments[k]) {
          //console.log('replasments');
          map[newY][newX][0] = gex;
        };
      };
    };
  };
};

function draw_cave(x, y, direction, treasure) {

  var line_dx = 0,
    line_dy = 0;

  switch (direction) {
    case 'left':
      x -= 1;
      line_dx = [0, 0, 0, 0, 0, 1, 2, 3, 1, 2, 3];
      line_dy = [-1, 0, 1, 2, -2, -2, -2, -2, 2, 2, 2];
      break;
    case 'right':
      x += 2;
      line_dx = [2, 2, 2, 2, 2, 1, 0, 0, 1, -1, -1];
      line_dy = [-1, 0, 1, -2, 2, 2, 2, -2, -2, -2, 2];
      break;
    case 'up':
      y -= 1;
      line_dx = [-2, -2, -2, 2, 2, 2, 0, 1, 2, -1, -2];
      line_dy = [3, 2, 1, 3, 2, 1, 0, 0, 0, 0, 0];
      break;
    case 'down':
      y += 2;
      line_dx = [-1, 0, 1, -2, 2, -2, 2, -2, 2, -2, 2];
      line_dy = [2, 2, 2, 2, 2, 1, 1, 0, 0, -1, -1];
      break;
  };

  var dx = [-1, -1, -1, 0, 0, 0, 1, 1, 1], // смещения, соответствующие соседям ячейки
    dy = [0, 1, -1, 0, 1, -1, 0, 1, -1]; // справа, снизу, слева и сверху

  expansion_map(x, y, dx, dy, floor, [emptySpace, wall]); //пещера
  expansion_map(x, y, line_dx, line_dy, wall, [emptySpace]); //стены вокруг

  switch (treasure) {
    case 'enemy':
      var new_enemy = new Enemy(x, y);
      creatures.push(new_enemy);
      break;
    case 'grass':
      map[y][x] = [];
      map[y][x].push(grass);
      break;
  };
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/*function clearMap(y, x) {

    var dx = [1, 0, -1, 0], // смещения, соответствующие соседям ячейки
        dy = [0, 1, 0, -1]; // справа, снизу, слева и сверху

    map[y][x][0] = floor;

    for (var i in dy) {
        var newY = y + dy[i],
            newX = x + dx[i];
        console.log('||newY:', newY, 'newX:', newX + '||');
        if (map[newY] == undefined) {
            var line = [];
            for (var l in map[hero.positionY]) {
                line[l] = [emptySpace];
            }
            line[newX] = [wall];
            if (newY == -1) {
                map.splice(0, 0, line);
                hero.positionY += 1;
                enemy.positionY += 1;
            } else if (newY > map.length - 1) {
                map.splice(newY, 0, line);
            }
        } else if (map[newY][newX] == undefined) {
            if (newX == -1) {
                for (var l in map) {
                    map[l].splice(0, 0, [emptySpace]);
                }
                map[newY].splice(0, 1, [wall]);
                enemy.positionX += 1;
                hero.positionX += 1;
            } else if (newX > map[newY].length - 1) {
                for (var k = map[newY].length; k < newX; k++) {
                    map[newY].splice(k, 0, [emptySpace]);
                }
                map[newY].splice(newX, 0, [wall]);
            }
        } else if (map[newY][newX][0] == emptySpace) {
            map[newY][newX][0] = wall;
        }
    }
}*/

function generateMap() {

  const fs = require('fs'),
    inputMap = JSON.parse(fs.readFileSync('map.json'));

  for (var i in inputMap) {
    map[i] = [];
    for (var l in inputMap[i]) {
      map[i][l] = [];
      switch (inputMap[i][l]) {
        case '=':
          map[i][l].push(wall);
          break;
        case '*':
          map[i][l].push(floor);
          break;
        default:
          map[i][l].push(emptySpace);
          break;
      };
    };
  };

  for (var k = 0; k < 2; k++) {
    var x = getRandomInt(2, map[0].length - 1),
      y = getRandomInt(2, map.length - 1),
      len = map[y][x].length - 1;
    if (map[y][x][len].icon != floor.icon) { //чтобы объект не реснулся в другом
      k--;
    } else {
      map[y][x] = [];
      map[y][x].push(grass);
    };
  };

  for (var k = 0; k < 1; k++) {
    var x = getRandomInt(2, map[0].length - 1),
      y = getRandomInt(2, map.length - 1),
      len = map[y][x].length - 1;
    if (map[y][x][len].icon != floor.icon) { //чтобы объект не реснулся в другом
      k--;
    } else {
      map[y][x] = [];
      map[y][x].push(sword);
    };
  };

  for (var k = 0; k < 1; k++) {
    var x = getRandomInt(2, map[0].length - 1),
      y = getRandomInt(2, map.length - 1),
      len = map[y][x].length - 1;
    if (map[y][x][len].icon != floor.icon) { //чтобы объект не реснулся в другом
      k--;
    } else {
      map[y][x] = [];
      map[y][x].push(shield);
    };
  };

  draw();
};

function draw() {

  if (onHelp) {
    process.stdout.write('\u001b[2J\u001b[0;0H'); //clear all
    onHelp = false;
  };

  //clear log lines
  for (var k = 0; k < 3; k++) {
    readline.cursorTo(process.stdout, 0, k);
    readline.clearLine(process.stdout, 0);
  };
  readline.cursorTo(process.stdout, 0, 0);
  console.log('||health:', hero.health, '||weapon:', hero.weapon, '||shield:', hero.shield);
  console.log(msg);
  readline.cursorTo(process.stdout, 0, 3);
  for (var i in map) {
    drawingMap[i] = new Array(map[i].length);
    for (var j in map[i]) {
      var index = 0;
      if (map[i][j][map[i][j].length - 1] != undefined) {
        index = map[i][j].length - 1;
        drawingMap[i][j] = map[i][j][index].icon;
      };
    };
  };
  drawingMap[hero.positionY][hero.positionX] = hero.icon;
  for (var i in creatures) {
    if (creatures[i].type != 'corpress') {
      drawingMap[creatures[i].positionY][creatures[i].positionX] = creatures[i].icon;
    };
  };

  for (var l in drawingMap) {
    console.log(drawingMap[l].toString().replace(/,/g, '')); //write map
  };

  console.log('h - help');
};

function draw_helpMenu() {

  onHelp = true;

  process.stdout.write('\u001b[2J\u001b[0;0H'); //clear all

  readline.cursorTo(process.stdout, 0, 0);

  console.log('||HELP||')
  console.log('1. for moving use arrow keys');
  console.log('2. for digging use "d" key. Works only if you have any weapon');
  console.log('3. for close help menu press "h" key again');

};

function action(key) {
  msg = '';
  var x = 0,
    y = 0;
  switch (key) {
    case 'd':
      if (hero.weapon != 'none') {
        msg += 'you raised the pickaxe (' + hero.weapon + ') => choose derection to dig';
        x = hero.positionX;
        y = hero.positionY;
        hero.readyToMine = true;
      } else msg += 'you havent tools for mining';
      break;
    case 'p':
      x = hero.positionX;
      y = hero.positionY;
      hero.pickUp(y, x);
      break;
    case 'left':
      x = hero.positionX - 1;
      y = hero.positionY;
      break;
    case 'right':
      x = hero.positionX + 1;
      y = hero.positionY;
      break;
    case 'up':
      x = hero.positionX;
      y = hero.positionY - 1;
      break;
    case 'down':
      x = hero.positionX;
      y = hero.positionY + 1;
      break;
    case 'h':
      if (!onHelp) {
        draw_helpMenu();
      } else {
        draw();
      };
      break;
  };

  if (hero.poisoned) {
    hero.damaged(2);
    if (msg == '') {
      msg = 'you feels how forces leaves you';
    };
  };

  var gex = drawingMap[y][x];
  //console.log('gex:', gex);

  if (hero.icon != 'd' && !hero.readyToMine) {
    switch (gex) {
      case sword.icon:
        msg = 'you found wooden sword!';
      case shield.icon:
        if (msg == '') {
          msg = 'you found wooden shield!';
        }
        msg += ' || if you wanna pick it up, press "p"';
        hero.positionX = x;
        hero.positionY = y;
        break;
      case grass.icon:
        if (msg.length > 0) {
          msg += ', also, ';
        } else msg += 'now, ';
        msg += 'you walk by the grass and feels fresh green leaves by your foots :з';
      case floor.icon:
        hero.positionX = x;
        hero.positionY = y;
        break;
      default:
        for (var i in creatures) {
          if (creatures[i].positionX == x && creatures[i].positionY == y) {
            if (creatures[i].icon != 'd') {
              hero.punch(creatures[i]);
            } else {
              hero.positionX = x;
              hero.positionY = y;
              msg = 'you stand on body of dead enemy :o if you wanna eat it, press "p"';
            };
          };
        };
        if (msg == '' && gex != hero.icon) {
          msg = 'there is no the way :c';
        };
        break;
    };
  } else if (hero.readyToMine) {
    //msg = 'you raised the pickaxe and cant move while not lower it';
    if (gex != hero.icon) {
      if (gex == wall.icon) {
        hero.dig(y, x);
        var rnd_cave = getRandomInt(0, 9);
        if (rnd_cave > 4 && rnd_cave < 6) {
          msg += 'you found cave with enemy!';
          draw_cave(x, y, key, 'enemy');
        } else if (rnd_cave > 6) {
          msg += 'you found cave with grass!';
          draw_cave(x, y, key, 'grass');
        };
      } else msg += 'there is nothig to dig (you can mine only walls)';
      hero.readyToMine = false;
    };
  } else msg = 'you dead and cant move anymore, lol';

  for (var i in creatures) { //действия других существ на карте
    if (creatures[i].health > 0) {
      if (creatures[i].depthOfSleep <= 0) {
        creatures[i].move(map, hero);
      } else creatures[i].regeneration();
    };
  };

  if (!onHelp) {
    draw();
  };
};

hero = new Hero(1, 1);
enemy = new Enemy(7, 7);
creatures.push(enemy);

generateMap();

// make `process.stdin` begin emitting "keypress" events
keypress(process.stdin);

process.stdin.on('keypress', function (ch, key) {

  action(key.name);

  if (key && key.ctrl && key.name == 'c') { //exit
    process.stdin.pause();
  };
});

//misunderstandings
if (typeof process.stdin.setRawMode == 'function') {
  process.stdin.setRawMode(true);
} else {
  tty.setRawMode(true);
};

process.stdin.resume(); //probably, for looping
