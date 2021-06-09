let lastKnownState = window.localStorage.getItem(`lastKnown_${window.location.href}`);
  
lastKnownState = lastKnownState && JSON.parse(lastKnownState);

if (lastKnownState &&
  lastKnownState.conditions.userId === "<User ID>" &&
  lastKnownState.conditions.buildNo === "<Build No.>") {
  document.getElementById('content').innerHTML = lastKnownState.data;
  window.hasRestoredState = true;
}
