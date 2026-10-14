import React from 'react';
import { CurrencyCode } from '@/lib/types/calculator';
import {
  formatCurrency,
  formatPercent,
} from '@/lib/calculations/formatting';

export interface BreakdownItem {
  label: string;
  amount: number;
  type: 'revenue' | 'cost' | 'subtotal' | 'profit';
  percentOfRevenue?: number;
  notes?: string;
}

interface FeeBreakdownTableProps {
  items: BreakdownItem[];
  currency: CurrencyCode;
  totalRevenue: number;
  netProfit: number;
}

export function FeeBreakdownTable({
  items,
  currency,
  totalRevenue,
  netProfit,
}: FeeBreakdownTableProps) {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-xs">
      <div className="px-5 py-3.5 bg-neutral-50/80 border-b border-neutral-200 flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-700">
          Itemized Revenue & Cost Breakdown
        </h3>
        <span className="text-xs text-neutral-500 font-medium">
          % of Gross Revenue
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-neutral-100 text-xs text-neutral-500 font-semibold bg-neutral-50/30">
              <th className="py-2.5 px-5">Financial Component</th>
              <th className="py-2.5 px-5 text-right">Amount ({currency})</th>
              <th className="py-2.5 px-5 text-right">% of Revenue</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {items.map((item, idx) => {
              const isProfitRow = item.type === 'profit';
              const isSubtotalRow = item.type === 'subtotal';
              const isRevenue = item.type === 'revenue';

              const percentShare =
                totalRevenue > 0
                  ? (Math.abs(item.amount) / totalRevenue) * 100
                  : 0;

              return (
                <tr
                  key={idx}
                  className={`transition-colors ${
                    isProfitRow
                      ? 'bg-neutral-900 text-white font-bold'
                      : isSubtotalRow
                      ? 'bg-neutral-50 font-semibold text-neutral-900'
                      : 'hover:bg-neutral-50/50 text-neutral-700'
                  }`}
                >
                  <td className="py-2.5 px-5">
                    <div className="flex items-center gap-1.5">
                      <span>{item.label}</span>
                      {item.notes && (
                        <span className="text-xs text-neutral-400 font-normal">
                          ({item.notes})
                        </span>
                      )}
                    </div>
                  </td>
                  <td
                    className={`py-2.5 px-5 text-right font-medium ${
                      isProfitRow
                        ? netProfit >= 0
                          ? 'text-emerald-400'
                          : 'text-rose-400'
                        : isRevenue
                        ? 'text-neutral-900'
                        : 'text-neutral-700'
                    }`}
                  >
                    {item.type === 'cost' && item.amount > 0 ? '-' : ''}
                    {formatCurrency(item.amount, currency)}
                  </td>
                  <td
                    className={`py-2.5 px-5 text-right text-xs ${
                      isProfitRow ? 'text-neutral-300 font-bold' : 'text-neutral-500'
                    }`}
                  >
                    {isProfitRow
                      ? formatPercent((netProfit / (totalRevenue || 1)) * 100, 1)
                      : isRevenue && totalRevenue > 0
                      ? formatPercent(percentShare, 1)
                      : item.amount > 0
                      ? formatPercent(percentShare, 1)
                      : '0.0%'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
