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
  const cacheLike = localStorage.getItem(content._id)
  const [isLike, setIsLike] = useState(Boolean(cacheLike))
  const [data, setData] = useState({
    ...content
  })
  const router = useRouter()
  let url = ""
  if(window !== undefined ){
    url = window.location.origin + "/api"
  }
  const fetchWord = async () => {

    const res = await fetch(url)
    const data = await res.json();
    const word = data[0]
    setData(data[0])
    const cacheLike = localStorage.getItem(word._id)
    setIsLike(Boolean(cacheLike))
  }
  async function likeit() {
    if (!isLike) {
      const o = await fetch(url, {
        method: 'POST',
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          type: "like",
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

      localStorage.setItem(data._id,"true")
    }else{
      const o = await fetch(url, {
        method: 'POST',
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          type: "dislike",
          id: data._id
        })
      }).then(v => {
        return v.json()
      })
      setIsLike(false)
      setData({
        ...data,
        likeCount: data.likeCount - 1
      })
      localStorage.removeItem(data._id)
    }
  }
  return (
    <div className="dark:bg-slate-800 bg-slate-100 opacity-70 rounded-xl border border-gray-600/10 p-4 shadow-xl shadow-gray-400/10 transition-all duration-300 dark:shadow-black/0 flex flex-col justify-between  bg-red-100/20 px-4 sm:col-span-6 lg:col-span-4">

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