import { redirect } from "next/navigation";
export default async function Home() {

  async function fetchword() {
    const url: string = "http://localhost:3000/api";
    const res = await fetch(url, { cache: "no-store" })
      .then(res => res.json())
    return res[0]
  }

  const word = await fetchword()

  redirect("wisper/" + word._id)

}
