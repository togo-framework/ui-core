'use client'

/**
 * ThemeToggle — dropdown button to switch light/dark/system theme.
 *
 * Product-agnostic (Rule 25): accepts a `setTheme` callback so any product
 * can wire their own theme provider. Semantic tokens only — no hex colors.
 *
 * Usage:
 *   import { ThemeToggle } from '@prism/ui'
 *   <ThemeToggle setTheme={(t) => yourThemeProvider.setTheme(t)} />
 */

import { Moon, Sun } from 'lucide-react'
import { Button } from './button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu'
import { cn } from '../../lib/utils'

export interface ThemeToggleProps {
  /** Called when the user selects a theme. Wire to your theme provider. */
  setTheme: (theme: 'light' | 'dark' | 'system') => void
  /** Button size variant */
  size?: 'sm' | 'default'
  className?: string
}

export const ThemeToggle = ({ setTheme, size = 'default', className }: ThemeToggleProps) => {
  const iconSize = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'
  const buttonSize = size === 'sm' ? 'h-7 w-7' : 'h-8 w-8'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(buttonSize, 'text-muted-foreground', className)}
          aria-label="Toggle theme"
        >
          <Sun className={cn(iconSize, 'rotate-0 scale-100 transition-all duration-fast ease-standard dark:-rotate-90 dark:scale-0')} />
          <Moon className={cn('absolute', iconSize, 'rotate-90 scale-0 transition-all duration-fast ease-standard dark:rotate-0 dark:scale-100')} />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

ThemeToggle.displayName = 'ThemeToggle'
export default ThemeToggle
