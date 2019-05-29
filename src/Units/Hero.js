export default class Hero {
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
        this.countOfPoison = 0;
        this.readyToMine = false;
    }

    effectsHandler() {
        if (this.countOfPoison > 0) {
            this.health -= this.countOfPoison;
        }
    }

    eat() {
        this.health += 100;
        this.countOfPoison += 1;
    }

    takeWeapon(weapon) {
        this.weapon = weapon;
        this.damage += weapon.damage;
    }

    dropWeapon() {
        this.damage -= this.weapon.damage;
        this.weapon = {
            name: 'none'
        };
    }

    takeShield(shield) {
        this.shield = shield;
        this.defence += shield.defence;
    }

    dropShield() {
        this.defence -= this.shield.defence;
        this.shield = {
            name: 'none'
        };
    }

    changeCoordinates(x, y) {
        this.positionX = x;
        this.positionY = y;
    }
}
