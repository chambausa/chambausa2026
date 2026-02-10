'use client';

import { useState, useEffect } from 'react';

interface TocItem {
  id: string;
  title: string;
  icon: string;
}

interface TableOfContentsProps {
  items: TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px' }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg p-6 sticky top-24 border border-gray-200 shadow-sm">
      <h3 className="font-bold text-lg mb-4 text-gray-900 flex items-center gap-2">
        <span>📑</span>
        <span>En esta página</span>
      </h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => scrollToSection(item.id)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center gap-2 ${
                activeId === item.id
                  ? 'bg-primary text-white font-semibold'
                  : 'text-gray-700 hover:bg-white hover:shadow-sm'
              }`}
            >
              <span className={activeId === item.id ? 'opacity-100' : 'opacity-60'}>
                {item.icon}
              </span>
              <span className="text-sm">{item.title}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
