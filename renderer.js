// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const { ipcRenderer } = require("electron");
const takeScreenshot = require("./utils/takeScreenshot");

document.getElementById("ss-full-btn").addEventListener("click", () => {
  takeScreenshot(true);
});

document.getElementById("ss-window-btn").addEventListener("click", () => {
  takeScreenshot(true, "window");
});
