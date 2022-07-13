const avgRPC = require("./avg");
const sumRPC = require("./sum");
const facRPC = require("./factors");
const maxRPC = require("./max");

module.exports = {
  sum: sumRPC,
  avg: avgRPC,
  fac: facRPC,
  max: maxRPC,
};
