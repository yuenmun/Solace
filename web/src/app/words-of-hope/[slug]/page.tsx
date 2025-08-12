"use client"
import Link from "next/link"
import { useParams } from "next/navigation"
import { VerseCard } from "@/components/verse-card"

const demoBySlug: Record<string, { title: string; verses: { ref: string; text: string }[] }> = {
  lonely: {
    title: "For When You’re Lonely",
    verses: [
      { ref: "Psalm 34:18", text: "The Lord is near to the brokenhearted and saves the crushed in spirit." },
      { ref: "Deuteronomy 31:8", text: "It is the Lord who goes before you. He will be with you; he will not leave you or forsake you." },
    ],
  },
  anxious: {
    title: "When You Feel Anxious",
    verses: [
      { ref: "Philippians 4:6-7", text: "Do not be anxious about anything... and the peace of God... will guard your hearts." },
      { ref: "1 Peter 5:7", text: "Cast all your anxiety on him because he cares for you." },
    ],
  },
  anger: {
    title: "When Anger Rises",
    verses: [
      { ref: "Ephesians 4:26", text: "Be angry and do not sin; do not let the sun go down on your anger." },
      { ref: "Proverbs 15:1", text: "A soft answer turns away wrath, but a harsh word stirs up anger." },
    ],
  },
  loss: {
    title: "For Grief and Loss",
    verses: [
      { ref: "Psalm 23:1-3", text: "The Lord is my shepherd; I shall not want... he restores my soul." },
      { ref: "John 14:1", text: "Let not your hearts be troubled. Believe in God; believe also in me." },
    ],
  },
  sickness: {
    title: "Finding Strength in Sickness",
    verses: [
      { ref: "Isaiah 41:10", text: "Fear not, for I am with you... I will strengthen you, I will help you." },
      { ref: "2 Corinthians 12:9", text: "My grace is sufficient for you, for my power is made perfect in weakness." },
    ],
  },
}

type PageParams = { slug?: string }

export default function TopicDetailPage() {
  const params = useParams() as { slug?: string }
  const slug = params?.slug
  const data = demoBySlug[slug ?? "loss"] ?? { title: "Topic", verses: [] }
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="px-6 pt-12 pb-4">
        <Link href="/words-of-hope" className="text-xs text-gray-500">← Back</Link>
        <h1 className="text-xl font-semibold mt-2">{data.title}</h1>
        <p className="text-gray-400">Scripture for comfort</p>
      </div>

      <div className="px-6 pb-28 space-y-4">
        {data.verses.map((v) => (
          <VerseCard key={v.ref} reference={v.ref} text={v.text} />
        ))}
        {data.verses.length === 0 && (
          <p className="text-gray-500 text-sm">No verses yet.</p>
        )}
      </div>
    </div>
  )
}


