"use client"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function JourneyDayPage() {
  const { slug, n } = useParams() as { slug: string; n: string }
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="px-6 pt-12 pb-4">
        <Link href={`/journeys/${slug}`} className="text-xs text-gray-500">← Back</Link>
        <h1 className="text-xl font-semibold mt-2">Day {n}</h1>
        <p className="text-gray-400">Devotional, verse, and guided prayer</p>
      </div>

      <div className="px-6 pb-28 space-y-4">
        <Card className="bg-gray-900 border-gray-800 p-4">
          <h2 className="text-sm text-gray-400">Devotional</h2>
          <p className="text-gray-200 text-sm mt-2 leading-relaxed">
            In the stillness, bring your sorrow to God. Breathe slowly and remember He is near to the
            brokenhearted. Invite Him into this moment with simple honesty and trust.
          </p>
        </Card>
        <Card className="bg-gray-900 border-gray-800 p-4">
          <h2 className="text-sm text-gray-400">Verse</h2>
          <p className="text-gray-200 text-sm mt-2">“The Lord is near to the brokenhearted…” (Psalm 34:18, WEB)</p>
        </Card>
        <Card className="bg-gray-900 border-gray-800 p-4">
          <h2 className="text-sm text-gray-400">Guided Prayer</h2>
          <p className="text-gray-200 text-sm mt-2 leading-relaxed">
            Lord, meet me in my grief. Hold me in Your peace and remind me that I am not alone. Amen.
          </p>
        </Card>
        <div className="pt-2">
          <Button className="border border-primary/40 text-primary hover:bg-primary/10" disabled>
            Mark Day Complete (UI only)
          </Button>
        </div>
      </div>
    </div>
  )
}


