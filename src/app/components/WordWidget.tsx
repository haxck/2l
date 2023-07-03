'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Word(
  { content }: {
    content: {
      _id: string,
      type: string,
      sentent: string,
      likeCount: number
    }
  }
) {
  const [isLike, setIsLike] = useState(false)
  const [data, setData] = useState({
    ...content
  })
  const router = useRouter()
  const url = window.location.origin + "/api"
  const fetchWord = async () => {

    const res = await fetch(url)
    const data = await res.json();
    setData(data[0])
    setIsLike(false)
  }
  async function likeit() {
    if (!isLike) {
      const o = await fetch(url, {
        method: 'POST',
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          id: data._id
        })
      }).then(v => {
        return v.json()
      })
      setIsLike(true)
      setData({
        ...data,
        likeCount: data.likeCount + 1
      })
    }
  }
  return (
    <div className="isolate rounded-xl border border-gray-600/10 p-4 shadow-xl shadow-gray-400/10 transition-all duration-300 dark:shadow-black/0 flex flex-col justify-between  bg-red-100/20 px-4 sm:col-span-6 lg:col-span-4">

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

          <a onClick={likeit} className={"px-4 heart cursor-pointer " + (isLike ? "isLike" : " ")} >
          </a>

          <a onClick={fetchWord} className="px-4 h-13 plane cursor-pointer" >
            
          </a>
        </div>

      </div>
    </div>
  )
}