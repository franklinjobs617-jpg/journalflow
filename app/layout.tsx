import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    default: 'JournalFlow — AI Journal Prompt Generator',
    template: '%s | JournalFlow',
  },
  description:
    'Generate personalized journal prompts with AI. 1000+ prompts for mental health, self-growth, anxiety, gratitude, and more. Start your journaling journey today.',
  keywords: [
    'journal prompts',
    'journal prompt generator',
    'AI journal prompts',
    'mental health journal prompts',
    'daily journal prompts',
    'journaling prompts',
  ],
  authors: [{ name: 'JournalFlow' }],
  creator: 'JournalFlow',
  metadataBase: new URL('https://journalflow.ai'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://journalflow.ai',
    siteName: 'JournalFlow',
    title: 'JournalFlow — AI Journal Prompt Generator',
    description:
      'Generate personalized journal prompts with AI. 1000+ prompts for mental health, self-growth, anxiety, gratitude, and more.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'JournalFlow — AI Journal Prompt Generator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JournalFlow — AI Journal Prompt Generator',
    description:
      'Generate personalized journal prompts with AI. Start your journaling journey today.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
