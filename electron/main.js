import { app, BrowserWindow, screen } from "electron";
import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isDev = !app.isPackaged;

function createWindow() {
    const display = screen.getPrimaryDisplay();
    const { width, height } = display.workAreaSize;

    const win = new BrowserWindow({
        width: Math.round(width * 0.5),
        height: Math.round(height * 0.3),
        minWidth: 560,
        minHeight: 820,
        autoHideMenuBar: true,
        icon: path.join(__dirname, "assets/icon.png"),
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true
        }
    });

    win.webContents.setZoomFactor(1);

    if (isDev) {
        win.loadURL("http://localhost:5173");
    } else {
        win.loadFile(path.join(__dirname, "../dist/index.html"));
    }
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
