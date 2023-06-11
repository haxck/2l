'use client'
import { useEffect, useState } from "react"
import { POST } from "../api/route"

export default function Word() {

  const [data, setData] = useState({
    _id: ' ',
    type: ' ',
    sentent: ' ',
    likeCount: 0
  })
  const [isLike, setIsLike] = useState(false)
  const fetchWord = async () => {
    const res = await fetch("api/")
    const data = await res.json();
    setData(data[0])
    setIsLike(false)
  }

  useEffect(() => {
    fetchWord()
  }, [])


  async function likeit() {

    if (!isLike) {
      const o = await fetch('api/', {
        method: 'POST',
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          id: data._id
        })
      }).then(res => {
        return res.json()
      })

      const now = data.likeCount + 1;
      setData({
        ...data,
        likeCount: now
      })
      setIsLike(true)
    }
  }


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
        <button onClick={likeit} className={"px-4 h-12 mr-6 heart " + (isLike? "isLike": " ") } type="submit">
          
        </button>
        <button onClick={fetchWord} className="px-4 h-12 scale-150" type="submit">
          🪐
        </button>
      </div>
    </div>
  )
}
