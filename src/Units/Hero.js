import elements from '../data/elements';

export class Hero {
    constructor(positionX, positionY) {
        this.positionX = positionX;
        this.positionY = positionY;
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

    pickUp(y, x) {
        var item = elements.map[y][x][elements.map[y][x].length - 1];

        if (item.type !== undefined) {
            switch (item.type) {
                case 'weapon':
                    if (this.weapon.name !== 'none') {
                        elements.map[y][x][elements.map[y][x].length - 1] = this.weapon;
                    } else {
                        elements.map[y][x].pop();
                    };
                    this.damage = item.damage;
                    this.weapon = item;
                    elements.msg = 'you picked up the ' + item.name;
                    break;
                case 'shield':
                    if (this.shield.name !== 'none') {
                        elements.map[y][x][elements.map[y][x].length - 1] = this.shield;
                    } else {
                        elements.map[y][x].pop();
                    };
                    this.defence = item.defence;
                    this.shield = item;
                    elements.msg = 'you picked up the ' + item.name;
                    break;
                case 'money':
                    elements.map[y][x].pop();
                    this.money += item.cost;
                    elements.msg = 'you picked up the ' + item.name;
                    break;
                case 'corpse':
                    this.health += 100;
                    elements.msg = 'you eat the corpse. Enemy blood fills up your siol. Somthing gose wrong...';
                    this.poisoned = true;
                    break;
                default:
                    elements.msg = 'you pick up something usless';
                    break;
            };
        } else elements.msg = 'there is nothing to pick up';
    };

    dig(y, x) {
        elements.msg += ' digging...';
        elements.map[y][x][0] = elements.floor;
    };
};
