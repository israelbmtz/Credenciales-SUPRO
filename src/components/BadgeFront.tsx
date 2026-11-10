import React from 'react';
import { BadgeData, BadgeSettings } from '../types/badge';
import { Barcode } from './Barcode';
import { ShieldCheck, Cpu, Sparkles, CheckCircle2 } from 'lucide-react';

interface BadgeFrontProps {
  data: BadgeData;
  settings: BadgeSettings;
  className?: string;
  isPrintMode?: boolean;
}

export const BadgeFront: React.FC<BadgeFrontProps> = ({
  data,
  settings,
  className = '',
  isPrintMode = false,
}) => {
  const isVertical = settings.orientation === 'vertical';

  // Photo filter classes
  const getFilterClass = () => {
    switch (settings.photoFilter) {
      case 'bw':
        return 'grayscale contrast-110';
      case 'cool-tint':
        return 'contrast-110 saturate-50 hue-rotate-15';
      case 'high-contrast':
        return 'contrast-125 brightness-105';
      case 'none':
      default:
        return 'contrast-105';
    }
  };

  const getPhotoShapeClass = () => {
    switch (settings.photoShape) {
      case 'circle':
        return 'rounded-full aspect-square';
      case 'square':
        return 'rounded-none aspect-[4/5]';
      case 'rounded':
      default:
        return 'rounded-xl aspect-[4/5]';
    }
  };

  if (isVertical) {
    return (
      <div
        className={`relative overflow-hidden select-none bg-slate-950 text-white rounded-2xl shadow-2xl flex flex-col justify-between border border-cyan-500/30 ${
          isPrintMode ? 'badge-card-print-vertical' : 'w-[340px] h-[538px]'
        } ${className}`}
        style={{
          boxSizing: 'border-box',
        }}
      >
        {/* Background Implant Graphic */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <img
            src={data.backgroundUrl}
            alt="Medical background"
            className="w-full h-full object-cover object-center opacity-45 mix-blend-screen scale-105"
            
          />
          {/* Gradients to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/50 to-slate-950/95" />
          <div className="absolute inset-0 bg-radial from-transparent via-slate-950/40 to-slate-950/80" />
          
          {/* Subtle Guilloche / Security Grid overlay */}
          <div 
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(56, 189, 248, 0.4) 1px, transparent 0)',
              backgroundSize: '16px 16px'
            }}
          />
        </div>

        {/* Holographic Security Overlay (when enabled) */}
        {settings.showHologram && (
          <div className="absolute inset-0 z-20 pointer-events-none hologram-effect opacity-35 mix-blend-color-dodge transition-opacity duration-300" />
        )}

        {/* Slot punch guide for lanyard / clip */}
        {settings.showSlotPunch && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30">
            <div className="w-12 h-2.5 rounded-full border border-dashed border-cyan-400/60 bg-black/40 flex items-center justify-center">
              <span className="text-[6px] font-mono tracking-tighter text-cyan-300/70">CLIP SLOT</span>
            </div>
          </div>
        )}

        {/* Content Container */}
        <div className="relative z-10 flex flex-col h-full p-4 justify-between">
          {/* Top Brand Header */}
          <div className="flex flex-col items-center text-center pt-2">
            {/* Header Badge text */}
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-[9px] font-semibold text-cyan-300 tracking-wider uppercase mb-2 shadow-sm">
              <ShieldCheck className="w-3 h-3 text-cyan-400" />
              <span>Acceso Quirúrgico Autorizado</span>
            </div>

            {/* SUPRO Logo */}
            <div className="w-48 h-13 flex items-center justify-center overflow-hidden drop-shadow-md">
              <img
                src={data.logoUrl}
                alt={data.companyName}
                className="max-h-full max-w-full object-contain filter contrast-125"
                
              />
            </div>
            
            <p className="text-[9px] font-medium tracking-widest text-slate-400 uppercase mt-0.5">
              {data.department || 'Ortopedia y Traumatología'}
            </p>
          </div>

          {/* Center: Employee Photo + Security Chip */}
          <div className="flex flex-col items-center my-auto py-1">
            <div className="relative group">
              {/* Photo Frame with glowing metallic cyan border */}
              <div className="p-1 rounded-xl bg-gradient-to-b from-cyan-400/80 via-blue-600/50 to-cyan-500/80 shadow-lg shadow-cyan-500/20">
                <div className={`overflow-hidden bg-slate-900 w-32 h-40 ${getPhotoShapeClass()} shadow-inner relative`}>
                  <img
                    src={data.photoUrl}
                    alt={data.fullName}
                    className={`w-full h-full object-cover object-top ${getFilterClass()}`}
                    
                  />
                  
                  {/* Subtle biometric scan overlay corner brackets */}
                  <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t border-l border-cyan-400 pointer-events-none" />
                  <div className="absolute top-1 right-1 w-2.5 h-2.5 border-t border-r border-cyan-400 pointer-events-none" />
                  <div className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b border-l border-cyan-400 pointer-events-none" />
                  <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b border-r border-cyan-400 pointer-events-none" />
                </div>
              </div>

              {/* Smart RFID Chip Graphic (if enabled) */}
              {settings.showChip && (
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-8 h-6 rounded bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 border border-amber-200/80 shadow-md flex items-center justify-center z-20">
                  <Cpu className="w-4 h-4 text-amber-950/80" />
                </div>
              )}

              {/* Holographic Seal Badge on bottom-right of photo */}
              {settings.showHologram && (
                <div className="absolute -bottom-2 -right-2 w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-300 via-indigo-400 to-fuchsia-400 border border-white/80 shadow-md flex items-center justify-center p-0.5 z-20">
                  <div className="w-full h-full rounded-full border border-dashed border-white/90 flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5 text-white drop-shadow" />
                  </div>
                </div>
              )}
            </div>

              {/* ID Badge Pill */}
              <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900/90 border border-cyan-500/50 shadow-inner">
                <span className="text-[10px] uppercase font-mono tracking-wider text-cyan-300">ID EMPLEADO:</span>
                <span className="font-mono text-xs font-bold tracking-widest text-white">{data.employeeId}</span>
              </div>
          </div>

          {/* Bottom Employee Information */}
          <div className="flex flex-col items-center text-center space-y-1">
            {/* Full Name */}
            <h2 className="text-[17px] font-extrabold tracking-tight text-white uppercase leading-tight font-display drop-shadow-sm px-1">
              {data.fullName}
            </h2>

            {/* Job Title Badge */}
            <div className="inline-block px-3 py-1 rounded bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-xs tracking-wider uppercase shadow-md border border-cyan-300/40">
              {data.jobTitle}
            </div>

            {/* Sub-info: Access level & Vigencia */}
            <div className="flex items-center justify-center gap-3 text-[10px] text-slate-300 pt-1 font-medium">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>Nivel: {data.hospitalAccessLevel || 'Quirófano'}</span>
              </span>
              <span className="text-slate-500">·</span>
              <span className="font-mono text-[9px] text-cyan-200">Vigencia: {data.expiryDate || '2026-2028'}</span>
            </div>

            {/* Barcode representation */}
            {settings.showBarcode && (
              <div className="w-full pt-1.5">
                <div className="bg-white/95 rounded px-2 py-1 shadow-sm">
                  <Barcode value={`SUPRO-${data.employeeId}`} height={22} lightBackground={true} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Border accent highlight */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500" />
      </div>
    );
  }

  // Horizontal Card Layout (85.6mm x 54mm)
  return (
    <div
      className={`relative overflow-hidden select-none bg-slate-950 text-white rounded-2xl shadow-2xl flex flex-row items-stretch border border-cyan-500/30 ${
        isPrintMode ? 'badge-card-print-horizontal' : 'w-[538px] h-[340px]'
      } ${className}`}
      style={{
        boxSizing: 'border-box',
      }}
    >
      {/* Background Implant Graphic */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <img
          src={data.backgroundUrl}
          alt="Medical background"
          className="w-full h-full object-cover object-right opacity-40 mix-blend-screen scale-105"
          
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/75 to-slate-950/90" />
        
        {/* Subtle Guilloche / Security Grid overlay */}
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(56, 189, 248, 0.4) 1px, transparent 0)',
            backgroundSize: '16px 16px'
          }}
        />
      </div>

      {/* Hologram sheen */}
      {settings.showHologram && (
        <div className="absolute inset-0 z-20 pointer-events-none hologram-effect opacity-30 mix-blend-color-dodge" />
      )}

      {/* Slot punch guide for horizontal lanyard */}
      {settings.showSlotPunch && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30">
          <div className="w-12 h-2.5 rounded-full border border-dashed border-cyan-400/60 bg-black/40 flex items-center justify-center">
            <span className="text-[6px] font-mono tracking-tighter text-cyan-300/70">CLIP SLOT</span>
          </div>
        </div>
      )}

      {/* Left Column: Photo & ID details */}
      <div className="relative z-10 w-[190px] p-4 flex flex-col justify-between items-center border-r border-slate-800/80 bg-slate-950/40">
        <div className="p-1 rounded-xl bg-gradient-to-b from-cyan-400/80 via-blue-600/50 to-cyan-500/80 shadow-lg shadow-cyan-500/20">
          <div className={`overflow-hidden bg-slate-900 w-28 h-36 ${getPhotoShapeClass()} shadow-inner relative`}>
            <img
              src={data.photoUrl}
              alt={data.fullName}
              className={`w-full h-full object-cover object-top ${getFilterClass()}`}
              
            />
            {settings.showHologram && (
              <div className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-300 to-fuchsia-400 border border-white/80 flex items-center justify-center shadow">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
        </div>

        {/* ID badge pill */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-900/90 border border-cyan-500/40">
          <span className="text-[9px] uppercase font-mono tracking-wider text-cyan-300">ID:</span>
          <span className="font-mono text-xs font-bold tracking-widest text-white">{data.employeeId}</span>
        </div>

        {/* Small chip badge */}
        {settings.showChip && (
          <div className="flex items-center gap-1 text-[9px] text-amber-300 font-mono">
            <Cpu className="w-3 h-3" />
            <span>NFC / RFID SECURE</span>
          </div>
        )}
      </div>

      {/* Right Column: Logo, Name, Position, Barcode */}
      <div className="relative z-10 flex-1 p-5 flex flex-col justify-between">
        {/* Header with Logo */}
        <div className="flex items-start justify-between">
          <div className="w-44 h-12 flex items-center overflow-hidden">
            <img
              src={data.logoUrl}
              alt={data.companyName}
              className="max-h-full max-w-full object-contain filter contrast-125"
              
            />
          </div>
          <div className="text-right">
            <span className="inline-block px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 text-[9px] font-semibold text-cyan-300 uppercase tracking-wider">
              {data.hospitalAccessLevel || 'Quirófano'}
            </span>
            <p className="text-[9px] font-mono text-slate-400 mt-1">Vig: {data.expiryDate || '2026-2028'}</p>
          </div>
        </div>

        {/* Name and Job Title */}
        <div className="space-y-1.5 my-auto">
          <h2 className="text-xl font-extrabold tracking-tight text-white uppercase leading-tight font-display">
            {data.fullName}
          </h2>
          <div className="inline-block px-3 py-1 rounded bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-xs tracking-wider uppercase shadow-md border border-cyan-300/40">
            {data.jobTitle}
          </div>
          <p className="text-[11px] font-medium text-slate-300 tracking-wide">
            {data.department || 'Ortopedia y Traumatología'}
          </p>
        </div>

        {/* Barcode and Security Verification */}
        {settings.showBarcode && (
          <div className="bg-white/95 rounded px-2.5 py-1.5 shadow-sm">
            <Barcode value={`SUPRO-${data.employeeId}`} height={22} lightBackground={true} />
          </div>
        )}
      </div>

      {/* Edge accent */}
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500" />
    </div>
  );
};
