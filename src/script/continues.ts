export const identity = <T>(value: T) => value;

export const succ = (n: number, continues: (n: number) => number) =>
    continues(n + 1);

export const add = (n: number, m: number, continues: (n: number) => number) =>
    continues(n + m);
