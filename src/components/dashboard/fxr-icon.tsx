'use client';

import React from 'react';

interface FxrIconProps {
  icon: string;
  size?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function FxrIcon({
  icon,
  size = 24,
  color,
  className = '',
  style = {},
}: FxrIconProps) {
  const iconPath = `/assets/icons/${icon}.svg`;

  return (
    <div
      className={`inline-block shrink-0 !transition-none duration-300 ease-in-out ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color ? color : 'currentColor',
        WebkitMask: `url("${iconPath}") center center / contain no-repeat`,
        mask: `url("${iconPath}") center center / contain no-repeat`,
        ...style,
      }}
      aria-hidden="true"
    />
  );
}
