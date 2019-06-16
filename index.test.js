const nmap = require("libnmap");
const fs = require("fs");
const path = require("path");
const utils = require("./lib/utils");
const findPi = require("./lib/findPi");

jest.mock("libnmap");

describe("Util composeOptions", () => {
  test("No object passed returns defaults", () => {
    expect(utils.composeOptions()).toEqual(utils.defaultOpts);
  });

  test("Empty object passed returns defaults", () => {
    expect(utils.composeOptions({})).toEqual(utils.defaultOpts);
  });

  test("Partial object passed returns composed object", () => {
    const passedRange = ["192.168.255.255"];
    const expectedA = JSON.parse(JSON.stringify(utils.defaultOpts));
    expectedA.range = passedRange;

    const passedTimeout = ["192.168.255.255"];
    const expectedB = JSON.parse(JSON.stringify(utils.defaultOpts));
    expectedB.timeout = passedTimeout;

    expect(utils.composeOptions({ range: passedRange })).toEqual(expectedA);
    expect(utils.composeOptions({ timeout: passedTimeout })).toEqual(expectedB);
  });

  test("Full object passed returns composed object", () => {
    const passedRange = ["192.168.255.0"];
    const passedTimeout = 10;
    const expected = {
      range: passedRange,
      timeout: passedTimeout
    };
    expect(utils.composeOptions(expected)).toEqual(expected);
  });
});

describe("Real stuff", () => {
  test("It works!", async () => {
    nmap.scan.mockImplementation(function foo(options, callback) {
      fs.promises
        .readFile(
          path.resolve(
            __dirname,
            path.join("lib", path.join("mockScan", "report.json"))
          )
        )
        .then(data => callback(null, JSON.parse(data)))
        .catch(err => {
          throw new Error(err);
        });
    });

    let c = await findPi();
    expect(c).toEqual(["192.168.1.65"]);
  });
});
