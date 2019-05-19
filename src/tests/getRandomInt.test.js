import getRandomInt from '../functional/utils/getRandomInt';

describe('Тесты функции getRandomInt', () => {
    it('Взятие целого числа из двух одинаковых', () => {
        expect(getRandomInt(1, 1)).toEqual(1)
    });

    it('Взятие целого числа из двух одинаковых отрицательных', () => {
        expect(getRandomInt(-1, -1)).toEqual(-1)
    });

    it('Взятие целого числа из заданного отрезка', () => {
        const randomInt = getRandomInt(1, 3);
        
        expect(randomInt <= 3).toEqual(true);
        expect(randomInt >= 1).toEqual(true);
    });

    it('Взятие целого числа из заданного отрицательного отрезка', () => {
        const randomInt = getRandomInt(-3, -1);
        
        expect(randomInt >= -3).toEqual(true);
        expect(randomInt <= -1).toEqual(true);
    });

    it('Взятие целого числа из заданного отрицательно-положительного отрезка', () => {
        const randomInt = getRandomInt(-3, 3);
        
        expect(randomInt >= -3).toEqual(true);
        expect(randomInt <= 3).toEqual(true);
    });

    it('Взятие целого числа из нуля', () => {
        expect(getRandomInt(0, 0)).toEqual(0);
    });

    it('Взятие целого числа отрезка в обратную сторону', () => {
        const randomInt = getRandomInt(3, 1);

        expect(randomInt >= 1).toEqual(true);
        expect(randomInt <= 3).toEqual(true);
    });
})
