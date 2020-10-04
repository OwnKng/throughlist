import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { AiOutlineArrowUp } from "react-icons/ai";
import { AiOutlineArrowDown } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";

const daysInMonth = (month, year) => {
  return new Date(year, month, 0).getDate();
};

const getTidyDate = (todayPlus = 0) => {
  let today = new Date();
  const dd = String(today.getDate() + todayPlus).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();

  return `${yyyy}-${mm}-${dd}`;
};

const Cal = styled(motion.div)`
  width: 90%;
  max-width: 400px;
  position: fixed;
  bottom: 120px;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(220, 220, 220);
  overflow: hidden;
  color: rgb(100, 100, 100);
  border-radius: 5px;
`;

const Title = styled.div`
  display: grid;
  font-size: 1rem;
  justify-items: center;
  font-weight: bold;
`;

const Controls = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  justify-content: space-around;
  justify-items: center;
  font-size: 0.8rem;
  border-bottom: 1px solid rgb(220, 220, 220);
  border-top: 1px solid rgb(220, 220, 220);

  .today {
    grid-column-start: 1;
    grid-column-end: 3;
    text-align: center;
    width: 100%;
    font-size: 1rem;
    border-bottom: 1px solid rgb(220, 220, 220);
  }

  .today:hover {
    background: rgb(240, 240, 240);
  }

  .tomorrow {
    grid-column-start: 3;
    grid-column-end: 5;
    text-align: center;
    width: 100%;
    font-size: 1rem;
    border-bottom: 1px solid rgb(220, 220, 220);
    border-left: 1px solid rgb(220, 220, 220);
  }

  .tomorrow:hover {
    background: rgb(240, 240, 240);
  }

  svg {
    font-size: 1rem;
  }

  svg:hover {
    background: rgb(240, 240, 240);
  }
`;

const Calendar = ({ activeToDo, toggleDate, addDate }) => {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  let dayOfMonth = new Date().getDate();
  if (month != new Date().getMonth() + 1) dayOfMonth = 0;

  const Days = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    justify-items: stretch;
    align-items: stretch;
    text-align: center;
    height: 200px;
    font-size: 0.8rem;
    overflow: hidden;

    .day:hover {
      background: rgb(240, 240, 240);
    }

    .day:nth-child(${dayOfMonth}) {
      background: rgb(240, 240, 240);
    }
  `;

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

  let days = Array(31)
    .fill()
    .map((element, index) => index + 1);

  useEffect(() => {
    if (month > 12) {
      setMonth(1);
      setYear(year + 1);
    } else if (month < 1) {
      setMonth(12);
      setYear(year - 1);
    }
  }, [month]);

  const node = useRef();

  useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const handleClick = (e) => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    toggleDate();
  };

  const handleDate = (day) => {
    const monthClean = month < 10 ? `0${month}` : `${month}`;
    const dayClean = day < 10 ? `0${day}` : `${day}`;

    addDate({
      variables: {
        id: activeToDo,
        date: `${year}-${monthClean}-${dayClean}`,
      },
    });
    toggleDate();
  };

  const renderDays = () => {
    return days.map((day, i) => {
      if (i < daysInMonth(month, year)) {
        return (
          <motion.div
            key={i}
            className='day'
            onClick={(e) => handleDate(e.target.innerHTML)}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ y: 30 }}
          >
            {day}
          </motion.div>
        );
      } else {
        return <span key={i} className='day'></span>;
      }
    });
  };

  return (
    <AnimatePresence>
      <Cal
        ref={node}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Title>Set Due Date</Title>
        <motion.div initial={{ y: 50 }} animate={{ y: 0 }} exit={{ y: 30 }}>
          <Controls>
            <div
              className='today'
              onClick={() => {
                addDate({
                  variables: {
                    id: activeToDo,
                    date: getTidyDate(),
                  },
                });
                toggleDate();
              }}
            >
              Today
            </div>
            <div
              className='tomorrow'
              onClick={() => {
                addDate({
                  variables: {
                    id: activeToDo,
                    date: getTidyDate(1),
                  },
                });
                toggleDate();
              }}
            >
              Tomorrow
            </div>
            <div className='month'>{monthNames[month - 1]}</div>
            <div className='year'>{year}</div>
            <AiOutlineArrowDown
              onClick={() => {
                setMonth(month - 1);
              }}
            />
            <AiOutlineArrowUp
              onClick={() => {
                setMonth(month + 1);
              }}
            />
          </Controls>
          <Days>{renderDays()}</Days>
        </motion.div>
      </Cal>
    </AnimatePresence>
  );
};

export default Calendar;
