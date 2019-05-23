// Возвращает случайное целое число между min (включительно) и max (включительно)
export default function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
