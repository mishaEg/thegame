export default class Enemy {
    constructor(positionX, positionY) {
        this.positionX = positionX;
        this.positionY = positionY;
        this.icon = 'sleeping_enemy';
        this.health = 100;
        this.depthOfSleep = 2;
        this.stamina = 0;
        this.damage = 20;
        this.status = 'sleeping';
        this.type = 'enemy';
    }

    wakedUp() {
        this.status = 'awake';
        this.icon = 'awaken_enemy';
        this.stamina = 12;
    }

    getDamage(damage) {
        if (+damage) {
            this.health = this.health - damage;
            if (this.status !== 'sleeping') {
                this.stamina = 12;
            }
            if (this.depthOfSleep === 1) {
                this.wakedUp();
            }
            if (this.depthOfSleep !== 0) {
                this.depthOfSleep -= 1;
            }
        } else {
            throw new Error('damage is not a number');
        }
    }

    regeneration() {
        if (this.health < 100 && this.health > 0) {
            this.health += 1;
        }
    }

    fallAsleep() {
        this.status = 'sleeping';
        this.icon = 'sleeping_enemy';
        this.depthOfSleep = 2;
    }
}
