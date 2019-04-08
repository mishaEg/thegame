/**
 * @description
 */
export default function EnemyGetDamage(inputCreature, inputHero) {

    const creature = Object.assign(inputCreature); // клон объекта (не стейт)

    let msg = '';

    creature.health -= inputHero.damage;
    console.log('enemy health:', creature.health);
    if (creature.health < 80 && creature.health > 60 && creature.status !== 'irritated') {
        msg += ' || enemy looks irritated by your punches!o:';
        creature.status = 'irritated';
        creature.damage = 25;
        creature.stamina += 2;
    } else if (creature.health < 60 && creature.status !== 'anger') {
        msg += ' || enemy becomes more anger!o:';
        creature.status = 'anger';
        creature.damage = 50;
        creature.stamina += 8;
    } else if (creature.health <= 0) {
        msg += ' => you killed the enemy!o:';
        creature.icon = 'd';
        creature.type = 'corpse';
    };

    return {
        target: creature,
        message: msg
    };
};