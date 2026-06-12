//
//
//

export default function JournalIllustration() {
  return (
    <div className="relative w-full max-w-md" aria-hidden="true">
      <svg
        viewBox="0 0 420 460"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-sm"
      >
        {/* */}
        <ellipse cx="210" cy="340" rx="180" ry="60" fill="#D8F3DC" opacity="0.5" />

        {/* */}
        <rect x="42" y="78" width="336" height="290" rx="6" fill="#C8E6C9" opacity="0.4" />

        {/* */}
        <rect x="38" y="70" width="168" height="288" rx="4" fill="#FFFEF9" />
        <rect x="38" y="70" width="168" height="288" rx="4" stroke="#E8E4D8" strokeWidth="1" />

        {/* */}
        <rect x="206" y="70" width="168" height="288" rx="4" fill="#FFFEF9" />
        <rect x="206" y="70" width="168" height="288" rx="4" stroke="#E8E4D8" strokeWidth="1" />

        {/* */}
        <rect x="196" y="70" width="24" height="288" rx="2" fill="#E8E0C8" />
        <line x1="208" y1="70" x2="208" y2="358" stroke="#D4C9A8" strokeWidth="1" />

        {/* */}
        {[110, 126, 142, 158, 174, 190, 206, 222, 238, 254, 270, 286, 302, 318].map((y, i) => (
          <line
            key={i}
            x1="56"
            y1={y}
            x2="190"
            y2={y}
            stroke="#EAE6D8"
            strokeWidth="0.8"
          />
        ))}

        {/* */}
        {[110, 126, 142, 158, 174, 190, 206, 222, 238, 254, 270, 286, 302, 318].map((y, i) => (
          <line
            key={i}
            x1="224"
            y1={y}
            x2="358"
            y2={y}
            stroke="#EAE6D8"
            strokeWidth="0.8"
          />
        ))}

        {/* */}
        <text
          x="58"
          y="98"
          fontFamily="Georgia, serif"
          fontSize="11"
          fill="#6B7280"
          fontStyle="italic"
        >
          Just write.
        </text>

        {/* */}
        <path d="M58 118 Q90 115 130 118 Q155 120 186 117" stroke="#4A5568" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.5" />
        <path d="M58 134 Q80 131 118 134 Q148 136 175 133" stroke="#4A5568" strokeWidth="0.9" strokeLinecap="round" fill="none" opacity="0.4" />
        <path d="M58 150 Q95 147 140 150 Q162 152 186 149" stroke="#4A5568" strokeWidth="1.1" strokeLinecap="round" fill="none" opacity="0.5" />
        <path d="M58 166 Q75 163 105 166 Q135 168 160 165" stroke="#4A5568" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.35" />
        <path d="M58 182 Q88 179 128 182 Q155 184 184 181" stroke="#4A5568" strokeWidth="1.0" strokeLinecap="round" fill="none" opacity="0.45" />
        <path d="M58 198 Q85 195 122 198 Q148 200 170 197" stroke="#4A5568" strokeWidth="0.9" strokeLinecap="round" fill="none" opacity="0.4" />

        {/* */}
        <path d="M68 230 C68 226, 62 222, 58 226 C54 230, 58 238, 68 244 C78 238, 82 230, 78 226 C74 222, 68 226, 68 230Z"
          fill="#F9A8B0" opacity="0.7" />

        {/* */}
        <path d="M58 258 Q88 255 124 258 Q150 260 178 257" stroke="#4A5568" strokeWidth="1.0" strokeLinecap="round" fill="none" opacity="0.4" />
        <path d="M58 274 Q82 271 115 274 Q140 276 165 273" stroke="#4A5568" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.35" />
        <path d="M58 290 Q92 287 130 290 Q155 292 182 289" stroke="#4A5568" strokeWidth="1.1" strokeLinecap="round" fill="none" opacity="0.45" />
        <path d="M58 306 Q78 303 110 306 Q138 308 160 305" stroke="#4A5568" strokeWidth="0.7" strokeLinecap="round" fill="none" opacity="0.3" />

        {/* */}
        <text
          x="224"
          y="95"
          fontFamily="Georgia, serif"
          fontSize="13"
          fill="#2D6A4F"
          fontWeight="600"
        >
          Observe
        </text>

        {/* */}
        <line x1="224" y1="100" x2="290" y2="100" stroke="#95D5B2" strokeWidth="1.5" strokeLinecap="round" />

        {/* */}
        {/* */}
        <circle cx="232" cy="118" r="2.5" fill="#F4A261" opacity="0.8" />
        <path d="M240 118 Q270 115 310 118 Q335 120 352 117" stroke="#4A5568" strokeWidth="1.1" strokeLinecap="round" fill="none" opacity="0.5" />

        <circle cx="232" cy="136" r="2.5" fill="#F4A261" opacity="0.8" />
        <path d="M240 136 Q265 133 300 136 Q325 138 348 135" stroke="#4A5568" strokeWidth="0.9" strokeLinecap="round" fill="none" opacity="0.45" />

        <circle cx="232" cy="154" r="2.5" fill="#F4A261" opacity="0.8" />
        <path d="M240 154 Q272 151 312 154 Q336 156 354 153" stroke="#4A5568" strokeWidth="1.0" strokeLinecap="round" fill="none" opacity="0.5" />

        <circle cx="232" cy="172" r="2.5" fill="#F4A261" opacity="0.8" />
        <path d="M240 172 Q260 169 295 172 Q318 174 340 171" stroke="#4A5568" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.4" />

        <circle cx="232" cy="190" r="2.5" fill="#F4A261" opacity="0.8" />
        <path d="M240 190 Q268 187 305 190 Q330 192 350 189" stroke="#4A5568" strokeWidth="1.1" strokeLinecap="round" fill="none" opacity="0.5" />

        {/* */}
        {/* */}
        <circle cx="320" cy="242" r="6" fill="#FDECD5" />
        <circle cx="320" cy="228" r="5" fill="#FDECD5" />
        <circle cx="320" cy="256" r="5" fill="#FDECD5" />
        <circle cx="308" cy="242" r="5" fill="#FDECD5" />
        <circle cx="332" cy="242" r="5" fill="#FDECD5" />
        <circle cx="320" cy="242" r="4" fill="#F4A261" opacity="0.9" />

        {/* */}
        <path d="M320 261 Q318 278 316 295" stroke="#40916C" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        {/* */}
        <path d="M316 280 Q308 272 304 278 Q308 286 316 284Z" fill="#52B788" opacity="0.8" />

        {/* */}
        <path d="M224 218 Q254 215 285 218 Q305 220 330 217" stroke="#4A5568" strokeWidth="0.9" strokeLinecap="round" fill="none" opacity="0.35" />
        <path d="M224 310 Q252 307 288 310 Q312 312 345 309" stroke="#4A5568" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.35" />
        <path d="M224 326 Q248 323 278 326 Q300 328 325 325" stroke="#4A5568" strokeWidth="0.7" strokeLinecap="round" fill="none" opacity="0.3" />

        {/* */}
        <path d="M38 82 Q52 72 68 68" stroke="#52B788" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.7" />
        <path d="M52 78 Q48 68 44 62" stroke="#52B788" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.6" />
        <ellipse cx="44" cy="60" rx="5" ry="7" fill="#52B788" opacity="0.6" transform="rotate(-20 44 60)" />
        <ellipse cx="68" cy="66" rx="5" ry="7" fill="#52B788" opacity="0.5" transform="rotate(10 68 66)" />
        <ellipse cx="60" cy="70" rx="4" ry="6" fill="#40916C" opacity="0.4" transform="rotate(-5 60 70)" />

        {/* */}
        <path d="M354 358 Q368 348 378 338" stroke="#52B788" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
        <path d="M368 352 Q378 348 386 340" stroke="#52B788" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.5" />
        <ellipse cx="386" cy="338" rx="5" ry="7" fill="#52B788" opacity="0.5" transform="rotate(15 386 338)" />
        <ellipse cx="376" cy="336" rx="4" ry="6" fill="#40916C" opacity="0.4" transform="rotate(-10 376 336)" />

        {/* */}
        <g transform="rotate(-30 340 400)">
          <rect x="330" y="375" width="8" height="52" rx="2" fill="#D4A96A" />
          <polygon points="330,427 338,427 334,442" fill="#E8C99A" />
          <polygon points="332,440 336,440 334,444" fill="#2D2D2D" />
          <rect x="330" y="375" width="8" height="6" rx="1" fill="#C0A060" />
          <rect x="331" y="381" width="6" height="2" fill="#E8C99A" opacity="0.5" />
        </g>

        {/* */}
        <text x="165" y="68" fontSize="10" fill="#F4A261" opacity="0.8">✦</text>
        <text x="385" y="92" fontSize="8" fill="#95D5B2" opacity="0.7">✦</text>
        <text x="52" y="362" fontSize="9" fill="#F4A261" opacity="0.6">✦</text>

        {/* */}
        <text x="108" y="352" fontFamily="Georgia, serif" fontSize="9" fill="#9CA3AF" textAnchor="middle">42</text>
        <text x="290" y="352" fontFamily="Georgia, serif" fontSize="9" fill="#9CA3AF" textAnchor="middle">43</text>
      </svg>
    </div>
  )
}
