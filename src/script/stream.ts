import * as Immutable from "immutable";
import * as List from "./list";

interface Pattern<T, R> {
    empty: () => R;
    cons: (head: T, tailThunk: () => Stream<T>) => R;
}

interface Stream<T> {
    get<R>(pattern: Pattern<T, R>): R;
    toList(): List.List<T>;
    toImList(): Immutable.List<T>;
};


export class Empty<T> implements Stream<T> {
    get<R>(pattern: Pattern<T, R>) {
        return pattern.empty();
    }

    toList(): List.List<T> {
        return new List.Empty<T>();
    }

    toImList(): Immutable.List<T> {
        return Immutable.List<T>();
    }
}

export class Cons<T> implements Stream<T> {
    private head: T;
    private tailThunk: () => Stream<T>;

    constructor(head: T, tailThunk: () => Stream<T>) {
        this.head = head;
        this.tailThunk = tailThunk;
    }

    get<R>(pattern: Pattern<T, R>) {
        return pattern.cons(this.head, this.tailThunk);
    }

    toList(): List.List<T> {
        const toList = (stream: Stream<T>) =>
            match(stream, {
                empty: () => new List.Empty(),
                cons: (head: T, tailThunk: () => Stream<T>) => new List.Cons(head, toList(tailThunk()))
            });
        return toList(this);
    }

    toImList(): Immutable.List<T> {
        return Immutable.fromJS(List.toArray(this.toList()));
    }
}

const match = <T, R>(stream: Stream<T>, pattern: Pattern<T, R>) =>
    stream.get(pattern);

export const isEmpty = <T, R>(stream: Stream<T>) =>
    match<T, boolean>(stream, {
        empty: () => true,
        cons: (head, tailThunk) => false
    });

export const head = <T>(stream: Stream<T>) =>
    match(stream, {
        empty: () => null,
        cons: (head: T, tailThunk: () => Stream<T>) => head
    });

export const tail = <T>(stream: Stream<T>) =>
    match(stream, {
        empty: () => null,
        cons: (head: T, tailThunk: () => Stream<T>) => tailThunk()
    });

export const take = <T>(stream: Stream<T>, n: number): Stream<T> =>
    match(stream, {
        empty: () => new Empty<T>(),
        cons: (head: T, tailThunk: () => Stream<T>) =>
            n === 0 ?
                new Empty<T>() :
                new Cons(head, () => take(tailThunk(), (n - 1)))

    });

/*
export const toArray = <T>(stream: Stream<T>): Array<T> => {
    const toArrayHelper = (stream: Stream<T>, acc: Array<T>) =>
        match(stream, {
            empty: () => acc,
            cons: (head: T, tail: Stream<T>) => toArrayHelper(tail, acc.concat(head))
        });
    return toArrayHelper(stream, []);
};
*/

/*
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
*/

export const ones: Stream<number> = new Cons(1, () => ones);

export const enumFrom: (n: number) => Stream<number> = (n: number) => new Cons(n, () => enumFrom(n + 1));


