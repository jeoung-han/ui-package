import React from 'react';
import '@/styles/index.scss';
import './newButton.scss';

export interface NewButtonProps {
  /** 버튼 라벨 */
  label: string;
  /** 버튼 타입 (button, submit, reset) */
  type?: 'button' | 'submit' | 'reset';
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 클릭 이벤트 */
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  /** 크기 */
  size?: 'sm' | 'md' | 'lg';
  /** 스타일(variant) */
  variant?: 'primary' | 'secondary' | 'danger';
}

export const NewButton: React.FC<NewButtonProps> = ({
  label,
  type = 'button',
  disabled = false,
  size = 'md',
  variant = 'primary',
  onClick,
  ...rest
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`lib-btn lib-btn--${variant} lib-btn--${size}`}
      onClick={onClick}
      {...rest}
    >
      {label}
    </button>
  );
};

