export class Enemy {
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
  };

  wakedUp() {
    this.status = 'awake';
    this.icon = 'awaken_enemy';
    this.stamina = 12;
  };

  regeneration() {
    if (this.health < 100 && this.health > 0) {
      this.health += 1;
    };
  };

  fallAsleep() {
    this.status = 'sleeping';
    this.icon = 'sleeping_enemy';
    this.depthOfSleep = 2;
  };
}