import { even, odd, compose, opposite, Y } from "../combinator";

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

  it("should be able to compose", () => {
    const f = (x: number) => x * x + 1;
    const g = (x: number) => x - 2;

    expect(compose(f, g)(2)).toBe(f(g(2)));
  });

  it("should return original number", () => {

    expect(compose(opposite, opposite)(2)).toBe(2);
  });

  it("should return added and opsited number", () => {
    const add = (x: number) => (y: number) => x + y;

    expect(compose(opposite, add(2))(3)).toBe(-5);
  });

  it("should return factrial number", () => {
    const factrail = Y((fact: (n: number) => number) =>
      (n: number) =>
        n === 0 ? 1 : n * fact(n - 1)
    );

    expect(factrail(3)).toBe(6);
  });

});
