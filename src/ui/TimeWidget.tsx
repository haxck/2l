

import { useState, useEffect } from 'react';

export default function TimeWidget() {
    const [today, setToday] = useState(new Date());
    
    useEffect(() => {
        // 设置每秒更新一次时间
        const timer = setInterval(() => {
            setToday(new Date());
        }, 1000);
        
        // 组件卸载时清除定时器
        return () => clearInterval(timer);
    }, []);

    function getDayProgress() {
        const hours = today.getHours();
        const minutes = today.getMinutes();
        const seconds = today.getSeconds();
        const totalSeconds = hours * 3600 + minutes * 60 + seconds;
        const dayTotalSeconds = 24 * 3600;
        const progress = (totalSeconds / dayTotalSeconds) * 100;
        return Math.round(progress);
    }
    function getDayRemaining() {
        const hours = today.getHours();
        const minutes = today.getMinutes();
        const seconds = today.getSeconds();
        const totalSeconds = hours * 3600 + minutes * 60 + seconds;
        const dayTotalSeconds = 24 * 3600;
        const remainingSeconds = dayTotalSeconds - totalSeconds;
        const remainingHours = Math.floor(remainingSeconds / 3600);
        const remainingMinutes = Math.floor((remainingSeconds % 3600) / 60);
        return `${remainingHours}小时${remainingMinutes}分钟`;
    }
    function getMonthDays() {
        const year = today.getFullYear();
        const month = today.getMonth();
        return new Date(year, month + 1, 0).getDate();
    }
    function getMonthProgress() {
        const date = today.getDate();
        const totalDays = getMonthDays();
        const progress = (date / totalDays) * 100;
        return Math.round(progress);
    }
    function getMonthRemaining() {
        const date = today.getDate();
        const totalDays = getMonthDays();
        return totalDays - date;
    }
    function isLeapYear(year: number) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }
    function getYearDays() {
        const year = today.getFullYear();
        return isLeapYear(year) ? 366 : 365;
    }
    function getDayOfYear() {
        const year = today.getFullYear();
        const start = new Date(year, 0, 0);
        const diff = today.getTime() - start.getTime();
        return Math.floor(diff / (1000 * 60 * 60 * 24));
    }
    function getYearProgress() {
        const dayOfYear = getDayOfYear();
        const totalDays = getYearDays();
        const progress = (dayOfYear / totalDays) * 100;
        return Math.round(progress);
    }
    function getYearRemaining() {
        const dayOfYear = getDayOfYear();
        const totalDays = getYearDays();
        return totalDays - dayOfYear;
    }
    
    function getWeekProgress() {
        const day = today.getDay(); // 0-6，0是周日
        const hours = today.getHours();
        const minutes = today.getMinutes();
        const seconds = today.getSeconds();
        
        // 计算本周已过去的总秒数
        const passedSeconds = day * 24 * 3600 + hours * 3600 + minutes * 60 + seconds;
        // 一周总秒数
        const weekTotalSeconds = 7 * 24 * 3600;
        // 计算进度百分比
        const progress = (passedSeconds / weekTotalSeconds) * 100;
        return Math.round(progress);
    }
    
    function getWeekRemaining() {
        const day = today.getDay(); // 0-6，0是周日
        const hours = today.getHours();
        const minutes = today.getMinutes();
        const seconds = today.getSeconds();
        
        // 计算本周已过去的总秒数
        const passedSeconds = day * 24 * 3600 + hours * 3600 + minutes * 60 + seconds;
        // 一周总秒数
        const weekTotalSeconds = 7 * 24 * 3600;
        // 计算剩余秒数
        const remainingSeconds = weekTotalSeconds - passedSeconds;
        
        // 计算剩余天数和小时数
        const remainingDays = Math.floor(remainingSeconds / (24 * 3600));
        const remainingHours = Math.floor((remainingSeconds % (24 * 3600)) / 3600);
        
        return remainingDays > 0 ? `${remainingDays}天${remainingHours}小时` : `${remainingHours}小时`;
    }
    return (
        <div className="words dark:bg-slate-800  bg-slate-100 opacity-90 rounded-xl border border-gray-600/10 p-4 shadow-xl shadow-gray-400/10 transition-all duration-300 dark:shadow-black/0 flex flex-col justify-center bg-orange-100/20 sm:col-span-6 lg:col-span-4 my-4 space-y-2">
            <p className="text-lg font-bold">时间感知</p>            
            <div className="space-y-2">
                <div className="space-y-1">
                    <div className="flex justify-between text-xs dark:text-slate-400">
                        <span>一天</span>
                        <span>{getDayProgress()}%</span>
                    </div>
                    <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-1.5">
                        <div 
                            className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${getDayProgress()}%` }}
                        ></div>
                    </div>
                    <p className="text-xs dark:text-slate-400">还剩余 {getDayRemaining()}</p>
                </div>
                
                <div className="space-y-1">
                    <div className="flex justify-between text-xs dark:text-slate-400">
                        <span>一周</span>
                        <span>{getWeekProgress()}%</span>
                    </div>
                    <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-1.5">
                        <div 
                            className="bg-orange-500 h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${getWeekProgress()}%` }}
                        ></div>
                    </div>
                    <p className="text-xs dark:text-slate-400">还剩余 {getWeekRemaining()}</p>
                </div>
                
                <div className="space-y-1">
                    <div className="flex justify-between text-xs dark:text-slate-400">
                        <span>一个月</span>
                        <span>{getMonthProgress()}%</span>
                    </div>
                    <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-1.5">
                        <div 
                            className="bg-green-500 h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${getMonthProgress()}%` }}
                        ></div>
                    </div>
                    <p className="text-xs dark:text-slate-400">还剩余 {getMonthRemaining()}天</p>
                </div>
                
                <div className="space-y-1">
                    <div className="flex justify-between text-xs dark:text-slate-400">
                        <span>一年</span>
                        <span>{getYearProgress()}%</span>
                    </div>
                    <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-1.5">
                        <div 
                            className="bg-purple-500 h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${getYearProgress()}%` }}
                        ></div>
                    </div>
                    <p className="text-xs dark:text-slate-400">还剩余 {getYearRemaining()}天</p>
                </div>
            </div>
        </div>
    )
}