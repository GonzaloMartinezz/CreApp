import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary:
          'bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-primary-2)] to-[var(--color-primary-3)] text-white shadow-[0_4px_24px_rgba(255,107,0,0.22)] hover:shadow-[0_8px_32px_rgba(255,107,0,0.38)] hover:-translate-y-0.5 active:translate-y-0',
        secondary:
          'border border-[var(--color-border)] bg-white/4 text-[var(--color-foreground)] backdrop-blur-sm hover:border-[var(--color-accent)] hover:bg-[rgba(167,139,250,0.08)] hover:-translate-y-0.5',
        ghost:
          'text-[var(--color-foreground)] hover:bg-white/8 hover:text-[var(--color-accent)]',
        outline:
          'border border-[var(--color-border)] bg-transparent text-[var(--color-foreground)] hover:border-[var(--color-accent)] hover:bg-[rgba(167,139,250,0.06)]',
        accent:
          'bg-[var(--color-accent)] text-[#09090b] font-bold hover:bg-[var(--color-accent-2)] hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(167,139,250,0.3)]',
      },
      size: {
        sm:      'h-8 px-4 text-xs',
        default: 'h-10 px-5 py-2',
        lg:      'h-12 px-8 text-base',
        xl:      'h-14 px-10 text-base',
        icon:    'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
