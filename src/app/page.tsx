"use client"
import WordWidget from './components/WordWidget'
import FoodWidget from './components/FoodWidget'
import TimeWidget from './components/TimeWidget'
import Menu from './components/Menu';
import Commemoration from './components/Commemoration';
import Link from './components/LinkWidget'
import { useEffect, useState } from 'react';
import { Reorder } from 'framer-motion';


export default function Home() {

  const [commemorations, setCommemorations] = useState([])
  function newCommemoration(title, time) {
    setCommemorations([{ title, time }, ...commemorations])
    localStorage.setItem("commemorations", JSON.stringify([{ title, time }, ...commemorations]))
  }
  function delCommemoration(index) {
    let c = JSON.parse(localStorage.getItem("commemorations"))
    c.splice(index, 1)
    setCommemorations([...c])
    localStorage.setItem("commemorations", JSON.stringify(c))
  }

  useEffect(() => {
    if (localStorage.getItem("commemorations") !== null) {
      console.log(localStorage.getItem("commemorations"))
      setCommemorations(JSON.parse(localStorage.getItem("commemorations")))
    }
  }, [])

  return (
    <div className="p-6 select-none min-h-screen bg flex justify-center items-center">
      <div className='max-sm:w-full max-lg:w-2/3 max-xl:w-3/4 w-1/4'>
        <TimeWidget />
        <Menu SetCommemorations={newCommemoration} />
        <Commemoration commemorations={commemorations} delCommemoration={delCommemoration} />
        <WordWidget />
        <div className='grid grid-cols-2 gap-3'>
          <FoodWidget list={{ promt: "一会儿去吃", list: "什么呢？ 盖浇饭 砂锅 大排档 米线 满汉全席 西餐 麻辣烫 自助餐 炒面 快餐 水果 西北风 馄饨 火锅 烧烤 泡面 水饺 日本料理 涮羊肉 味千拉面 面包 扬州炒饭 自助餐 菜饭骨头汤 茶餐厅 海底捞 西贝莜面 披萨 麦当劳 KFC 汉堡王 卡乐星 兰州拉面 沙县小吃 烤鱼 烤肉 海鲜 铁板烧 韩国料理 粥 快餐 萨莉亚 桂林米粉 东南亚菜 甜点 农家菜 川菜 粤菜 湘菜 本帮菜 全家便当" }} />
          <FoodWidget list={{ promt: "猜丁壳", list: "一局定胜负 ✌ 👋 ✊" }} />
        </div>
      </div>
    </div>
  )

}
