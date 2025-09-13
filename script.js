const dateBox = document.querySelector(".date-box");
const timeBox = document.querySelector(".time-box");
const dayBox = document.querySelector(".day-box");
const locationDisplay = document.querySelector(".location");

// for Date
function getDate() {
  const currentDate = new Date();
  dateBox.innerHTML = `${currentDate.getDate()} / ${
    currentDate.getMonth() + 1
  } / ${currentDate.getFullYear()}`;
}

getDate();
setInterval(getDate, 60000);

// for Time in 12 hr format

function updateClock() {
  const currentTime = new Date();
  let hours = currentTime.getHours();
  const minutes = currentTime.getMinutes().toString().padStart(2, "0");
  const seconds = currentTime.getSeconds().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const strHours = hours.toString().padStart(2, "0");

  timeBox.innerText = `${strHours} : ${minutes} : ${seconds} ${ampm}`;
}

setInterval(updateClock, 1000);

// for day
function getDay() {
  let currentDay = new Date();
  let dayName = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  dayBox.innerHTML = `${dayName[currentDay.getDay()]}`;
}
getDay();
setInterval(getDay, 60000);

// for location
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        );
        const data = await response.json();

        const city =
          data.address.city ||
          data.address.town ||
          data.address.village ||
          "Unknown City";
        const country = data.address.country || "Unknown Country";

        locationDisplay.innerText = `${city}, ${country}`;
      } catch (error) {
        locationDisplay.innerText = "Unable to fetch location";
      }
    },
    () => {
      locationDisplay.innerText = "Location access denied";
    }
  );
} else {
  locationDisplay.innerText = "Geolocation not supported";
}
