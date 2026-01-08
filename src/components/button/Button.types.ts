import type { UIColor, UISize } from '@/types/ui';

export interface ButtonProps {
  label: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'fill' | 'outline' | 'text';
  size?: UISize;
  color?: UIColor;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

