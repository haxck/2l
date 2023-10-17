import dynamic from 'next/dynamic'

const WordWidget = dynamic(() => import('./components/WordWidget'), {
  loading: () =>
    <div className="animate-pulse isolate rounded-xl border border-gray-600/10 p-4 shadow-xl shadow-gray-400/10 transition-all duration-300 dark:shadow-black/0 flex flex-col justify-between  bg-red-100/20 px-4 sm:col-span-6 lg:col-span-4">
      <div className="flex-1 space-y-6 py-1">
        <div className="h-3 bg-slate-200 rounded"></div>
        <div className="space-y-3">
          <div className="h-3 bg-slate-200 rounded"></div>
        </div>
      </div>
    </div>
  ,
})

import FoodWidget from './components/FoodWidget'
import TimeWidget from './components/TimeWidget'
import Link from './components/LinkWidget'
let url = ""
if(window !== undefined ){
  url = window.location.origin + "/api"
}
async function getWord() {
  const res = await fetch(url, { cache: 'no-store' })
  return res.json()
}

export default async function Home() {


  const word = await getWord()
  return (
    <div className="p-6 select-none min-h-screen bg flex justify-center items-center">
      <div className='max-sm:w-full max-lg:w-2/3 max-xl:w-3/4 w-1/4'>
        <TimeWidget />
        <WordWidget content={word[0]} />
        <div className='grid grid-cols-2 gap-3'>
          <FoodWidget list={{ promt: "一会儿去吃", list: "什么呢？ 盖浇饭 砂锅 大排档 米线 满汉全席 西餐 麻辣烫 自助餐 炒面 快餐 水果 西北风 馄饨 火锅 烧烤 泡面 水饺 日本料理 涮羊肉 味千拉面 面包 扬州炒饭 自助餐 菜饭骨头汤 茶餐厅 海底捞 西贝莜面 披萨 麦当劳 KFC 汉堡王 卡乐星 兰州拉面 沙县小吃 烤鱼 烤肉 海鲜 铁板烧 韩国料理 粥 快餐 萨莉亚 桂林米粉 东南亚菜 甜点 农家菜 川菜 粤菜 湘菜 本帮菜 全家便当" }} />
          <FoodWidget list={{ promt: "猜丁壳", list: "一局定胜负 ✌ 👋 ✊" }} />
          <Link />
        </div>
      </div>

    </div>
  )
}
