interface Pattern<T, R> {
    empty: () => R;
    cons: (head: T, tail: List<T>) => R;
}

interface List<T> {
    get<R>(pattern: Pattern<T, R>): R;
};

export class Empty<T> implements List<T> {
    get<R>(pattern: Pattern<T, R>) {
        return pattern.empty();
    }
}

export class Cons<T> implements List<T> {
    private value: T;
    private list: List<T>;

    constructor(value: T, list: List<T>) {
        this.value = value;
        this.list = list;
    }

    get<R>(pattern: Pattern<T, R>) {
        return pattern.cons(this.value, this.list);
    }
}

export const match = <T, R>(data: List<T>, pattern: Pattern<T, R>) =>
    data.get(pattern);

export const isEmpty = <T, R>(alist) =>
    match<T, boolean>(alist, {
        empty: () => true,
        cons: (head, tail) => false
    });

export const head = <T>(alist: List<T>) =>
    match(alist, {
        empty: () => null,
        cons: (head: T, tail: List<T>) => head
    });

export const tail = <T>(alist: List<T>) =>
    match(alist, {
        empty: () => null,
        cons: (head: T, tail: List<T>) => tail
    });

export const map = <T, U>(alist: List<T>, f: (T) => U): List<U> =>
    match(alist, {
        empty: () => new Empty(),
        cons: (head: T, tail: List<T>) => new Cons(f(head), map<T, U>(tail, f))
    });

const toArray = <T>(alist: List<T>): Array<T> => {
    const toArrayHelper = (alist: List<T>, acc: Array<T>) =>
        match(alist, {
            empty: () => acc,
            cons: (head: T, tail: List<T>) => toArrayHelper(tail, acc.concat(head))
        });
    return toArrayHelper(alist, []);
};