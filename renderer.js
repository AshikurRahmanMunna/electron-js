// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const takeScreenshot = require("./utils/takeScreenshot");

document.getElementById("ss-btn").addEventListener("click", () => {
  takeScreenshot(true);
});
