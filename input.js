const sharp = require('sharp');

// For now we're using external images for testing, however once we have screencapture going this will be integrated in a stream
sharp('input.png')
	.greyscale()
	.resize({ options: { kernel: sharp.kernel.nearest }, width: 240, height: 135})
	.extract({ left: 61, top: 63, width: 118, height: 35})
	.linear(3, -500)
	.normalise()
	.toFile('input_mod.png')
	.catch(e => { console.error(e); });