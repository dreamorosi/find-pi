const defaultOpts = {
  range: ["192.168.1.0/24"],
  timeout: 3,
  ports: "22"
};

// TODO: Add internal-ip to determine default CIDR based on own ip (i.e. if internal-ip === 192.168.1.69 then scan 192.168.1.0/24)
const composeOptions = optionsArg => {
  const opts = JSON.parse(JSON.stringify(defaultOpts));
  for (let key in optionsArg) opts[key] = optionsArg[key];
  return opts;
};

module.exports = {
  defaultOpts: defaultOpts,
  composeOptions: composeOptions
};
