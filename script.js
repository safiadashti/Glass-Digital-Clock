const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const ampmElement = document.getElementById("ampm");
const dateElement = document.getElementById("date");

const hourHand = document.getElementById("hourHand");
const minuteHand = document.getElementById("minuteHand");
const secondHand = document.getElementById("secondHand");

const formatBtn = document.getElementById("formatBtn");

let is24Hour = false;

// Update Clock

function updateClock() {

    const now = new Date();

    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const ampm = hours >= 12 ? "PM" : "AM";

    // 12 Hour Format

    let displayHours = hours;

    if (!is24Hour) {
        displayHours = hours % 12 || 12;
    }

    // Digital Clock

    hoursElement.textContent = String(displayHours).padStart(2, "0");

    minutesElement.textContent = String(minutes).padStart(2, "0");

    secondsElement.textContent = String(seconds).padStart(2, "0");

    ampmElement.textContent = is24Hour ? "" : ampm;

    // Analog Clock Rotation

    const hourRotation = (hours % 12) * 30 + minutes * 0.5;

    const minuteRotation = minutes * 6 + seconds * 0.1;

    const secondRotation = seconds * 6;

    hourHand.style.transform =
        `translateX(-50%) rotate(${hourRotation}deg)`;

    minuteHand.style.transform =
        `translateX(-50%) rotate(${minuteRotation}deg)`;

    secondHand.style.transform =
        `translateX(-50%) rotate(${secondRotation}deg)`;

    // Date

    dateElement.textContent = now.toLocaleDateString(
        "en-US",
        {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        }
    );
}

// Toggle 12H / 24H

formatBtn.addEventListener("click", function () {

    is24Hour = !is24Hour;

    formatBtn.textContent = is24Hour
        ? "Switch to 12H"
        : "Switch to 24H";

    updateClock();

});

// Run clock every second

updateClock();

setInterval(updateClock, 1000);