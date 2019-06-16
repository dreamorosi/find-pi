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

    const passedPorts = "22";
    const expectedC = JSON.parse(JSON.stringify(utils.defaultOpts));
    expectedC.ports = passedPorts;

    expect(utils.composeOptions({ range: passedRange })).toEqual(expectedA);
    expect(utils.composeOptions({ timeout: passedTimeout })).toEqual(expectedB);
    expect(utils.composeOptions({ ports: passedPorts })).toEqual(expectedC);
  });

  test("Full object passed returns composed object", () => {
    const expected = {
      range: ["192.168.255.0"],
      timeout: 10,
      ports: "80"
    };
    expect(utils.composeOptions(expected)).toEqual(expected);
  });
});

// TODO: Finish writing test for main module
// No found
// One found
// Multiple found
// TODO: Extract mock implementation
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

// TODO: Write tests for fn.parseReport() and extract it as utility
