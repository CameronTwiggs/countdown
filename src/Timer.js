import React, { useEffect, useState } from "react";

const calculateTimeLeft = (targetDate = "9/23/") => {
  let year = new Date().getFullYear();
  let difference = +new Date(targetDate + year) - +new Date();
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

export default function Timer(props) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(props.date));

  
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(props.date));
    }, 1000);
    return () => clearTimeout(timer);
  });

  const timerComponents = [];

// timeLeft === {days: 42, hours: 23, minutes: 44, seconds: 9}
// Object.keys === ['days', 'hours', 'minutes', 'seconds']
  
  Object.keys(timeLeft).forEach((interval) => {
    // if values are 0, don't display
    // if (!timeLeft[interval]) { return; }

    timerComponents.push(
      <span key={interval} className={interval}>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  return (
    <li className="list__item">
      {timerComponents.length ? timerComponents : <span>Time's up!</span>}
    </li>
  );
}
