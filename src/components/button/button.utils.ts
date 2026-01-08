// Keep all classes for Storybook/tree-shaking
// 모든 클래스 조합을 명시적으로 참조하여 빌드 시 제거되지 않도록 함
export const buttonClasses = {
  // Colors × Variants
  'primary-fill': 'lib-btn--primary-fill',
  'primary-outline': 'lib-btn--primary-outline',
  'primary-text': 'lib-btn--primary-text',
  'secondary-fill': 'lib-btn--secondary-fill',
  'secondary-outline': 'lib-btn--secondary-outline',
  'secondary-text': 'lib-btn--secondary-text',
  'danger-fill': 'lib-btn--danger-fill',
  'danger-outline': 'lib-btn--danger-outline',
  'danger-text': 'lib-btn--danger-text',
  'success-fill': 'lib-btn--success-fill',
  'success-outline': 'lib-btn--success-outline',
  'success-text': 'lib-btn--success-text',
  'warning-fill': 'lib-btn--warning-fill',
  'warning-outline': 'lib-btn--warning-outline',
  'warning-text': 'lib-btn--warning-text',
  'info-fill': 'lib-btn--info-fill',
  'info-outline': 'lib-btn--info-outline',
  'info-text': 'lib-btn--info-text',
  // Sizes
  sm: 'lib-btn--sm',
  md: 'lib-btn--md',
  lg: 'lib-btn--lg',
} as const;

export const getButtonClassName = (
  color: string,
  variant: string,
  size: string
): string => {
  const variantClass = buttonClasses[`${color}-${variant}` as keyof typeof buttonClasses];
  const sizeClass = buttonClasses[size as keyof typeof buttonClasses];
  return `lib-btn ${variantClass} ${sizeClass}`;
};

