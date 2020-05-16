let reminderMessageNode = document.getElementById("reminder-message");
let blockMessageNode = document.getElementById("block-message");
let reminderSitesArea = document.getElementById("reminderSitesArea");
let blockedSitesArea = document.getElementById("blockedSitesArea"); 

function saveOptions(e) {
  console.log(e);
  reminderMessageInput = reminderMessageNode.value;
  console.log("Reminder message:" + reminderMessageInput);
  blockMessageInput = blockMessageNode.value;
  console.log("Block message:" + blockMessageInput);
  reminderSitesInput = reminderSitesArea.value;
  blockedSitesInput = blockedSitesArea.value;

  reminderSitesArray = reminderSitesInput.split("\n");
  console.log("Reminder sites array:" + reminderSitesArray);
  blockedSitesArray = blockedSitesInput.split("\n");
  console.log("Blocked sites array:" + blockedSitesArray);

  let storageEvent = browser.storage.sync.set({
    reminderMessage: reminderMessageInput,
    blockMessage: blockMessageInput,
    reminderSiteStrings: reminderSitesArray,
    blockedSiteStrings: blockedSitesArray
  });
  storageEvent.then((res) => {
    restoreOptions();
  });
  restoreOptions();
  e.preventDefault();
}

function restoreOptions() {
  let syncStorageItem = browser.storage.sync.get();
  syncStorageItem.then((res) => {
    console.log(res);
    reminderMessageNode.value = res.reminderMessage || "Are you sure you want to proceed to this site?";
    blockMessageNode.value = res.blockMessage || "This website is blocked";
    if (res.reminderSiteStrings) reminderSitesArea.value = res.reminderSiteStrings.join("\n");
    if (res.blockedSiteStrings) blockedSitesArea.value = res.blockedSiteStrings("\n");
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("#options-form").addEventListener("submit", saveOptions);