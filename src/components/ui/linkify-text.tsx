'use client'

import React from "react";

const URL_REGEX =
  /(https?:\/\/[^\s<]+)|(www\.[^\s<]+\.[a-zA-Z]{2,}[^\s<]*)|((?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+(?:com|org|net|io|dev|co|me|info|biz|gov|edu|app|ai|uk|de|fr|sa|qa|ae|eg|ps|jo)\b(?:\/[^\s<]*)?)/gi;

interface LinkifyTextProps {
  children: string;
  className?: string;
}

/**
 * Renders text with auto-detected URLs converted to clickable links.
 * Links open in a new tab with noopener/noreferrer for security.
 */
const LinkifyText = ({ children, className }: LinkifyTextProps) => {
  if (!children) return null;

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  URL_REGEX.lastIndex = 0;

  while ((match = URL_REGEX.exec(children)) !== null) {
    const url = match[0];
    const index = match.index;

    if (index > lastIndex) parts.push(children.slice(lastIndex, index));

    const href = /^https?:\/\//i.test(url) ? url : `https://${url}`;
    parts.push(
      <a
        key={index}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors duration-fast ease-standard"
        onClick={(e) => e.stopPropagation()}
      >
        {url}
      </a>,
    );

    lastIndex = index + url.length;
  }

  if (lastIndex < children.length) parts.push(children.slice(lastIndex));

  return <span className={className}>{parts}</span>;
};

LinkifyText.displayName = "LinkifyText";
export default LinkifyText;
export { LinkifyText };