import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Heart, Clock } from "lucide-react"

type PrayerRequest = {
  id: string
  body: string
  minutesAgo: number
  prayers: number
}

const demoRequests: PrayerRequest[] = [
  {
    id: "p-1",
    body:
      "Please pray for peace tonight. I lost my mom recently and waves of sadness hit me at night.",
    minutesAgo: 12,
    prayers: 18,
  },
  {
    id: "p-2",
    body:
      "I’m facing uncertainty with my job. Asking God for provision and steady faith.",
    minutesAgo: 27,
    prayers: 11,
  },
  {
    id: "p-3",
    body: "Still grieving a breakup. Praying for healing and hope.",
    minutesAgo: 43,
    prayers: 25,
  },
]

export default function PrayerWallPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="px-6 pt-12 pb-4 border-b border-gray-900">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-200 to-gray-400 flex items-center justify-center">
            <Users className="w-4 h-4 text-black" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">Prayer Wall</h1>
            <p className="text-xs text-gray-500">An anonymous stream of requests, moderated for safety</p>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-3">
          <Button className="bg-white/10 hover:bg-white/20 text-white" disabled>
            Share a request (UI only)
          </Button>
          <Button variant="ghost" className="text-gray-400" disabled>
            Most recent
          </Button>
          <Button variant="ghost" className="text-gray-400" disabled>
            Most prayed
          </Button>
        </div>
      </div>

      {/* Feed */}
      <div className="px-4 py-6 pb-28 space-y-6">
        {demoRequests.map((r) => (
          <Card key={r.id} className="bg-gray-900 border-gray-800 p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <p className="text-sm text-gray-200 leading-relaxed line-clamp-4">{r.body}</p>
                <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {r.minutesAgo}m ago
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5" /> {r.prayers} praying
                  </span>
                </div>
              </div>
              <div className="shrink-0">
                <Button className="border border-primary/40 text-primary hover:bg-primary/10" disabled>
                  I am praying for you
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

 
