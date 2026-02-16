'use client';

import type { HeroSection, KeyStat } from '@/types/license-json.types';

interface HeroSectionProps {
  hero: HeroSection;
}

function KeyStatCard({ stat }: { stat: KeyStat }) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
      <p className="text-2xl font-bold text-primary">{stat.value}</p>
      <p className="text-sm text-gray-600 mt-1">{stat.detail}</p>
      <a
        href={stat.source}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-blue-600 hover:underline mt-2 inline-block"
      >
        Fuente: {stat.source_name}
      </a>
    </div>
  );
}

export function HeroSection({ hero }: HeroSectionProps) {
  return (
    <section className="bg-gradient-to-br from-primary/5 via-white to-secondary/10 py-12 px-4 rounded-xl">
      {/* Badge */}
      <div className="mb-4">
        <span className="inline-block bg-primary text-white text-sm px-3 py-1 rounded-full font-medium">
          {hero.badge}
        </span>
      </div>

      {/* Headlines */}
      <h1 className="text-4xl font-bold text-gray-900 mb-2">
        {hero.headline}
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl">
        {hero.subheadline}
      </p>

      {/* Key Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {hero.key_stats.map((stat, index) => (
          <KeyStatCard key={index} stat={stat} />
        ))}
      </div>

      {/* CTAs */}
      <div className="flex flex-wrap gap-4">
        <a
          href={hero.cta_primary.anchor}
          className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
        >
          {hero.cta_primary.text}
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
        <a
          href={hero.cta_secondary.anchor}
          className="inline-flex items-center px-6 py-3 bg-white text-primary border border-primary font-medium rounded-lg hover:bg-primary/5 transition-colors"
        >
          {hero.cta_secondary.text}
        </a>
      </div>
    </section>
  );
}
