import React, { useState, useEffect } from "react";
import Countdown from "./Countdown";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Link } from "react-router-dom";

const Birthday = ({ name, day, month }) => {
  // useState Hooks
  const [state, setState] = useState({
    seconds: 0,
    hours: 0,
    minutes: 0,
    days: 0,
    isItBday: false,
  });

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
      // Getting the Current Date
      const dateAtm = new Date();
      let birthdayDay = new Date(currentYear, month - 1, day);
      if (dateAtm > birthdayDay) {
        birthdayDay = new Date(currentYear + 1, month - 1, day);
      } else if (dateAtm.getFullYear() === birthdayDay.getFullYear() + 1) {
        birthdayDay = new Date(currentYear, month - 1, day);
      }

      // Getitng Current Time
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

      // Setting States
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
              <GitHubIcon className="github-logo" fontSize="large" />
            </a>
          </div>
          {/* <Link to="/generate">Generate Here</Link> */}
        </>
      )}
    </div>
  );
};

export default Birthday;
