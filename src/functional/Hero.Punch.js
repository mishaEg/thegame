/**
 * @description
 */

import EnemyGetDamage from '../functional/Enemy.getDamage';

export default function HeroPunch(target, hero) {
    let msg = '';

    if (target.depthOfSleep > 0) {
        target.depthOfSleep -= 1;
    };

    if (target.depthOfSleep === 1) {
        msg = 'you punch the enemy, but he is sleeps. If you wanna wake him up, punch once more.';
    } else if (target.depthOfSleep === 0) {
        msg = 'you punch the enemy and wakes him up!';
        target.wakedUp();
    };

    const messageOfGetDamage = EnemyGetDamage(target, hero);

    return {
        message: msg + messageOfGetDamage,
        target: target
    }
}