// Modules
const {
  app,
  BrowserWindow,
  dialog,
  globalShortcut,
  Menu,
  MenuItem,
} = require("electron");
const fs = require("fs");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

let mainMenu = new Menu();

let mainMenuItem1 = new MenuItem({
  label: "Electron",
  submenu: [
    {
      label: "Close App",
      accelerator: "CommandOrControl+G",
    },
    {
      label: "Item 2",
      submenu: [
        {
          label: "Hello",
        },
        {
          label: "Hi",
        },
        {
          label: "By",
        },
      ],
    },
    {
      label: "Item 3",
    },
    {
      label: "Item 4",
    },
  ],
});
mainMenu.append(mainMenuItem1);

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
  globalShortcut.register("CommandOrControl+G", () => {
    app.quit();
  });

  Menu.setApplicationMenu(mainMenu);

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
