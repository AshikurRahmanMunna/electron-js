// Modules
const { app, BrowserWindow } = require("electron");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

let mainWindow;

// Create a new BrowserWindow when `app` is ready
function createWindow() {
  console.log("Creating window");

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
  
  secondaryWindow = new BrowserWindow({
    width: 600,
    height: 300,
    webPreferences: {
      // --- !! IMPORTANT !! ---
      // Disable 'contextIsolation' to allow 'nodeIntegration'
      // 'contextIsolation' defaults to "true" as from Electron v12
      contextIsolation: false,
      nodeIntegration: true,
    },
    maximizable: false,
    minimizable: false,
    resizable: false
  });

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile("index.html");
  secondaryWindow.loadFile("index.html");

  // Open DevTools - Remove for PRODUCTION!
  // mainWindow.webContents.openDevTools();

  // Listen for window being closed
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
  secondaryWindow.on("closed", () => {
    secondaryWindow = null;
  });
}

// Electron `app` is ready
app.on("ready", () => {
  console.log(app.getPath("downloads"));
  console.log(app.getPath("music"));
  console.log(app.getPath("desktop"));
  console.log(app.getPath("userData"));
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
