import { List, Range, Map } from "immutable";
import {Cons, Empty, head, tail} from "../list";

describe("list", () => {
  it("should return first element", () => {
    const list = new Cons(1, new Cons(2, new Empty()));
    const actual = head(list);
    expect(actual).toBe(1);
  });
});
