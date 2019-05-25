export default class Enemy {
    constructor(positionX, positionY) {
        this.positionX = positionX;
        this.positionY = positionY;
        this.icon = 'sleeping_enemy';
        this.health = 100;
        this.depthOfSleep = 2;
        this.stamina = 0;
        this.damage = 50;
        this.status = 'sleeping';
        this.type = 'enemy';
    }

    wakedUp() {
        this.status = 'awake';
        this.icon = 'awaken_enemy';
        this.stamina = 20;
        this.depthOfSleep = 0;
    }

    fallAsleep() {
        this.status = 'sleeping';
        this.icon = 'sleeping_enemy';
        this.depthOfSleep = 2;
    }

    regeneration() {
        if (this.health < 100 && this.health > 0) {
            this.health += 1;
            this.checkTemper();
        }
    }

    checkTemper() {
        if (this.status !== 'sleeping') {
            switch (true) {
                case (this.health >= 50 && this.health < 90):
                    this.irritation();
                    break;
                case (this.health >= 20 && this.health < 50):
                    this.rage();
                    break;
                case (this.health < 20):
                    this.humility();
                    break;
                default: break;
            }
        }
    }

    getDamage(damage) {
        if (+damage) {
            this.health = this.health - damage;
            if (this.health <= 0) {
                this.dead();
                return;
            }
            if (this.depthOfSleep === 1) {
                this.wakedUp();
            }
            this.checkTemper();
            if (this.depthOfSleep !== 0) {
                this.depthOfSleep -= 1;
            }
        } else {
            throw new Error('damage is not a number');
        }
    }

    irritation() {
        this.status = 'irritation';
        this.damage = 60;
        this.stamina = 30;
    }

    rage() {
        this.status = 'rage';
        this.damage = 100;
        this.stamina = 40;
    }

    humility() {
        this.status = 'humility';
        this.damage = 10;
        this.stamina = 6;
    }

    changePosition(newPositionX, newPositionY) {
        this.positionX = newPositionX;
        this.positionY = newPositionY;
    }

    move(newPositionX, newPositionY) {
        this.positionX = newPositionX;
        this.positionY = newPositionY;
        this.tired();
    }

    dead() {
        this.status = 'dead';
    }

    tired() {
        if (this.stamina > 0) {
            this.stamina -= 2;
        } else if (this.stamina === 0) {
            this.fallAsleep();
        }
    }
}
