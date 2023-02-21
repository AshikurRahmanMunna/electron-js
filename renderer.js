// This file is required by the index.html file and will
// be executed in the renderer process for that window.

const { ipcRenderer } = require("electron");

// All of the Node.js APIs are available in this process.
document.getElementById("ask").addEventListener("click", () => {
  ipcRenderer.invoke("ask-fruit").then((v) => console.log(v));
});
