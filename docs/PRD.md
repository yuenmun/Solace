## Solace — Product Requirements Document (PRD)

Version: 1.4 (MVP)

Date: August 12, 2025

Authors: Solace Team (with GPT-5)


### 0. Summary

Solace is a mobile-first web app that provides A.I.-assisted, biblically grounded comfort for Christians navigating grief and loss. MVP focuses on: an empathetic AI Companion, private Memory Boxes, an anonymous Prayer Wall, Guided Prayer Journeys, and a Topical Verse Explorer. The stack centers on Supabase for auth/DB, Next.js for the web app, and a carefully governed LLM with explicit theological guardrails.


## 1. Introduction & Vision

### 1.1 The Problem

Grief is universal, but faith-aligned support is scarce. For many Christians, existing tools are either too general or not sensitive to biblical hope and language. The result is isolation during vulnerable moments.

### 1.2 The Vision

Create a gentle, safe, and scripture-guided companion that offers immediate comfort, prayer, remembrance, and community—without noise or judgment.

### 1.3 Goals

- **Primary**: Become the leading faith-based grief support destination.
- **User**: Help users feel heard, understood, and comforted in Christ-centered hope.
- **Business**: Validate demand for a focused faith-tech wellness subscription.


## 2. Guiding Principles

- **Empathy First**: Gentle tone, trauma-informed UX.
- **Biblically Grounded**: Responses anchored in Scripture; clear on what we can/can’t claim.
- **Simplicity & Focus**: Every feature must serve comfort and clarity.
- **Sanctuary of Safety**: Privacy, anonymity by default in public spaces, robust RLS.
- **Accessibility**: WCAG 2.2 AA minimum; calm, legible UI.


## 3. Target Audience

Primary persona: “Grieving Grace,” 35–60, US-based, active in church, seeking private, scripturally faithful comfort. Mobile-first usage, especially evenings.


## 4. MVP Features

### 4.1 AI Companion ("The Shepherd")

Description: A conversational, scripture-aware guide trained on a curated body of public-domain Scripture and approved theological concepts about grief, suffering, lament, and hope.

Core behaviors:
- Opens with an empathetic prompt: “Peace be with you. How are you feeling today?”
- Accepts free-text feelings/questions (e.g., “I feel alone after my breakup”).
- Responds with:
  1) a relevant verse (quoted and referenced),
  2) a simple context/interpretation,
  3) a compassionate application to the user’s situation,
  4) optional short prayer upon request.
- Avoids speculative claims about God’s specific will; no medical/legal advice; recommends professional help when appropriate.

Acceptance criteria:
- Empathetic opening prompt appears on first load of `/chat` and after idle.
- Responses include verse quote + reference + short interpretation + application.
- “Pray for me” button or phrase triggers a personalized, scripture-based prayer.
- Free tier: monthly chat limit (configurable), visible counter and upgrade CTA.
- Conversation content stored minimally (see Privacy) with user consent; otherwise store only usage counts/metadata.

### 4.2 Digital Memorial Spaces ("Memory Boxes")

Description: Private spaces for remembrance.

Scope:
- Create one Memory Box on free tier; unlimited on premium.
- Title, cover photo (optional), “Verse of Remembrance,” and journal entries.

Acceptance criteria:
- Create/view/edit/delete a Memory Box (owner only).
- Upload image to storage; show thumbnail in the box.
- Add journal entries (rich text minimal: paragraphs, bold/italic).
- Select a verse (from curated library) as the box’s remembrance verse.
- RLS ensures only owner can access.

### 4.3 The Prayer Network ("Prayer Wall")

Description: Anonymous, moderated prayer requests; community can mark “I am praying for you.”

Scope:
- Browse approved requests.
- Submit requests → moderation queue.
- “I am praying for you” increments a visible count; user identity hidden.
- Premium users can post; free users are view-only.

Acceptance criteria:
- Feed shows recent approved requests with relative timestamps and prayer counts.
- Submit form validates length, removes PII hints (best effort), queues for moderation.
- Moderation UI (MVP basic) to approve/reject.
- RLS allows read of approved-only to all; edit of own pending; moderation by staff role.

### 4.4 Guided Prayer Journeys

Description: Multi-day programs (e.g., “7 Days of Hope After a Breakup”).

Scope:
- 2–3 journeys at launch; premium gated.
- Each day contains: devotional, key verse, guided prayer; optional audio.
- Progress tracking and daily reminders (email optional later).

Acceptance criteria:
- Journey list with premium markers.
- Day view with devotional (markdown), verse, prayer, complete button.
- Marks completion; shows progress bar.

### 4.5 Topical Verse Explorer ("Words of Hope")

Description: Curated topics → 5–10 related verses per topic; save to favorites.

Scope:
- 5–7 topics free; full library premium.
- Clear verse presentation; copy/share (share cards out-of-scope).
- Save to Favorites (private).

Acceptance criteria:
- Topic list with free/premium labels.
- Topic detail shows verses with reference, translation.
- “Save to Favorites” gated by auth; RLS private.


## 5. Monetization

Freemium:
- **Free**: limited AI chats/month, 1 Memory Box, Prayer Wall view-only, 5–7 free topics.
- **Premium ($9.99/mo or $99/yr)**: unlimited AI chats, unlimited Memory Boxes, Prayer Wall posting and praying, all Journeys, full Verse Explorer, audio prayers.

Enforcement:
- Stripe subscriptions; status mirrored in Supabase `subscriptions` table.
- Usage limits tracked in `usage_limits` table (or materialized from events).
- Route guards + RLS constraints prevent overuse.


## 6. Success Metrics

- **Engagement**: DAU/MAU, chats/user, Verse Explorer engagement, Journey completion.
- **Retention**: D1/D7/D30.
- **Conversion**: Free→Paid rate.
- **Sentiment**: Quick in-app feedback after prayers/chats (thumbs up/down + tags).


## 7. Non-Functional Requirements

- **Performance**: PWA, TTI < 2.5s on 4G, LCP < 2.5s; lazy-load heavy assets.
- **Accessibility**: WCAG 2.2 AA; focus states, reduced motion option, readable typography.
- **Privacy/Security**: RLS-first design; encrypt at rest (Supabase), HTTPS, short-lived signed URLs for media, minimal data retention.
- **Availability**: 99.9% monthly target (best-effort in MVP), graceful degradation.
- **Internationalization**: MVP English only; timezones respected.
- **Theological Neutrality**: Favor widely accepted Christian essentials; avoid denominational disputes.


## 8. Information Architecture / Navigation

Primary routes (mobile-first):
- `/` Home: calming entry, CTA to Chat.
- `/chat` AI Companion.
- `/memory` Memory Boxes list → `/memory/:id` detail.
- `/prayer-wall` Prayer feed + submit.
- `/journeys` List → `/journeys/:slug` → `/journeys/:slug/day/:n`.
- `/words-of-hope` Topics → topic detail.
- `/account` Profile/settings → `/account/billing`.
- `/legal/privacy` `/legal/terms`.

Global elements:
- Bottom nav: Chat, Words of Hope, Prayer Wall, Memory, Journeys.
- Soft, high-contrast theme toggle (light/dark).


## 9. Content, Scripture, and Theology Guardrails

- Scripture Translation (MVP): World English Bible (WEB, public domain). Future: explore licensing other translations.
- Every verse displays reference + translation label.
- AI must not: diagnose, prescribe, or promise outcomes; must not assert God’s specific intent for a specific event.
- AI must: encourage seeking pastoral care and professional help when appropriate; include crisis resources if self-harm indicators present.


## 10. AI System Design

### 10.1 Stack

- Pluggable LLM provider (initially OpenAI or Anthropic via server-side API route/edge function).
- Retrieval from curated verse/topic knowledge base (no full Bible corpus in MVP).
- Safety layer: toxicity, self-harm, PII redaction checks before/after generation.

### 10.2 Prompt Governance (MVP)

System message themes:
- Role: compassionate Christian companion.
- Guardrails: biblically faithful; no specific claims about God’s will; suggest pastoral/pro help where wise; avoid medical/legal advice.
- Style: warm, brief, trauma-informed; favor short paragraphs and simple language.

Response scaffolding:
1) Acknowledge and validate feelings.
2) Provide 1–2 relevant verses (quote + reference, translation label).
3) Explain verse context simply.
4) Apply gently to user’s situation.
5) Offer a short prayer if requested or if user taps “Pray for me.”

### 10.3 Safety and Moderation

- Pre-generation classification (self-harm/abuse cues) → include resource blurb.
- Post-generation filters: remove over-claims; ensure verse accuracy.
- Logging: store safety decisions minimally and anonymously where possible.

### 10.4 Limits & Quotas

- Free chats/month: configurable (e.g., 10). Display remaining count and CTA.
- Rate limiting per IP/user to prevent abuse.


## 11. Data Model (Supabase-first)

Note: Use Supabase Auth for users. App data in Postgres with RLS. Below is a high-level schema outline (names may adjust during implementation).

Tables (key fields only):

- `profiles`
  - `user_id` (uuid, PK, FK auth.users)
  - `display_name` (text, nullable)
  - `avatar_url` (text, nullable)
  - `timezone` (text, default 'UTC')
  - `grief_focus` (text enum-like, nullable)
  - `created_at`, `updated_at`

- `memory_boxes`
  - `id` (uuid, PK)
  - `owner_id` (uuid, FK profiles.user_id)
  - `title` (text)
  - `cover_image_url` (text, nullable)
  - `remembrance_verse_id` (uuid, FK verses.id, nullable)
  - `created_at`, `updated_at`

- `journal_entries`
  - `id` (uuid, PK)
  - `box_id` (uuid, FK memory_boxes.id)
  - `owner_id` (uuid, FK profiles.user_id)
  - `content_md` (text)
  - `mood` (text, nullable)
  - `created_at`

- `memory_assets`
  - `id` (uuid, PK)
  - `box_id` (uuid, FK memory_boxes.id)
  - `owner_id` (uuid)
  - `file_url` (text)
  - `kind` (text enum: 'image', 'audio', 'doc')
  - `created_at`

- `prayer_requests`
  - `id` (uuid, PK)
  - `author_id` (uuid, FK profiles.user_id)
  - `body` (text)
  - `status` (text enum: 'pending', 'approved', 'rejected')
  - `approved_at` (timestamptz, nullable)
  - `created_at`

- `prayer_supports`
  - `id` (uuid, PK)
  - `request_id` (uuid, FK prayer_requests.id)
  - `supporter_id` (uuid, FK profiles.user_id)
  - `created_at`

- `journeys`
  - `id` (uuid, PK)
  - `slug` (text unique)
  - `title` (text)
  - `description` (text)
  - `cover_image_url` (text, nullable)
  - `length_days` (int)
  - `is_premium` (bool)

- `journey_days`
  - `id` (uuid, PK)
  - `journey_id` (uuid, FK journeys.id)
  - `day_number` (int)
  - `devotional_md` (text)
  - `verse_refs` (text[])
  - `audio_url` (text, nullable)

- `day_progress`
  - `id` (uuid, PK)
  - `user_id` (uuid)
  - `journey_id` (uuid)
  - `day_number` (int)
  - `completed_at`

- `topics`
  - `id` (uuid, PK)
  - `slug` (text unique)
  - `title` (text)
  - `is_premium` (bool)

- `verses`
  - `id` (uuid, PK)
  - `reference` (text)  // e.g., "Psalm 34:18"
  - `text` (text)
  - `translation` (text) // e.g., 'WEB'

- `topic_verses`
  - `topic_id` (uuid, FK topics.id)
  - `verse_id` (uuid, FK verses.id)

- `favorites`
  - `id` (uuid, PK)
  - `user_id` (uuid)
  - `verse_id` (uuid)

- `subscriptions`
  - `user_id` (uuid, PK)
  - `stripe_customer_id` (text)
  - `status` (text enum: 'active', 'trialing', 'past_due', 'canceled')
  - `current_period_end` (timestamptz)

- `usage_limits`
  - `user_id` (uuid, PK)
  - `month_key` (text) // e.g., '2025-08'
  - `chat_count` (int)

- `moderation_queue`
  - `id` (uuid, PK)
  - `entity_type` (text) // 'prayer_request'
  - `entity_id` (uuid)
  - `status` (text enum: 'pending', 'approved', 'rejected')
  - `notes` (text, nullable)
  - `created_at`, `resolved_at`

- `reports`
  - `id` (uuid, PK)
  - `entity_type` (text)
  - `entity_id` (uuid)
  - `reporter_id` (uuid, nullable)
  - `reason` (text)
  - `created_at`

- `audit_logs` (minimal MVP)
  - `id` (uuid, PK)
  - `actor_id` (uuid, nullable)
  - `action` (text)
  - `entity_type` (text)
  - `entity_id` (uuid)
  - `created_at`

Storage buckets:
- `memory-assets` (images/audio) with row-level storage policies via signed URLs.

RLS policy sketches (illustrative):
```sql
-- journal_entries: owner-only
create policy "journal owner read" on journal_entries
  for select using (auth.uid() = owner_id);
create policy "journal owner write" on journal_entries
  for insert with check (auth.uid() = owner_id);
create policy "journal owner update" on journal_entries
  for update using (auth.uid() = owner_id);

-- prayer_requests: approved visible to all; pending visible to owner; moderators manage
create policy "prayers read approved" on prayer_requests
  for select using (
    status = 'approved' or auth.uid() = author_id or exists (
      select 1 from profiles p where p.user_id = auth.uid() and p.role = 'moderator'
    )
  );

-- prayer_supports: insert by authenticated users; do not expose supporter identity in API
create policy "supports insert" on prayer_supports
  for insert with check (auth.uid() = supporter_id);
```


## 12. Moderation Policy (MVP)

- All Prayer Wall posts require approval before public display.
- Auto-filters: profanity, hate, doxxing/PII; flag to queue.
- Remove explicit requests for funds, political content, and medical claims.
- Crisis language triggers a safety response and resource footer.


## 13. Analytics & Events

Core client events (to PostHog or Supabase events table):
- `chat_started`, `chat_reply_received`, `chat_prayer_requested`.
- `memory_box_created`, `journal_entry_added`.
- `prayer_request_submitted`, `prayer_request_approved`, `prayer_supported`.
- `journey_started`, `journey_day_completed`.
- `topic_viewed`, `verse_favorited`.
- `subscription_purchased`, `subscription_canceled`.

Privacy note: Do not log raw chat/journal content.


## 14. Tech Stack & Architecture

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, shadcn/ui, PWA.
- **Backend**: Supabase (Auth, Postgres, Storage, Edge Functions), RLS everywhere.
- **AI**: Server-side API route or Supabase Edge Function calling LLM + safety checks.
- **Payments**: Stripe Checkout + Webhooks → `subscriptions` sync.
- **Analytics**: PostHog (self-host later) or Supabase events.

Key flows:
- Chat → API route validates quota and subscription → safety classifiers → LLM → response.
- Prayer submit → moderation_queue → moderator approves → visible in feed.
- Memory assets → upload to storage → signed URL for display.


## 15. UX & Visual Direction (MVP)

- Calm palette, generous whitespace, large legible typography, gentle microcopy.
- Motion minimal; respect “reduce motion.”
- Empty states that encourage but never pressure.
- Copy examples:
  - Greeting: “Peace be with you. How are you feeling today?”
  - Prayer Wall CTA: “Share a short request. We will hold you in prayer.”


## 16. Release Plan

Milestones:
1) Foundations: Supabase project, RLS, auth, theme, nav, PWA shell.
2) AI Companion v1 with quotas and safety.
3) Memory Boxes v1.
4) Prayer Wall (submission + moderation + pray counter).
5) Verse Explorer + Favorites.
6) Journeys v1 + gating.
7) Stripe purchase + webhook subscription sync.
8) Polish, a11y, analytics, legal pages.

Launch criteria:
- All acceptance criteria above pass manual QA.
- RLS policies validated by tests.
- Basic uptime monitoring and error alerting.


## 17. Legal, Privacy, and Compliance

- Terms/Privacy: clear statements that Solace is spiritual support, not therapy.
- HIPAA: Not a covered entity; do not solicit PHI; discourage sharing sensitive details.
- Data retention: Minimize stored content; allow user deletion of Memory Boxes and journals.
- Scripture licensing: WEB (public domain) at launch; evaluate additional licenses later.


## 18. Open Questions (for Founder)

1) Scripture translation preference at launch (use WEB) and future licensing (ESV/NIV)?
2) Pastoral/theological oversight: do you want an advisory board for content review?
3) Brand direction: logo, color palette, typography preferences? Provide assets?
4) Crisis resources: which hotline/resources to show for US; any international scope?
5) Payment model: enable annual + monthly at launch? Trials/free trials?
6) Moderation staffing: who will approve Prayer Wall posts initially? SLA expectations?
7) Data retention: should we store full chat transcripts or only summaries/metadata by default?
8) Push notifications/email: do we send daily reminders (Journeys)? If yes, email provider?
9) Denominational stance: any topics to avoid or emphasize (e.g., prosperity claims: avoid)?
10) Voice and tone: any specific style guide (e.g., maximum reading level, verse paraphrasing allowed)?


## 19. Glossary

- **RLS**: Row-Level Security in Postgres/Supabase to enforce per-user data access.
- **LLM**: Large Language Model powering AI conversation.
- **PWA**: Progressive Web App with offline caching shell.
- **WEB**: World English Bible (public domain translation).


