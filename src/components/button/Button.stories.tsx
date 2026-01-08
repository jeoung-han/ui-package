import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: '버튼 라벨' },
    variant: {
      control: 'select',
      options: ['fill', 'outline', 'text'],
      description: '버튼 형태',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'success', 'warning', 'info'],
      description: '버튼 컬러',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '버튼 크기',
    },
    disabled: { control: 'boolean', description: '비활성화 여부' },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: '버튼 타입',
    },
    onClick: { action: 'clicked', description: '클릭 이벤트 핸들러' },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 버튼
export const Default: Story = {
  args: {
    label: 'Button',
    variant: 'fill',
    color: 'primary',
    size: 'md',
  },
};

// 조합 예제
export const Variants: Story = {
  args: {
    label: 'Button',
  },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button {...args} label="Fill" variant="fill" color="primary" />
        <Button {...args} label="Outline" variant="outline" color="primary" />
        <Button {...args} label="Text" variant="text" color="primary" />
      </div>
    </div>
  ),
};

// 컬러 예제
export const Colors: Story = {
  args: {
    label: 'Button',
  },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button {...args} label="Primary" variant="fill" color="primary" />
        <Button {...args} label="Secondary" variant="fill" color="secondary" />
        <Button {...args} label="Danger" variant="fill" color="danger" />
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button {...args} label="Success" variant="fill" color="success" />
        <Button {...args} label="Warning" variant="fill" color="warning" />
        <Button {...args} label="Info" variant="fill" color="info" />
      </div>
    </div>
  ),
};

// 사이즈 예제
export const Sizes: Story = {
  args: {
    label: 'Button',
  },
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Button {...args} label="Large" variant="fill" color="primary" size="lg" />
      <Button {...args} label="Medium" variant="fill" color="primary" size="md" />
      <Button {...args} label="Small" variant="fill" color="primary" size="sm" />
    </div>
  ),
};