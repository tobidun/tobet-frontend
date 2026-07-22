// styles/theme/colors.ts
// Design token color definitions for runtime usage (Framer Motion, dynamic styles).

export const colors = {
  background: {
    DEFAULT: '#0B0F19',
    elevated: '#111827',
    card: '#1F2937',
    overlay: 'rgba(0, 0, 0, 0.6)',
    hover: 'rgba(255, 255, 255, 0.05)',
    active: 'rgba(255, 255, 255, 0.08)',
  },
  foreground: {
    DEFAULT: '#F9FAFB',
    muted: '#9CA3AF',
    subtle: '#6B7280',
    inverse: '#111827',
  },
  primary: {
    DEFAULT: '#3B82F6',
    hover: '#2563EB',
    active: '#1D4ED8',
    subtle: 'rgba(59, 130, 246, 0.15)',
    muted: 'rgba(59, 130, 246, 0.5)',
  },
  accent: {
    DEFAULT: '#F59E0B',
    hover: '#D97706',
    active: '#B45309',
    subtle: 'rgba(245, 158, 11, 0.15)',
  },
  success: {
    DEFAULT: '#10B981',
    subtle: 'rgba(16, 185, 129, 0.15)',
  },
  warning: {
    DEFAULT: '#F59E0B',
    subtle: 'rgba(245, 158, 11, 0.15)',
  },
  error: {
    DEFAULT: '#EF4444',
    subtle: 'rgba(239, 68, 68, 0.15)',
  },
  info: {
    DEFAULT: '#3B82F6',
    subtle: 'rgba(59, 130, 246, 0.15)',
  },
  live: {
    DEFAULT: '#10B981',
  },
  odds: {
    up: '#10B981',
    down: '#EF4444',
    unchanged: '#6B7280',
  },
  border: {
    DEFAULT: '#374151',
    subtle: '#1F2937',
    focus: '#3B82F6',
  },
  ring: {
    DEFAULT: '#3B82F6',
    offset: '#0B0F19',
  },
} as const;

export type ColorToken = keyof typeof colors;
export type ColorShade<T extends ColorToken> = keyof (typeof colors)[T];
