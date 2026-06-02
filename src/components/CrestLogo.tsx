/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface CrestLogoProps {
  className?: string;
  showText?: boolean;
}

export default function CrestLogo({ className = "w-16 h-16", showText = false }: CrestLogoProps) {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 500 500"
        className="w-full h-full drop-shadow-md hover:scale-105 transition-transform duration-300 select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Metallic Navy Gold Gradients */}
          <radialGradient id="navy-grad" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
            <stop offset="0%" stopColor="#1a355e" />
            <stop offset="70%" stopColor="#0d1b2e" />
            <stop offset="100%" stopColor="#060c15" />
          </radialGradient>
          
          <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f3e3b3" />
            <stop offset="40%" stopColor="#dfba6b" />
            <stop offset="75%" stopColor="#cca96a" />
            <stop offset="100%" stopColor="#9a7b45" />
          </linearGradient>

          <linearGradient id="silver-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e4edf7" />
            <stop offset="50%" stopColor="#b5c6d9" />
            <stop offset="100%" stopColor="#899cb3" />
          </linearGradient>

          <filter id="glow" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Circular Steel Frame */}
        <circle cx="250" cy="250" r="235" fill="none" stroke="url(#silver-grad)" strokeWidth="12" />
        <circle cx="250" cy="250" r="226" fill="none" stroke="#060c15" strokeWidth="2" />
        
        {/* Inner Solid Navy Body */}
        <circle cx="250" cy="250" r="224" fill="url(#navy-grad)" />
        
        {/* Decorative Inner Golden Bead Loop */}
        <circle cx="250" cy="250" r="172" fill="none" stroke="url(#gold-grad)" strokeWidth="3" strokeDasharray="6,4" />
        <circle cx="250" cy="250" r="166" fill="none" stroke="url(#gold-grad)" strokeWidth="2.5" />
        
        {/* Gold Rays / Guiding Compass Star (Top & Lateral points radiating) */}
        <g stroke="url(#gold-grad)" strokeWidth="1.5" opacity="0.9">
          {/* Main Top Ray */}
          <line x1="250" y1="160" x2="250" y2="70" strokeWidth="4" />
          <polygon points="250,55 244,75 256,75" fill="url(#gold-grad)" />
          
          {/* Dynamic Golden Rays surrounding the compass */}
          <line x1="210" y1="120" x2="165" y2="85" strokeWidth="2" />
          <line x1="290" y1="120" x2="335" y2="85" strokeWidth="2" />
          <line x1="180" y1="160" x2="120" y2="130" strokeWidth="1.5" />
          <line x1="320" y1="160" x2="380" y2="130" strokeWidth="1.5" />
          
          <line x1="250" y1="160" x2="210" y2="90" strokeWidth="1.5" />
          <line x1="250" y1="160" x2="290" y2="90" strokeWidth="1.5" />
          <line x1="250" y1="160" x2="230" y2="80" strokeWidth="1.5" />
          <line x1="250" y1="160" x2="270" y2="80" strokeWidth="1.5" />
        </g>

        {/* The Open Book of Academic Excellence (Silver/White Pages, Golden Binder Borders) */}
        <g transform="translate(130, 160)" filter="drop-shadow(0px 4px 6px rgba(0,0,0,0.5))">
          {/* Golden Book Core Backing */}
          <path d="M 0,110 Q 55,85 120,110 Q 185,85 240,110 L 240,20 Q 185,0 120,20 Q 55,0 0,20 Z" fill="url(#gold-grad)" />
          {/* Left Leaf Pages */}
          <path d="M 12,22 Q 62,3 118,22 L 118,107 Q 62,88 12,107 Z" fill="url(#silver-grad)" stroke="#ffffff" strokeWidth="1" />
          {/* Right Leaf Pages */}
          <path d="M 122,22 Q 178,3 228,22 L 228,107 Q 178,88 122,107 Z" fill="url(#silver-grad)" stroke="#ffffff" strokeWidth="1" />
          {/* Elegant Page Lines mimicking knowledge */}
          <path d="M 25,35 Q 65,22 105,35 M 25,50 Q 65,37 105,50 M 25,65 Q 65,52 105,65 M 25,80 Q 65,67 105,80" stroke="#7ea4c4" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
          <path d="M 135,35 Q 175,22 215,35 M 135,50 Q 175,37 215,50 M 135,65 Q 175,52 215,65 M 135,80 Q 175,67 215,80" stroke="#7ea4c4" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        </g>

        {/* Golden/Silver Wings spreading outwards left and right */}
        {/* Left Wing */}
        <g transform="translate(145, 230) scale(-1, 1)" fill="url(#gold-grad)">
          <path d="M 10,0 C 45,-25 95,-45 140,-50 C 120,-10 95,20 10,25 C 50,15 85,-5 120,-15 C 100,5 75,25 20,38 C 50,30 75,18 95,5 C 80,18 55,42 25,50 Z" />
        </g>
        {/* Right Wing */}
        <g transform="translate(355, 230)" fill="url(#gold-grad)">
          <path d="M 10,0 C 45,-25 95,-45 140,-50 C 120,-10 95,20 10,25 C 50,15 85,-5 120,-15 C 100,5 75,25 20,38 C 50,30 75,18 95,5 C 80,18 55,42 25,50 Z" />
        </g>

        {/* Caduceus / Staff of Hermes (Silver Staff with Coiled Golden/White Snakes) in Center */}
        <g transform="translate(0, -10)">
          {/* Silver/Steel Pillar shaft */}
          <rect x="246" y="105" width="8" height="230" rx="4" fill="url(#silver-grad)" stroke="#0d1b2e" strokeWidth="1" />
          <circle cx="250" cy="104" r="10" fill="url(#silver-grad)" stroke="url(#gold-grad)" strokeWidth="2" filter="url(#glow)" />
          <circle cx="250" cy="336" r="6" fill="url(#silver-grad)" />

          {/* Golden snakes coiling from bottom up */}
          <path
            d="M 235,310 Q 250,290 265,300 T 265,240 T 235,180 T 265,130"
            fill="none"
            stroke="url(#silver-grad)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 265,310 Q 250,290 235,300 T 235,240 T 265,180 T 235,130"
            fill="none"
            stroke="url(#silver-grad)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Snake Heads */}
          <path d="M 262,126 Q 268,124 266,118 Q 260,118 262,126 Z" fill="url(#silver-grad)" />
          <path d="M 238,126 Q 232,124 234,118 Q 240,118 238,126 Z" fill="url(#silver-grad)" />
          
          {/* Tiny snake eye dots in red/gold */}
          <circle cx="264" cy="120" r="0.75" fill="#f43f5e" />
          <circle cx="236" cy="120" r="0.75" fill="#f43f5e" />
        </g>

        {/* Circle text: THE CENTERED NURSE ACADEMY with bullet points */}
        <path id="textPath" d="M 55,270 A 205,205 0 0,0 445,270" fill="none" />
        <text className="font-sans font-extrabold" fill="url(#gold-grad)" fontSize="26.3" letterSpacing="5">
          <textPath href="#textPath" startOffset="50%" textAnchor="middle">
            THE CENTERED NURSE ACADEMY
          </textPath>
        </text>

        {/* Miniature Elegant Star accents inside the circle */}
        <polygon points="120,290 123,293 126,290 123,287" fill="url(#gold-grad)" />
        <polygon points="380,290 383,293 386,290 383,287" fill="url(#gold-grad)" />
      </svg>
      
      {showText && (
        <div className="text-center mt-3">
          <h1 className="text-sm font-sans font-extrabold text-white tracking-widest uppercase">THE CENTERED NURSE</h1>
          <p className="text-[10px] font-mono text-slate-400 font-bold tracking-widest uppercase mt-0.5">ACADEMY</p>
        </div>
      )}
    </div>
  );
}
