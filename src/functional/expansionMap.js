/**
 * @description
 */

 import elements from '../data/elements'

export default function expansionMap(x, y, dx, dy, inputMap, inputHero, gex, replasments) {

    let map = Object.assign(inputMap),
        hero = Object.assign(inputHero); // клон объекта (не стейт)

    let { emptySpace } = elements;

    for (var i in dy) {
        var newY = y + dy[i],
          newX = x + dx[i];
        if (map[newY] === undefined) {
          var line = [];
          for (var l in map[hero.positionY]) {
            line[l] = [emptySpace];
          };
          line[newX] = [gex];
          if (newY < 0) { //добавление новой линии к карте сверху
            map.splice(0, 0, line);
            hero.positionY += 1;
            // for (var i in creatures) {
            //   creatures[i].positionY += 1;
            // };
            y += 1;
          } else if (newY > map.length - 1) { //добавление новой линии к карте снизу
            map.splice(newY, 0, line);
          };
        } else if (map[newY][newX] === undefined) {
          if (newX < 0) { //добавление новой клетки к карте слева
            for (var l in map) {
              map[l].splice(0, 0, [emptySpace]);
            };
            map[newY][0][0] = gex;
            // for (var i in creatures) {
            //   creatures[i].positionX += 1;
            // };
            hero.positionX += 1;
            x += 1;
          } else { //добавление новой клетки к карте справа
            for (var l in map) {
              map[l][newX] = [emptySpace];
            };
            map[newY][newX][0] = gex;
          };
        } else {
          for (var k in replasments) {
            if (map[newY][newX][0] === replasments[k]) {
              map[newY][newX][0] = gex;
            };
          };
        };
      };

    return {
        hero: hero,
        map: map
    };
};