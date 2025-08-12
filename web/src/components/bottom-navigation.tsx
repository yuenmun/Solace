"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { MessageCircle, Users, Home, BookOpen, User } from "lucide-react"

export function BottomNavigation() {
  const pathname = usePathname()

  const tabs = [
    { id: "chat", label: "Chat", icon: MessageCircle, href: "/chat" },
    { id: "community", label: "Prayer Wall", icon: Users, href: "/prayer-wall" },
    { id: "today", label: "Today", icon: Home, href: "/" },
    { id: "scripture", label: "Scripture", icon: BookOpen, href: "/words-of-hope" },
    { id: "profile", label: "Profile", icon: User, href: "/account" },
  ]

  const activeForPath = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-sm border-t border-gray-800">
      <div className="flex items-center justify-around py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeForPath(tab.href)

          return (
            <Link
              key={tab.id}
              href={tab.href}
              className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors ${
                isActive ? "text-white" : "text-gray-500 hover:text-gray-300"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{tab.label}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
