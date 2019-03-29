/**
 * @description
 */
export default function HeroMove(inputMapObject, hero, key) {
    let dx = 0,
        dy = 0;
  
    console.log('hero move');

    switch (key) {
        case "left": dx = -1; break;
        case "right": dx = 1; break;
        case "up": dy = -1; break;
        case "down": dy = 1; break;
        default: throw new Error("Невозможно обработать данное нажатие")
    };

    if(inputMapObject[hero.positionY][hero.positionX].icon === "hero") {
        if (isWall(inputMapObject, hero.positionY + dy, hero.positionX + dx)) {
            // return writeMessage("Невозможно пройти в данном направлении, там стена 0_0");
            return console.log("Невозможно пройти в данном направлении, там стена 0_0");
        } else {
          inputMapObject[hero.positionY][hero.positionX].pop();
          hero.positionY += dy;
          hero.positionX += dx;
          console.log('new hero position:', hero.positionY, hero.positionX);
          inputMapObject[hero.positionY][hero.positionX].push(hero);
        }
        
    }
}

function isWall(map, y, x) {
    if (map[y][x][map[y][x].length - 1].icon === "wall") {
        return true
    } else return false
}