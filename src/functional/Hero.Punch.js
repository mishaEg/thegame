/**
 * @description
 */

import EnemyGetDamage from '../functional/Enemy.getDamage';

export default function HeroPunch(inputTarget, inputHero) {

    const target = Object.assign(inputTarget), // клон объекта (не стейт)
        hero = Object.assign(inputHero);

    let msg = '',
        buffer = {};

    if (target.depthOfSleep > 0) {
        target.depthOfSleep -= 1;
    };

    if (target.depthOfSleep === 1) {
        msg = 'you punch the enemy, but he is sleeps. If you wanna wake him up, punch once more.';
    } else if (target.depthOfSleep === 0) {
        msg = 'you punch the enemy and wakes him up!';
        target.wakedUp();
    };

    buffer = EnemyGetDamage(target, hero);

    return {
        message: msg + buffer.message,
        target: buffer.target
    }
}