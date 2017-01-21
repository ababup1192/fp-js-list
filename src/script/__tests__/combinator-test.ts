import { even, odd } from "../combinator";

describe("combinator", () => {
  it("should return true if even function take even number", () => {
    const actual = even(2);
    expect(actual).toBeTruthy();
  });

  it("should return false if even function take odd number", () => {
    const actual = even(3);
    expect(actual).toBeFalsy();
  });

  it("should return true if odd function take odd number", () => {
    const actual = odd(3);
    expect(actual).toBeTruthy();
  });

  it("should return false if odd function take odd number", () => {
    const actual = odd(4);
    expect(actual).toBeFalsy();
  });

});
