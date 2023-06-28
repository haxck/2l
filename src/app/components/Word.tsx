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
    router.push(`wisper/${data[0]._id}`)
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
  console.log(url)
  return (
    <div className="w-5/6  rounded-xl  p-4 ">
      <p className="bg-[#0000002e] text-slate-400 p-3 -skew-y-3"># {data.type}
        <span className="float-right">
          {data.likeCount} 人喜欢
        </span>
      </p>

      <div className="before:block before:absolute before:-inset-1 before:-skew-y-3 before: relative block p-6 " >
        <p className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent relative words text-3xl whitespace-pre-wrap text-center">
          {data.sentent.replace(/\\n/g, '\n')}
        </p>
      </div>
      <div className="flex justify-center pt-6">
        <button onClick={likeit} className={"px-4 h-12 mr-6 heart " + (isLike ? "isLike" : " ")} type="submit">

        </button>
        <button onClick={fetchWord} className="px-4 h-12 scale-150" type="submit">
          🪐
        </button>
      </div>
    </div>
  )
}
