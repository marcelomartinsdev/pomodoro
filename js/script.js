window.addEventListener("load", () => {
    const sound = document.querySelector("#sound");
    sound.volume = 0.1;

    const setting = document.querySelector("#btnSettings");
    const startButton = document.querySelector("#start");
    const resetButton = document.querySelector("#reset");
    const displayMinutes = document.querySelector(".minutes");
    const displaySeconds = document.querySelector(".seconds");

    const pomodoroMin = 24;
    const restMin = 4;
    const longRestMin = 14;

    let startMinutes = 24;
    let startSeconds = 60;
    let isTimerOff = true;
    let userReset = false;

    setting.addEventListener("click", settings);

    function settings() {
        const configIcon = document.querySelector(".configIcon");
        const divSet = document.querySelector(".settings-container");
        const inputVol = document.querySelector("#audioVol");
        const closeBtn = document.querySelector(".btnClose");
        const buttons = document.querySelectorAll(".grid-container button");

        configIcon.style.visibility = "hidden";
        divSet.style.opacity = "1";
        divSet.style.visibility = "visible";

        buttons.forEach((button) => {
            button.disabled = true;
        });

        inputVol.addEventListener("change", () => {
            document.querySelector(".volume")
                .innerText = `Volume: ${inputVol.value}`;
                
            sound.volume = inputVol.value / 10;
        });

        closeBtn.addEventListener("click", () => {
            configIcon.style.visibility = "visible";
            divSet.style.visibility = "hidden";
            divSet.style.opacity = "0";

            buttons.forEach((button) => {
                button.disabled = false;
            });
        });
    }

    window.changeTimer = function (color, option) {
        if(isTimerOff) {
            const container = document.querySelector(".container");
            const titleHeader = document.querySelectorAll(".title");
            const spotlight = document.querySelectorAll(".spotlight");
            
            document.querySelector("#close")
                .style
                .backgroundColor = `#${color}`;

            document.querySelector("body")
                .style
                .backgroundColor = `#${color}`;

            container.style.backgroundColor = `#${color}`;
            container.style.transition = "1s";
            
            changeCss(titleHeader);
            changeCss(spotlight);

            function changeCss(element) {
                element.forEach((title) => {
                    title.style.borderColor = `#${color}`;
                    title.style.color = `#${color}`
                    title.style.transition = "1s";
                });
            }

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
                        isTimerOff = true;
                        userReset = false;

                        resetTime();
                    }
                }
            }

            function updateDisplay() {
                const checkCount = (currentTime, element, isMinute) => {
                    if(isMinute) {
                        element.innerText = currentTime;
                    } else {
                        if (currentTime >= 10) {
                            element.innerText = currentTime;		
                        } else {	
                            element.innerText = `0${currentTime}`;	
                        }
                    }
                }

                checkCount(currentMinutes, displayMinutes, true);
                checkCount(currentSeconds, displaySeconds, false);
            }

            function resetTime() {
                clearInterval(interval);
               
                displayMinutes.innerText = startMinutes + 1;
                displaySeconds.innerText = "00";

                if(isTimerOff && !userReset) {
                    sound.play();

                    setTimeout(() => {
                        alert("Time is Over!");
                    }, 10);    
                } else {
                    userReset = true;
                    isTimerOff = true;
                }
            }
        }
    }

    document
        .querySelector("#version")
        .innerText = "Version 1.0.2 (Official Build)";
});