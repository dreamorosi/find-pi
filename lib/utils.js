const path = require("path");
const fs = require("fs").promises;
var Ajv = require("ajv");

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

const parseReport = async report => {
  let hosts = [];
  if (!Object.keys(report).length) {
    return hosts;
  }
  const ajv = new Ajv();
  const schema = await loadSchema();
  Object.keys(report).forEach(item => {
    if (
      ajv.validate(schema, report[item]) &&
      report[item].host[0].hostnames[0].hostname[0].item.name.match(
        /^raspberrypi/gm
      )
    ) {
      hosts.push(report[item].host[0].address[0].item.addr);
    }
  });
  return hosts;
};

const loadSchema = async () => {
  const schemaPath = path.resolve(__dirname, "schema.json");
  let schema = {};
  try {
    const buffer = await fs.readFile(schemaPath);
    schema = JSON.parse(buffer);
  } catch (err) {
    throw new Error(err);
  }
  return schema;
};

module.exports = {
  defaultOpts: defaultOpts,
  composeOptions: composeOptions,
  parseReport: parseReport
};

var Ajv = require("ajv");
var ajv = new Ajv();

/* var fs = require("fs");
var path = require("path");
fs.promises
  .readFile(path.resolve(__dirname, "schema.json"))
  .then(schema => {
    var data = {
      host: []
    };
    var valid = ajv.validate(JSON.parse(schema), data);
    if (!valid) {
      console.log(ajv.errors);
    } else {
      console.log("true");
    }
  })
  .catch(err => {
    throw new Error(err);
  });
 */
