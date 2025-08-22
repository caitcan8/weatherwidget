// main.js
console.log("MAIN process ✅")

const { app, BrowserWindow } = require("electron");
const path = require("path");
require("dotenv").config();
// Auto reload during development
require('electron-reload')(__dirname);

function createWindow() {
    
  const win = new BrowserWindow({
    width: 350,
    height: 540,
    backgroundColor: '#ADD8E6',
    title: "Weather Widget",
    resizable: false,
    alwaysOnTop: true,
    frame: false,             // frameless widget look
    transparent: true,        // transparent background
    webPreferences: {
        
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,  // required for contextBridge
        nodeIntegration: false   // make sure this is OFF
    },
  });

  win.loadFile("index.html");
}

app.whenReady().then(createWindow);

// Quit when all windows are closed (except macOS)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// Recreate window on macOS when dock icon is clicked
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
