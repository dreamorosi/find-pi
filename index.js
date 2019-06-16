const findPi = require("./lib/findPi");

(async () => {
  try {
    let res = await findPi();
    console.log(res);
  } catch (error) {
    console.error(error);
  }
})();

module.exports = findPi;
