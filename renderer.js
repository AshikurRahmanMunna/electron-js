// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const { remote } = require("electron");

setTimeout(() => {
  // dialog
  //   .showMessageBox({
  //     message: "Hello from remote dialogue",
  //     buttons: ["yes", "no"],
  //   })
  //   .then((res) => console.log(res));
  let mainWindow = remote.getCurrentWindow();
  mainWindow.maximize();
}, 2000);
