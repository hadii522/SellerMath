'use client';

import React, { useId, useState } from 'react';
import { HelpCircle } from 'lucide-react';

interface NumberInputProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
  prefix?: string;
  suffix?: string;
  min?: number;
  max?: number;
  step?: number;
  tooltip?: string;
  error?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export function NumberInput({
  label,
  value,
  onChange,
  prefix,
  suffix,
  min = 0,
  max,
  step = 0.01,
  tooltip,
  error,
  placeholder = '0.00',
  required = false,
  disabled = false,
  className = '',
}: NumberInputProps) {
  const generatedId = useId();
  const inputId = `input-${generatedId}`;
  const helpId = `help-${generatedId}`;
  const errorId = `error-${generatedId}`;

  const [showTooltip, setShowTooltip] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    if (rawVal === '') {
      onChange(0);
      return;
    }
    const parsed = parseFloat(rawVal);
    if (!isNaN(parsed)) {
      onChange(parsed);
    }
  };

  return (
    <div className={`space-y-1.5 ${className}`}>
      {/* Label and Tooltip Header */}
      <div className="flex items-center justify-between">
        <label
          htmlFor={inputId}
          className="text-xs font-semibold text-neutral-800 tracking-tight flex items-center gap-1.5"
        >
          <span>{label}</span>
          {required && <span className="text-rose-600">*</span>}
        </label>

        {tooltip && (
          <div className="relative inline-block">
            <button
              type="button"
              onClick={() => setShowTooltip(!showTooltip)}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              className="text-neutral-400 hover:text-neutral-700 p-0.5 rounded transition-colors"
              aria-label={`Help about ${label}`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
            </button>

            {showTooltip && (
              <div
                role="tooltip"
                className="absolute right-0 bottom-full mb-1 w-56 p-2 bg-neutral-900 text-white text-xs rounded-md shadow-lg z-50 leading-relaxed font-normal pointer-events-none"
              >
                {tooltip}
                <div className="absolute top-full right-2 border-4 border-transparent border-t-neutral-900" />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input container with prefix/suffix */}
      <div className="relative rounded-lg shadow-sm">
        {prefix && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-neutral-500 text-sm font-medium">{prefix}</span>
          </div>
        )}

        <input
          type="number"
          id={inputId}
          name={inputId}
          inputMode="decimal"
          min={min}
          max={max}
          step={step}
          value={value === 0 ? '' : value}
          onChange={handleInputChange}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={
            [error ? errorId : null, tooltip ? helpId : null]
              .filter(Boolean)
              .join(' ') || undefined
          }
          className={`block w-full rounded-lg border text-sm text-neutral-900 transition-colors bg-white font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent ${
            prefix ? 'pl-8' : 'pl-3'
          } ${suffix ? 'pr-8' : 'pr-3'} py-2 ${
            error
              ? 'border-rose-400 text-rose-900 bg-rose-50/50'
              : 'border-neutral-300 hover:border-neutral-400'
          } ${disabled ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed' : ''}`}
        />

        {suffix && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <span className="text-neutral-500 text-sm font-medium">{suffix}</span>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p id={errorId} className="text-xs text-rose-600 font-medium">
          {error}
        </p>
      )}
    </div>
  );
}
