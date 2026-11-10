import React, { useRef } from 'react';
import { BadgeData, BadgeSettings } from '../types/badge';
import {
  User,
  Briefcase,
  Hash,
  Sparkles,
  Camera,
  RotateCcw,
  Sliders,
  ShieldCheck,
  Download,
  Image as ImageIcon,
  Check,
  Palette
} from 'lucide-react';

interface BadgeEditorProps {
  data: BadgeData;
  settings: BadgeSettings;
  onUpdateData: (newData: Partial<BadgeData>) => void;
  onUpdateSettings: (newSettings: Partial<BadgeSettings>) => void;
  onResetDefaults: () => void;
  onExportPng: (side: 'front' | 'back' | 'both') => void;
  isExporting: boolean;
}

export const BadgeEditor: React.FC<BadgeEditorProps> = ({
  data,
  settings,
  onUpdateData,
  onUpdateSettings,
  onResetDefaults,
  onExportPng,
  isExporting,
}) => {
  const photoInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const bgInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'photoUrl' | 'logoUrl' | 'backgroundUrl'
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onUpdateData({ [field]: event.target.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl flex flex-col space-y-6 text-slate-200">
      {/* Editor Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2 font-display">
            <Sliders className="w-4 h-4 text-cyan-400" />
            <span>Personalización de Credencial</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Ajusta los datos del empleado, seguridad e imagen
          </p>
        </div>

        <button
          onClick={onResetDefaults}
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-slate-400 hover:text-cyan-300 transition-colors bg-slate-800/80 hover:bg-slate-800 rounded-lg border border-slate-700/60"
          title="Restablecer datos originales"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Restablecer</span>
        </button>
      </div>

      {/* Quick Action: Export HD PNGs */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
          Descarga en Alta Resolución (PNG 300 DPI)
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onExportPng('front')}
            disabled={isExporting}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 transition-all disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Descargar Anverso</span>
          </button>
          <button
            onClick={() => onExportPng('back')}
            disabled={isExporting}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 transition-all disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Descargar Reverso</span>
          </button>
        </div>
      </div>

      {/* Orientation & Format */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
          Orientación del Portagafete
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onUpdateSettings({ orientation: 'vertical' })}
            className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold transition-all border ${
              settings.orientation === 'vertical'
                ? 'bg-cyan-600/30 text-cyan-300 border-cyan-400 shadow-sm'
                : 'bg-slate-800/60 text-slate-400 border-slate-700 hover:text-slate-200'
            }`}
          >
            <div className="w-3.5 h-5 rounded-sm border border-current" />
            <span>Vertical (54 × 85.6 mm)</span>
          </button>
          <button
            onClick={() => onUpdateSettings({ orientation: 'horizontal' })}
            className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold transition-all border ${
              settings.orientation === 'horizontal'
                ? 'bg-cyan-600/30 text-cyan-300 border-cyan-400 shadow-sm'
                : 'bg-slate-800/60 text-slate-400 border-slate-700 hover:text-slate-200'
            }`}
          >
            <div className="w-5 h-3.5 rounded-sm border border-current" />
            <span>Horizontal (85.6 × 54 mm)</span>
          </button>
        </div>
      </div>

      {/* Section: Employee Data */}
      <div className="space-y-3 pt-2 border-t border-slate-800">
        <label className="text-xs font-semibold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
          <User className="w-3.5 h-3.5" />
          <span>Datos del Portador</span>
        </label>

        {/* Full Name */}
        <div>
          <label className="text-[11px] text-slate-400 block mb-1">Nombre Completo:</label>
          <input
            type="text"
            value={data.fullName}
            onChange={(e) => onUpdateData({ fullName: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400 transition-colors"
            placeholder="Ej. Israel Balderas Martínez"
          />
        </div>

        {/* Job Title & ID */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[11px] text-slate-400 block mb-1">Puesto / Cargo:</label>
            <input
              type="text"
              value={data.jobTitle}
              onChange={(e) => onUpdateData({ jobTitle: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400 transition-colors"
              placeholder="Proveedor Quirúrgico"
            />
          </div>
          <div>
            <label className="text-[11px] text-slate-400 block mb-1">ID Empleado:</label>
            <input
              type="text"
              value={data.employeeId}
              onChange={(e) => onUpdateData({ employeeId: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-cyan-400 transition-colors"
              placeholder="0919"
            />
          </div>
        </div>

        {/* Department & Access Level */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[11px] text-slate-400 block mb-1">Especialidad / Depto:</label>
            <input
              type="text"
              value={data.department}
              onChange={(e) => onUpdateData({ department: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400 transition-colors"
              placeholder="Ortopedia y Traumatología"
            />
          </div>
          <div>
            <label className="text-[11px] text-slate-400 block mb-1">Acceso Hospitalario:</label>
            <input
              type="text"
              value={data.hospitalAccessLevel}
              onChange={(e) => onUpdateData({ hospitalAccessLevel: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400 transition-colors"
              placeholder="Quirófano Nivel 1"
            />
          </div>
        </div>

        {/* CURP & Expiry Date */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[11px] text-slate-400 block mb-1">CURP / Registro:</label>
            <input
              type="text"
              value={data.curp}
              onChange={(e) => onUpdateData({ curp: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-cyan-400 transition-colors"
              placeholder="BAMI880919..."
            />
          </div>
          <div>
            <label className="text-[11px] text-slate-400 block mb-1">Vigencia:</label>
            <input
              type="text"
              value={data.expiryDate}
              onChange={(e) => onUpdateData({ expiryDate: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-cyan-400 transition-colors"
              placeholder="2026 - 2028"
            />
          </div>
        </div>

        {/* Company Contact (Email & Phone for lost card notice) */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[11px] text-slate-400 block mb-1">Correo de Extravío:</label>
            <input
              type="email"
              value={data.companyEmail || ''}
              onChange={(e) => onUpdateData({ companyEmail: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-cyan-400 transition-colors"
              placeholder="supro_mexico@hotmail.com"
            />
          </div>
          <div>
            <label className="text-[11px] text-slate-400 block mb-1">Teléfono Reporte:</label>
            <input
              type="text"
              value={data.companyPhone || ''}
              onChange={(e) => onUpdateData({ companyPhone: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-cyan-400 transition-colors"
              placeholder="55 4035 5654"
            />
          </div>
        </div>
      </div>

      {/* Section: Photo Controls & Filters */}
      <div className="space-y-3 pt-2 border-t border-slate-800">
        <label className="text-xs font-semibold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
          <Camera className="w-3.5 h-3.5" />
          <span>Foto y Estilo</span>
        </label>

        {/* Change Photo button */}
        <div className="flex items-center gap-3">
          <input
            type="file"
            ref={photoInputRef}
            onChange={(e) => handleFileUpload(e, 'photoUrl')}
            accept="image/*"
            className="hidden"
          />
          <button
            onClick={() => photoInputRef.current?.click()}
            className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-colors"
          >
            <Camera className="w-3.5 h-3.5 text-cyan-400" />
            <span>Cambiar Foto del Empleado</span>
          </button>
        </div>

        {/* Filter buttons */}
        <div>
          <label className="text-[11px] text-slate-400 block mb-1.5">Tono de la Fotografía:</label>
          <div className="grid grid-cols-4 gap-1.5 text-[10px]">
            {[
              { id: 'bw', label: 'B/N Original' },
              { id: 'cool-tint', label: 'Quirúrgico' },
              { id: 'high-contrast', label: 'Contraste' },
              { id: 'none', label: 'Natural' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => onUpdateSettings({ photoFilter: f.id as any })}
                className={`py-1 px-1.5 rounded text-center transition-all ${
                  settings.photoFilter === f.id
                    ? 'bg-cyan-600 text-white font-bold'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Photo Shape */}
        <div>
          <label className="text-[11px] text-slate-400 block mb-1.5">Encuadre de Foto:</label>
          <div className="grid grid-cols-3 gap-2 text-xs">
            {[
              { id: 'rounded', label: 'Esquinas suaves' },
              { id: 'square', label: 'Rectangular' },
              { id: 'circle', label: 'Circular' },
            ].map((shape) => (
              <button
                key={shape.id}
                onClick={() => onUpdateSettings({ photoShape: shape.id as any })}
                className={`py-1.5 px-2 rounded-lg text-center transition-all ${
                  settings.photoShape === shape.id
                    ? 'bg-cyan-600 text-white font-medium shadow-sm'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {shape.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Section: Security Features Toggles */}
      <div className="space-y-3 pt-2 border-t border-slate-800">
        <label className="text-xs font-semibold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Elementos de Seguridad y Accesorios</span>
        </label>

        <div className="space-y-2 text-xs">
          <label className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors">
            <span className="flex items-center gap-2 text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Sello Holográfico de Seguridad</span>
            </span>
            <input
              type="checkbox"
              checked={settings.showHologram}
              onChange={(e) => onUpdateSettings({ showHologram: e.target.checked })}
              className="rounded bg-slate-800 border-slate-700 text-cyan-500 focus:ring-cyan-500"
            />
          </label>

          <label className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors">
            <span className="flex items-center gap-2 text-slate-300">
              <div className="w-3 h-3 rounded-full border border-dashed border-cyan-400" />
              <span>Ranura de Clip / Lanyard (Slot Punch)</span>
            </span>
            <input
              type="checkbox"
              checked={settings.showSlotPunch}
              onChange={(e) => onUpdateSettings({ showSlotPunch: e.target.checked })}
              className="rounded bg-slate-800 border-slate-700 text-cyan-500 focus:ring-cyan-500"
            />
          </label>

          <label className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors">
            <span className="flex items-center gap-2 text-slate-300">
              <span className="font-mono text-cyan-400 font-bold">|||</span>
              <span>Código de Barras (Code 128)</span>
            </span>
            <input
              type="checkbox"
              checked={settings.showBarcode}
              onChange={(e) => onUpdateSettings({ showBarcode: e.target.checked })}
              className="rounded bg-slate-800 border-slate-700 text-cyan-500 focus:ring-cyan-500"
            />
          </label>

          <label className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors">
            <span className="flex items-center gap-2 text-slate-300">
              <span className="font-mono text-amber-400 font-bold">NFC</span>
              <span>Chip Inteligente RFID / Acceso Hospitalario</span>
            </span>
            <input
              type="checkbox"
              checked={settings.showChip}
              onChange={(e) => onUpdateSettings({ showChip: e.target.checked })}
              className="rounded bg-slate-800 border-slate-700 text-cyan-500 focus:ring-cyan-500"
            />
          </label>
        </div>
      </div>
    </div>
  );
};
