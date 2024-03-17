document.addEventListener('DOMContentLoaded', function () {
    var boy = document.getElementById('boy');
    var idleImageNumber = 0;
    var idleAnimationNumber;
    var runImageNumber = 0;
    var runAnimationNumber = 0;
    var jumpImageNumber = 1;
    var jumpAnimationNumber = 0;
    var jumpPositionY = 100; 
    var backgroundPositionX = 0;
    var moveBackgroundAnimationId = 0;

    // Collision variables
    var boyMarginTop = 100; 
    var boxWidth = 100; 
    var gameOver = false;

    function idleanimation() {
        if (!gameOver) {
            idleImageNumber = (idleImageNumber % 9) + 1;
            var imageName = "Idle__" + ("00" + idleImageNumber).slice(-3);
            boy.src = "images/" + imageName + ".png";
        }
    }

    function idleAnimationStart() {
        idleAnimationNumber = setInterval(idleanimation, 100);
    }

    idleAnimationStart();

    function runAnimation() {
        if (!gameOver) {
            runImageNumber = runImageNumber + 1;

            if (runImageNumber == 9) {
                runImageNumber = 1;
            }

            var imageName = "Run__" + ("00" + runImageNumber).slice(-3);
            boy.src = "images/" + imageName + ".png";
        }
    }

    function runAnimationStart() {
        runAnimationNumber = setInterval(runAnimation, 100);
        clearInterval(idleAnimationNumber);
    }

    function jumpAnimation() {
        if (!gameOver) {
            jumpImageNumber = jumpImageNumber + 1;
    
            if (jumpImageNumber <= 9) {
                var imageName = "Jump__" + ("00" + jumpImageNumber).slice(-3);
                boy.src = "images/" + imageName + ".png";
    
                jumpPositionY += 30; // Increased jumping distance
                boy.style.bottom = jumpPositionY + "px";
            } else {
                clearInterval(jumpAnimationNumber);
                jumpImageNumber = 1;
                jumpAnimationNumber = 0;
                jumpPositionY = 100; // Set back to initial position
                boy.style.bottom = jumpPositionY + "px";
                runImageNumber = 0;
                runAnimationStart();
            }
        }
    }
    

    function jumpAnimationStart() {
        if (!gameOver) {
            clearInterval(runAnimationNumber);
            runImageNumber = 0;
            clearInterval(jumpAnimationNumber);
            jumpAnimationNumber = setInterval(jumpAnimation, 100);
        }
    }

    var score = 0;
    function moveBackground() {
        if (!gameOver) {
            backgroundPositionX = backgroundPositionX - 20;
            document.getElementById('background').style.backgroundPositionX = backgroundPositionX + "px";

            score = score + 1;
            document.getElementById('score').innerHTML = score;
        }
    }

    var boxAnimationId = 0;

    function boxAnimation() {
        if (!gameOver) {
            for (var i = 0; i <= 1000; i++) {
                var box = document.getElementById('box' + i);
                var currentBoxMarginLeft = parseInt(getComputedStyle(box).marginLeft);
                var newMarginLeft = currentBoxMarginLeft - 35;
                box.style.marginLeft = newMarginLeft + "px";

                // Calculate character's current position
                var boyPosition = boy.getBoundingClientRect();
                var boxPosition = box.getBoundingClientRect();

                // Check for collision
                if (
                    boyPosition.right > boxPosition.left &&
                    boyPosition.left < boxPosition.right &&
                    boyPosition.bottom > boxPosition.top &&
                    boyPosition.top < boxPosition.bottom
                ) {
                    // If the character is not jumping and hits the barrier, end the game
                    if (jumpPositionY === 100) {
                        // Stop animations and movement
                        clearInterval(boxAnimationId);
                        clearInterval(runAnimationNumber);
                        clearInterval(jumpAnimationNumber);
                        clearInterval(moveBackgroundAnimationId);

                        // Reset animation states
                        runAnimationNumber = 0;
                        jumpAnimationNumber = 0;
                        moveBackgroundAnimationId = 0;

                        // Set game over flag
                        gameOver = true;

                        // Show end page
                        document.getElementById('end').style.visibility = 'visible';
                        document.getElementById('endscore').innerHTML = score;

                        return; // Exit the function as soon as one collision is detected
                    }
                }
            }
        }
    }

    function keyCheck(event) {
        if (!gameOver) {
            var keyCode = event.which;

            if (keyCode == 13 && runAnimationNumber === 0) {
                runAnimationStart();
                if (moveBackgroundAnimationId == 0) {
                    moveBackgroundAnimationId = setInterval(moveBackground, 100);
                }
            }
            if (keyCode == 32 && jumpAnimationNumber == 0) {
                jumpAnimationStart();
                if (moveBackgroundAnimationId === 0) {
                    moveBackgroundAnimationId = setInterval(moveBackground, 100);
                }
            }
            if (boxAnimationId === 0) {
                boxAnimationId = setInterval(boxAnimation, 100);
            }
        }
    }

    function touchCheck() {
        if (!gameOver) {
            if (runAnimationNumber === 0) {
                runAnimationStart();
                if (moveBackgroundAnimationId == 0) {
                    moveBackgroundAnimationId = setInterval(moveBackground, 100);
                }
            }
            if (jumpAnimationNumber == 0) {
                jumpAnimationStart();
                if (moveBackgroundAnimationId === 0) {
                    moveBackgroundAnimationId = setInterval(moveBackground, 100);
                }
            }
            if (boxAnimationId === 0) {
                boxAnimationId = setInterval(boxAnimation, 100);
            }
        }
    }
    var boxMarginLeft = 1540;

    function createBox() {
        if (!gameOver) {
            for (var i = 0; i <= 10; i++) {
                var box = document.createElement('div');
                box.className = 'box';
                document.getElementById('background').appendChild(box);
                box.style.marginLeft = boxMarginLeft + "px";
                box.id = "box" + i;

                boxMarginLeft = boxMarginLeft + 500;

                if (i < 5) {
                    boxMarginLeft = boxMarginLeft + 2000;
                }
                if (i >= 5) {
                    boxMarginLeft = boxMarginLeft + 1000;
                }
            }
        }
    }

    document.addEventListener('keypress', function (event) {
        if (!gameOver) {
            if (runAnimationNumber !== 0) {
                createBox();
            }
            keyCheck(event);
        }
    });

    document.addEventListener('touchstart', function () {
        if (!gameOver) {
            if (runAnimationNumber !== 0) {
                createBox();
            }
            touchCheck();
        }
    });

    // Event listener for Try Again button
    document.getElementById('tryAgainBtn').addEventListener('click', function () {
        // Reset game variables and start the game again
        score = 0;
        gameOver = false;
        backgroundPositionX = 0;
        jumpPositionY = 100;
        document.getElementById('score').innerHTML = score;
        document.getElementById('end').style.visibility = 'hidden';
        
        boxAnimationId = setInterval(boxAnimation, 100);
        runAnimationStart();
        
        
        moveBackgroundAnimationId = setInterval(moveBackground, 100);
        
    });
});









document.getElementById('closeBtn').addEventListener('click', function() {
    document.getElementById('card').classList.add('hidden');
});


//audio
document.addEventListener('DOMContentLoaded', function() {
    var audio = document.getElementById('backgroundAudio');
    audio.play();
});



