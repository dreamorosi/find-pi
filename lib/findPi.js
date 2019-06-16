const nmap = require("libnmap");

module.exports = async opts => {
  if (opts === undefined) {
    opts = {
      range: ["192.168.1.0/24"],
      timeout: 3
    };
  }

  nmap.scan(opts, function(err, report) {
    if (err) throw new Error(err);

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
  });
};
