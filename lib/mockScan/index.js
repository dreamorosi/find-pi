const fs = require("fs").promises;
const path = require("path");

const oneFound = () =>
  new Promise(async (resolve, reject) => {
    try {
      let data = await fs.readFile(path.resolve(__dirname, "report.json"));
      resolve(JSON.parse(data));
    } catch (err) {
      reject(err);
    }
  });

module.exports = {
  scannedOne: oneFound
};
