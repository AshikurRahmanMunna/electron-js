// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const { ipcRenderer } = require("electron");
const takeScreenshot = require("./utils/takeScreenshot");

ipcRenderer.on("channel1-response", (e, args) => {
  console.log(args);
});

ipcRenderer.on("mailbox", (e, args) => {
  console.log(args);
});

document.getElementById("ss-full-btn").addEventListener("click", () => {
  takeScreenshot(true);
  ipcRenderer.send("channel1", "Full Screenshot taken");
  const response = ipcRenderer.sendSync("sync-message", { data: "Sync send" });
  console.log(response);
});

document.getElementById("ss-window-btn").addEventListener("click", () => {
  takeScreenshot(true, "window");
  ipcRenderer.send("channel1", "Window Screenshot taken");
});
