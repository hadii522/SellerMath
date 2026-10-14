import React from 'react';
import { FeeScheduleSource } from '@/lib/types/calculator';
import { ExternalLink, CheckCircle2, AlertCircle } from 'lucide-react';

interface SourceAttributionProps {
  source: FeeScheduleSource;
  exclusions?: string[];
  className?: string;
}

export function SourceAttribution({
  source,
  exclusions = [],
  className = '',
}: SourceAttributionProps) {
  return (
    <div
      className={`rounded-xl border border-neutral-200 bg-neutral-50/70 p-5 text-xs text-neutral-600 space-y-3 ${className}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-200 pb-3">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span className="font-semibold text-neutral-900">
            Verified Fee Schedule: {source.sourceName}
          </span>
        </div>

        <a
          href={source.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-800 font-semibold underline underline-offset-2"
        >
          <span>Official Documentation</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-neutral-500">
        <div>
          <span className="font-medium text-neutral-700">Market:</span>{' '}
          {source.applicableMarket}
        </div>
        <div>
          <span className="font-medium text-neutral-700">Effective Date:</span>{' '}
          {source.effectiveDate}
        </div>
        <div>
          <span className="font-medium text-neutral-700">Last Verified:</span>{' '}
          {source.lastVerifiedDate}
        </div>
      </div>

      <p className="leading-relaxed text-neutral-600">{source.notes}</p>

      {exclusions.length > 0 && (
        <div className="pt-2 border-t border-neutral-200/80">
          <div className="flex items-center gap-1.5 font-semibold text-neutral-800 mb-1">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>Exclusions & Seller Variations Not Included in This Model:</span>
          </div>
          <ul className="list-disc list-inside space-y-0.5 text-neutral-500 pl-1">
            {exclusions.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      <p className="text-[11px] text-neutral-400 italic pt-1">
        {source.disclaimer}
      </p>
    </div>
  );
}
