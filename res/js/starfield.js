window.onload = function() {
	var canvasElement = document.querySelector('canvas');
	var canvas        = canvasElement.getContext('2d');
	var quantity      = canvasElement.getAttribute('data-starfield');
	var color         = canvasElement.getAttribute('data-color');
	var renderInt     = 100;

	var stars = [];

	// Set initial canvas size
	canvasElement.width  = window.innerWidth;
	canvasElement.height = window.innerHeight;

	// Event listener to resize the canvas when the window size changes
	window.addEventListener('resize', resizeCanvas, false);

	function Star(x, y, offset, duration = 100, size = 2) {
		this.x            = x;
		this.y            = y;
		this.duration     = duration;
		this.offset       = offset;
		this.size         = size;
		this.timer        = offset % duration;

		this.draw = function() {
			if (this.timer > this.duration) {
				this.timer = 0;
			}
			this.timer += 1;

			var framesize = Math.abs((this.timer / this.duration) - 0.5) * this.size + this.size / 10;

			canvas.beginPath();
			canvas.arc(this.x, this.y, framesize, 0, Math.PI * 2, false);
			canvas.fillStyle = color;
			canvas.fill();
		}
	}

	// Create the stars with random positions and sizes
	for (let i = 0; i < quantity; i++) {
		var positionX = window.innerWidth * Math.random();
		var positionY = window.innerHeight * Math.random();
		var offset    = Math.random() * 100;
		var duration  = Math.random() * 50 + 50;
		var size      = Math.random() * 2;

		stars.push(new Star(positionX, positionY, offset, duration, size));
	}

	function renderFrame() {
		canvas.clearRect(0, 0, canvasElement.width, canvasElement.height);

		// Draw all stars
		for (let i = 0; i < quantity; i++) {
			stars[i].draw();
		}

		// Request the next frame
		setTimeout(renderFrame, renderInt);
	}

	// Resize canvas and regenerate stars when the window size changes
	function resizeCanvas() {
		// Update the canvas size
		canvasElement.width  = window.innerWidth;
		canvasElement.height = window.innerHeight;

		// Regenerate the stars to fit the new canvas size
		stars = [];
		for (let i = 0; i < quantity; i++) {
			var positionX = window.innerWidth * Math.random();
			var positionY = window.innerHeight * Math.random();
			var offset    = Math.random() * 100;
			var duration  = Math.random() * 50 + 50;
			var size      = Math.random() * 2;

			stars.push(new Star(positionX, positionY, offset, duration, size));
		}
	}

	// Start the animation loop
	renderFrame();
}
