"use client"
import { useState } from "react";

const FoodWidget = ({list}:{list:{promt:string,list:string}}) => {
  const foods: string[] = list.list.split(" ")
  const [count, setCount] = useState(foods[0]);
  const [intervalId, setIntervalId] = useState(0);

  function sfood(min = 1, max = foods.length) {
    return Math.random() * (max - min) + min;
  }

  const handleClick = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(0);
      return;
    }

    const newIntervalId= window.setInterval(() => {
      setCount(prevCount => {
        const r: number = sfood();
        return prevCount = foods[Math.trunc(r)]
      });
    }, 80);
    setIntervalId(newIntervalId);
  };

  return (
    <div onClick={handleClick} className="active:scale-90 words dark:bg-slate-800  bg-slate-100 opacity-90 rounded-xl border border-gray-600/10 p-4 shadow-xl shadow-gray-400/10 transition-all duration-300 dark:shadow-black/0 flex flex-col justify-center bg-blue-100/20  mt-4 inline-block">
      <div className="">
        <p className="tracking-wider dark:text-slate-400">{list.promt}</p>
      </div>
      <div className="py-6">
        <p className="tracking-wider dark:text-slate-400 text-2xl text-center font-bold h-16">{count}</p>
      </div>

    </div>
  );
};

export default FoodWidget;