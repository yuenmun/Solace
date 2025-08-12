"use client"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookMarked, Plus } from "lucide-react"

type Entry = { id: string; content: string; createdAt: string }

const demoEntries: Entry[] = [
  { id: "e1", content: "I miss your laughter today.", createdAt: "2025-08-01" },
  { id: "e2", content: "A small song reminded me of you.", createdAt: "2025-08-05" },
]

export default function MemoryDetailPage() {
  const { id } = useParams() as { id: string }
  const [open, setOpen] = useState(false)
  const [entries, setEntries] = useState<Entry[]>(demoEntries)
  const [text, setText] = useState("")

  function addEntry() {
    if (!text.trim()) return
    setEntries((prev) => [{ id: crypto.randomUUID(), content: text.trim(), createdAt: new Date().toISOString().slice(0, 10) }, ...prev])
    setText("")
    setOpen(false)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="px-6 pt-12 pb-4">
        <Link href="/memory" className="text-xs text-gray-500">← Back</Link>
        <h1 className="text-xl font-semibold mt-2">For Mom</h1>
        <p className="text-xs text-gray-500 inline-flex items-center gap-1 mt-1">
          <BookMarked className="w-3.5 h-3.5" /> Psalm 23:1-3
        </p>
      </div>

      <div className="px-6 pb-28 space-y-4">
        <div className="flex justify-end">
          <Button className="border border-primary/40 text-primary hover:bg-primary/10" onClick={() => setOpen(true)}>
            <Plus className="w-4 h-4" /> Add entry
          </Button>
        </div>

        {entries.map((e) => (
          <Card key={e.id} className="bg-gray-900 border-gray-800 p-4">
            <p className="text-xs text-gray-500">{e.createdAt}</p>
            <p className="mt-1 text-gray-200 text-sm leading-relaxed">{e.content}</p>
          </Card>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-end sm:items-center sm:justify-center p-4 z-50">
          <div className="w-full sm:max-w-md rounded-xl border border-gray-800 bg-gray-900 p-4 space-y-3">
            <h2 className="text-base font-medium">New Journal Entry</h2>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={5}
              placeholder="Write from the heart…"
              className="w-full rounded-md bg-black/30 border border-gray-800 p-2 outline-none text-sm text-white placeholder:text-gray-500"
            />
            <div className="flex items-center justify-end gap-2 pt-1">
              <Button variant="ghost" className="text-gray-400" onClick={() => setOpen(false)}>Cancel</Button>
              <Button className="border border-primary/40 text-primary hover:bg-primary/10" onClick={addEntry}>Save</Button>
            </div>
            <p className="text-[10px] text-gray-500">UI-only preview. Nothing is saved.</p>
          </div>
        </div>
      )}
    </div>
  )
}


