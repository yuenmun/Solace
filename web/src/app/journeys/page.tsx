import Link from "next/link"
import { Card } from "@/components/ui/card"

type Journey = {
  slug: string
  title: string
  description: string
  days: number
  progress: number // 0-100
}

const journeys: Journey[] = [
  {
    slug: "finding-peace",
    title: "7 Days of Finding Peace",
    description: "Gentle steps to rest in God’s presence",
    days: 7,
    progress: 42,
  },
  {
    slug: "hope-after-breakup",
    title: "7 Days of Hope After a Breakup",
    description: "Compassionate prayers for a tender heart",
    days: 7,
    progress: 0,
  },
]

export default function JourneysPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="px-6 pt-12 pb-4">
        <h1 className="text-xl font-semibold mb-1">Guided Prayer Journeys</h1>
        <p className="text-gray-400">Daily steps toward hope.</p>
      </div>

      <div className="px-6 pb-28 space-y-4">
        {journeys.map((j) => (
          <Link key={j.slug} href={`/journeys/${j.slug}`} className="block">
            <Card className="bg-gray-900 border-gray-800 p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h2 className="text-base font-medium text-white">{j.title}</h2>
                  <p className="text-xs text-gray-500 mt-1">{j.description}</p>
                  <div className="mt-3 h-2 rounded-full bg-gray-800 overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${j.progress}%` }} />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">{Math.round(j.progress)}% complete • {j.days} days</p>
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

 
