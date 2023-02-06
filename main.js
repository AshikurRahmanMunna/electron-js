// Modules
const { app, BrowserWindow, desktopCapturer, webContents } = require("electron");
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
  wc.on("did-finish-load", () => {
    console.log("Everything finished loading");
  })
  wc.on("dom-ready", () => {
    console.log("Dom loaded");
  });

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
