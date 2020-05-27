const robot = require('robot.js'); // Keyboard & mouse input is done via this module

class Output {
	pauseBuffer() {
		robot.keyTap('escape');
		setTimeout(() => {
			robot.keyTap('escape');
		}, 100);
	}

	move(w, a, s, d, space) {
		robot.keyToggle('w', w ? "down" : "up", "shift");
		robot.keyToggle('a', a ? "down" : "up", "shift");
		robot.keyToggle('s', s ? "down" : "up", "shift");
		robot.keyToggle('d', d ? "down" : "up", "shift");
		robot.keyToggle('space', space ? "down" : "up", "shift");
	}

	look(x, y) {
		robot.moveMouse(x, y);
	}
}
