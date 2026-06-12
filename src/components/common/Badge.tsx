import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
  const variantStyles: Record<BadgeVariant, string> = {
    default: 'bg-slate-100 text-slate-700',
    primary: 'bg-indigo-100 text-indigo-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-amber-100 text-amber-700',
    danger: 'bg-red-100 text-red-700',
    info: 'bg-blue-100 text-blue-700',
  };

  return (
    <span
      className={twMerge(
        clsx(
          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
          variantStyles[variant],
          className
        )
      )}
    >
      {children}
    </span>
  );
}
