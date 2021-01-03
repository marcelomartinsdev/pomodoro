window.addEventListener("load", () => {
    const pomodoroButton = document.querySelector("#pomodoro");
    const restButton = document.querySelector("#rest");
    const longRestButton = document.querySelector("#longRest");
    const startButton = document.querySelector("#start");
    const resetButton = document.querySelector("#reset");
    const displayMinutes = document.querySelector("#minutes");
    const displaySeconds = document.querySelector("#seconds");
    const pomodoroMin = 24;
    const restMin = 4;
    const longRestMin = 14;
    let startMinutes = 24;
    let startSeconds = 60;
    let isTimerOff = true;
    let PomodoroBgColor = document.getElementById("container");
    let UnderlineColor = document.getElementById("header");
    let UnderlineColor2 = document.getElementById("header-2");

    pomodoroButton.addEventListener("click", () => {
        startMinutes = pomodoroMin;
        PomodoroBgColor.style.backgroundColor = "#DB524D";
        PomodoroBgColor.style.transition = "1s";
        UnderlineColor.style.textDecorationColor = "#DB524D"
        UnderlineColor.style.transition = "1s";
        UnderlineColor2.style.textDecorationColor = "#DB524D"
        UnderlineColor2.style.transition = "1s";
        startSeconds = 60;
        displayMinutes.innerText = `${startMinutes + 1}`;
        displaySeconds.innerText = "00";
    });

    restButton.addEventListener("click", () => {
        PomodoroBgColor.style.backgroundColor = "#437EA8";
        PomodoroBgColor.style.transition = "1s";
        UnderlineColor.style.textDecorationColor = "#437EA8"
        UnderlineColor.style.transition = "1s";
        UnderlineColor2.style.textDecorationColor = "#437EA8"
        UnderlineColor2.style.transition = "1s";
        startMinutes = restMin;
        startSeconds = 60;

        displayMinutes.innerText = `0${startMinutes + 1}`;
        displaySeconds.innerText = "00";
    });

    longRestButton.addEventListener("click", () => {
        PomodoroBgColor.style.backgroundColor = "#235172";
        PomodoroBgColor.style.transition = "1s";
        UnderlineColor.style.textDecorationColor = "#235172"
        UnderlineColor.style.transition = "1s";
        UnderlineColor2.style.textDecorationColor = "#235172"
        UnderlineColor2.style.transition = "1s";
        startMinutes = longRestMin;
        startSeconds = 60;

        displayMinutes.innerText = `${startMinutes + 1}`;
        displaySeconds.innerText = "00";
    });

    startButton.addEventListener("click", startTimer);

    function startTimer() {
        if (isTimerOff) {
            isTimerOff = false;

            let currentMinutes = startMinutes;
            let currentSeconds = startSeconds;
            let interval = setInterval(countTime, 1000);

            resetButton.addEventListener("click", resetTime);

            function countTime() {
                currentSeconds--;

                updateDisplay();

                if (currentSeconds < 1) {
                    if (currentMinutes > 0) {
                        currentMinutes--;
                        currentSeconds = startSeconds;
                    } else {
                        document.querySelector("#sound").play();

                        clearInterval(interval);

                        setTimeout(() => {
                            alert("Time is Over!");
                        }, 10);

                        isTimerOff = true;
                    }
                }
            }

            function updateDisplay() {
                function checkCount(currentTime, element) {
                    if (currentTime >= 10) {
                        element.innerText = currentTime;
                        console.log();
                    } else {
                        element.innerText = `0${currentTime}`;
                    }
                }

                checkCount(currentMinutes, displayMinutes);
                checkCount(currentSeconds, displaySeconds);
            }

            function resetTime() {
                clearInterval(interval);

                if (startMinutes != restMin) {
                    displayMinutes.innerText = `${startMinutes + 1}`;
                } else {
                    displayMinutes.innerText = `0${startMinutes + 1}`;
                }
                displaySeconds.innerText = "00";

                isTimerOff = true;
            }
        }
    }
});