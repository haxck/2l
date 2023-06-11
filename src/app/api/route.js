import { NextResponse } from "next/server"
import connect from "../utils/db"
import lovewords from "../models/Lovewords"

/* 
处理GET请求
1. 有 id 直接查找返回

2. 无 ID
  2.1 三无 随机返回一条数据
  2.2 有type
  2.3 有count
*/
export const GET = async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id')
    const type = searchParams.get('type')
    const count = searchParams.get('count')
    if (id) {
      const res = find(id)
      return NextResponse.json(res)
    } else {
      const res = await findOne(type ? type : "honey", count ? count : "1")
      return NextResponse.json(res)
    }

  } catch (error) {
    return new NextResponse("error" + error, { status: 500 })
  }
}

export async function POST(request) {
  const req = await request.json()
  const res = await likeit(req.id)
  return NextResponse.json(res);
}

async function find(id) {
  try {
    await connect()
    return await lovewords.findById(id)
  } catch (error) {
    return error
  }
}

async function likeit(id) {
  try {
    await connect()
    const lw = await lovewords.updateOne(
      {
        _id: id
      }, {
      $inc: {
        likeCount: 1
      }
    }
    )
    return await lovewords.findById(id)
  } catch (error) {
    return error
  }
}

async function findOne(type, count) {
  try {
    await connect()
    const lw = await lovewords.aggregate([
      { $match: { type: type } },
      { $sample: { size: parseInt(count) } }])
    return lw
  } catch (error) {
    return error
  }
}
