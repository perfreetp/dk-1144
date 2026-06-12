import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

type ProgressVariant = 'default' | 'success' | 'warning' | 'danger';

interface ProgressProps {
  percent: number;
  variant?: ProgressVariant;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Progress({
  percent,
  variant = 'default',
  showText = false,
  size = 'md',
  className,
}: ProgressProps) {
  const sizeStyles = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  const variantStyles: Record<ProgressVariant, string> = {
    default: 'bg-indigo-600',
    success: 'bg-green-600',
    warning: 'bg-amber-600',
    danger: 'bg-red-600',
  };

  return (
    <div className={twMerge('w-full', className)}>
      <div className={clsx('w-full bg-slate-200 rounded-full overflow-hidden', sizeStyles[size])}>
        <div
          className={clsx(
            'h-full transition-all duration-500 ease-out rounded-full',
            variantStyles[variant]
          )}
          style={{ width: `${Math.min(100, Math.max(0, percent))}%` }}
        />
      </div>
      {showText && (
        <div className="text-xs text-slate-600 mt-1 text-right">{Math.round(percent)}%</div>
      )}
    </div>
  );
}

interface ProgressRingProps {
  percent: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export function ProgressRing({
  percent,
  size = 120,
  strokeWidth = 8,
  className,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className={twMerge('relative inline-flex items-center justify-center', className)}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          className="text-slate-200"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="text-indigo-600 transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-3xl font-bold text-slate-900">{Math.round(percent)}%</span>
        <span className="text-xs text-slate-500">完成度</span>
      </div>
    </div>
  );
}
