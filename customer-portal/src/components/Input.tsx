"use client";
import React from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement> & { label?: string };

export default function Input({ label, className = '', ...rest }: Props) {
  return (
    <div className={`form-field ${className}`}> 
      {label && <label className="form-field__label">{label}</label>}
      <input className="form-field__control" {...rest} />
    </div>
  );
}
