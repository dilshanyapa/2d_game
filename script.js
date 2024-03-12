document.addEventListener('DOMContentLoaded', function () {
    var boy = document.getElementById('boy');
    var idleImageNumber = 0;
    var idleAnimationNumber;
    var runImageNumber = 0;
    var runAnimationNumber = 0;
    var jumpImageNumber = 1;
    var jumpAnimationNumber = 0;
    var jumpPositionY = 100; // Adjust this value to set the initial height
    var backgroundPositionX = 0;
    var moveBackgroundAnimationId = 0;

    function idleanimation() {
        idleImageNumber = (idleImageNumber % 9) + 1;
        var imageName = "Idle__" + ("00" + idleImageNumber).slice(-3);
        boy.src = "images/" + imageName + ".png";
    }

    function idleAnimationStart() {
        idleAnimationNumber = setInterval(idleanimation, 100);
    }

    idleAnimationStart();

    function runAnimation() {
        runImageNumber = runImageNumber + 1;

        if (runImageNumber == 9) {
            runImageNumber = 1;
        }

        var imageName = "Run__" + ("00" + runImageNumber).slice(-3);
        boy.src = "images/" + imageName + ".png";
    }

    function runAnimationStart() {
        runAnimationNumber = setInterval(runAnimation, 100);
        clearInterval(idleAnimationNumber);
    }

    function jumpAnimation() {
        jumpImageNumber = jumpImageNumber + 1;

        if (jumpImageNumber <= 8) {
            var imageName = "Jump__" + ("00" + jumpImageNumber).slice(-3);
            boy.src = "images/" + imageName + ".png";

            jumpPositionY += 20;
            boy.style.bottom = jumpPositionY + "px";
        } else {
            clearInterval(jumpAnimationNumber);
            jumpImageNumber = 1;
            jumpAnimationNumber = 0;
            jumpPositionY = 100;
            boy.style.bottom = jumpPositionY + "px";
            runImageNumber = 0;
            runAnimationStart();
        }
    }

    function jumpAnimationStart() {
        clearInterval(runAnimationNumber);
        runImageNumber = 0;
        clearInterval(jumpAnimationNumber);
        jumpAnimationNumber = setInterval(jumpAnimation, 100);
    }

    function moveBackground() {
        backgroundPositionX = backgroundPositionX - 20;
        document.getElementById('background').style.backgroundPositionX = backgroundPositionX + "px";
    }

    function keyCheck(event) {
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
    }

    function touchCheck() {
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
    }

    document.addEventListener('keypress', keyCheck);
    document.addEventListener('touchstart', touchCheck);
});
