// Modules
const {
  app,
  BrowserWindow,
  desktopCapturer,
  webContents,
  session,
} = require("electron");
const windowStateKeeper = require("electron-window-state");
const fs = require("fs");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

let mainWindow, secWindow;
let downloadInterval;

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

  // secWindow = new BrowserWindow({
  //   width: 800,
  //   height: 600,
  //   minWidth: 300,
  //   minHeight: 150,
  //   webPreferences: {
  //     // --- !! IMPORTANT !! ---
  //     // Disable 'contextIsolation' to allow 'nodeIntegration'
  //     // 'contextIsolation' defaults to "true" as from Electron v12
  //     // session: partition
  //     partition: "persist:part1",
  //   },
  // });

  const ses = mainWindow.webContents.session;
  const defaultSession = session.defaultSession;
  const partition = session.fromPartition("persist:part1");

  const getCookies = () => {
    defaultSession.cookies
      .get({})
      .then((cookies) => console.log(cookies))
      .catch((err) => console.log(err));
  };

  defaultSession.on("will-download", (e, item, webContents) => {
    const fileName = item.getFilename();
    const fileSize = item.getTotalBytes();
    item.setSavePath(app.getPath("downloads") + `/${fileName}`);
    item.on("updated", (e, state) => {
      const receivedBytes = item.getReceivedBytes();
      if (state === "progressing" && receivedBytes) {
        const progress = `${Math.round((receivedBytes / fileSize) * 100)}%`;
        console.log(progress);
      }
    });
  });

  // ses.clearStorageData();

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile("index.html");
  // mainWindow.loadURL("https://github.com/login");

  const cookie = {
    url: "https://myappdomain.com",
    name: "cookie1",
    value: "electron",
  };

  ses.cookies
    .set(cookie)
    .then(() => getCookies())
    .catch((err) => console.log(err));

  mainWindow.webContents.on("did-finish-load", getCookies);

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
