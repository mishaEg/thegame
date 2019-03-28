/**
 * @description
 */
export default function moveObjectHeroInMap(inputMapObject, key) {
    let dx = 0,
        dy = 0,
        heroMoved = false;

    switch (key) {
        case "left": dx = -1; break;
        case "right": dx = 1; break;
        case "up": dy = -1; break;
        case "down": dy = 1; break;
        default: throw new Error("Невозможно обработать данное нажатие")
    }

    inputMapObject.forEach((currentRow, indexRow) => {
        currentRow.forEach((currentColumn, indexCol) => {
            if(currentColumn[currentColumn.length - 1].icon === "hero" && !heroMoved) {
                if (isWall(inputMapObject, indexRow + dy, indexCol + dx)) {
                    // return writeMessage("Невозможно пройти в данном направлении, там стена 0_0");
                    return console.log("Невозможно пройти в данном направлении, там стена 0_0");
                }
                const hero = currentColumn.pop();
                console.log(`indexRow + dy: ${indexRow + dy}, indexCol + dx: ${indexCol + dx}`);
                inputMapObject[indexRow + dy][indexCol + dx].push(hero);
                heroMoved = true;
            }
        })
    });
}

function isWall(map, y, x) {
    if (map[y][x][map[y][x].length - 1].icon === "wall") {
        return true
    } else return false
}