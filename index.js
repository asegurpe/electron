const { app, BrowserWindow } = require('electron');

function createWindow () {
  // Crea la ventana del navegador.
  let win = new BrowserWindow({
    width: 1024,
    height: 768,
    //fullscreen: true,
    webPreferences: {
      nodeIntegration: true
    }
  });

  //win.removeMenu();

  // y carga el  index.html de la aplicación.
  win.loadFile('index.html');
  //win.loadURL('https://www.gmail.com');
}

app.whenReady().then(createWindow);