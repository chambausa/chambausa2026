'use client';

interface OfficialLink {
  nombre: string;
  url: string;
  descripcion: string;
}

interface OfficialLinksProps {
  links: {
    ai_generated?: boolean;
    items: OfficialLink[];
  };
}

export function OfficialLinks({ links }: OfficialLinksProps) {
  return (
    <section className="py-8" id="enlaces-oficiales">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          🔗 Enlaces Oficiales
        </h2>
        <p className="text-gray-600">
          Recursos oficiales verificados para obtener tu licencia
        </p>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-100">
        <div className="grid md:grid-cols-2 gap-4">
          {links.items.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all border border-gray-100 group"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <span className="text-primary font-bold text-sm">{index + 1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-primary transition-colors flex items-center gap-2">
                    {link.nombre}
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {link.descripcion}
                  </p>
                  <p className="text-xs text-gray-400 mt-2 truncate">
                    {link.url}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
