"use client";
import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  variant?: 'primary' | 'secondary';
};

export default function Button({ children, loading, variant = 'primary', className = '', ...rest }: Props) {
  const base = `btn ${variant === 'primary' ? 'btn--primary' : 'btn--secondary'}`;
  return (
    <button className={`${base} ${className}`} disabled={loading || rest.disabled} {...rest}>
      {loading ? 'Loading…' : children}
    </button>
  );
}
