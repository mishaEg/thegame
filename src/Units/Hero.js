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
        this.poisoned = false;
        this.readyToMine = false;
    }
}
