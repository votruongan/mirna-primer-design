function convertRNADNA(seq) {
  const len = seq.length;
  return seq.split("").map((nuc) => convertNucleRNA(nuc));
}

function convertNucleRNA(n) {
  return n == "A" ? "T" : n == "U" ? "A" : n == "G" ? "C" : "G";
}
