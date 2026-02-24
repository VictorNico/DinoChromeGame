// Environment management — period (day/night) and weather visual effects

function setSnowflakes(active) {
    const snowEl = document.getElementById('snow');
    if (active) {
        if (!snowEl.innerHTML.includes("<")) {
            snowEl.innerHTML = Array.from({ length: 51 }, () => '<div class="snowflake"></div>').join('');
        }
    } else {
        snowEl.innerHTML = "";
    }
}

function handleWeather() {
    setSnowflakes(weather.includes("rain"));
}

function updatePeriod() {
    const hour = new Date().getHours();
    if (hour < 18) {
        period = 'd';
        updateDayP();
    } else {
        period = 'n';
        updateNightP();
    }
}

function PeriodUserConf() {
    if (period.includes('d')) {
        updateDayP();
    } else {
        updateNightP();
    }
}

function updateDayP() {
    if (isRunning) {
        if (!document.getElementById('moon').getAttribute('class').includes('d-none')) {
            document.getElementById('moon').classList.toggle("d-none");
        }
        if (weather.includes('sun')) {
            handleWeather();
            if (document.getElementById('sun').getAttribute('class').includes('d-none')) {
                document.getElementById('sun').classList.toggle("d-none");
            }
        }
        if (weather.includes('rain')) {
            if (document.getElementById('cloud').getAttribute('class').includes('d-none')) {
                document.getElementById('cloud').classList.toggle("d-none");
            }
        }
        if (!document.getElementById('body').getAttribute('class').includes('bg-info text-dark')) {
            document.getElementById("body").setAttribute("class", "bg-info text-dark");
        }
    } else {
        document.getElementById("body").setAttribute("class", "bg-dark text-white");
        if (!document.getElementById('cloud').getAttribute('class').includes('d-none')) {
            document.getElementById('cloud').classList.toggle("d-none");
        }
        if (!document.getElementById('sun').getAttribute('class').includes('d-none')) {
            document.getElementById('sun').classList.toggle("d-none");
        }
    }
}

function updateNightP() {
    if (isRunning) {
        if (weather.includes('rain')) {
            if (document.getElementById('cloud').getAttribute('class').includes('d-none')) {
                document.getElementById('cloud').classList.toggle("d-none");
            }
        } else {
            handleWeather();
        }
        if (!document.getElementById('sun').getAttribute('class').includes('d-none')) {
            document.getElementById('sun').classList.toggle("d-none");
        }
        if (document.getElementById('moon').getAttribute('class').includes('d-none')) {
            document.getElementById('moon').classList.toggle("d-none");
        }
        if (!document.getElementById('body').getAttribute('class').includes('bg-dark text-white')) {
            document.getElementById("body").setAttribute("class", "bg-dark text-white");
        }
    } else {
        document.getElementById("body").setAttribute("class", "bg-dark text-white");
        if (!document.getElementById('cloud').getAttribute('class').includes('d-none')) {
            document.getElementById('cloud').classList.toggle("d-none");
        }
        if (!document.getElementById('moon').getAttribute('class').includes('d-none')) {
            document.getElementById('moon').classList.toggle("d-none");
        }
    }
}

function clearParties() {
    localStorage.removeItem('listP');
}

function startPeriodWatcher() {
    PeriodWatch = setInterval(updatePeriod, 5000);
}

function startPeriodWatcherU() {
    PeriodWatch = setInterval(PeriodUserConf, 5000);
}

function stopPeriodWatcher() {
    clearInterval(PeriodWatch);
}
