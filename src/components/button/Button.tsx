import React from 'react';
import '@/styles/index.scss';
import './button.scss';
import type { ButtonProps } from './Button.types';
import { getButtonClassName } from './button.utils';

export const Button: React.FC<ButtonProps> = ({
  label,
  type = 'button',
  disabled = false,
  size = 'md',
  variant = 'fill',
  color = 'primary',
  onClick,
  ...rest
}) => {
  const className = getButtonClassName(color, variant, size);

  return (
    <button
      type={type}
      disabled={disabled}
      className={className}
      onClick={onClick}
      {...rest}
    >
      {label}
    </button>
  );
};

// 타입도 export하여 외부에서 사용 가능하도록
export type { ButtonProps } from './Button.types';

