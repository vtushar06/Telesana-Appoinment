import React from "react";

export default function TelesanaLogo({ className = "h-10 w-10" }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Gradient Definitions */}
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="50%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      
      {/* Main Circle Background */}
      <circle cx="100" cy="100" r="95" fill="url(#logoGradient)" opacity="0.1" />
      
      {/* Medical Cross with Heart */}
      <path
        d="M100 40 L100 70 L130 70 L130 90 L100 90 L100 120 L80 120 L80 90 L50 90 L50 70 L80 70 L80 40 Z"
        fill="url(#logoGradient)"
      />
      
      {/* Pulse Line */}
      <path
        d="M30 140 L50 140 L60 120 L70 150 L80 130 L90 140 L170 140"
        stroke="url(#logoGradient)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* Video Call Icon (small camera) */}
      <g transform="translate(140, 45)">
        <rect x="0" y="5" width="25" height="18" rx="3" fill="url(#logoGradient)" />
        <path d="M25 10 L35 5 L35 23 L25 18 Z" fill="url(#logoGradient)" />
      </g>
    </svg>
  );
}
