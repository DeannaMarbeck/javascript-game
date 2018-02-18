	
// Get elements from document	
	let canvas = document.getElementById("canvas");
	let cookie = document.getElementById("cookie");
	let pizza = document.getElementById("pizza");
	let ctx = canvas.getContext("2d");

// Initialise variables
	let wide = canvas.width;
	let high = canvas.height;

// Initialise icon size and speeds
	let iconDx = 2;
	let iconDy = 2;
	let iconX = wide/2;
	let iconY = high/2;
	let iconWidth = 50;
	let iconHeight = 50;
	let attackerX = 40;
	let attackerY = 40;
	let attackerDx = 9;
	let attackerDy = 9;

// Initialise key presses
	let rightPressed = false;
	let leftPressed = false;
	let upPressed = false;
	let downPressed = false;

// Manage lives
	let lives = 3;
	let hit = false;
	let lastHit = false;

// Draw starting screen with instructions
	window.onload = function() {
		ctx.drawImage(cookie, wide/2-50, 40, 100, 100);
	    ctx.font = "20px Arial";
	    ctx.fillStyle = "#056c9f";
	    ctx.textAlign= "center";
	    ctx.fillText("Move cookie monster to avoid the pizza", wide/2, high/2);
	    ctx.fillText("Press spacebar to start the game", wide/2, high/2+30);
	}

// Draw icons
	function drawIcon() {
		ctx.drawImage(cookie, iconX, iconY, 50, 50);
	}

	function drawAttacker() {
		ctx.drawImage(pizza, attackerX, attackerY, 50, 50);
	}

// Make icon flash red when it's hit
	function drawHit() {
		ctx.beginPath();
		ctx.arc(iconX+25, iconY+25, 30, 0, Math.PI*2); //left top width height
		ctx.fillStyle = 'red';
		ctx.fill();
		ctx.closePath();
	}

// Use arrow keys to move icon around the canvas	
	function keyDownHandler(e) {
		if(e.keyCode == 39) {
	        rightPressed = true;
	    }
	    else if(e.keyCode == 37) {
	        leftPressed = true;
	    }
    	else if(e.keyCode == 38) {
            upPressed = true;
        }
        else if(e.keyCode == 40) {
            downPressed = true;
        }
	}

	function keyUpHandler(e) {
		if(e.keyCode == 39) {
	        rightPressed = false;
	    }
	    else if(e.keyCode == 37) {
	        leftPressed = false;
	    }
	    else if(e.keyCode == 38) {
	        upPressed = false;
	    }
	    else if(e.keyCode == 40) {
	        downPressed = false;
	    }
	}	
	
	document.addEventListener("keydown", keyDownHandler);
	document.addEventListener("keyup", keyUpHandler);	

// Draw the number of lives left in the top corner of the screen
	function drawLives() {
	    ctx.font = "16px Arial";
	    ctx.fillStyle = "#0095DD";
	    ctx.fillText("Lives: "+lives, wide-65, 20);
	}

// Detect whether the icons are in the same space, and therefore a hit should be registered
	function collide() {
		if ((attackerX+25 > iconX && attackerX+25 < iconX+50) && (attackerY+25 > iconY && attackerY+25 < iconY+50)) {
			hit = true;
		} else {
			hit = false;
		}
	}
	
// Controlling animation function
	function draw() {
	  	ctx.clearRect(0, 0, wide, high);
	  	drawAttacker();
	  	collide();

// Let the icon move so long as it's within the canvas boundaries. 		
		if (rightPressed == true && iconX <= wide-50) {
			iconX += iconDx;
		} else if (leftPressed == true && iconX >= 0) {
			iconX -= iconDx;
		} else if (upPressed == true && iconY >= 0) {
			iconY -= iconDy;
		} else if (downPressed == true && iconY <= high-50) {
			iconY += iconDy;
		}

// If the attacker is outside the canvas boundaries, reverse direction
		if (attackerX <= 0 || attackerX >= wide-40) {
			attackerDx = -attackerDx;
		}

		if (attackerY <= 0 || attackerY >= high-40) {
			attackerDy = -attackerDy;
		}

// Keep the attacker constantly moving
		attackerX += attackerDx;
		attackerY += attackerDy;

// If the icons are in the same space, give the icon a red flash
		if (hit == true) {
			drawHit();

// Only decrement lives once for each hit, rather than for each pixel movement within the same hit
			if (lastHit != hit) {
				lives -= 1;
			}
		}			
		lastHit = hit;
	  	drawIcon();
	  	drawLives();

// Continue game until lives are at zero
	    if (lives == 0) {
		    ctx.font = "20px Arial";
		    ctx.fillStyle = "#000";
		    ctx.textAlign = "center";
		    ctx.fillText("GAME OVER!", wide/2, high/2);
		} else {
			requestAnimationFrame(draw);
		}
	}

// Spacebar handler to start game
	function startGame(e) {
		if (e.keyCode == 32) {
			draw();
		}
	}

	document.addEventListener("keydown", startGame);