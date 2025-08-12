import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"

export function VerseCard({ reference, text }: { reference: string; text: string }) {
  return (
    <Card className="bg-gray-900 border-gray-800 p-4 space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <p className="text-sm text-gray-200 leading-relaxed">{text}</p>
          <p className="mt-2 text-xs text-gray-500">{reference} • WEB</p>
        </div>
        <Button variant="outline" size="sm" className="shrink-0 border-primary/40 text-primary hover:bg-primary/10" disabled>
          <Heart className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  )
}


