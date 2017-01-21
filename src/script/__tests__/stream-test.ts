import * as Immutable from "immutable";
import { List, Range, Map } from "immutable";
import { Cons, Empty, head, tail, take, ones, enumFrom } from "../stream";

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

  /*
  it("should return 2nd element", () => {
    const list = new Cons(1, new Cons(2, new Empty()));
    const actual = head(tail(list));
    expect(actual).toBe(2);
  });

  it("should return null if an empty list is applied tail function", () => {
    const list = new Empty();
    const actual = tail(list);
    expect(actual).toBeNull();
  });

  it("should return tranceformed list", () => {
    const list = new Cons(1, new Cons(2, new Cons(3, new Empty())));
    const actual = map(list, (x) => x * 2).toImList();
    expect(actual.equals(List.of(2, 4, 6))).toBeTruthy();
  });

  it("should return length of list", () => {
    const list = new Cons(1, new Cons(2, new Cons(3, new Empty())));
    const actual = length(list);
    expect(actual).toBe(3);
  });

  it("should return appended list", () => {
    const xs = new Cons(1, new Cons(2, new Cons(3, new Empty())));
    const ys = new Cons(4, new Cons(5, new Cons(6, new Empty())));
    const actual = append(xs, ys).toImList();
    expect(actual.equals(List.of(1, 2, 3, 4, 5, 6))).toBeTruthy();
  });

  it("should return reversed list", () => {
    const list = new Cons(1, new Cons(2, new Cons(3, new Empty())));
    const actual = reverse(list).toImList();
    expect(actual.equals(List.of(3, 2, 1))).toBeTruthy();
  });

  it("should return filtered list", () => {
    const list = new Cons(1, new Cons(2, new Cons(3, new Cons(4, new Cons(5, new Cons(6, new Empty()))))));
    const actual = filter(list, (x) => x % 2 === 0).toImList();
    expect(actual.equals(List.of(2, 4, 6))).toBeTruthy();
  });
  */

});
