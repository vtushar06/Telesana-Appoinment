import React from "react";

export default function TelesanaIcon({ className = "h-8 w-8" }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Gradient Definitions */}
      <defs>
        <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="50%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      
      {/* Circular Background */}
      <circle cx="50" cy="50" r="48" fill="url(#iconGradient)" />
      
      {/* Medical Cross */}
      <path
        d="M50 20 L50 35 L65 35 L65 45 L50 45 L50 60 L40 60 L40 45 L25 45 L25 35 L40 35 L40 20 Z"
        fill="white"
      />
      
      {/* Pulse Line */}
      <path
        d="M15 70 L25 70 L30 60 L35 75 L40 65 L45 70 L85 70"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
