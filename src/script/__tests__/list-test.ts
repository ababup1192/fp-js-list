import * as Immutable from "immutable";
import { List, Range, Map } from "immutable";
import { Cons, Empty, head, tail, toArray, map, length, append } from "../list";

describe("list", () => {
  it("should return first element", () => {
    const list = new Cons(1, new Cons(2, new Empty()));
    const actual = head(list);
    expect(actual).toBe(1);
  });

  it("should return null if an empty list is applied head function", () => {
    const emptyList = new Empty();
    const actual = head(emptyList);
    expect(actual).toBeNull();
  });

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
    const actual = Immutable.fromJS(toArray(map(list, (x) => x * 2)));
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
    const actual = Immutable.fromJS(toArray(append(xs, ys)));
    expect(actual.equals(List.of(1, 2, 3, 4, 5, 6))).toBeTruthy();
  });


});
