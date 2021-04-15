if (window.addEventListener) {
  window.addEventListener("message", Navigation.setData, false);
} else {
  window.attachEvent("onmessage", Navigation.setData);
}
