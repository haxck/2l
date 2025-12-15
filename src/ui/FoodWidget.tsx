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
      setCount(() => {
        const r: number = sfood();
        return foods[Math.trunc(r)]
      });
    }, 80);
    setIntervalId(newIntervalId);
  };

  return (
    <div onClick={handleClick} className="active:scale-90 dark:bg-slate-800 bg-slate-100 opacity-90 rounded-xl border border-gray-600/10  shadow-xl shadow-gray-400/10 transition-all duration-300 dark:shadow-black/0 mt-4 aspect-square">
      {/* 外层flex容器 */}
      <div className="w-full h-full flex flex-col p-4">
        {/* 顶部行 - 包含提示文字 */}
        <div className="flex items-start justify-start">
          <p className="tracking-wider dark:text-slate-400">{list.promt}</p>
        </div>
        
        {/* 中间行 - 占满剩余空间，用于将食物选项垂直居中 */}
        <div className="flex-1 flex items-center justify-center">
          <p className="tracking-wider dark:text-slate-400 text-2xl text-center font-bold">{count}</p>
        </div>
        

      </div>
    </div>
  );
};

export default FoodWidget;