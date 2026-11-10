import React from 'react';
import { BadgeData, BadgeSettings, PrintLayoutMode } from '../types/badge';
import { BadgeFront } from './BadgeFront';
import { BadgeBack } from './BadgeBack';
import { Printer, Scissors, Info } from 'lucide-react';

interface PrintSheetProps {
  data: BadgeData;
  settings: BadgeSettings;
  layoutMode: PrintLayoutMode;
  onLayoutModeChange: (mode: PrintLayoutMode) => void;
  showCropMarks: boolean;
  onToggleCropMarks: (val: boolean) => void;
  includeLanyardGuides: boolean;
  onToggleLanyardGuides: (val: boolean) => void;
  onTriggerPrint: () => void;
}

export const PrintSheet: React.FC<PrintSheetProps> = ({
  data,
  settings,
  layoutMode,
  onLayoutModeChange,
  showCropMarks,
  onToggleCropMarks,
  includeLanyardGuides,
  onToggleLanyardGuides,
  onTriggerPrint,
}) => {
  const isVertical = settings.orientation === 'vertical';

  return (
    <div className="w-full flex flex-col items-center">
      {/* Control bar for Print Sheet (hidden in print) */}
      <div className="no-print w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-xl p-4 mb-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-2">
            Modo de Hoja:
          </span>
          <button
            onClick={() => onLayoutModeChange('sheet-duplex')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              layoutMode === 'sheet-duplex'
                ? 'bg-cyan-600 text-white shadow'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Frente y Reverso (Doblado / Laminado)
          </button>
          <button
            onClick={() => onLayoutModeChange('single-cr80')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              layoutMode === 'single-cr80'
                ? 'bg-cyan-600 text-white shadow'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Individual 1:1 (Impresora PVC)
          </button>
          <button
            onClick={() => onLayoutModeChange('sheet-multi')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              layoutMode === 'sheet-multi'
                ? 'bg-cyan-600 text-white shadow'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Múltiples Copias (4 por hoja)
          </button>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={showCropMarks}
              onChange={(e) => onToggleCropMarks(e.target.checked)}
              className="rounded bg-slate-800 border-slate-700 text-cyan-500 focus:ring-cyan-500"
            />
            <Scissors className="w-3.5 h-3.5 text-cyan-400" />
            <span>Guías de corte</span>
          </label>

          <button
            onClick={onTriggerPrint}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/25 transition-all transform active:scale-95"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir Credencial</span>
          </button>
        </div>
      </div>

      {/* Helpful Print Tips Banner */}
      <div className="no-print w-full max-w-4xl bg-cyan-950/40 border border-cyan-800/40 rounded-xl p-3.5 mb-6 text-xs text-cyan-200 flex items-start gap-3">
        <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-cyan-300">
            Recomendaciones para impresión profesional en tamaño estándar CR80 (54 × 85.6 mm):
          </p>
          <ul className="text-slate-300 space-y-0.5 list-disc list-inside text-[11.5px]">
            <li>En la ventana de impresión, asegúrate de activar <strong>"Gráficos de fondo" (Background graphics)</strong>.</li>
            <li>Configura la <strong>Escala en 100% (o Tamaño Real)</strong> para conservar las dimensiones exactas de tarjeta PVC.</li>
            <li>Si imprimes en papel u opalina, usa mica térmica calibre 7 a 10 mil para plastificar.</li>
          </ul>
        </div>
      </div>

      {/* Physical Printable Area Preview */}
      <div className="w-full flex justify-center py-4 overflow-x-auto">
        {/* Paper Simulation container */}
        <div className="bg-white text-slate-900 shadow-2xl p-8 rounded-lg min-w-[700px] border border-slate-300 print:shadow-none print:border-none print:p-0 print:m-0 print:w-full">
          {/* Header on printed paper (hidden in single PVC mode) */}
          {layoutMode !== 'single-cr80' && (
            <div className="text-center pb-4 mb-4 border-b border-slate-200 print:hidden">
              <span className="text-[11px] font-mono tracking-wider text-slate-500 uppercase">
                Plantilla de Impresión CR80 · SUPRO México · {data.fullName} (ID: {data.employeeId})
              </span>
            </div>
          )}

          {/* DUPLEX FOLDING MODE (Front + Back with fold line & crop marks) */}
          {layoutMode === 'sheet-duplex' && (
            <div className="flex flex-col items-center">
              <div className="relative p-6 inline-block bg-slate-50 border border-slate-200 rounded print:border-none print:bg-transparent">
                {/* Crop marks at corners */}
                {showCropMarks && (
                  <>
                    {/* Top-Left */}
                    <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-slate-800 pointer-events-none" />
                    {/* Top-Right */}
                    <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-slate-800 pointer-events-none" />
                    {/* Bottom-Left */}
                    <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-slate-800 pointer-events-none" />
                    {/* Bottom-Right */}
                    <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-slate-800 pointer-events-none" />
                  </>
                )}

                <div className={`flex items-center gap-6 ${isVertical ? 'flex-row' : 'flex-col'}`}>
                  {/* Front */}
                  <div className="relative">
                    <span className="no-print text-[10px] font-mono text-slate-500 block text-center mb-1">
                      ANVERSO (FRENTE)
                    </span>
                    <BadgeFront data={data} settings={settings} isPrintMode={true} />
                  </div>

                  {/* Central Fold or Cut Line */}
                  <div className={`flex items-center justify-center ${isVertical ? 'flex-col h-[538px] px-2' : 'w-[538px] py-2'}`}>
                    <div className={`${isVertical ? 'w-px h-full border-r border-dashed border-slate-400' : 'h-px w-full border-b border-dashed border-slate-400'}`} />
                    <span className="text-[9px] font-mono text-slate-400 bg-white px-1 py-0.5 whitespace-nowrap">
                      Línea de Doblez / Corte
                    </span>
                    <div className={`${isVertical ? 'w-px h-full border-r border-dashed border-slate-400' : 'h-px w-full border-b border-dashed border-slate-400'}`} />
                  </div>

                  {/* Back */}
                  <div className="relative">
                    <span className="no-print text-[10px] font-mono text-slate-500 block text-center mb-1">
                      REVERSO (ATRÁS)
                    </span>
                    <BadgeBack data={data} settings={settings} isPrintMode={true} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SINGLE CR80 MODE (Exact 1:1 standard PVC) */}
          {layoutMode === 'single-cr80' && (
            <div className="flex flex-col items-center gap-8 print:gap-0">
              <div className="p-4 print:p-0 flex flex-col items-center">
                <span className="no-print text-xs font-mono text-slate-500 mb-2">
                  CARA FRONTAL (ANVERSO) - TAMAÑO CR80 EXACTO
                </span>
                <BadgeFront data={data} settings={settings} isPrintMode={true} />
              </div>

              <div className="print:break-before-page p-4 print:p-0 flex flex-col items-center">
                <span className="no-print text-xs font-mono text-slate-500 mb-2">
                  CARA TRASERA (REVERSO) - TAMAÑO CR80 EXACTO
                </span>
                <BadgeBack data={data} settings={settings} isPrintMode={true} />
              </div>
            </div>
          )}

          {/* MULTIPLE COPIES (4 CARDS PER PAGE) */}
          {layoutMode === 'sheet-multi' && (
            <div className="grid grid-cols-2 gap-8 justify-items-center">
              {[1, 2, 3, 4].map((index) => (
                <div key={index} className="relative p-2 border border-slate-200 rounded print:border-none">
                  {showCropMarks && (
                    <>
                      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-slate-800" />
                      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-slate-800" />
                      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-slate-800" />
                      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-slate-800" />
                    </>
                  )}
                  <BadgeFront data={data} settings={settings} isPrintMode={true} />
                  <span className="no-print text-[9px] font-mono text-slate-400 block text-center mt-1">
                    Copia {index} - Anverso
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
