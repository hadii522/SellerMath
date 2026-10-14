import React from 'react';
import { BookOpen, Check } from 'lucide-react';

export interface WorkedExampleStep {
  step: string;
  formula: string;
  calculation: string;
  result: string;
}

interface WorkedExampleProps {
  title: string;
  scenario: string;
  steps: WorkedExampleStep[];
  conclusion: string;
}

export function WorkedExample({
  title,
  scenario,
  steps,
  conclusion,
}: WorkedExampleProps) {
  return (
    <div className="bg-neutral-50/80 rounded-2xl border border-neutral-200/90 p-6 my-8">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
          <BookOpen className="w-4 h-4" />
        </div>
        <div>
          <h3 className="font-bold text-neutral-900 text-base">{title}</h3>
          <p className="text-xs text-neutral-500 font-medium">
            Realistic Step-by-Step Calculation Scenario
          </p>
        </div>
      </div>

      <p className="text-sm text-neutral-700 mb-5 leading-relaxed bg-white p-3.5 rounded-xl border border-neutral-200/60">
        <strong>The Scenario:</strong> {scenario}
      </p>

      <div className="space-y-3">
        {steps.map((s, idx) => (
          <div
            key={idx}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-white rounded-lg border border-neutral-200/50 text-xs text-neutral-700"
          >
            <div className="flex items-start sm:items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-neutral-200 text-neutral-800 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5 sm:mt-0">
                {idx + 1}
              </span>
              <div>
                <span className="font-semibold text-neutral-900">{s.step}:</span>{' '}
                <span className="text-neutral-500 italic font-mono">{s.formula}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pl-7 sm:pl-0">
              <span className="font-mono text-neutral-600">{s.calculation}</span>
              <span className="font-bold text-neutral-950 font-mono bg-neutral-100 px-2 py-0.5 rounded">
                = {s.result}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-neutral-200 text-xs text-neutral-700 flex items-start gap-2">
        <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed font-medium">
          <strong>Key Takeaway:</strong> {conclusion}
        </p>
      </div>
    </div>
  );
}
