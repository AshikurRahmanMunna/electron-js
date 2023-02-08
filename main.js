// Modules
const {
  app,
  BrowserWindow,
  desktopCapturer,
  webContents,
} = require("electron");
const windowStateKeeper = require("electron-window-state");
const fs = require("fs");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

let mainWindow, secWindow;

// Create a new BrowserWindow when `app` is ready
function createWindow() {
  console.log("Creating window");

  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    minWidth: 300,
    minHeight: 150,
    webPreferences: {
      // --- !! IMPORTANT !! ---
      // Disable 'contextIsolation' to allow 'nodeIntegration'
      // 'contextIsolation' defaults to "true" as from Electron v12
      contextIsolation: false,
      nodeIntegration: true,
    },
  });

  const wc = mainWindow.webContents;

  wc.on("login", (e, request, authInfo, callback) => {
    console.log("Login");
    callback("user", "password");
  });

  wc.on("did-navigate", (e, url, statusCode, message) => {
    console.log(`Navigated to ${url}`);
  });

  // wc.on("new-window", (e, url) => {
  //   console.log(`Creating window form ${url}`);
  // })
  // wc.on("did-finish-load", () => {
  //   console.log("Everything finished loading");
  // })
  // wc.on("dom-ready", () => {
  //   console.log("Dom loaded");
  // });

  // wc.on("media-started-playing", () => {
  //   console.log("Video started playing");
  // });
  wc.on("context-menu", (e, params) => {
    wc.executeJavaScript(`alert("udj")`);
  });
  // wc.on("media-paused", () => {
  //   console.log("Video paused playing");
  // });

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile("index.html");

  // Open DevTools - Remove for PRODUCTION!

  mainWindow.on("focus", () => {
    console.log("Main window is focused");
  });

  // Listen for window being closed
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

// Electron `app` is ready
app.on("ready", () => {
  createWindow();
});

// Quit when all windows are closed - (Not macOS - Darwin)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on("activate", () => {
  if (mainWindow === null) createWindow();
});
