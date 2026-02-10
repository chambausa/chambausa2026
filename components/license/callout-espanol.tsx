'use client';

interface CalloutEspanolProps {
  callout: {
    type: string;
    icon: string;
    title: string;
    content: string;
    source?: string;
    source_name?: string;
  };
}

export function CalloutEspanol({ callout }: CalloutEspanolProps) {
  return (
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 rounded-lg p-6 my-8 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="text-4xl flex-shrink-0">{callout.icon}</div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            {callout.title}
          </h3>
          <p className="text-gray-700 leading-relaxed mb-3">
            {callout.content}
          </p>
          {callout.source && callout.source_name && (
            <a
              href={callout.source}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-green-700 hover:text-green-900 font-medium inline-flex items-center gap-1"
            >
              Fuente: {callout.source_name}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
