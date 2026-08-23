import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hover?: boolean;
}

export default function Card({ children, hover = false, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white p-6 transition-colors',
        hover && 'hover:bg-bone',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
