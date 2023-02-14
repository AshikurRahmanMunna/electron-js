// Modules
const { app, BrowserWindow, dialog } = require("electron");
const fs = require("fs");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Create a new BrowserWindow when `app` is ready
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      // --- !! IMPORTANT !! ---
      // Disable 'contextIsolation' to allow 'nodeIntegration'
      // 'contextIsolation' defaults to "true" as from Electron v12
      contextIsolation: false,
      nodeIntegration: true,
    },
  });

  mainWindow.webContents.on("did-finish-load", () => {
    // dialog
    //   .showOpenDialog(mainWindow, {
    //     defaultPath: app.getPath("desktop"),
    //     properties: [
    //       "createDirectory",
    //       "multiSelections",
    //       "openFile",
    //       "openDirectory",
    //     ],
    //   })
    //   .then((result) => console.log(result));

    dialog
      .showSaveDialog({ nameFieldLabel: "file", buttonLabel: "Save the fuck" })
      .then((r) => {
        const fileData = fs.readFileSync(__dirname + "/main.js", {
          encoding: "utf-8",
        });
        fs.writeFileSync(r.filePath + ".js", fileData, { encoding: "utf-8" });
      });
  });

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile("index.html");

  // Open DevTools - Remove for PRODUCTION!
  // mainWindow.webContents.openDevTools();

  // Listen for window being closed
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

// Electron `app` is ready
app.on("ready", createWindow);

// Quit when all windows are closed - (Not macOS - Darwin)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on("activate", () => {
  if (mainWindow === null) createWindow();
});
