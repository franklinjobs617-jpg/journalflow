'use client'

import { useState } from 'react'

interface CheckoutButtonProps {
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}

export default function CheckoutButton({ className, style, children }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleCheckout() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/checkout', { method: 'POST' })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setError('Something went wrong. Please try again.')
        setLoading(false)
      }
    } catch {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div>
      <button
        onClick={handleCheckout}
        disabled={loading}
        className={className}
        style={style}
      >
        {loading ? 'Redirecting to checkout...' : children}
      </button>
      {error && (
        <p className="text-xs text-red-500 mt-2 text-center">{error}</p>
      )}
    </div>
  )
}
