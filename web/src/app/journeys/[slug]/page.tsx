"use client"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Card } from "@/components/ui/card"

const demo = {
  title: "7 Days of Finding Peace",
  days: 7,
}

export default function JourneyDetailPage() {
  const { slug } = useParams() as { slug: string }
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="px-6 pt-12 pb-4">
        <Link href="/journeys" className="text-xs text-gray-500">← Back</Link>
        <h1 className="text-xl font-semibold mt-2">{demo.title}</h1>
        <p className="text-gray-400">Select a day to begin</p>
      </div>
      <div className="px-6 pb-28 grid grid-cols-1 gap-3">
        {Array.from({ length: demo.days }).map((_, i) => (
          <Link key={i} href={`/journeys/${slug}/day/${i + 1}`} className="block">
            <Card className="bg-gray-900 border-gray-800 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-medium text-white">Day {i + 1}</h2>
                  <p className="text-xs text-gray-500">Devotional • 5–7 min</p>
                </div>
                <span className="text-xs text-primary">Start</span>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}


