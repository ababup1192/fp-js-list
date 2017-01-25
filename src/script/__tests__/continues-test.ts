import { identity, succ, add } from "../continues";

describe("continues", () => {
    it("should return succ number", () => {
        const actual = succ(3, identity);
        expect(actual).toBe(4);
    });

    it("should return number which compose succ and add", () => {
        const actual = succ(3, (succResult: number) =>
            add(2, succResult, identity));
        expect(actual).toBe(6);
    });

});
