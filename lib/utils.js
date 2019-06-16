const defaultOpts = {
  range: ["192.168.1.0/24"],
  timeout: 3
};

const composeOptions = optionsArg => {
  const opts = JSON.parse(JSON.stringify(defaultOpts));
  for (let key in optionsArg) opts[key] = optionsArg[key];
  return opts;
};

module.exports = {
  defaultOpts: defaultOpts,
  composeOptions: composeOptions
};
