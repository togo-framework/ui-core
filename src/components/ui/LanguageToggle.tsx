'use client'

/**
 * LanguageToggle — dropdown button to switch EN/AR language.
 *
 * Product-agnostic (Rule 25): accepts `language` (current) + `setLanguage`
 * callback so any product wires their own i18n/auth. RTL-aware: uses logical
 * CSS classes. No context dependency.
 *
 * Usage:
 *   import { LanguageToggle } from '@prism/ui'
 *   <LanguageToggle language={lang} setLanguage={(l) => handleSetLanguage(l)} />
 */

import { Languages } from 'lucide-react'
import { Button } from './button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu'
import { cn } from '../../lib/utils'

export interface LanguageToggleProps {
  /** Current active language */
  language: 'en' | 'ar'
  /** Called when the user selects a language */
  setLanguage: (lang: 'en' | 'ar') => void
  /** Button size variant */
  size?: 'sm' | 'default'
  className?: string
}

export const LanguageToggle = ({ language, setLanguage, size = 'default', className }: LanguageToggleProps) => {
  const buttonClass = size === 'sm' ? 'h-7 w-7' : 'h-8 w-8'
  const iconClass = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(buttonClass, className)}
          aria-label="Toggle language"
        >
          <Languages className={iconClass} />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => setLanguage('en')}
          className={language === 'en' ? 'bg-primary/10' : ''}
        >
          <span className="me-2" aria-hidden="true">EN</span>
          English
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLanguage('ar')}
          className={language === 'ar' ? 'bg-primary/10' : ''}
        >
          <span className="me-2" aria-hidden="true">AR</span>
          العربية
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

LanguageToggle.displayName = 'LanguageToggle'
export default LanguageToggle
