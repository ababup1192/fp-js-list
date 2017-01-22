import { compose } from "../combinator";
import { Map } from "../map";

describe("map", () => {
  it("should return a value in a single Map", () => {
    const map = Map.set("C3PO", "Star Wars")(Map.empty());
    const actual = Map.get("C3PO")(map);
    expect(actual).toBe("Star Wars");
  });

  it("should return a value in a multiple Map", () => {
    const map = compose(
      Map.set("C3PO", "Star Wars"),
      Map.set("HAL9000", "2001: a space odessay")
    )(Map.empty());
    const actual = Map.get("HAL9000")(map);

    expect(actual).toBe("2001: a space odessay");
  });

});
