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

// TODO: Finish writing tests for fn.parseReport()
describe("Util parseReport", () => {
  const expectedEmpty = [];
  test("Empty report returns []", async () => {
    const res = await utils.parseReport({});
    expect(res).toEqual(expectedEmpty);
  });
  test("With host not in report[item] returns []", async () => {
    const passedReport = {
      "192.168.1.0": {}
    };
    const res = await utils.parseReport(passedReport);
    expect(res).toEqual(expectedEmpty);
  });
  test("Empty report[item].host returns []", async () => {
    const passedReport = {
      "192.168.1.0": {
        host: {}
      }
    };
    const res = await utils.parseReport(passedReport);
    expect(res).toEqual(expectedEmpty);
  });
  // `Empty report[item].host returns ${expectedEmpty}`
  // `With hostnames not in report[item].host[0] returns ${expectedEmpty}`
  // `With address not in report[item].host[0] returns ${expectedEmpty}`
  // `Empty report[item].host[0].hostnames returns ${expectedEmpty}`
  // `Empty report[item].host[0].address returns ${expectedEmpty}`
  // `With hostname not in report[item].host[0].hostnames returns ${expectedEmpty}`
  // `Empty report[item].host[0].hostnames[0].hostname[0] returns ${expectedEmpty}`
  // `With item not in report[item].host[0].hostnames[0].hostname[0] returns ${expectedEmpty}`
  // `With name not in report[item].host[0].hostnames[0].hostname[0].item returns ${expectedEmpty}`
  // `With item not in report[item].host[0].address[0] returns ${expectedEmpty}`
  // `With addr not in report[item].host[0].address[0].item returns ${expectedEmpty}`
});
