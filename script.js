let score = 0;
let lives = 3;
let time = 60;
let heartbeattimer = null;
let gameStarted = false;

function updateStats() {

    document.getElementById("score").innerText = score;
    document.getElementById("lives").innerText = lives;

}


function startGame() {

    if (gameStarted) {
        return;
    }

    gameStarted = true;

    document.getElementById("startScreen").classList.add("hidden");

    document.getElementById("puzzle1").classList.remove("hidden");

    timer = setInterval(function () {

        time--;

        document.getElementById("time").innerText = time;
        if (time <= 10 && time > 0) {

    document.querySelector(".timer").classList.add("warning");

    playSound("heartbeat");
}

        if (time <= 0) {

            clearInterval(timer);

            showGameOver("time");
        }

    }, 1000);
}


/* PUZZLE 1 */

function checkAnswer() {

    let answer = document.getElementById("answer").value;

   if (answer == 32) {

    score += 100;
    updateStats();

    playSound("correct");

    document.getElementById("message").innerText =
        "✅ ACCESS GRANTED +100 POINTS";

        setTimeout(function () {

            document.getElementById("puzzle1").classList.add("hidden");

            document.getElementById("puzzle2").classList.remove("hidden");

        }, 700);
} else {

    lives--;
    updateStats();

    playSound("wrong");

    document.getElementById("message").innerText =
        "❌ WRONG CODE. LIFE LOST";

    if (lives <= 0) {
        showGameOver("lives");
    }

}
}


/* PUZZLE 2 */

function showClue() {

    document.getElementById("clue").innerText =
        "CLUE: A triangle has how many sides?";

}


function checkAnswer2() {

    let answer = document.getElementById("answer2").value;

    if (answer == 4) {

        score += 100;
        updateStats();
        playSound("correct");

        document.getElementById("message2").innerText =
            "✅ CLUE VERIFIED +100 POINTS";

        setTimeout(function () {

            document.getElementById("puzzle2").classList.add("hidden");

            document.getElementById("puzzle3").classList.remove("hidden");

        }, 700);

    } else {

        lives--;
        updateStats();
        playSound("wrong");

        document.getElementById("message2").innerText =
            "❌ WRONG ANSWER. LIFE LOST";

        if (lives <= 0) {
            showGameOver("lives");
        }

    }
}


/* PUZZLE 3 */

function hideSequence() {

    document.getElementById("sequenceBox").innerText =
        "❓ ❓ ❓ ❓ ❓";

    document.getElementById("memoryQuestion").innerText =
        "Enter the 5-color sequence you remember.";

    let input = document.getElementById("memoryAnswer");

    input.disabled = false;

    input.placeholder = "Enter sequence";

    input.focus();
}


function checkMemory() {

    let answer =
        document.getElementById("memoryAnswer").value
        .trim()
        .toLowerCase();

    if (answer == "red blue green yellow blue") {

        score += 100;
        updateStats();
        playSound("correct");

        document.getElementById("memoryMessage").innerText =
            "✅ MEMORY VERIFIED";

        setTimeout(function () {

            document.getElementById("puzzle3").classList.add("hidden");

            document.getElementById("finalLock").classList.remove("hidden");

        }, 700);

    } else {

        lives--;
        updateStats();

        playSound("wrong");

        document.getElementById("memoryMessage").innerText =
            "❌ WRONG SEQUENCE. LIFE LOST";

        if (lives <= 0) {
            showGameOver("lives");
        }

    }
}


/* FINAL PASSWORD */

function unlockSystem() {

    let answer = document.getElementById("finalAnswer").value;

    if (answer == 3245) {

        score += 200;

        playSound("win");

        clearInterval(timer);

        document.getElementById("finalScore").innerText = score;

        document.getElementById("finalTime").innerText =
            time + " SEC";

        document.getElementById("finalLives").innerText =
            lives;

        document.getElementById("finalLock").classList.add("hidden");

        document.getElementById("winScreen").classList.remove("hidden");

    } else {

        document.getElementById("finalMessage").innerText =
            "❌ ACCESS DENIED. WRONG CODE.";

    }
}


/* GAME OVER */

function showGameOver(reason) {

    document.getElementById("startScreen").classList.add("hidden");

    document.getElementById("puzzle1").classList.add("hidden");

    document.getElementById("puzzle2").classList.add("hidden");

    document.getElementById("puzzle3").classList.add("hidden");

    document.getElementById("finalLock").classList.add("hidden");

    document.getElementById("gameOver").classList.remove("hidden");

    if (reason == "lives") {

        document.getElementById("gameOverMessage").innerText =
            "You used all 3 lives.";

    } else {

        document.getElementById("gameOverMessage").innerText =
            "Time has expired.";

    }
}
function useHint() {

    if (score < 50) {
        return false;
    }

    score -= 50;
    updateStats();

    return true;
}


function hint1() {

    if (useHint()) {
        playSound("hint");

        document.getElementById("hint1Message").innerText =
            "💡 Hint: Each number is multiplied by 2.";

    } else {

        document.getElementById("hint1Message").innerText =
            "❌ You need at least 50 points.";

    }
}


function hint2() {

    if (useHint()) {
        playSound("hint");

        document.getElementById("hint2Message").innerText =
            "💡 Hint: Look at the number immediately below 1.";

    } else {

        document.getElementById("hint2Message").innerText =
            "❌ You need at least 50 points.";

    }
}


function hint3() {

    if (useHint()) {
        playSound("hint");

        document.getElementById("hint3Message").innerText =
            "💡 Hint: Remember the colors in their exact order.";

    } else {

        document.getElementById("hint3Message").innerText =
            "❌ You need at least 50 points.";

    }
}
function playSound(type) {

    const audio = new AudioContext();

    function tone(frequency, duration, delay = 0, volume = 0.08) {

        let oscillator = audio.createOscillator();
        let gain = audio.createGain();

        oscillator.connect(gain);
        gain.connect(audio.destination);

        oscillator.type = "square";
        oscillator.frequency.value = frequency;

        gain.gain.setValueAtTime(0.001, audio.currentTime + delay);
        gain.gain.linearRampToValueAtTime(
            volume,
            audio.currentTime + delay + 0.02
        );

        gain.gain.exponentialRampToValueAtTime(
            0.001,
            audio.currentTime + delay + duration
        );

        oscillator.start(audio.currentTime + delay);
        oscillator.stop(audio.currentTime + delay + duration);
    }


    if (type === "correct") {

        tone(500, 0.12);
        tone(700, 0.12, 0.10);
        tone(1000, 0.20, 0.20);

    }


    else if (type === "wrong") {

        tone(280, 0.15, 0, 0.10);
        tone(180, 0.30, 0.15, 0.10);

    }


    else if (type === "hint") {

        tone(400, 0.08);
        tone(600, 0.08, 0.09);
        tone(800, 0.15, 0.18);

    }


    else if (type === "win") {

        tone(500, 0.12);
        tone(650, 0.12, 0.12);
        tone(800, 0.12, 0.24);
        tone(1000, 0.15, 0.36);
        tone(1300, 0.30, 0.52);

    }


    else if (type === "heartbeat") {

        tone(80, 0.12, 0, 0.16);
        tone(60, 0.18, 0.16, 0.12);

    }

}