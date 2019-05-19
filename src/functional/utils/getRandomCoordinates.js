import elements from '../../data/elements';
import getRandomInt from './getRandomInt';

// Тут отсутствуют проверки на существование пола на карте по текущим координатам.
// Есть интересная возможность зациклиться всему приложению в этом месте.
export default function getRandomCoordinates(map) {
    const { floor } = elements;
    let findItemWithFloor = false,
        coordinateX,
        coordinateY;

    while (!findItemWithFloor) {
        coordinateX = getRandomInt(2, map[0].length - 1);
        coordinateY = getRandomInt(2, map.length - 1);

        const len = map[coordinateY][coordinateX].length - 1;

        if (map[coordinateY][coordinateX][len].icon === floor.icon) {
            findItemWithFloor = true;
        }
    }

    return {
        x: coordinateX,
        y: coordinateY
    };
}
