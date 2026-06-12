import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'No-Feelings Journal Prompts - Just Observe and Write | JournalFlow',
  description: 'Journal prompts that do not require you to process your emotions. Observation-based, lighthearted, and low-pressure writing prompts for when you just want to write something real.',
  keywords: [
    'no feelings journal prompts',
    'journal prompts without emotions',
    'observation journal prompts',
    'lighthearted journal prompts',
    'murakami journaling prompts',
    'low pressure journal prompts',
  ],
  alternates: { canonical: 'https://journalflow.ai/no-feelings-journal-prompts' },
}

const OBSERVATION_PROMPTS = [
  'Describe everything on your desk right now. Not what it means - just what is there.',
  'What can you hear right now? List every sound, from the loudest to the quietest.',
  'Describe the light in the room you are in. Where is it coming from? What does it land on? What does it avoid?',
  'Pick up the nearest object to your left hand. Describe it as if writing instructions for someone to recreate it exactly.',
  'What did you eat today, and what did each thing actually taste like?',
  'Describe the sky right now - not poetically, just accurately.',
  'What is the most worn object in the room you are in?',
  'Your coffee or tea this morning: temperature, color, the moment you first tasted it.',
  'Write down one smell from today, one sound, one thing that caught your eye, something you touched, something you tasted.',
  'Describe the view from the nearest window. Foreground, middle distance, background.',
  'What is one thing in your home that you look at every day but have never really noticed?',
  'Describe the clothes you are wearing right now - fabric, fit, why you chose them today.',
  'What is the quietest moment of your day so far? What sounds exist even in that quiet?',
  'Describe something you saw today that you would have called one color but which was actually several.',
  'What is the most interesting texture you can touch from where you are sitting?',
  'Write about the last thing that caught your eye unexpectedly.',
  'Describe your commute or walk somewhere today in as much sensory detail as you can.',
  'What is the most worn, faded version of a color in your environment?',
  'Write about an animal you saw today, even if it was just a pigeon.',
  'Describe the ambient sound of wherever you are right now as if you were a sound designer.',
]

const FUN_PROMPTS = [
  'You are the forensic accountant for superheroes. Thor has clearly been misreporting his hammer as a business expense. Begin your audit.',
  'Write a strongly worded letter to a food you have strong feelings about.',
  'Write a Yelp review for something that cannot normally be reviewed: a Tuesday afternoon, a traffic jam, a really good nap.',
  'A pigeon has been following you for three days. Write its internal monologue.',
  'You have been hired to write the world\'s least motivational poster. What does it say?',
  'Describe your ideal lazy Sunday in embarrassing detail.',
  'What is the most chaotic thing that happened to you this week? Write it like a news report.',
  'Write a nature documentary narration about yourself doing something mundane today.',
  'If your pet could talk, what is the first thing they would say to you?',
  'Write the Wikipedia article for an event that happened only to you.',
  'Invent a sport that does not exist but absolutely should.',
  'What is a completely useless skill you have that you are secretly proud of?',
  'Write the opening line of every novel you will never write.',
  'Describe a heist. The thing being stolen is extremely ordinary.',
  'Your houseplant has decided to speak. It has been watching you for months. What does it say?',
]

export default function NoFeelingsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-green-700">Home</Link>
        <span>›</span>
        <Link href="/prompts" className="hover:text-green-700">All Prompts</Link>
        <span>›</span>
        <span style={{ color: 'var(--forest)' }}>No-Feelings Prompts</span>
      </nav>

      {/* Hero */}
      <div className="mb-12">
        <div className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wide uppercase"
          style={{ background: 'var(--sage-light)', color: 'var(--forest)' }}>
          Low-Pressure Journaling
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4 leading-tight" style={{ color: 'var(--ink)' }}>
          Journal without having<br />
          <span style={{ color: 'var(--forest)' }}>feelings about it.</span>
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed mb-4">
          No shadow work. No gratitude lists. No processing your childhood.
          Just things to notice, describe, and write about.
        </p>
        <p className="text-sm text-gray-400 italic">
          Tired of prompts that ask how you feel? Same.
        </p>
      </div>

      {/* Observation prompts */}
      <section className="mb-14">
        <div className="mb-6">
          <h2 className="font-display text-2xl font-bold" style={{ color: 'var(--ink)' }}>
            Observation Journal Prompts
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Describe what is around you. No insights expected.
          </p>
        </div>
        <div className="space-y-3">
          {OBSERVATION_PROMPTS.map((p, i) => (
            <div key={i} className="paper-card rounded-xl p-4 flex gap-3">
              <span className="text-xs font-mono font-bold shrink-0 mt-0.5 opacity-40"
                style={{ color: 'var(--forest)' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="font-prose text-gray-700 leading-relaxed text-sm sm:text-base">{p}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link href="/prompts/everyday"
            className="text-sm font-semibold underline underline-offset-2"
            style={{ color: 'var(--forest)' }}>
            See all 150 observation prompts
          </Link>
        </div>
      </section>

      {/* Fun / Absurd prompts */}
      <section className="mb-14">
        <div className="mb-6">
          <h2 className="font-display text-2xl font-bold" style={{ color: 'var(--ink)' }}>
            Lighthearted and Absurd Prompts
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            For when you want to write something that makes you laugh.
          </p>
        </div>
        <div className="space-y-3">
          {FUN_PROMPTS.map((p, i) => (
            <div key={i} className="paper-card rounded-xl p-4 flex gap-3">
              <span className="text-xs font-mono font-bold shrink-0 mt-0.5 opacity-40"
                style={{ color: 'var(--forest)' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="font-prose text-gray-700 leading-relaxed text-sm sm:text-base">{p}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link href="/prompts/fun"
            className="text-sm font-semibold underline underline-offset-2"
            style={{ color: 'var(--forest)' }}>
            See all 125 fun and absurd prompts
          </Link>
        </div>
      </section>

      {/* Observe Mode CTA */}
      <div className="rounded-2xl p-7 mb-14" style={{ background: 'var(--forest)', color: 'white' }}>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">🍵</span>
          <span className="text-sm font-bold uppercase tracking-wide opacity-70">Observe Mode</span>
        </div>
        <h2 className="font-display text-xl font-bold mb-2">
          Want the AI to write one for you?
        </h2>
        <p className="text-green-200 text-sm leading-relaxed mb-5">
          Use Observe Mode in the AI generator: it writes prompts about the external world only.
          No feelings. No reflection. Just what is around you, right now.
        </p>
        <Link href="/#generator"
          className="inline-block text-sm font-semibold px-5 py-2.5 rounded-full bg-white transition-opacity hover:opacity-90"
          style={{ color: 'var(--forest)' }}>
          Try Observe Mode - Free
        </Link>
      </div>

      {/* FAQ */}
      <section className="mb-12">
        <h2 className="font-display text-2xl font-bold mb-6" style={{ color: 'var(--ink)' }}>
          Questions
        </h2>
        <div className="space-y-4">
          {[
            {
              q: 'What is no-feelings journaling?',
              a: 'No-feelings journaling is a style of writing that focuses on observation and description rather than emotional processing. Instead of asking how you feel, these prompts ask what you notice - what you see, hear, smell, taste, and touch. The goal is to write something real without having to excavate your inner life to do it.',
            },
            {
              q: 'Is this the same as Murakami journaling?',
              a: "Similar, yes. Murakami journaling refers to an observational approach inspired by the novelist's style - recording the texture of ordinary life in precise, sensory detail without emotional commentary. These prompts follow that same logic: just describe what is there.",
            },
            {
              q: 'Why would I journal without reflecting on my feelings?',
              a: 'Not every journaling session needs to go deep. Observation-based writing builds presence, sharpens attention, and creates a record of your life as it actually looks and feels day to day. Many people also find it easier to build a consistent habit with low-pressure prompts, and the depth finds itself eventually.',
            },
            {
              q: 'Can I generate more of these with the AI?',
              a: 'Yes. The AI generator has an Observe Mode that writes prompts specifically about the external world - no emotional processing required. It is free to use, no account needed.',
            },
          ].map((item) => (
            <div key={item.q} className="bg-white rounded-xl border border-green-100 p-5">
              <h3 className="font-semibold text-gray-800 mb-2 text-sm">{item.q}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Internal links */}
      <div className="flex flex-wrap gap-3">
        <Link href="/prompts/everyday" className="text-sm underline underline-offset-2" style={{ color: 'var(--forest)' }}>
          Everyday Observation Prompts
        </Link>
        <Link href="/prompts/fun" className="text-sm underline underline-offset-2" style={{ color: 'var(--forest)' }}>
          Fun Journal Prompts
        </Link>
        <Link href="/observe-journal-prompts" className="text-sm underline underline-offset-2" style={{ color: 'var(--forest)' }}>
          Observe Journal Prompts
        </Link>
        <Link href="/prompts/ai-generated" className="text-sm underline underline-offset-2" style={{ color: 'var(--forest)' }}>
          AI Journal Prompts
        </Link>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'What is no-feelings journaling?',
            acceptedAnswer: { '@type': 'Answer', text: 'No-feelings journaling focuses on observation and description rather than emotional processing. These prompts ask what you notice, not how you feel.' }},
          { '@type': 'Question', name: 'Is this the same as Murakami journaling?',
            acceptedAnswer: { '@type': 'Answer', text: 'Similar. Murakami journaling records the texture of ordinary life in precise sensory detail without emotional commentary.' }},
        ],
      })}} />
    </div>
  )
}
