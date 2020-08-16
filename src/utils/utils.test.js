import * as utils from "./utils";

describe("getEndpoint", () => {
  it(`Returns "test" for the input "fake\\url\\ending\\with\\test`, () => {
    expect(utils.getEndpoint("fake\\url\\ending\\with\\test")).toEqual("test");
  });

  it(`Returns the input when the string cannot be split`, () => {
    expect(utils.getEndpoint("test")).toEqual("test");
  });

  it(`Returns an empty string when the input is undefined`, () => {
    expect(utils.getEndpoint(undefined)).toEqual("");
  });
});

describe("randomIntOfLength", () => {
  it(`Returns an int with 10 digits`, () => {
    expect(utils.randomIntOfLength(10).toString().length).toEqual(10);
  });

  it(`Returns an int with 5 digits`, () => {
    expect(utils.randomIntOfLength(5).toString().length).toEqual(5);
  });
});

describe("asArray", () => {
  it(`Returns the input when the input is an array`, () => {
    expect(utils.asArray([1, 2, 3, 4])).toEqual([1, 2, 3, 4]);
  });

  it(`Returns an empty array when the input is falsy`, () => {
    expect(utils.asArray()).toEqual([]);
  });

  it(`Returns the input as an array when the input is not an array`, () => {
    expect(utils.asArray("test string literal")).toEqual(["test string literal"]);
  });
});

describe("titleCase", () => {
  it("converts a camelCase string to Title Case", () => {
    expect(utils.titleCase("camelCaseString")).toEqual("Camel Case String");
  });
});

describe("hasData", () => {
  it("returns false for empty strings", () => {
    expect(utils.hasData("  ")).toEqual(false);
  });

  it("returns false for empty arrays", () => {
    expect(utils.hasData([])).toEqual(false);
  });

  it("returns false for empty objects", () => {
    expect(utils.hasData({})).toEqual(false);
  });

  it("returns false for undefined", () => {
    expect(utils.hasData(undefined)).toEqual(false);
  });

  it("returns true for false boolean", () => {
    expect(utils.hasData(false)).toEqual(true);
  });

  it("returns true for numbers", () => {
    expect(utils.hasData(12323)).toEqual(true);
  });

  it("returns true for strings", () => {
    expect(utils.hasData("123123sdfsdf sdf   ")).toEqual(true);
  });
});

describe("isObject", () => {
  it("returns false for null", () => {
    expect(utils.isObject(null)).toBe(false);
  });

  it("returns false for undefined", () => {
    expect(utils.isObject(undefined)).toBe(false);
  });

  it("returns false for empty string", () => {
    expect(utils.isObject("")).toBe(false);
  });

  it("returns false for array", () => {
    expect(utils.isObject([])).toBe(false);
  });

  it("returns true for an object", () => {
    expect(utils.isObject({ one: 1, two: 2 })).toBe(true);
  });
});

describe("altDash", () => {
  it(`Returns the input when the input is truthy`, () => {
    expect(utils.altDash(10)).toEqual(10);
  });

  it(`Returns "--" when param 1 is falsy`, () => {
    expect(utils.altDash(undefined, 5)).toEqual("---");
  });
});

describe("altObj", () => {
  it(`Returns the input when the input is truthy`, () => {
    expect(utils.altObj(10)).toEqual(10);
  });

  it(`Returns an empty object when the input is falsy`, () => {
    expect(utils.altObj()).toEqual({});
  });
});

describe("altNull", () => {
  it(`Returns the input when the input is truthy`, () => {
    expect(utils.altNull(10)).toEqual(10);
  });

  it(`Returns null when the input is falsy`, () => {
    expect(utils.altNull("")).toEqual(null);
  });
});

describe("getRoleNamesArray", () => {
  it(`Returns an array of the object names when given an array of objects`, () => {
    const data = [
      { thing: 123, name: "one" },
      { thing: 125, name: "two" },
      { thing: 124, name: "three" }
    ];
    expect(utils.getRoleNamesArray(data)).toEqual(["One", "Two", "Three"]);
  });

  it(`Returns an empty array when the input is not an array`, () => {
    expect(utils.getRoleNamesArray("not an array")).toEqual([]);
  });
});
