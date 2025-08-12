"use client"

import { useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BottomNavigation } from "@/components/bottom-navigation"
import { Heart, MessageCircle, BookOpen, Calendar, Bell, X, ArrowRight, ChevronDown, Flame } from "lucide-react"

export function HomeScreen() {
  const [showReminder, setShowReminder] = useState(true)

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="px-6 pt-12 pb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-200 to-gray-400 flex items-center justify-center">
              <span className="text-black font-bold text-lg">S</span>
            </div>
            <div>
              <h1 className="text-xl font-semibold">Today&apos;s Journey</h1>
              <p className="text-gray-500 text-sm">Finding Peace in Loss</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Flame className="w-4 h-4 text-white" />
              <span className="text-sm">3</span>
            </div>
            <Calendar className="w-5 h-5 text-gray-500" />
          </div>
        </div>

        {/* Week Calendar */}
        <div className="flex justify-between mt-6 mb-4">
          {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className="text-xs text-gray-500 mb-2">{day}</span>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm ${
                  index === 3 ? "bg-white text-black" : "bg-gray-800 text-gray-400"
                }`}
              >
                {index + 3}
              </div>
            </div>
          ))}
        </div>

        {/* Progress */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">Progress today</span>
            <span className="text-sm text-white">25%</span>
          </div>
          <Progress value={25} className="h-2 bg-gray-800" />
        </div>
      </div>

      {/* Content */}
      <div className="px-6 space-y-4 pb-24">
        {/* Daily Reminder */}
        {showReminder && (
          <Card className="bg-gray-900 border-gray-800 p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <Bell className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <h3 className="font-medium text-white">Get daily reminders</h3>
                  <p className="text-sm text-gray-500">Keep your healing journey going</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowReminder(false)}
                className="text-gray-500 hover:text-white"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        )}

        {/* AI Companion Card */}
        <Link href="/chat">
          <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-black border-gray-700 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-gray-300" />
                <span className="text-sm font-medium text-gray-300">THE SHEPHERD • 2 MIN</span>
              </div>
              <ChevronDown className="w-5 h-5 text-gray-500" />
            </div>

            <h2 className="text-xl font-semibold mb-4 text-white">How are you feeling today? I&apos;m here to listen.</h2>

            <Button className="bg-white/10 hover:bg-white/20 text-white border-0 rounded-full w-12 h-12 p-0 backdrop-blur-sm">
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Card>
        </Link>

        {/* Memory Box */}
        <Link href="/memory">
          <Card className="bg-gradient-to-r from-gray-900 to-gray-800 border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Heart className="w-5 h-5 text-gray-300" />
                <div>
                  <span className="text-sm font-medium text-gray-300">MEMORY BOX • 3 MIN</span>
                  <p className="text-xs text-gray-600">Visit your sacred space</p>
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>
          </Card>
        </Link>

        {/* Prayer Journey */}
        <Link href="/journeys">
          <Card className="bg-gradient-to-r from-black via-gray-900 to-gray-800 border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-gray-300" />
                <div>
                  <span className="text-sm font-medium text-gray-300">GUIDED PRAYER • 5 MIN</span>
                  <p className="text-xs text-gray-600">Day 3 of Finding Peace</p>
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>
          </Card>
        </Link>

        {/* Words of Hope */}
        <Link href="/words-of-hope">
          <Card className="bg-gray-900 border-gray-800 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-gray-300" />
                <div>
                  <span className="text-sm font-medium text-gray-300">WORDS OF HOPE • 2 MIN</span>
                  <p className="text-xs text-gray-600">Scripture for comfort</p>
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>
          </Card>
        </Link>
      </div>

      {/* BottomNavigation moved to root layout */}
    </div>
  )
}
