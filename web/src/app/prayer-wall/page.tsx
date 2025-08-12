"use client"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Heart, Clock } from "lucide-react"

type PrayerRequest = {
  id: string
  body: string
  minutesAgo: number
  prayers: number
}

const initialRequests: PrayerRequest[] = [
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
  const [open, setOpen] = useState(false)
  const [text, setText] = useState("")
  const [list, setList] = useState<PrayerRequest[]>(initialRequests)

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
          <Button className="border border-primary/40 text-primary hover:bg-primary/10" onClick={() => setOpen(true)}>
            Share a request
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
        {list.map((r, idx) => (
          <Card key={r.id} className={`p-4 shadow-sm border ${idx % 2 ? "bg-gray-900 border-gray-800" : "bg-gray-950 border-gray-900"}`}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] rounded-full px-2 py-0.5 border border-gray-700 text-gray-400">approved</span>
                </div>
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

      {open && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-end sm:items-center sm:justify-center p-4 z-50">
          <div className="w-full sm:max-w-md rounded-xl border border-gray-800 bg-gray-900 p-4 space-y-3">
            <h2 className="text-base font-medium">Share a Request</h2>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={5}
              placeholder="Write a short, anonymous prayer request…"
              className="w-full rounded-md bg-black/30 border border-gray-800 p-2 outline-none text-sm text-white placeholder:text-gray-500"
            />
            <div className="flex items-center justify-end gap-2 pt-1">
              <Button variant="ghost" className="text-gray-400" onClick={() => setOpen(false)}>Cancel</Button>
              <Button
                className="border border-primary/40 text-primary hover:bg-primary/10"
                onClick={() => {
                  if (!text.trim()) return
                  setList([{ id: crypto.randomUUID(), body: text.trim(), minutesAgo: 0, prayers: 0 }, ...list])
                  setText("")
                  setOpen(false)
                }}
              >
                Submit (UI only)
              </Button>
            </div>
            <p className="text-[10px] text-gray-500">Requests are anonymous and will appear as pending for moderation in production.</p>
          </div>
        </div>
      )}
    </div>
  )
}

 
