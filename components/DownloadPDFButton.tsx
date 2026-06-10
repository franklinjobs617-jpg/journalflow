'use client'

import { useState } from 'react'

interface DownloadPDFButtonProps {
  title: string
  slug: string
}

export default function DownloadPDFButton({ title, slug }: DownloadPDFButtonProps) {
  const [printing, setPrinting] = useState(false)

  function handlePrint() {
    setPrinting(true)
    //
    setTimeout(() => {
      window.print()
      setPrinting(false)
    }, 100)
  }

  return (
    <button
      onClick={handlePrint}
      disabled={printing}
      className="flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full transition-all disabled:opacity-60"
      style={{ background: 'var(--forest)', color: '#fff' }}
      aria-label={`Download ${title} as PDF`}
    >
      {printing ? (
        <>
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          Preparing PDF...
        </>
      ) : (
        <>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Download PDF
        </>
      )}
    </button>
  )
}
