const promisify = require("util").promisify;
const nmap = require("libnmap");
const composeOptions = require("./utils").composeOptions;

const parseReport = report => {
  let hosts = [];
  for (let item in report) {
    if (
      !report[item].host ||
      !report[item].host.length ||
      !report[item].host[0].hostnames ||
      !report[item].host[0].address ||
      !report[item].host[0].hostnames.length ||
      !report[item].host[0].address.length ||
      !report[item].host[0].hostnames[0].hostname ||
      !report[item].host[0].hostnames[0].hostname.length ||
      !report[item].host[0].hostnames[0].hostname[0].item ||
      !report[item].host[0].address[0].item ||
      !report[item].host[0].hostnames[0].hostname[0].item.name ||
      !report[item].host[0].address[0].item.addr
    ) {
      continue;
    }

    if (
      !report[item].host[0].hostnames[0].hostname[0].item.name.match(
        /^raspberrypi/gm
      )
    ) {
      continue;
    }
    hosts.push(report[item].host[0].address[0].item.addr);
  }
  return hosts;
};

module.exports = opts =>
  new Promise(async (resolve, reject) => {
    const options = composeOptions(opts);
    const scanAsync = promisify(nmap.scan);

    let report = [];
    try {
      report = await scanAsync(options);
    } catch (err) {
      reject(err);
    }

    const hosts = parseReport(report);
    resolve(hosts);
  });
