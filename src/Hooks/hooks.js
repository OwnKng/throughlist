import { useRef, useState, useEffect } from "react";

const useDate = () => {
  const [today, setToday] = useState();
  const [tomorrow, setTomorrow] = useState();

  useEffect(() => {
    let todayDate = new Date();
    var dd = String(todayDate.getDate()).padStart(2, "0");
    var mm = String(todayDate.getMonth() + 1).padStart(2, "0");
    var yyyy = todayDate.getFullYear();

    let tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    var tmrdd = String(tomorrowDate.getDate()).padStart(2, "0");
    var tmrmm = String(tomorrowDate.getMonth() + 1).padStart(2, "0");
    var tmryyyy = tomorrowDate.getFullYear();

    todayDate = `${yyyy}-${mm}-${dd}`;
    tomorrowDate = `${tmryyyy}-${tmrmm}-${tmrdd}`;

    setToday(todayDate);
    setTomorrow(tomorrowDate);
  }, []);

  return [today, tomorrow];
};

export default useDate;
