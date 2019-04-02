import elements from '../data/elements';

export class Hero {
  constructor(y, x) {
    this.positionX = x;
    this.positionY = y;
    this.icon = 'hero';
    this.health = 100;
    this.damage = 2;
    this.defence = 0;
    this.money = 0;
    this.weapon = {
      name: 'none'
    };
    this.shield = {
      name: 'none'
    };
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
        elements.msg += ' => ha-ha, you died :в';
        this.icon = 'd';
      };
    };
  };

  punch(target) {
    if (target.depthOfSleep === 2) {
      elements.msg = 'you punch the enemy, but he is sleeps. If you wanna wake him up, punch once more.';
      target.depthOfSleep -= 1;
    } else if (target.depthOfSleep === 1) {
      elements.msg = 'you punch the enemy and wakes him up!';
      target.wakedUp();
      target.depthOfSleep -= 1;
    };
    target.damaged(this.damage);
  };

  dig(y, x) {
    elements.msg += ' digging...';
    elements.map[y][x][0] = elements.floor;
  };
};
