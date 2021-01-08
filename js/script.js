window.addEventListener("load", () => {
    const sound = document.querySelector("#sound");
    sound.volume = 
        localStorage.volume >= 0 && localStorage.volume <= 10 ?
        localStorage.volume / 10 : 0.1;


    const setting = document.querySelector("#btnSettings");
    const volume = document.querySelector(".volume");
    const inputVol = document.querySelector("#audioVol");

    const updateLabel = (label) => { label.innerText = `Volume: ${inputVol.value}`; };
    inputVol.value = sound.volume * 10;

    const displayMinutes = document.querySelector(".minutes");
    const displaySeconds = document.querySelector(".seconds");
    const startButton = document.querySelector("#start");
    const resetButton = document.querySelector("#reset");

    const pomodoroMin = 24;
    const restMin = 4;
    const longRestMin = 14;

    let startMinutes = 24;
    let startSeconds = 60;
    let isTimerOff = true;
    let userReset = false;

    setting.addEventListener("click", settings);

    function settings() {
        updateLabel(volume);

        const configIcon = document.querySelector(".configIcon");
        const divSet = document.querySelector(".settings-container");
        const saveButton = document.querySelector(".btnSave");
        const buttons = document.querySelectorAll(".grid-container button");

        configIcon.style.visibility = "hidden";
        divSet.style.opacity = "1";
        divSet.style.visibility = "visible";

        const toggleBtn = (buttons, option) => {
            buttons.forEach((button) => {
                button.disabled = option;
            });
        }

        toggleBtn(buttons, true);

        inputVol.addEventListener("change", () => { updateLabel(volume); });

        saveButton.addEventListener("click", () => {
            localStorage.setItem("volume", inputVol.value);

            sound.volume = inputVol.value / 10;

            configIcon.style.visibility = "visible";
            divSet.style.visibility = "hidden";
            divSet.style.opacity = "0";

            toggleBtn(buttons, false);
        });
    }

    window.changeTimer = function (color, option) {
        if(isTimerOff) {
            const container = document.querySelector(".container");
            const titleHeader = document.querySelectorAll(".title");
            const spotlight = document.querySelectorAll(".spotlight");

            const applyBgColor = (element) => { 
                document
                .querySelector(element)
                .style
                .backgroundColor = `#${color}`;
            };

            applyBgColor("#save");
            applyBgColor("body");
            applyBgColor(".container");

            container.style.transition = "1s";

            function changeCss(element) {
                element.forEach((el) => {
                    el.style.borderColor = `#${color}`;
                    el.style.color = `#${color}`
                    el.style.transition = "1s";
                });
            }

            changeCss(titleHeader);
            changeCss(spotlight);

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
        .innerText = "Version 1.0.3 (Official Build)";
});