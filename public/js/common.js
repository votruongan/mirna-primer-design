const pathway_link_prefix = "https://www.kegg.jp/kegg-bin/show_pathway?";

let raw_result = [[], []]; // 0: ref, 1: alt
let result_array = [[], []]; // 0: ref, 1: alt
let common_result = [];
let refSeqId = null;
let altSeqId = null;

function makeUrl(toSend, param = null) {
  let toUrl = window.location.href + toSend;
  if (param != null) toUrl = toUrl + "/" + param.toString();
  console.log(toUrl);
  return toUrl;
}

function makeXHR(toSend, param = null, callback = null) {
  const toUrl = makeUrl(toSend, param);
  let xhr = new XMLHttpRequest();
  xhr.open("GET", toUrl, true);
  if (callback) {
    xhr.addEventListener("load", callback);
    xhr.send();
  } else {
    return xhr;
  }
}

function getEle(id) {
  return document.getElementById(id);
}

function grandParent(ele) {
  return ele.parentNode.parentNode;
}

function takeGrandParentHeightPx(ele) {
  let raw = grandParent(ele).style.height;
  raw.substring(0, raw.length - 3);
  return parseInt(raw);
}

function changeHeight(x1, y1, x2, y2) {
  const dy = (y2 - y1) * 20;
  console.log(dy);
  let commonH = takeGrandParentHeightPx(common_result_display);
  let cH = takeGrandParentHeightPx(alenC_result);
  if (commonH + cH > 580) {
  }
  setGrandParentHeight(common_result_display, commonH - dy + "px");
  setGrandParentHeight(alenC_result, cH + dy + "px");
  setGrandParentHeight(alenG_result, cH + dy + "px");
}

function setObjectVisiblity(obj, value, visibleClass = "d-block") {
  if (value) {
    obj.classList.remove("d-none");
    obj.classList.add(visibleClass);
    return;
  }
  obj.classList.remove(visibleClass);
  obj.classList.add("d-none");
}

function setObjectActive(obj, value) {
  if (value) obj.removeAttribute("disabled");
  else obj.setAttribute("disabled", "true");
}
