let inputSequence,
  oldInput = {};

async function getPrimerHM() {
  setObjectVisiblity(inputError, false);
  try {
    inputSequence = await (
      await fetch(`sequence/hsa-miR-${seqInput.value}`)
    ).text();
    if (!inputSequence || inputSequence === "")
      throw Error("No sequence found for above hsa-miR ID");
  } catch (e) {
    setObjectVisiblity(inputError, true);
    isErrorDisplay = true;
    inputError.textContent = e.message;
    return;
  }
  execPrimerDesign();
}

function getPrimer() {
  inputSequence = seqInput.value;
  execPrimerDesign();
}

const stlpTemplate = "GTCGTATCCAGTGCAGGGTCCGAGGTATTCGCACTGGATACGAC";
const reverseTemplate = "GTGCAGGGTCCGAGGT";
function execPrimerDesign() {
  oldInput.type = inputHeader.value;
  oldInput.seq = seqInput.value;
  activeTable(true);
  inputSequence = inputSequence.toUpperCase();
  const iSLen = inputSequence.length;
  let converted = convertRNADNA(inputSequence);
  let stlp = converted.slice(iSLen - 6);
  stlp = stlpTemplate + stlp.reverse().join("");
  let fwd = converted.slice(0, iSLen - 6).join("");
  //display
  setObjectVisiblity(resultPanel, true);
  resultDisplay.innerHTML = makeResultRow("Sequence", inputSequence);
  resultDisplay.innerHTML += makeResultRow("Stemloop", stlp);
  resultDisplay.innerHTML += makeResultRow("Forward", fwd);
  resultDisplay.innerHTML += makeResultRow("Reverse", reverseTemplate);
}

function compareOldTable(type, seq) {
  return activeTable(oldInput.type == type && oldInput.seq == seq);
}

function activeTable(val = true) {
  if (!val) return resultDisplay.parentNode.classList.add("disabled");
  resultDisplay.parentNode.classList.remove("disabled");
}

let oldType = "";
function changeInputType(iHeader) {
  const hdlr = iHeader.value;
  if (!hdlr || hdlr == oldType) return;
  seqInput.value = "";
  inputSequence = "";
  btnGetPrimer.setAttribute("onclick", `${hdlr}()`);
  compareOldTable(iHeader.value, seqInput.value);
}

let isErrorDisplay = false;
function changeSeq(seq) {
  if (isErrorDisplay) {
    setObjectVisiblity(inputError, false);
    isErrorDisplay = false;
  }
  if (inputHeader.value == "getPrimer") {
    const last = seqInput.value.length - 1;
    if (!/[aAuUgGcC]/g.test(seqInput.value[last])) {
      const tmp = seqInput.value.split("");
      tmp.splice(tmp.length - 1, 1);
      seqInput.value = tmp.join("");
    }
  }
  compareOldTable(inputHeader.value, seqInput.value);
}

//init call to function
changeInputType(inputHeader);
