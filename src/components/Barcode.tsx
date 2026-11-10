import React from 'react';

interface BarcodeProps {
  value: string;
  className?: string;
  height?: number;
  showText?: boolean;
  lightBackground?: boolean;
}

export const Barcode: React.FC<BarcodeProps> = ({
  value,
  className = '',
  height = 36,
  showText = true,
  lightBackground = false,
}) => {
  // Deterministic Code-128 style bar width pattern generator
  const getBars = (text: string) => {
    const seed = text.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const bars: { width: number; isSpace: boolean }[] = [];
    
    // Start guard
    bars.push({ width: 2, isSpace: false });
    bars.push({ width: 1, isSpace: true });
    bars.push({ width: 2, isSpace: false });
    bars.push({ width: 2, isSpace: true });

    // Payload bars derived from string chars
    for (let i = 0; i < text.length; i++) {
      const code = text.charCodeAt(i) + (seed % 17);
      const b1 = (code % 3) + 1;
      const s1 = ((code >> 1) % 3) + 1;
      const b2 = ((code >> 2) % 3) + 1;
      const s2 = ((code >> 3) % 2) + 1;
      
      bars.push({ width: b1, isSpace: false });
      bars.push({ width: s1, isSpace: true });
      bars.push({ width: b2, isSpace: false });
      bars.push({ width: s2, isSpace: true });
    }

    // End guard
    bars.push({ width: 3, isSpace: false });
    bars.push({ width: 1, isSpace: true });
    bars.push({ width: 2, isSpace: false });

    return bars;
  };

  const bars = getBars(value);
  const totalWidth = bars.reduce((acc, b) => acc + b.width, 0);

  let currentX = 0;
  const barElements = bars.map((bar, index) => {
    const x = currentX;
    currentX += bar.width;
    if (bar.isSpace) return null;
    return (
      <rect
        key={index}
        x={x}
        y="0"
        width={bar.width}
        height={height}
        fill={lightBackground ? '#0f172a' : '#ffffff'}
      />
    );
  });

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <svg
        viewBox={`0 0 ${totalWidth} ${height}`}
        className="w-full"
        style={{ height: `${height}px`, maxHeight: `${height}px` }}
        preserveAspectRatio="none"
      >
        {barElements}
      </svg>
      {showText && (
        <span
          className={`font-mono text-[9px] tracking-widest uppercase mt-0.5 ${
            lightBackground ? 'text-slate-800' : 'text-slate-300'
          }`}
        >
          *{value}*
        </span>
      )}
    </div>
  );
};
