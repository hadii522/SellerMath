'use client';

import React from 'react';
import { siteConfig } from '@/lib/config/site';

interface AdSlotProps {
  slotId: string;
  format?: 'horizontal' | 'rectangle' | 'vertical';
  className?: string;
  label?: string;
}

export function AdSlot({
  slotId,
  format = 'horizontal',
  className = '',
  label = 'Advertisement',
}: AdSlotProps) {
  // If ads are disabled in siteConfig or no client ID is configured, render null (no fake ads, no shift)
  if (!siteConfig.ads.enabled || !siteConfig.ads.client) {
    return null;
  }

  // Dimensions to prevent Cumulative Layout Shift (CLS) when AdSense is activated in production
  const formatStyles: Record<string, string> = {
    horizontal: 'min-h-[90px] max-w-[728px] mx-auto',
    rectangle: 'min-h-[250px] max-w-[300px] mx-auto',
    vertical: 'min-h-[600px] max-w-[160px] mx-auto',
  };

  return (
    <aside
      aria-label={label}
      className={`my-6 text-center overflow-hidden ${formatStyles[format] || ''} ${className}`}
    >
      <div className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium mb-1">
        {label}
      </div>
      <div className="bg-neutral-50 border border-neutral-200/60 rounded-lg flex items-center justify-center p-2 text-xs text-neutral-400 min-h-[90px]">
        {/* Real Google AdSense Script Tag will inject here when NEXT_PUBLIC_ADS_ENABLED="true" */}
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={siteConfig.ads.client}
          data-ad-slot={slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </aside>
  );
}
