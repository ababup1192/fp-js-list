const multipleOf = (n: number) =>
    (m: number) =>
        m % n === 0;


const not = (predicate: (n: number) => boolean) =>
    (arg: number) =>
        !predicate(arg);

export const even = multipleOf(2);
export const odd = not(even);