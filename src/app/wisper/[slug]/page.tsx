import Word from "../../components/Word"

async function getWord(id: string) {
  const res = await fetch(`https://2l.haxck.com/api?id=${id}`,{ cache: 'no-store' })
  return res.json()
}

export default async function Home({ params }: { params: { slug: string } }) {
  const word = await getWord(params.slug)
  return (
    <main className="mx-auto max-w-3xl flex min-h-screen max-h-screen flex-col items-center justify-center bg-slate-800">
      <Word content={word} />
    </main>
  )
}
