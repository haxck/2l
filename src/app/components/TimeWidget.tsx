export default function TimeWidget() {
    const today = new Date();
    function welcome() {
        const hours = today.getHours();
        if (hours >= 0 && hours <= 5) {
            return "夜深了，你还在思考宇宙嘛？"
        } else if (hours >= 6 && hours <= 8) {
            return "早啊，新的一天来咯，向快乐出发！"
        } else if (hours >= 9 && hours <= 11) {
            return "阳光明媚，加油加油！"
        } else if (hours >= 12 && hours <= 14) {
            return "中午啦，休息一下，补充点能量！"
        } else if (hours >= 15 && hours <= 18) {
            return "未来可期！加油加油！"
        } else if (hours >= 19 && hours <= 21) {
            return "你也发愁吃点什么嘛？"
        } else if (hours >= 22 && hours <= 23) {
            return "🛌不早了,该睡觉啦，枕着甜甜的美梦入睡哈~"
        }
    }
    function s() {
        const week = today.getDay()
        if ((week-5)>0 || week == 0){
            return "🎉今天休息啦🎉"
        }else if((week-5)==0){
            return "明天就是周六啦"
        }else if((week-5)<0){
            return "还有 " +Math.abs(week-5) +" 天就休息啦"
        }
    }
    return (
        <div className="words dark:bg-slate-800  bg-slate-100 opacity-90 rounded-xl border border-gray-600/10 p-4 shadow-xl shadow-gray-400/10 transition-all duration-300 dark:shadow-black/0 flex flex-col justify-center bg-orange-100/20 sm:col-span-6 lg:col-span-4 my-4 inline-block space-y-1">
            <p className="text-gray-400 ">📅 {today.getMonth() + 1}月{today.getDate()}日 </p>
            <p className="text-xl dark:text-slate-400">{s()}</p>
            <p className="dark:text-slate-400">{welcome()}</p>
        </div>
    )
}