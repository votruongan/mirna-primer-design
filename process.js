const fs = require("fs");

const process = {};

function prepareHsaMiR() {
  console.log("reading MIMAT_strip.tsv to parse hsa-miR to sequence");
  const res = {};
  const tsvData = fs
    .readFileSync("./MIMAT_strip.tsv", { encoding: "ascii" })
    .split(/\r?\n/g)
    .filter((val) => val.length > 0)
    .map((val) => val.split("\t"))
    .forEach((ln) => (res[ln[1]] = ln[2]));
  console.log("  hsa-miR to sequence parsed");
  return res;
}
process.hmSeqObject = prepareHsaMiR();

module.exports = process;
