export const multipleOf = (n: number) =>
    (m: number) =>
        m % n === 0;

export const not = (predicate: (arg: number) => boolean) =>
    (arg: number) =>
        !predicate(arg);

export const even = multipleOf(2);
export const odd = not(even);

export const compose = <A, B, C>(f: (B) => C, g: (A) => B): (A) => C =>
    (arg: A): C =>
        f(g(arg));

export const opposite = (n: number) => - n;

export const Y = <A>(F: (A) => (A) =>  A) =>
    ((x: (A) => (A) => A) =>
        F((y: A) =>
            x(x)(y)
        )
    )((x: (A) => (A) => A) =>
        F((y: A) =>
            x(x)(y)
        ));