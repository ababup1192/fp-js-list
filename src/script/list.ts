import * as Immutable from "immutable";

interface Pattern<T, R> {
    empty: () => R;
    cons: (head: T, tail: List<T>) => R;
}

interface List<T> {
    get<R>(pattern: Pattern<T, R>): R;
    toImList(): Immutable.List<T>;
};

export class Empty<T> implements List<T> {
    get<R>(pattern: Pattern<T, R>) {
        return pattern.empty();
    }

    toImList(): Immutable.List<T> {
        return Immutable.List<T>();
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

    toImList(): Immutable.List<T> {
        return Immutable.fromJS(toArray(this));
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

export const toArray = <T>(alist: List<T>): Array<T> => {
    const toArrayHelper = (alist: List<T>, acc: Array<T>) =>
        match(alist, {
            empty: () => acc,
            cons: (head: T, tail: List<T>) => toArrayHelper(tail, acc.concat(head))
        });
    return toArrayHelper(alist, []);
};

export const length = <T>(alist: List<T>): number =>
    match(alist, {
        empty: () => 0,
        cons: (head: T, tail: List<T>) => 1 + length(tail)
    });

export const append = <T>(xs: List<T>, ys: List<T>): List<T> =>
    match(xs, {
        empty: () => ys,
        cons: (head: T, tail: List<T>) => new Cons(head, append(tail, ys))
    });

export const reverse = <T>(list: List<T>): List<T> => {
    const reverseHelper = (list, acc) =>
        match(list, {
            empty: () => acc,
            cons: (head: T, tail: List<T>) => reverseHelper(tail, new Cons(head, acc))
        });
    return reverseHelper(list, new Empty());
}

