"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MessageCircle, Send, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

type ChatMessage = {
  id: string
  role: "assistant" | "user"
  content: string
}

const initialMessages: ChatMessage[] = [
  {
    id: "m-1",
    role: "assistant",
    content:
      "Peace be with you. How are you feeling today? I’m here to listen and share a gentle word of hope.",
  },
]

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isSending, setIsSending] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Auto-scroll to the latest message
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages.length])

  function handleQuickInsert(text: string) {
    setInput(text)
  }

  function handleSend() {
    const trimmed = input.trim()
    if (!trimmed || isSending) return

    const userMsg: ChatMessage = { id: crypto.randomUUID(), role: "user", content: trimmed }
    setMessages((prev) => [...prev, userMsg])
    setInput("")

    // UI-only simulated assistant reply (no backend)
    setIsSending(true)
    const reply: ChatMessage = {
      id: crypto.randomUUID(),
      role: "assistant",
      content:
        "Thank you for sharing. “The Lord is near to the brokenhearted and saves the crushed in spirit.” (Psalm 34:18, WEB)",
    }
    setTimeout(() => {
      setMessages((prev) => [...prev, reply])
      setIsSending(false)
    }, 600)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="px-6 pt-12 pb-4 sticky top-0 bg-black/80 backdrop-blur-sm z-10 border-b border-gray-900">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-200 to-gray-400 flex items-center justify-center">
            <MessageCircle className="w-4 h-4 text-black" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">The Shepherd</h1>
            <p className="text-xs text-gray-500">A gentle, scripture-aware companion</p>
          </div>
        </div>
      </div>

      {/* Message list */}
      <div ref={scrollRef} className="px-4 pb-40 pt-4 space-y-3 h-[calc(100vh-9rem)] overflow-y-auto">
        {messages.map((m) => (
          <Bubble key={m.id} role={m.role}>
            {m.content}
          </Bubble>
        ))}

        {/* Quick prompts */}
        <div className="mt-4 flex flex-wrap gap-2">
          {[
            "Pray for me",
            "I feel overwhelmed",
            "What verse helps with loneliness?",
          ].map((t) => (
            <button
              key={t}
              onClick={() => handleQuickInsert(t)}
              className="text-xs rounded-full border border-gray-800 px-3 py-1 text-gray-300 hover:text-white hover:bg-white/5"
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Composer */}
      <div className="sticky bottom-20 left-0 right-0 px-4 pb-4">
        <Card className="bg-gray-900 border-gray-800 p-2">
          <div className="flex items-end gap-2">
            <button
              className="inline-flex items-center gap-1 text-gray-400 hover:text-white rounded-md px-2 py-2"
              onClick={() => handleQuickInsert("Please share a short prayer for me.")}
              aria-label="Insert suggestion"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-xs">Prompt</span>
            </button>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={1}
              placeholder="Share how you’re feeling…"
              className={cn(
                "flex-1 resize-none bg-transparent text-sm text-white placeholder:text-gray-500",
                "rounded-md outline-none p-2 leading-6 max-h-40",
                "focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring",
              )}
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isSending}
              className="bg-white/10 hover:bg-white/20 text-white"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </Card>
        <p className="mt-2 text-[10px] text-gray-500 text-center">
          UI preview only. No data is stored. Scripture: WEB (public domain).
        </p>
      </div>
    </div>
  )
}

function Bubble({ role, children }: { role: ChatMessage["role"]; children: React.ReactNode }) {
  const isUser = role === "user"
  return (
    <div className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed",
          isUser
            ? "bg-white text-black border border-white/10"
            : "bg-gray-900 text-gray-100 border border-gray-800",
        )}
      >
        {children}
      </div>
    </div>
  )
}

 
