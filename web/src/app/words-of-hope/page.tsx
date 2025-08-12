import Link from "next/link"
import { Card } from "@/components/ui/card"

type Topic = {
  slug: string
  title: string
  count: number
}

const topics: Topic[] = [
  { slug: "lonely", title: "For When You’re Lonely", count: 7 },
  { slug: "anxious", title: "When You Feel Anxious", count: 6 },
  { slug: "anger", title: "When Anger Rises", count: 5 },
  { slug: "loss", title: "For Grief and Loss", count: 8 },
  { slug: "sickness", title: "Finding Strength in Sickness", count: 6 },
]

export default function WordsOfHopePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="px-6 pt-12 pb-4">
        <h1 className="text-xl font-semibold mb-1">Words of Hope</h1>
        <p className="text-gray-400">Curated scripture topics for your situation.</p>
      </div>

      <div className="px-6 pb-28 grid grid-cols-1 gap-4">
        {topics.map((t) => (
          <Link key={t.slug} href={`/words-of-hope/${t.slug}`} className="block">
            <Card className="bg-gray-900 border-gray-800 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-medium text-white">{t.title}</h2>
                  <p className="text-xs text-gray-500">{t.count} verses</p>
                </div>
                <span className="text-xs text-primary">Open</span>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}


