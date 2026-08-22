import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium uppercase tracking-[.16em] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-navy focus-visible:outline-offset-4 disabled:opacity-40 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-ink text-paper hover:bg-navy',
    secondary: 'bg-transparent text-ink border border-ink hover:bg-ink hover:text-paper',
    accent: 'bg-navy text-paper hover:bg-ink',
    ghost: 'bg-transparent text-ink-faint border border-stone hover:border-ink-faint hover:text-ink',
  };

  const sizes = {
    sm: 'px-5 py-2.5 text-[10px]',
    md: 'px-7 py-3.5 text-[11px]',
    lg: 'px-9 py-4.5 text-xs',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className || ''}`}
      style={{ borderRadius: 0 }}
      {...props}
    >
      {children}
    </button>
  );
}
