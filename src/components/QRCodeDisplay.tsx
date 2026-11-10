import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';

interface QRCodeDisplayProps {
  value: string;
  size?: number;
  className?: string;
  darkColor?: string;
  lightColor?: string;
}

export const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({
  value,
  size = 80,
  className = '',
  darkColor = '#0f172a',
  lightColor = '#ffffff',
}) => {
  const [dataUrl, setDataUrl] = useState<string>('');

  useEffect(() => {
    let isMounted = true;
    QRCode.toDataURL(value, {
      width: size * 2, // 2x for sharp print
      margin: 1,
      color: {
        dark: darkColor,
        light: lightColor,
      },
      errorCorrectionLevel: 'M',
    })
      .then((url: string) => {
        if (isMounted) setDataUrl(url);
      })
      .catch((err: unknown) => {
        console.error('Failed to generate QR code', err);
      });

    return () => {
      isMounted = false;
    };
  }, [value, size, darkColor, lightColor]);

  if (!dataUrl) {
    return (
      <div
        style={{ width: `${size}px`, height: `${size}px` }}
        className={`bg-white/90 rounded flex items-center justify-center p-1 ${className}`}
      >
        <span className="text-[8px] font-mono text-slate-500">QR</span>
      </div>
    );
  }

  return (
    <img
      src={dataUrl}
      alt={`QR Code: ${value}`}
      style={{ width: `${size}px`, height: `${size}px` }}
      className={`rounded shadow-sm ${className}`}
    />
  );
};
