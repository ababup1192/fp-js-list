const multipleOf = (n: number) =>
    (m: number) =>
        m % n === 0;

const even = multipleOf(2);
const not = (predicate: (n: number) => boolean) =>
    (arg: number) =>
        !predicate(arg);

const odd = not(even);