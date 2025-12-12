'use client'
import { useEffect, useState } from "react"
import kv from "../function/kv"


// 定义数据类型
interface Loveword {
  _id: string;
  type: string;
  sentent: string;
  likeCount: number;
}
// 模拟数据：每日一句
const mockData: Loveword = {
  _id: 'mock123',
  type: 'love',
  sentent: '愿你眼里总有光芒，活成你想要的模样。',
  likeCount: 42
};

export default function Word() {
  // 先获取之前是否点过赞

  const [data, setData] = useState<Loveword | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [isLike, setIsLike] = useState(false);

  useEffect(() => {
    setData(mockData)
    setIsLike(Boolean(localStorage.getItem(mockData._id)))
    setIsLoading(false)

  }, [])


  const fetchWord = async () => {
    let res = await kv.fetch("loveword-honey-0")
    if (res === "EdgeKV get: key not found" || res instanceof Response === false) {
      setData(mockData)
      setIsLike(Boolean(localStorage.getItem(mockData._id)))
      setIsLoading(false)
      return
    }
    
    // 解析响应内容
    const dataStr = await res.text()
    setData(JSON.parse(dataStr))
    setIsLike(Boolean(localStorage.getItem(mockData._id)))
    setIsLoading(false)
  }

  const likeit = () => {
    if (!data) return;
    
    const newIsLike = !isLike;
    setIsLike(newIsLike);
    
    // 更新localStorage中的点赞记录
    if (newIsLike) {
      localStorage.setItem(data._id, 'true');
      // 更新点赞数（在真实环境中应该调用API）
      setData(prev => prev ? { ...prev, likeCount: prev.likeCount + 1 } : prev);
    } else {
      localStorage.removeItem(data._id);
      // 更新点赞数（在真实环境中应该调用API）
      setData(prev => prev ? { ...prev, likeCount: Math.max(0, prev.likeCount - 1) } : prev);
    }
  }



  if (isLoading) return <>
      <div className="animate-pulse isolate rounded-xl border border-gray-600/10 p-4 shadow-xl shadow-gray-400/10 transition-all duration-300 dark:shadow-black/0 flex flex-col justify-between  bg-red-100/20 px-4 sm:col-span-6 lg:col-span-4">
      <div className="flex-1 space-y-6 py-1">
        <div className="h-3 bg-slate-200 rounded"></div>
        <div className="space-y-3">
          <div className="h-3 bg-slate-200 rounded"></div>
        </div>
      </div>
    </div>
  </>
  if (!data) return <p>No profile data</p>



  return (
    <div className="dark:bg-slate-800 bg-slate-100 opacity-90 rounded-xl border border-gray-600/10 p-4 shadow-xl shadow-gray-400/10 transition-all duration-300 dark:shadow-black/0 flex flex-col justify-between  bg-red-100/20 px-4 sm:col-span-6 lg:col-span-4">

      <div className="before:block before:absolute before:-inset-1 before:-skew-y-3 before: relative block p-2 " >
        <p className="rise-up bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent relative words text-xl whitespace-pre-wrap">
          {data.sentent.replace(/\\n/g, '\n')}
        </p>
      </div>

      <div className="flex items-center">
        <div className="ml-3 ">
          <span className="text-gray-600">{data.likeCount} 人喜欢</span>
        </div>

        <div className="ml-auto flex leading-[50px]">
          <a onClick={likeit} className={"px-4 heart cursor-pointer " + (isLike ? "isLike" : " ")} ></a>
          <a onClick={fetchWord} className="px-4 h-13 plane cursor-pointer" ></a>
        </div>

      </div>
    </div>
  )





}