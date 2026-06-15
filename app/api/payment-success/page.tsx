'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function PaymentSuccessPage() {
  const [unlocked, setUnlocked] = useState(false)

  useEffect(() => {
    //
    localStorage.setItem('jf_pro', 'true')
    localStorage.setItem('jf_pro_since', new Date().toISOString())
    setUnlocked(true)

    //
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'purchase', {
        transaction_id: new Date().getTime().toString(),
        value: 9.9,
        currency: 'USD',
        items: [{ item_name: 'JournalFlow Pro', price: 9.9, quantity: 1 }],
      })
    }
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'var(--sage-light)' }}>
      <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-10 max-w-md w-full text-center">

        <div className="text-5xl mb-5">🎉</div>

        <h1 className="font-display text-3xl font-bold mb-3" style={{ color: 'var(--ink)' }}>
          You are now Pro.
        </h1>

        <p className="text-gray-500 leading-relaxed mb-6">
          Unlimited AI prompt generation is now active on this device.
          Your streak and history are safe.
        </p>

        <div className="rounded-xl p-4 mb-8 text-left"
          style={{ background: 'var(--sage-light)' }}>
          <p className="text-sm font-semibold mb-2" style={{ color: 'var(--forest)' }}>
            What you now have:
          </p>
          <ul className="space-y-1.5">
            {[
              'Unlimited AI prompt generation',
              'Generation history saved',
              'Writing streak protected',
              'Early access to new topics',
            ].map(f => (
              <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                <span style={{ color: 'var(--forest)' }}>✓</span> {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6 p-4 rounded-xl border border-amber-100 text-left"
          style={{ background: '#FFFBEB' }}>
          <p className="text-sm font-semibold text-amber-800 mb-1">
            One more thing
          </p>
          <p className="text-xs text-amber-700 leading-relaxed">
            Pro is currently unlocked on this device. To use it on another device,
            email us at{' '}
            <a href="mailto:hello@journalflow.ai"
              className="underline font-medium">
              hello@journalflow.ai
            </a>{' '}
            with your receipt and we will sort it out within 24 hours.
          </p>
        </div>

        <Link href="/#generator"
          className="block w-full py-3.5 rounded-full text-white font-semibold text-sm transition-opacity hover:opacity-90"
          style={{ background: 'var(--forest)' }}>
          Start generating - unlimited
        </Link>

        <p className="text-xs text-gray-400 mt-4">
          Questions? Email hello@journalflow.ai
        </p>
      </div>
    </div>
  )
}
