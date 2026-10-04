import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
  color?: string;
}

export const ShieldCheckIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const ZapIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

export const FactoryIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
    <path d="M18 18h.01" />
    <path d="M14 18h.01" />
    <path d="M10 18h.01" />
  </svg>
);

export const RulerIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
  </svg>
);

export const FlagUaIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect width="24" height="12" fill="#0057B7" rx="2" />
    <rect y="12" width="24" height="12" fill="#FFD700" rx="2" />
  </svg>
);

export const LayersIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

export const WrenchIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);

export const TruckIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="1" y="3" width="15" height="13" rx="1" />
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

export const DocumentCheckIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <path d="m9 15 2 2 4-4" />
  </svg>
);

export const CpuIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="9" y="9" width="6" height="6" />
    <path d="M15 2v2" />
    <path d="M15 20v2" />
    <path d="M2 15h2" />
    <path d="M2 9h2" />
    <path d="M20 15h2" />
    <path d="M20 9h2" />
    <path d="M9 2v2" />
    <path d="M9 20v2" />
  </svg>
);

export const WindowSingleIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" className={className}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <line x1="3" y1="12" x2="21" y2="12" strokeDasharray="3 3" />
  </svg>
);

export const WindowDoubleIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" className={className}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <line x1="12" y1="3" x2="12" y2="21" />
  </svg>
);

export const WindowTripleIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" className={className}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <line x1="9" y1="3" x2="9" y2="21" />
    <line x1="15" y1="3" x2="15" y2="21" />
  </svg>
);

export const BalconyDoorIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" className={className}>
    <rect x="2" y="3" width="9" height="18" rx="1" />
    <rect x="13" y="3" width="9" height="11" rx="1" />
    <circle cx="9" cy="12" r="0.75" fill={color} />
  </svg>
);

export const PanoramaIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" className={className}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <line x1="7" y1="4" x2="7" y2="20" />
    <line x1="12" y1="4" x2="12" y2="20" />
    <line x1="17" y1="4" x2="17" y2="20" />
  </svg>
);

export const PhoneCallIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

export const CheckIcon: React.FC<IconProps> = ({ className = 'w-4 h-4', size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const CloseIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export const MenuIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="18" x2="20" y2="18" />
  </svg>
);

export const ArrowRightIcon: React.FC<IconProps> = ({ className = 'w-4 h-4', size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export const PlusIcon: React.FC<IconProps> = ({ className = 'w-4 h-4', size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export const MinusIcon: React.FC<IconProps> = ({ className = 'w-4 h-4', size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export const DraftingIcon: React.FC<IconProps> = ({ className = 'w-4 h-4', size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 22h20" />
    <path d="M12 2l8 16H4L12 2z" />
    <line x1="9" y1="14" x2="15" y2="14" />
  </svg>
);

export const StudioIcon: React.FC<IconProps> = ({ className = 'w-4 h-4', size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <path d="M21 15l-5-5L5 21" />
  </svg>
);

export const WindowOpenIcon: React.FC<IconProps> = ({ className = 'w-4 h-4', size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 3l6 4v10l-6 4" />
    <line x1="12" y1="3" x2="12" y2="21" />
  </svg>
);

export const WindowTiltIcon: React.FC<IconProps> = ({ className = 'w-4 h-4', size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <polygon points="5,5 19,5 17,9 7,9" opacity="0.6" fill={color} />
    <line x1="7" y1="9" x2="17" y2="9" />
  </svg>
);

export const ThermalIcon: React.FC<IconProps> = ({ className = 'w-4 h-4', size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
    <path d="M12 9v6" />
    <circle cx="12" cy="18" r="1.5" fill={color} />
  </svg>
);

export const FlipIcon: React.FC<IconProps> = ({ className = 'w-4 h-4', size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    <path d="M4 14h16" />
  </svg>
);

export const DimensionIcon: React.FC<IconProps> = ({ className = 'w-4 h-4', size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 6H3M21 6l-3-3M21 6l-3 3M3 6l3-3M3 6l3 3" />
    <path d="M6 21V3M6 21l-3-3M6 21l3-3M6 3l-3 3M6 3l3 3" />
  </svg>
);



