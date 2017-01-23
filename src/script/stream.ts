import * as Immutable from "immutable";
import * as List from "./list";
import { not, multipleOf } from "./combinator";

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

export const filter = <T>(p: (T) => boolean) =>
    (aStream: Stream<T>) =>
        match(aStream, {
            empty: () => new Empty<T>(),
            cons: (head: T, tailThunk: () => Stream<T>) =>
                p(head) ?
                    new Cons<T>(head, () => filter(p)(tailThunk())) :
                    filter(p)(tailThunk())
        });

export const remove = <T>(p: (T) => boolean) =>
    (aStream: Stream<T>) =>
        filter(not(p))(aStream);

export const ones: Stream<number> = new Cons(1, () => ones);

export const enumFrom: (n: number) => Stream<number> = (n: number) => new Cons(n, () => enumFrom(n + 1));

export const sieve = (aStream: Stream<number>): Stream<number> =>
    match(aStream, {
        empty: () => null,
        cons: (head: number, tailThunk: () => Stream<number>) =>
            new Cons(head, () =>
                sieve(
                    remove((item: number) => multipleOf(head)(item))(tailThunk())))
    });

