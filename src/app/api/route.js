import { NextResponse } from "next/server"
import connect from "../utils/db"
import Lovewords from "../models/Lovewords"


export const GET = async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id')
    const type = searchParams.get('type')
    const count = searchParams.get('count')
    if (id) {
      const a = await find(id)
      return NextResponse.json(a)
    } else {
      const b = await findOne(type ? type : "honey", count ? count : "1")
      return NextResponse.json(b)
    }

  } catch (error) {
    return new NextResponse("error", { status: 500 })
  }
}

export async function POST(request) {
  const p = await request.json()

  const data = await likeit(p.id)

  return NextResponse.json(data);
}
async function find(id) {
  try {
    await connect()
    const res = await Lovewords.findById(id)
    return res
  } catch (error) {
    return {error: error}
  }
}

async function likeit(id) {
  try {
    await connect()
    const lw = await Lovewords.updateOne(
      {
        _id:id
      },{
        $inc:{
          likeCount: 1
        }
      }
      )
      const res = await Lovewords.findById(id)
      return res
  } catch (error) {
    return error
  }
}


async function findOne(type, count) {
  try {
    await connect()
    const lw = (await Lovewords.aggregate([
      { $match: { type: type } },
      { $sample: { size: parseInt(count) } }]))
    return lw
  } catch (error) {
    return error
  }
}


async function del(id){
  try {
    await connect()
    const lw = await Lovewords.findByIdAndDelete(id)
    return lw
  } catch (error) {
    return error
  }
}
/* 
1. 有 id 直接查找返回

2. 无 ID
  2.1 三无 随机返回一条数据
  2.2 有type
  2.3 有count
*/