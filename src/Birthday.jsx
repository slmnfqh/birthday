import React, { useState, useEffect } from "react";
import Countdown from "./Countdown";

const Birthday = ({ name, day, month }) => {
  // useState Hooks
  const [state, setState] = useState({
    seconds: 0,
    hours: 0,
    minutes: 0,
    days: 0,
    isItBday: false,
  });

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = ["./muji.png", "./muji2.png"]; // Gambar untuk carousel

  if (name === undefined || day === undefined || month === undefined) {
    // Default values
    name = "M _ ji Marsya";
    month = 10;
    day = 14;
  }

  // get current time
  const currentTime = new Date();
  const currentYear = currentTime.getFullYear();

  // Bithday Boolean
  const isItBday =
    currentTime.getDate() === day && currentTime.getMonth() === month - 1;

  useEffect(() => {
    const interval = setInterval(() => {
      const dateAtm = new Date();
      let birthdayDay = new Date(currentYear, month - 1, day);
      if (dateAtm > birthdayDay) {
        birthdayDay = new Date(currentYear + 1, month - 1, day);
      } else if (dateAtm.getFullYear() === birthdayDay.getFullYear() + 1) {
        birthdayDay = new Date(currentYear, month - 1, day);
      }

      const currentTime = dateAtm.getTime();
      const birthdayTime = birthdayDay.getTime();
      const timeRemaining = birthdayTime - currentTime;

      let seconds = Math.floor(timeRemaining / 1000);
      let minutes = Math.floor(seconds / 60);
      let hours = Math.floor(minutes / 60);
      let days = Math.floor(hours / 24);

      seconds %= 60;
      minutes %= 60;
      hours %= 24;

      setState((prevState) => ({
        ...prevState,
        seconds,
        minutes,
        hours,
        days,
        isItBday,
      }));
    }, 1000);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [currentYear, day, isItBday, month]);

  // Effect untuk mengatur carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Ganti gambar setiap 3 detik

    return () => clearInterval(timer); // Clear interval pada unmount
  }, [images.length]);

  let birth = new Date(currentYear, month - 1, day);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let monthBday = monthNames[birth.getMonth()];

  return (
    <div className="page">
      <Countdown countdownData={state} name={name} />
      {!isItBday && (
        <>
          <div className="birthdate">
            Birth-Date: {day} {monthBday} {currentYear} 🌻
          </div>
          <div className="credits">
            <a
              href="https://github.com/slmnfqh"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={images[currentImageIndex]}
                alt="GitHub Logo"
                className="github-logo"
              />
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default Birthday;
