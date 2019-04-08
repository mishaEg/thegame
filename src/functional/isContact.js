export default function isContact(target_one, target_two) {
    return target_one.positionX === target_two.positionX && target_one.positionY === target_two.positionY;
};