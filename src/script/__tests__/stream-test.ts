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

});
