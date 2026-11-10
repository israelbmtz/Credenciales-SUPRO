import React from 'react';
import { BadgeData } from '../types/badge';
import { CheckCircle2, ShieldAlert, X, Building2, Stethoscope, User, Calendar, Award } from 'lucide-react';

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: BadgeData;
}

export const VerificationModal: React.FC<VerificationModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 border border-cyan-500/40 rounded-2xl p-6 shadow-2xl text-slate-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Verification Status Banner */}
        <div className="flex items-center gap-3 p-3.5 bg-emerald-950/60 border border-emerald-500/40 rounded-xl mb-6">
          <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
          <div>
            <h4 className="text-sm font-bold text-emerald-300">
              Acreditación Hospitalaria Verificada y Vigente
            </h4>
            <p className="text-xs text-emerald-200/80">
              Certificación de Proveedor Quirúrgico registrada en el sistema de SUPRO México
            </p>
          </div>
        </div>

        {/* Credential Details */}
        <div className="space-y-4">
          <div className="flex items-center gap-4 bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <img
              src={data.photoUrl}
              alt={data.fullName}
              className="w-16 h-20 object-cover object-top rounded-lg border border-cyan-500/50 shadow"
            />
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-cyan-400">ID: {data.employeeId}</span>
              <h3 className="text-base font-extrabold text-white leading-tight font-display">{data.fullName}</h3>
              <p className="text-xs font-semibold text-cyan-300 uppercase">{data.jobTitle}</p>
              <p className="text-[11px] text-slate-400">{data.department}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
            <div>
              <span className="text-slate-400 text-[10px] block uppercase font-mono">Empresa Titular:</span>
              <span className="font-semibold text-white">{data.companyName}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block uppercase font-mono">Vigencia Oficial:</span>
              <span className="font-semibold text-cyan-300">{data.expiryDate}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block uppercase font-mono">Nivel de Acceso:</span>
              <span className="font-semibold text-emerald-400">Quirófanos & CEYE</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block uppercase font-mono">CURP / Folio:</span>
              <span className="font-mono font-semibold text-white">{data.curp}</span>
            </div>
          </div>

          <div className="bg-cyan-950/30 border border-cyan-800/40 rounded-xl p-3 text-xs text-slate-300 space-y-1.5">
            <div className="flex items-center gap-1.5 text-cyan-300 font-semibold text-xs">
              <Award className="w-4 h-4 text-cyan-400" />
              <span>Competencias Quirúrgicas Validadas:</span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-300">
              Soporte técnico intraoperatorio en artroplastia total de cadera, instrumentación especializada ortopédica, y cumplimiento estricto de lineamientos NOM y bioseguridad en áreas quirúrgicas.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            Cerrar Verificación
          </button>
        </div>
      </div>
    </div>
  );
};
