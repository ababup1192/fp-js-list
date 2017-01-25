import * as Immutable from "immutable";
import { compose } from "./combinator";

interface Pattern<T, R> {
    empty: () => R;
    cons: (head: T, tail: List<T>) => R;
}

export interface List<T> {
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

const match = <T, R>(data: List<T>, pattern: Pattern<T, R>) =>
    data.get(pattern);

export const isEmpty = <T, R>(alist) =>
    match<T, boolean>(alist, {
        empty: () => true,
        cons: (head, tail) => false
    });

export const head = <T>(alist: List<T>): T =>
    match(alist, {
        empty: () => null,
        cons: (head: T, tail: List<T>) => head
    });

export const tail = <T>(alist: List<T>): List<T> =>
    match(alist, {
        empty: () => null,
        cons: (head: T, tail: List<T>) => tail
    });

export const map = <T, U>(alist: List<T>, f: (T) => U): List<U> =>
    match(alist, {
        empty: () => new Empty<U>(),
        cons: (head: T, tail: List<T>) => new Cons<U>(f(head), map<T, U>(tail, f))
    });

export const filter = <T>(alist: List<T>, p: (T) => boolean): List<T> =>
    match(alist, {
        empty: () => new Empty<T>(),
        cons: (head: T, tail: List<T>) => p(head) ? new Cons(head, filter<T>(tail, p)) : filter(tail, p)
    });

export const toArray = <T>(alist: List<T>): Array<T> => {
    const toArrayHelper = (alist: List<T>, acc: Array<T>) =>
        match(alist, {
            empty: () => acc,
            cons: (head: T, tail: List<T>) => toArrayHelper(tail, acc.concat(head))
        });
    return toArrayHelper(alist, []);
};

export const sum = (alist: List<number>): number =>
    foldr<number, number>(alist)(0)((x: number) => (acc: number) =>
        acc + x);

export const length = <T>(alist: List<T>): number =>
    foldr<T, number>(alist)(0)((_) => (acc: number) => acc + 1);

export const append = <T>(xs: List<T>, ys: List<T>): List<T> =>
    match(xs, {
        empty: () => ys,
        cons: (head: T, tail: List<T>) => new Cons(head, append(tail, ys))
    });

export const reverse = <T>(list: List<T>) =>
    foldr<T, List<T>>(list)(new Empty<T>())((x: T) => (acc: List<T>) =>
        append<T>(acc, new Cons(x, new Empty<T>())));

export const last = <T>(alist: List<T>): T => compose<List<T>, List<T>, T>(head, reverse)(alist);

export const init = <T>(alist: List<T>): List<T> =>
    compose<List<T>, List<T>, List<T>>(compose<List<T>, List<T>, List<T>>(reverse, tail), reverse)(alist);

export const foldr = <T, U>(alist: List<T>) =>
    (acc: U) =>
        (f: (T) => (U) => U): U =>
            match(alist, {
                empty: () => acc,
                cons: (head: T, tail: List<T>) => f(head)(foldr(tail)(acc)(f))
            });

export const find = <T>(alist: List<T>) =>
    (p: (T) => boolean) =>
        foldr<T, T>(alist)(null)((x: T) =>
            (acc: T) =>
                p(x) ? x : acc
        );
        