function KeyCheck(event) {

    var keyCode = event.which;

    if (keyCode == 13) {

        document.getElementById("startGame").style.visibility = "hidden";

        if (runAnimationId == 0) {
            runAnimationId = setInterval(boyRun, 100);
            runSoundClip.play();
            moveBackgroundAnimationId = setInterval(moveBackground, 100);
            scoreAnimationId = setInterval(updateScore, 100);

            boxAnimationId = setInterval(moveBoxes, 100);
        }
    }

    if (keyCode == 32) {


        document.getElementById("startGame").style.visibility = "hidden";

        if (jumpAnimationId == 0) {
            clearInterval(runAnimationId);
            runSoundClip.pause();

            jumpAnimationId = setInterval(boyJump, 100);
            jumpSoundClip.play();
        }



    }
}

var runImageNumber = 1;
var runAnimationId = 0;
var runSoundClip = new Audio("Run.mp3");
runSoundClip.loop = true;

function boyRun() {




    runImageNumber = runImageNumber + 1;

    if (runImageNumber == 16) {
        runImageNumber = 1


    }

    document.getElementById("boy").src = "Run (" + runImageNumber + ").png";
}

var x = 0;
var moveBackgroundAnimationId = 0;

function moveBackground() {

    x = x - 20;
    document.getElementById("backgroundBox").style.backgroundPositionX = x + "px";
}

var score = 0;
var scoreAnimationId = 0;

function updateScore() {
    score = score + 10;
    document.getElementById("score").innerHTML = score;


    if (score == 10000) {

        clearInterval(runAnimationId);
        runSoundClip.pause();
        runAnimationId = -1;

        clearInterval(jumpAnimationId);
        jumpSoundClip.pause();
        jumpAnimationId = -1;

        clearInterval(moveBackgroundAnimationId);
        moveBackgroundAnimationId = -1;

        clearInterval(boxAnimationId);
        boxAnimationId = -1;

        clearInterval(scoreAnimationId);
        scoreAnimationId = -1;

        document.getElementById("win").style.visibility = "visible";
        winSoundClip.play();

    }




}

var jumpImageNumber = 1;
var jumpAnimationId = 0;

var jumpSoundClip = new Audio("jump.mp3");

var boyMarginTop = 262;

function boyJump() {

    if (jumpImageNumber <= 6) {
        boyMarginTop = boyMarginTop - 30;
        document.getElementById("boy").style.marginTop = boyMarginTop + "px";
    }

    if (jumpImageNumber >= 7) {
        boyMarginTop = boyMarginTop + 30;
        document.getElementById("boy").style.marginTop = boyMarginTop + "px";
    }

    jumpImageNumber = jumpImageNumber + 1;

    if (jumpImageNumber == 13) {
        jumpImageNumber = 1
        clearInterval(jumpAnimationId);
        jumpAnimationId = 0;
        runAnimationId = setInterval(boyRun, 100);
        runSoundClip.currentTime = 0;
        runSoundClip.play();

        if (moveBackgroundAnimationId == 0) {
            moveBackgroundAnimationId = setInterval(moveBackground, 100);
        }

        if (scoreAnimationId == 0) {
            scoreAnimationId = setInterval(updateScore, 100);
        }

        if (boxAnimationId == 0) {
            boxAnimationId = setInterval(moveBoxes, 100);
        }
    }

    document.getElementById("boy").src = "Jump (" + jumpImageNumber + ").png";
}

var boxMarginLeft = 300;

function createBoxes() {
    for (var i = 0; i < 30; i++) {

        var box = document.createElement("div");
        box.className = "box";
        box.id = "box" + i;

        if (i <= 5) {
            boxMarginLeft = boxMarginLeft + 900;
        }

        if (i >= 6) {
            boxMarginLeft = boxMarginLeft + 400;
        }

        if (i >= 11) {
            boxMarginLeft = boxMarginLeft + 500;
        }

        if (i >= 16) {
            boxMarginLeft = boxMarginLeft + 500;
        }

        if (i >= 21) {
            boxMarginLeft = boxMarginLeft + 300;
        }

        if (i >= 21) {
            boxMarginLeft = boxMarginLeft + 400;

        }
        if (i >= 26) {
            boxMarginLeft = boxMarginLeft + 500;
        }

        box.style.marginLeft = boxMarginLeft + "px";
        document.getElementById("backgroundBox").appendChild(box);
    }
}

var boxAnimationId = 0;

function moveBoxes() {
    for (var i = 0; i < 30; i++) {

        var box = document.getElementById("box" + i);
        var currentMarginLeft = getComputedStyle(box).marginLeft;
        var newMarginLeft = parseInt(currentMarginLeft) - 20;
        box.style.marginLeft = newMarginLeft + "px";



        if (newMarginLeft >= 80 & newMarginLeft <= 150) {

            if (boyMarginTop > 260) {

                clearInterval(runAnimationId);
                runSoundClip.pause();
                runAnimationId = -1;

                clearInterval(jumpAnimationId);
                jumpSoundClip.pause();
                jumpAnimationId = -1;

                clearInterval(moveBackgroundAnimationId);
                moveBackgroundAnimationId = -1;

                clearInterval(boxAnimationId);
                boxAnimationId = -1;

                clearInterval(scoreAnimationId);
                scoreAnimationId = -1;

                deadAnimationId = setInterval(boyDead, 100);
                deadSoundClip.play();

            }
        }
    }
}

var deadImageNumber = 0;
var deadAnimationId = 0;

var deadSoundClip = new Audio("dead.mp3");

function boyDead() {
    deadImageNumber = deadImageNumber + 1;

    if (deadImageNumber == 11) {
        deadImageNumber = 10;
        document.getElementById("boy").style.marginTop = "280px";

        document.getElementById("endGame").style.visibility = "visible";
        document.getElementById("endScore").innerHTML = score;
    }

    document.getElementById("boy").src = "Dead (" + deadImageNumber + ").png";
}

function reload() {
    location.reload();
}

var winSoundClip = new Audio("winpop.wav");





