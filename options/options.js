class ParameterSet {
  constructor(checktype, url, message) {
    this.checktype = checktype;
    this.url = url;
    this.message = message;
  }
}

function newFormLabel(forProperty, value, index) {
  let forString = forProperty + "-" + index.toString();
  let labelElement = document.createElement("LABEL");
  labelElement.htmlFor = forString;
  labelElement.innerText = value;

  return labelElement;
}

function newFormSelect(selectedOption, index) {
  let containerDiv = document.createElement("DIV");
  containerDiv.classList.add("select-div", "parameter-div");

  let selectElement = document.createElement("SELECT");
  selectElement.classList.add("parameter-checktype");
  let idString = "checktype-" + index.toString();
  selectElement.id = idString;
  let remindOption = document.createElement("OPTION");
  remindOption.value = "remind";
  remindOption.innerText = "remind before entering";
  if (selectedOption == "remind") remindOption.selected = true;
  let blockOption = document.createElement("OPTION");
  blockOption.value = "block";
  blockOption.innerText = "block";
  if (selectedOption == "block") blockOption.selected = true;
  selectElement.appendChild(remindOption);
  selectElement.appendChild(blockOption);

  containerDiv.innerText = "what website would you like to ";
  containerDiv.appendChild(selectElement);
  containerDiv.innerHTML += "?";

  return containerDiv;
}

function newFormText(elemClass, elemIdWOIndex, value, index, divClass) {
  let inputElement = document.createElement("INPUT");
  inputElement.setAttribute("type", "text");
  inputElement.classList.add(elemClass);
  let idString = elemIdWOIndex + "-" + index.toString();
  inputElement.id = idString;
  inputElement.value = value;

  return inputElement;
}

function newParameterSetRemoveButton() {
  let buttonElement = document.createElement("BUTTON");
  buttonElement.innerText = "Remove";
  buttonElement.classList.add("remove-parameter-set");
  buttonElement.addEventListener("click", removeParameterSet);

  return buttonElement;
}

function newParameterSetDiv(parameterObject, index) {
  let containerDiv = document.createElement("DIV");
  containerDiv.classList.add("parameter-set");
  
  containerDiv.appendChild(newFormSelect(parameterObject.checktype, index));
  
  let urlDiv = document.createElement("DIV");
  urlDiv.classList.add("url-div", "parameter-div");
  urlDiv.appendChild(newFormLabel("URL-to-check", "url:", index));
  urlDiv.appendChild(newFormText("parameter-url", "URL-to-check", parameterObject.url, index));
  containerDiv.appendChild(urlDiv);

  let messageDiv = document.createElement("DIV");
  messageDiv.classList.add("message-div", "parameter-div");
  messageDiv.appendChild(newFormLabel("message-to-display", "message:", index));
  messageDiv.appendChild(newFormText("parameter-message", "message-to-display", parameterObject.message, index));
  containerDiv.appendChild(messageDiv);

  containerDiv.appendChild(newParameterSetRemoveButton());

  return containerDiv;
}

function addNewParameterSetOption(e) {
  pSetsDiv = document.getElementById("psets");
  pSetsAry = pSetsDiv.getElementsByClassName("parameter-set");
  lastPSet = pSetsAry[pSetsAry.length - 1];
  clonedPSet = lastPSet.cloneNode(true);
  pSetsDiv.appendChild(clonedPSet);
  e.preventDefault();
}

function removeParameterSet(e) {
  console.log("e is:");
  console.log(e);
  console.log("this is:");
  console.log(this);
  console.log("parent is:");
  console.log(this.parentElement);
  this.parentElement.remove();
  e.preventDefault();
}

function saveOptions(e) {
  let userParameterSetList = [];
  let parameterSets = document.querySelectorAll("div.parameter-set");
  parameterSets.forEach((pset) => {
    let checktype = pset.getElementsByClassName("parameter-checktype")[0].value;
    let url = pset.getElementsByClassName("parameter-url")[0].value;
    let message = pset.getElementsByClassName("parameter-message")[0].value;
    let newParameterSet = new ParameterSet(checktype, url, message);
    userParameterSetList.push(newParameterSet);
  });

  let storageEvent = browser.storage.sync.set({
    userParameterSets: userParameterSetList
  });
  storageEvent.then((res) => {
    displayFlashMessage("Preferences saved :)");
  });
  console.log("Saved");
  e.preventDefault();
}

function restoreOptions() {
  let syncStorageItem = browser.storage.sync.get();
  syncStorageItem.then((res) => {
    if (res.userParameterSets && res.userParameterSets.length > 0) {
      let pSetsDiv = document.getElementById("psets");
      while (pSetsDiv.firstChild) {
        pSetsDiv.removeChild(pSetsDiv.firstChild);
      }
      res.userParameterSets.forEach((elem, index) => {
        let paramDiv = newParameterSetDiv(elem, index);
        pSetsDiv.appendChild(paramDiv);
      });
    }
  });
}

function displayFlashMessage(message) {
  let flashMessageNode = document.getElementById("flash-message");
  flashMessageNode.innerText = message;
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById("options-form").addEventListener("submit", saveOptions);
document.getElementById("add-pset").addEventListener("click", addNewParameterSetOption);
