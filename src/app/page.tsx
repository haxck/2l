import WordWidget from './components/WordWidget'
import FoodWidget from './components/FoodWidget'
async function getWord() {
  const res = await fetch(`http://localhost:3000/api`, { cache: 'no-store' })
  return res.json()
}

export default async function Home() {


  const word = await getWord()
  return (
    <div className="p-6 select-none flex flex-col justify-center h-screen">

      <WordWidget content={word[0]} />
      <div className='grid grid-cols-2 gap-3'>

        <FoodWidget list={{ promt: "一会儿去吃？", list: "盖浇饭 砂锅 大排档 米线 满汉全席 西餐 麻辣烫 自助餐 炒面 快餐 水果 西北风 馄饨 火锅 烧烤 泡面 水饺 日本料理 涮羊肉 味千拉面 面包 扬州炒饭 自助餐 菜饭骨头汤 茶餐厅 海底捞 西贝莜面 披萨 麦当劳 KFC 汉堡王 卡乐星 兰州拉面 沙县小吃 烤鱼 烤肉 海鲜 铁板烧 韩国料理 粥 快餐 萨莉亚 桂林米粉 东南亚菜 甜点 农家菜 川菜 粤菜 湘菜 本帮菜 全家便当" }} />
        <FoodWidget list={{ promt: "猜丁壳", list: "✊ ✌ 👋 ✊ ✌ 👋 ✊ ✌ 👋 ✊ ✌ 👋" }} />
      </div>

    </div>
  )
}
