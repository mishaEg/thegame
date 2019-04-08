import elements from '../data/elements';
import getRandomInt from './getRandomInt';

export default function getRandomCoordinates(inputMap) {
    
    const { floor } = elements;

    for (let counter = 0; counter < 1; counter++) {
        let x = getRandomInt(2, inputMap[0].length - 1),
            y = getRandomInt(2, inputMap.length - 1),
            len = inputMap[y][x].length - 1;

        if (inputMap[y][x][len].icon !== floor.icon) {
            counter--;
        } else {
            return {
                x: x,
                y: y
            };
        };
    }
};