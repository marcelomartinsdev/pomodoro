window.addEventListener("load", () => {
    const sound = document.querySelector("#sound");
    const setting = document.querySelector("#btnSettings");
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
    let showSet = true;

    sound.volume = 0.5;
    setting.addEventListener("click", settings);

    function settings() {
        const volume = document.querySelector("#audioVol");
        const settingsContainer = document.querySelector(".settings-container");

        if(showSet) {
            showSet = false;

            volume.style.display = "inline";
            settingsContainer.style.display = "flex";

            volume.addEventListener("change", () => {
                sound.volume = volume.value / 10;
            });
        } else {
            showSet = true;

            volume.style.display = "none";
            settingsContainer.style.display = "none";
        }
    }

    window.changeTimer = function (color, option) {
        if(isTimerOff) {
            const container = document.querySelector(".container");
            const titleHeader = document.querySelectorAll(".header");
    
            container.style.backgroundColor = `#${color}`;
            container.style.transition = "1s";
            
            titleHeader.forEach((title) => {
                title.style.textDecorationColor = `#${color}`;
                title.style.transition = "1s";
            });

            if(option === 1) {
                startMinutes = pomodoroMin;
            } else if(option === 2) {
                startMinutes = restMin;
            } else {
                startMinutes = longRestMin;
            }

            startSeconds = 60;
            
            displayMinutes.innerText = `${startMinutes + 1}`;
            displaySeconds.innerText = "00";
        }
    }

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
                        sound.play();

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