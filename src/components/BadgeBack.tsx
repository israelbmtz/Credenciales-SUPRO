import React from 'react';
import { BadgeData, BadgeSettings } from '../types/badge';
import { QRCodeDisplay } from './QRCodeDisplay';
import { AlertCircle } from 'lucide-react';

interface BadgeBackProps {
  data: BadgeData;
  settings: BadgeSettings;
  className?: string;
  isPrintMode?: boolean;
}

export const BadgeBack: React.FC<BadgeBackProps> = ({
  data,
  settings,
  className = '',
  isPrintMode = false,
}) => {
  const isVertical = settings.orientation === 'vertical';
  const verificationPayload = `https://supromexico.com/verify?id=${data.employeeId}&holder=${encodeURIComponent(
    data.fullName
  )}&role=${encodeURIComponent(data.jobTitle)}`;

  if (isVertical) {
    return (
      <div
        className={`relative overflow-hidden select-none bg-slate-900 text-white rounded-2xl shadow-2xl flex flex-col justify-between border border-slate-700/80 ${
          isPrintMode ? 'badge-card-print-vertical' : 'w-[340px] h-[538px]'
        } ${className}`}
        style={{
          boxSizing: 'border-box',
        }}
      >
        {/* Subtle background texture */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.4) 1px, transparent 0)',
              backgroundSize: '12px 12px'
            }}
          />
        </div>

        {/* Magnetic Stripe representation */}
        <div className="relative z-10 w-full pt-4">
          <div className="w-full h-9 bg-slate-950 border-y border-slate-800 flex items-center justify-between px-4">
            <span className="text-[7px] font-mono tracking-widest text-slate-500">HICO MAGNETIC DATA TRACK</span>
            <span className="text-[7px] font-mono tracking-widest text-cyan-500/70">SUPRO-SECURE-NFC</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex-1 p-4 flex flex-col justify-between text-slate-200">
          {/* Header */}
          <div className="text-center pt-1 border-b border-slate-800 pb-2">
            <h3 className="text-xs font-bold tracking-wider text-cyan-400 uppercase font-display">
              {data.companyName || 'SUPRO México'}
            </h3>
            <p className="text-[8px] font-medium text-slate-400 uppercase tracking-widest">
              Surgical Providers in Orthopedics
            </p>
          </div>

          {/* Biosecurity & Surgical Accreditation Disclaimer */}
          <div className="bg-slate-950/60 rounded-lg p-2.5 border border-slate-800 text-[8.5px] leading-relaxed text-slate-300">
            <div className="flex items-center gap-1 text-cyan-400 font-bold uppercase text-[8px] mb-1">
              <AlertCircle className="w-3 h-3 text-cyan-400 shrink-0" />
              <span>Acreditación Quirúrgica Hospitalaria</span>
            </div>
            <p>
              El portador está acreditado como Proveedor Quirúrgico calificado para soporte técnico en procedimientos ortopédicos y artroplastia en áreas de quirófano conforme a normas de asepsia y bioseguridad.
            </p>
          </div>

          {/* Official Registration & Validity Grid */}
          <div className="grid grid-cols-2 gap-2 text-[9px] bg-slate-950/80 p-2.5 rounded-lg border border-slate-800/80">
            <div className="space-y-0.5">
              <span className="text-[7.5px] text-slate-400 uppercase block font-mono">CURP / Registro:</span>
              <span className="font-mono text-[8.5px] text-slate-200 font-semibold">{data.curp || 'BAMI880919HDFR...'}</span>
            </div>

            <div className="space-y-0.5">
              <span className="text-[7.5px] text-slate-400 uppercase block font-mono">Emisión / Vigencia:</span>
              <span className="font-mono text-[8.5px] text-cyan-300 font-semibold">{data.issueDate || '2026'} - {data.expiryDate || '2028'}</span>
            </div>

            <div className="col-span-2 pt-1 border-t border-slate-800 flex justify-between items-center text-[7.5px]">
              <span className="font-mono text-slate-400">ÁREA: SOPORTE ARTICULAR</span>
              <span className="font-mono text-emerald-400 font-semibold">ESTATUS: ACTIVO</span>
            </div>
          </div>

          {/* Verification QR Code + Signature Box */}
          <div className="flex items-center gap-3 bg-slate-950/50 p-2 rounded-lg border border-slate-800/80">
            {settings.showQrCode && (
              <div className="shrink-0 flex flex-col items-center">
                <QRCodeDisplay value={verificationPayload} size={56} className="bg-white p-1" />
                <span className="text-[6.5px] font-mono text-cyan-400 mt-1 uppercase tracking-tighter">VALIDAR QR</span>
              </div>
            )}
            
            <div className="flex-1 flex flex-col justify-between h-full pl-1">
              <div className="border-b border-dashed border-slate-600 pb-1 pt-2">
                <div className="font-serif italic text-cyan-200 text-[10px] text-center tracking-wide">
                  Israel Balderas M.
                </div>
              </div>
              <span className="text-[7px] text-slate-400 text-center uppercase tracking-wider block mt-0.5">
                Firma del Titular
              </span>

              <div className="pt-2 flex items-center justify-between text-[7px] text-slate-400 font-mono">
                <span>AUTORIZACIÓN MÉDICA</span>
                <span className="text-emerald-400">VERIFICADO</span>
              </div>
            </div>
          </div>

          {/* Return & Support Footer */}
          <div className="text-center pt-1 border-t border-slate-800/80 text-[7.5px] text-slate-400 space-y-0.5">
            <p className="font-medium text-slate-300">
              Propiedad de SUPRO México. Uso estrictamente personal e intransferible.
            </p>
            <p className="text-[7px]">
              En caso de extravío comunicarse a: {data.companyEmail || 'supro_mexico@hotmail.com'} · Tel. {data.companyPhone || '55 4035 5654'}
            </p>
          </div>
        </div>

        {/* Bottom accent stripe */}
        <div className="h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-slate-700" />
      </div>
    );
  }

  // Horizontal Card Back Layout (85.6mm x 54mm)
  return (
    <div
      className={`relative overflow-hidden select-none bg-slate-900 text-white rounded-2xl shadow-2xl flex flex-col justify-between border border-slate-700/80 ${
        isPrintMode ? 'badge-card-print-horizontal' : 'w-[538px] h-[340px]'
      } ${className}`}
      style={{
        boxSizing: 'border-box',
      }}
    >
      {/* Magnetic Stripe */}
      <div className="w-full pt-3">
        <div className="w-full h-8 bg-slate-950 border-y border-slate-800 flex items-center justify-between px-4">
          <span className="text-[7px] font-mono tracking-widest text-slate-500">HICO ACCESS STRIPE</span>
          <span className="text-[7px] font-mono tracking-widest text-cyan-400/80">SUPRO MÉXICO · ID: {data.employeeId}</span>
        </div>
      </div>

      {/* Main 2-Column Content */}
      <div className="flex-1 p-4 grid grid-cols-12 gap-3 items-stretch">
        {/* Left Column: Biosecurity notice & Official registration info */}
        <div className="col-span-7 flex flex-col justify-between space-y-2">
          <div className="bg-slate-950/70 rounded-lg p-2 border border-slate-800 text-[8.5px] leading-relaxed text-slate-300">
            <span className="text-cyan-400 font-bold uppercase text-[8px] block mb-0.5">
              Acreditación Quirúrgica Hospitalaria
            </span>
            <p>
              Acredita al portador como Proveedor Quirúrgico calificado para ingreso a quirófanos y centrales de esterilización, cumpliendo con las normas de bioseguridad hospitalaria.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 bg-slate-950/90 p-2 rounded-lg border border-slate-800 text-[8px]">
            <div>
              <span className="text-slate-400 uppercase block font-mono">CURP / Registro:</span>
              <span className="font-mono text-slate-200 font-semibold">{data.curp || 'BAMI880919HDFR...'}</span>
            </div>
            <div>
              <span className="text-slate-400 uppercase block font-mono">Emisión / Vigencia:</span>
              <span className="font-mono text-cyan-300 font-semibold">{data.issueDate || '2026'} - {data.expiryDate || '2028'}</span>
            </div>
          </div>
        </div>

        {/* Right Column: QR Code + Signature */}
        <div className="col-span-5 flex flex-col justify-between bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
          <div className="flex items-center gap-2">
            {settings.showQrCode && (
              <div className="shrink-0 flex flex-col items-center">
                <QRCodeDisplay value={verificationPayload} size={52} className="bg-white p-0.5" />
                <span className="text-[6px] font-mono text-cyan-400 mt-0.5">ESCANEAR</span>
              </div>
            )}
            <div className="flex-1 text-[7.5px] text-slate-300">
              <p className="font-bold text-cyan-400 uppercase">{data.companyName}</p>
              <p className="text-[6.5px] text-slate-400">Surgical Providers in Orthopedics</p>
            </div>
          </div>

          <div className="border-t border-dashed border-slate-700 pt-1 text-center">
            <span className="font-serif italic text-cyan-200 text-[10px] block">Israel Balderas M.</span>
            <span className="text-[6.5px] text-slate-400 uppercase tracking-wider block">Firma del Titular</span>
          </div>
        </div>
      </div>

      {/* Footer Notice */}
      <div className="px-4 pb-2 text-[7px] text-slate-400 flex items-center justify-between border-t border-slate-800/80 pt-1">
        <span>Propiedad de SUPRO México · Personal e Intransferible</span>
        <span>{data.companyEmail || 'supro_mexico@hotmail.com'} · Tel. {data.companyPhone || '55 4035 5654'}</span>
      </div>

      <div className="h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-slate-700" />
    </div>
  );
};
