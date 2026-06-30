'use client'
import { useEffect, useState } from "react"


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

  useEffect(() => {
    // 组件挂载时调用fetchWord获取AI生成的土味情话
    fetchWord()
  }, [])


  const fetchWord = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://2l.haxck.com/api/ai', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const apiResponse = await response.json();

      // 关键：确保拿到的是一个字符串
      let loveSentence: string;
      if (typeof apiResponse === 'string') {
        loveSentence = apiResponse;
      } else if (apiResponse && typeof apiResponse.sentence === 'string') {
        // 万一 API 返回的是 { sentence: "情话" } 这样的对象
        loveSentence = apiResponse.sentence;
      } else if (apiResponse && typeof apiResponse.error === 'string') {
        // 如果确实返回了 { error, details }，直接抛出可读错误
        throw new Error(apiResponse.error + (apiResponse.details ? ': ' + apiResponse.details : ''));
      } else {
        // 任何其他格式都视为异常
        throw new Error('Unexpected response format');
      }

      // 清理字符串（去掉多余引号等，这里按你之前的逻辑处理）
      // ...

      const newWord: Loveword = {
        _id: `ai-${Date.now()}`,
        type: 'love',
        sentent: loveSentence,      // 现在确保是字符串
        likeCount: Math.floor(Math.random() * 100)
      };

      setData(newWord);
    } catch (error) {
      console.error('获取土味情话失败:', error);
      setData(mockData);           // 降级到 mock 数据，页面不会白屏
    } finally {
      setIsLoading(false);
    }
  };




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
          {data.sentent}
        </p>
      </div>

      <div className="flex items-center">
        <div className="ml-3 flex items-center">
          <span className="text-gray-600">{data.likeCount} 人喜欢</span>
        </div>

        <div className="ml-auto flex leading-[50px]">
          <a onClick={fetchWord} className="px-4 h-13 plane cursor-pointer" ></a>
        </div>

      </div>
    </div>
  )





}