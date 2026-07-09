'use client'

// directional-arrow.tsx
// RTL-aware arrow icon helper.
// Renders ArrowLeft when the active locale is RTL (Arabic), ArrowRight otherwise.
// Accepts `isRTL` as a prop so each product can wire its own i18n context.
//
// Usage:
//   <DirectionalArrow isRTL={false} />       // LTR mode
//   <DirectionalArrow isRTL size={20} />     // RTL mode, custom size

import { ArrowLeft, ArrowRight } from "lucide-react";

interface DirectionalArrowProps {
  isRTL?: boolean;
  size?: number;
  className?: string;
}

const DirectionalArrow = ({ isRTL = false, size = 16, className }: DirectionalArrowProps) => {
  const IconComponent = isRTL ? ArrowLeft : ArrowRight;
  return <IconComponent size={size} className={className} aria-hidden="true" />;
};
DirectionalArrow.displayName = "DirectionalArrow";

export { DirectionalArrow };
