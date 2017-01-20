import { Num, Add, Mul, calculate } from "../number";

describe("number", () => {
  it("should return number", () => {
    const actual = calculate(new Num(10));
    expect(actual).toBe(10);
  });

  it("should return added number", () => {
    const actual = calculate(new Add(new Num(5), new Num(10)));
    expect(actual).toBe(15);
  });

 it("should return added number", () => {
    const actual = calculate(new Add(new Num(5), new Num(10)));
    expect(actual).toBe(15);
  });

 it("should return multiplied number", () => {
    const actual = calculate(new Mul(new Num(5), new Num(10)));
    expect(actual).toBe(50);
  });
});
