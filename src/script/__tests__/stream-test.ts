import * as Immutable from "immutable";
import { List, Range, Map } from "immutable";
import {
  Stream, Cons, Empty, head, tail, take, ones, enumFrom, filter,
  find, FindFailure, FindSuccess, remove, sieve
} from "../stream";

import { identity } from "../continues";

describe("stream", () => {
  it("should return first element", () => {
    const stream = new Cons(1, () => new Cons(2, () => new Empty()));
    const actual = head(stream);
    expect(actual).toBe(1);
  });

  it("should return 1's list", () => {
    const actual = take(ones, 5).toImList();
    expect(actual.equals(List.of(1, 1, 1, 1, 1))).toBeTruthy();
  });

  it("should return even numbers", () => {
    const actual = take(filter((x: number) => x % 2 === 0)(enumFrom(2)), 5).toImList();
    expect(actual.equals(List.of(2, 4, 6, 8, 10))).toBeTruthy();
  });

  it("should return odd numbers from 3", () => {
    const actual = take(remove((x: number) => x % 2 === 0)(enumFrom(2)), 5).toImList();
    expect(actual.equals(List.of(3, 5, 7, 9, 11))).toBeTruthy();
  });

  it("should return primes", () => {
    const actual = take(sieve(enumFrom(2)), 6).toImList();
    expect(actual.equals(List.of(2, 3, 5, 7, 11, 13))).toBeTruthy();
  });

  it("should return find number", () => {
    const continuesOnSuccess: FindSuccess = identity;
    const continuesOnFailure: FindFailure = <T>(aStream: Stream<T>, p: (T) => boolean,
      continuesOnRecursion: FindFailure,
      escapesFromRecursion: FindSuccess) =>
      find(aStream, p, continuesOnRecursion, escapesFromRecursion);
    const integers = enumFrom(0);

    const actual = find(integers, (x: number) => x === 100,
      continuesOnFailure, continuesOnSuccess);
    expect(actual).toBe(100);
  });

});