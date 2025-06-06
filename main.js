// Modules to control application life and create native browser window
import { app, BrowserWindow, ipcMain, nativeImage } from "electron";
import { fileURLToPath, URL } from "node:url";

function createWindow() {
  const icon = nativeImage.createFromPath(
    fileURLToPath(new URL("assets/favicon.ico", import.meta.url))
  );

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: icon,
    title: "Simple Electron App",
    titleBarStyle: "hidden",
    titleBarOverlay: {
      color: "#ffffff00",
      // symbolColor: "#74b9ff",
      height: 30,
    },
    // Mica background has been error. see https://github.com/electron/electron/issues/46753
    // backgroundMaterial: "tabbed",

    webPreferences: {
      preload: fileURLToPath(new URL("preload.js", import.meta.url)),
    },
  });

  // and load the index.html of the app.
  // mainWindow.loadFile("index.html");
  mainWindow.loadURL("http://localhost:5173");

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  ipcMain.handle("base-info", () => {
    return {
      icon: icon.toDataURL(),
      title: mainWindow.getTitle(),
    };
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
