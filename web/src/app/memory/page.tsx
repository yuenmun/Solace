import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Image as ImageIcon, BookMarked } from "lucide-react"

type MemoryBox = {
  id: string
  title: string
  verse?: string
  entries: number
}

const demoBoxes: MemoryBox[] = [
  { id: "b-1", title: "For Mom", verse: "Psalm 23:1-3", entries: 4 },
  { id: "b-2", title: "The End of a Chapter", verse: "Romans 8:28", entries: 2 },
]

export default function MemoryPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="px-6 pt-12 pb-4 border-b border-gray-900 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-200 to-gray-400 flex items-center justify-center">
            <Heart className="w-4 h-4 text-black" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">Memory Boxes</h1>
            <p className="text-xs text-gray-500">Your private places of remembrance</p>
          </div>
        </div>
        <Button className="bg-white/10 hover:bg-white/20 text-white" disabled>
          Create Memory Box (UI only)
        </Button>
      </div>

      {/* Grid */}
      <div className="px-4 py-6 pb-28 grid grid-cols-1 gap-6">
        {demoBoxes.map((box) => (
          <Card key={box.id} className="bg-gray-900 border-gray-800 overflow-hidden">
            <div className="h-28 bg-gradient-to-r from-gray-800 to-gray-700 flex items-center justify-center">
              <ImageIcon className="w-6 h-6 text-gray-400" />
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-base font-medium text-white">{box.title}</h2>
                  <p className="text-xs text-gray-500 mt-1 inline-flex items-center gap-1">
                    <BookMarked className="w-3.5 h-3.5" /> {box.verse ?? "Verse of remembrance"}
                  </p>
                </div>
                <div className="text-xs text-gray-400">{box.entries} entries</div>
              </div>
              <div className="mt-3">
                <Button variant="outline" className="border-primary/40 text-primary hover:bg-primary/10" disabled>
                  Open (UI only)
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

 
