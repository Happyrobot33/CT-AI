const { app, BrowserWindow, ipcMain } = require('electron');
const capture = require ('screenshot-desktop');
const sharp = require('sharp');

const enablePreview = true; // False to disable

var input; // Contains the input buffer every time it's refreshed
var framerate = 20; // In frames per second

setInterval(() => {
	capture().then((img) => {
		sharp(img)
			.greyscale()
			.resize({ options: { kernel: sharp.kernel.nearest }, width: 240, height: 135})
			.extract({ left: 61, top: 63, width: 118, height: 35})
			.linear(3, -500)
			.normalise()
			.toBuffer().then(data => { input = data; });
	});
}, 1000 / framerate);



// Preview stuff
app.on('ready', () => {
	if (enablePreview) {
		const win = new BrowserWindow({width: 300, height: 150, webPreferences: { nodeIntegration: true, zoomFactor: 2.0 } });
		win.loadFile('preview.html');
		win.setMenu(null);

		ipcMain.on('frameRequest', (event) => {
			event.reply('frame', input);
		});
	}
});

app.on('window-all-closed', () => {
	app.quit();
});
