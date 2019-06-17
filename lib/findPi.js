const promisify = require("util").promisify;
const nmap = require("libnmap");
const utils = require("./utils");

// TODO: add ping to mDNS as preferred way of discovery using options
module.exports = opts =>
  new Promise(async (resolve, reject) => {
    const options = utils.composeOptions(opts);
    const scanAsync = promisify(nmap.scan);

    let report = [];
    try {
      report = await scanAsync(options);
    } catch (err) {
      reject(err);
    }

    const hosts = await utils.parseReport(report);
    resolve(hosts);
  });
